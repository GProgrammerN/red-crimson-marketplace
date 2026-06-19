"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import { useCart } from "@/store/use-cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  badge?: string;
};

export function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  images,
  badge,
}: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const [animating, setAnimating] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const discount = comparePrice
    ? Math.round((1 - price / comparePrice) * 100)
    : 0;

  // Filter out empty strings, fallback to 3 placeholders
  const validImages = images.filter((img) => img && img.length > 0);
  const displayImages = validImages.length > 0 ? validImages : ["", "", ""];
  const displayImageCount = displayImages.length;
  const hasMultipleImages = displayImageCount > 1;

  // Slideshow on hover
  const startSlideshow = useCallback(() => {
    if (!hasMultipleImages) return;
    intervalRef.current = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % displayImageCount);
    }, 1500);
  }, [hasMultipleImages, displayImageCount]);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIdx(0);
  }, []);

  useEffect(() => {
    return () => stopSlideshow();
  }, [stopSlideshow]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    addItem({
      id,
      name,
      price,
      image: images[0] || "",
      slug,
    });
    toast.success(`${name} adicionado à sua coleção.`, {
      duration: 2000,
    });
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-red-crimson/40 hover:shadow-lg hover:shadow-red-crimson/10 active:scale-[0.98] focus-within:ring-2 focus-within:ring-red-crimson/20"
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute left-2 top-2 z-10">
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
              badge === "Vermelho Intenso" && "bg-red-bright text-ivory",
              badge === "Edição Rubi" && "bg-gold text-dark-base",
              badge === "Novo Sangue" && "bg-pink-soft text-dark-base",
              badge === "Coleção Carmim" && "bg-purple-soft text-ivory"
            )}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute right-2 top-2 z-10">
          <span className="inline-block rounded-full bg-red-deep px-2 py-1 text-[10px] font-bold text-ivory">
            -{discount}%
          </span>
        </div>
      )}

      {/* Image */}
      <Link href={`/produto/${slug}`} className="aspect-square overflow-hidden">
        <div className="relative h-full w-full">
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                idx === currentImageIdx ? "opacity-100" : "opacity-0"
              )}
            >
              <ProductImage
                src={img}
                alt={name}
                width={300}
                height={300}
                className="transition-transform duration-300 group-hover:scale-105"
                imageIndex={idx}
              />
            </div>
          ))}

          {/* Dots indicator */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {Array.from({ length: displayImageCount }).map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "size-1.5 rounded-full transition-all duration-300",
                    idx === currentImageIdx
                      ? "w-3 bg-ivory"
                      : "bg-ivory/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/produto/${slug}`}>
          <h3 className="font-heading text-sm font-semibold text-foreground transition-colors hover:text-red-crimson">
            {name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-bold text-red-crimson">
              R$ {price.toFixed(2)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8 text-muted-foreground transition-all duration-200 hover:text-red-crimson",
              animating && "animate-cart-bounce text-red-crimson"
            )}
            onClick={handleAddToCart}
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
