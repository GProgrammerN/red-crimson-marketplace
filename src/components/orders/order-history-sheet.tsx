"use client";

import { useState } from "react";
import { ScrollText, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOrders } from "@/store/use-orders";
import { cn } from "@/lib/utils";

export function OrderHistorySheet() {
  const { orders, clearOrders } = useOrders();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ScrollText className="size-5" />
          {orders.length > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-purple-soft text-[10px] font-bold text-ivory">
              {orders.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            Histórico de Compras
          </SheetTitle>
          <SheetDescription>
            {orders.length === 0
              ? "Nenhuma compra realizada ainda."
              : `${orders.length} ritual(is) concluído(s)`}
          </SheetDescription>
        </SheetHeader>

        {orders.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <Package className="size-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Nenhum ritual de compra concluído ainda.
            </p>
            <SheetClose asChild>
              <Button variant="outline" asChild>
                <a href="/categoria/roupas">Explorar Produtos</a>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-border bg-card"
                >
                  {/* Order header */}
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/60">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-sm font-bold text-red-crimson">
                        R$ {order.total.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {order.items.length} item(ns)
                      </p>
                    </div>
                  </button>

                  {/* Expanded items */}
                  {expandedId === order.id && (
                    <div className="border-t border-border p-3 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3"
                        >
                          <div className="size-10 flex-shrink-0 overflow-hidden rounded">
                            <ProductImage
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              imageIndex={0}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}

                      <div className="pt-2 text-[10px] text-muted-foreground">
                        Cliente: {order.customerName} — {order.customerEmail}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={clearOrders}
              >
                Limpar Histórico
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
