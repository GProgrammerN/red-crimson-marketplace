"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

export type CheckoutFormData = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood?: string;
  complement?: string;
};

export async function createCheckoutSession(
  items: { id: string; quantity: number }[],
  formData: CheckoutFormData
) {
  try {
    // Fetch products from DB
    const productIds = items.map((i) => i.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Filter out items whose products no longer exist in DB (stale cart)
    const validItems = items.filter((item) =>
      products.some((p) => p.id === item.id)
    );

    if (validItems.length === 0) {
      return {
        error:
          "Os itens do seu carrinho não estão mais disponíveis. Por favor, limpe o carrinho e adicione os produtos novamente.",
      };
    }

    if (validItems.length !== items.length) {
      console.warn(
        `Ignorando ${items.length - validItems.length} item(ns) do carrinho que não existem mais no banco.`
      );
    }

    // Build line items for Stripe
    const lineItems = validItems.map((item) => {
      const product = products.find((p) => p.id === item.id)!;

      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            images:
              product.images.filter((img: string) => img && img.length > 0)
                .length > 0
                ? product.images.filter(
                    (img: string) => img && img.length > 0
                  )
                : undefined,
          },
          unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity: item.quantity,
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
    });

    // Calculate total
    const total = validItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.id);
      return acc + Number(product?.price ?? 0) * item.quantity;
    }, 0);

    // Create order in DB
    const order = await prisma.order.create({
      data: {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone ?? null,
        total,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          neighborhood: formData.neighborhood ?? null,
          complement: formData.complement ?? null,
        },
        items: {
          create: validItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return {
              productId: item.id,
              quantity: item.quantity,
              price: Number(product?.price ?? 0),
            };
          }),
        },
      },
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${await getBaseUrl()}/pedido/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${await getBaseUrl()}/checkout`,
      customer_email: formData.customerEmail,
      metadata: {
        orderId: order.id,
      },
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return { url: session.url, orderId: order.id };
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return { error: "Não foi possível processar o pagamento. Tente novamente." };
  }
}

async function getBaseUrl(): Promise<string> {
  // Vercel provides this automatically
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local dev
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // Fallback: detect from request headers
  try {
    const h = await headers();
    const host = h.get("host");
    if (host) {
      const proto = h.get("x-forwarded-proto") ?? "http";
      return `${proto}://${host}`;
    }
  } catch {
    // headers() may fail in some contexts
  }
  return "http://localhost:3000";
}
