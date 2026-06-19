import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  /** Used to generate different gradients for same product name */
  imageIndex?: number;
};

const GRADIENTS = [
  "from-red-crimson via-red-deep to-purple-dark",
  "from-red-bright via-red-rose to-purple-mid",
  "from-red-deep via-purple-dark to-dark-base",
  "from-red-rose via-purple-mid to-purple-soft",
  "from-red-crimson via-red-bright to-pink-soft",
  "from-purple-soft via-red-rose to-gold",
  "from-red-deep via-dark-base to-purple-dark",
  "from-red-crimson via-purple-mid to-purple-soft",
  "from-red-bright via-red-crimson to-red-deep",
  "from-purple-dark via-purple-mid to-red-rose",
  "from-gold via-red-crimson to-red-deep",
  "from-red-rose via-pink-soft to-ivory",
  "from-red-crimson via-purple-soft to-purple-dark",
  "from-red-deep via-red-crimson to-red-bright",
  "from-purple-mid via-red-rose to-red-crimson",
  "from-dark-base via-purple-dark to-red-crimson",
];

const ICONS = [
  "◆", "♥", "✦", "⬥", "♠", "●", "★", "♦", "▲", "■", "⬟", "♣",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getGradient(name: string, index = 0): string {
  const seed = name + "::gradient:" + index;
  const hash = hashString(seed);
  return GRADIENTS[hash % GRADIENTS.length];
}

function getIcon(name: string, index = 0): string {
  const seed = name + "::icon:" + index;
  const hash = hashString(seed);
  return ICONS[hash % ICONS.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProductImage({
  src,
  alt,
  width = 300,
  height = 300,
  className,
  priority,
  imageIndex = 0,
}: ProductImageProps) {
  // If src exists and is a valid URL (http or data:)
  if (src && (src.startsWith("http") || src.startsWith("data:"))) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("h-full w-full object-cover", className)}
        priority={priority}
      />
    );
  }

  // Generate deterministic gradient placeholder (different per imageIndex)
  const gradient = getGradient(alt, imageIndex);
  const icon = getIcon(alt, imageIndex);
  const initials = getInitials(alt);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <span className="select-none text-[min(4em,30%)] font-heading font-bold text-ivory/90 leading-none">
        {icon}
      </span>
      <span className="mt-1 select-none text-[min(0.7em,8%)] font-heading font-semibold text-ivory/60 text-center leading-tight px-2">
        {initials}
      </span>
    </div>
  );
}
