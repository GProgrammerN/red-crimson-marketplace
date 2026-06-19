"use client";

import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import type { CartItem } from "@/store/use-cart";

type OrderSummaryProps = {
  items: CartItem[];
  totalPrice: number;
  isProcessing: boolean;
};

const SHIPPING = 0; // Frete grátis

export function OrderSummary({ items, totalPrice, isProcessing }: OrderSummaryProps) {
  const finalTotal = totalPrice + SHIPPING;

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="size-16 flex-shrink-0 overflow-hidden rounded-md">
              <ProductImage
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <Link
                href={`/produto/${item.slug}`}
                className="text-sm font-medium text-foreground hover:text-red-crimson"
              >
                {item.name}
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm font-medium text-red-crimson">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete</span>
          <span className="text-green-500">Grátis</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
          <span>Total</span>
          <span className="font-heading text-lg text-red-crimson">
            R$ {finalTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment info */}
      <p className="text-xs text-muted-foreground">
        Pagamento processado via Stripe em modo de teste. Nenhum cartão real será
        cobrado. <br></br><br></br><strong>Use o cartão 4242 4242 4242 4242 com qualquer data de validade futura e CVC para simular um pagamento bem-sucedido.</strong>
      </p>
    </div>
  );
}
