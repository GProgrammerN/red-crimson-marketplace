"use client";

import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/store/use-cart";
import { cn } from "@/lib/utils";

type CartSheetProps = {
  badgeAnimating?: boolean;
};

export function CartSheet({ badgeAnimating }: CartSheetProps) {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="size-5" />
          {totalItems > 0 && (
            <span
              className={cn(
                "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-crimson text-[10px] font-bold text-ivory",
                badgeAnimating && "animate-badge-pop"
              )}
            >
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            Sua Coleção
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Sua coleção está vazia... por enquanto."
              : `${totalItems} item(ns) selecionado(s)`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingBag className="size-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Sua coleção está vazia... por enquanto.
            </p>
            <SheetClose asChild>
              <Button variant="outline" asChild>
                <Link href="/categoria/roupas">Explorar Produtos</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="animate-fade-in flex gap-4 rounded-lg border border-border bg-card p-3"
                >
                  <div className="size-20 flex-shrink-0 overflow-hidden rounded-md">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <Link
                        href={`/produto/${item.slug}`}
                        className="text-sm font-medium text-foreground hover:text-red-crimson"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remover item"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex size-6 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex size-6 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <span className="font-heading text-sm font-bold text-red-crimson">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-border pt-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-heading text-xl font-bold text-red-crimson">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={clearCart}
                  >
                    Limpar
                  </Button>
                  <SheetClose asChild>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href="/checkout">Finalizar Compra</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
