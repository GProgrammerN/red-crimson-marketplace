"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/use-cart";
import { CartSheet } from "@/components/cart/cart-sheet";
import { OrderHistorySheet } from "@/components/orders/order-history-sheet";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const totalItems = useCart((state) => state.totalItems);
  const [badgeAnimating, setBadgeAnimating] = useState(false);
  const prevTotalRef = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setBadgeAnimating(true);
      const timeout = setTimeout(() => setBadgeAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Logo size={32} />
          <span className="font-heading text-xl font-bold tracking-tight text-red-crimson">
            Red Crimson
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Início
          </Link>
          <Link
            href="/categoria/roupas"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Roupas
          </Link>
          <Link
            href="/categoria/acessorios"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Acessórios
          </Link>
          <Link
            href="/categoria/casa"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Casa
          </Link>
          <Link
            href="/categoria/beleza"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Beleza
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <OrderHistorySheet />
          <CartSheet badgeAnimating={badgeAnimating} />
        </div>
      </div>
    </header>
  );
}
