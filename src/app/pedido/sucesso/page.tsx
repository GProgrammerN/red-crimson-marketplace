import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SaveOrderToHistory } from "@/components/orders/save-order-to-history";
import { prisma } from "@/lib/prisma";
import { CheckCircle } from "lucide-react";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  // Fetch order by Stripe session ID
  let order;
  try {
    order = await prisma.order.findUnique({
      where: { stripeSessionId: session_id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  } catch {
    order = null;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center">
          {/* Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="size-8 text-green-500" />
          </div>

          {/* Title */}
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">
            Sua ordem foi selada!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Recebemos seu pedido e em breve ele será processado.
          </p>

          {/* Order details */}
          {order && (
            <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4 text-left">
              <p className="text-sm text-muted-foreground">
                Pedido:{" "}
                <span className="font-mono text-foreground">
                  #{order.id.slice(-8).toUpperCase()}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Total:{" "}
                <span className="font-heading font-bold text-red-crimson">
                  R$ {Number(order.total).toFixed(2)}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Status:{" "}
                <span className="font-medium text-green-500">
                  {order.status === "PAID" ? "Pago" : "Confirmado"}
                </span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <Link
              href="/"
              className="block w-full rounded-lg bg-red-crimson px-6 py-2.5 text-center text-sm font-medium text-ivory transition-colors hover:bg-red-crimson/80"
            >
              Voltar às Compras
            </Link>
          </div>

          {/* Test mode notice */}
          <p className="mt-6 text-xs text-muted-foreground">
            Modo de teste — Nenhum valor real foi cobrado. Esta é uma simulação
            para fins de portfólio.
          </p>
        </div>
      </main>

      {/* Save order to localStorage (client component) */}
      {order && (
        <SaveOrderToHistory
          orderId={order.id}
          total={Number(order.total)}
          customerName={order.customerName}
          customerEmail={order.customerEmail}
          items={order.items.map((item) => ({
            id: item.productId,
            name: item.product.name,
            price: Number(item.price),
            image: item.product.images[0] || "",
            quantity: item.quantity,
          }))}
        />
      )}

      <Footer />
    </>
  );
}
