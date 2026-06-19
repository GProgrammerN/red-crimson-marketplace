"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/product-image";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter out empty strings, fallback to 3 placeholders
  const validImages = images.filter((img) => img && img.length > 0);
  const displayImages =
    validImages.length > 0 ? validImages : ["", "", ""];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-lg">
        <div className="relative h-full w-full">
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                idx === selectedIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <ProductImage
                src={img}
                alt={`${alt} - Imagem ${idx + 1}`}
                width={600}
                height={600}
                priority={idx === 0}
                imageIndex={idx}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "size-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200",
                idx === selectedIndex
                  ? "border-red-crimson opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <ProductImage
                src={img}
                alt={`${alt} - miniatura ${idx + 1}`}
                width={64}
                height={64}
                imageIndex={idx}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
