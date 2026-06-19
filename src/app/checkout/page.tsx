"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AddressForm } from "@/components/checkout/address-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { useCart } from "@/store/use-cart";
import { createCheckoutSession, type CheckoutFormData } from "@/lib/actions/checkout";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Sua coleção está vazia
            </h1>
            <p className="mt-2 text-muted-foreground">
              Adicione produtos ao carrinho antes de finalizar a compra.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 rounded-lg bg-red-crimson px-6 py-2 text-sm font-medium text-ivory transition-colors hover:bg-red-crimson/80"
            >
              Explorar Produtos
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleSubmit = async (formData: CheckoutFormData) => {
    setIsProcessing(true);

    const cartItems = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const result = await createCheckoutSession(cartItems, formData);

    if (result.error) {
      toast.error(result.error);
      setIsProcessing(false);
      return;
    }

    if (result.url) {
      clearCart();
      window.location.href = result.url;
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Finalizar Compra
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* Address Form */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Endereço de Entrega
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Para onde devemos enviar seu pedido?
              </p>
              <div className="mt-6">
                <AddressForm onSubmit={handleSubmit} isProcessing={isProcessing} />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Resumo do Pedido
              </h2>
              <div className="mt-6">
                <OrderSummary
                  items={items}
                  totalPrice={totalPrice}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
