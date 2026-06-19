"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  disabled?: boolean;
};

export function AddToCartButton({
  id,
  name,
  price,
  image,
  slug,
  disabled,
}: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const [animating, setAnimating] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleAdd = () => {
    setAnimating(true);
    addItem({ id, name, price, image, slug });

    toast.success(`${name} adicionado à sua coleção.`, {
      description: "O item foi adicionado ao carrinho.",
      duration: 3000,
    });

    // Show check icon briefly
    setShowCheck(true);
    setTimeout(() => {
      setAnimating(false);
      setTimeout(() => setShowCheck(false), 200);
    }, 400);
  };

  return (
    <Button
      size="lg"
      className={cn(
        "w-full gap-2 transition-all duration-200",
        animating && "animate-cart-bounce"
      )}
      disabled={disabled}
      onClick={handleAdd}
    >
      {showCheck ? (
        <Check className="size-5" />
      ) : (
        <ShoppingBag className="size-5" />
      )}
      {disabled
        ? "Fora de Estoque"
        : showCheck
          ? "Adicionado!"
          : "Adicionar à Coleção"}
    </Button>
  );
}
