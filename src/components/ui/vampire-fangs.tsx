import { cn } from "@/lib/utils";

type VampireFangsProps = {
  className?: string;
  size?: number;
  opacity?: number;
};

/**
 * Componente SVG de lineart de presas de vampiro.
 * Usado como elemento decorativo em backgrounds.
 */
export function VampireFangs({
  className,
  size = 120,
  opacity = 0.08,
}: VampireFangsProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-red-rose", className)}
      style={{ opacity }}
      role="img"
      aria-hidden="true"
    >
      {/* Presa esquerda */}
      <path
        d="M30 10C25 10 20 20 18 35C16 50 18 65 22 75C26 85 30 95 32 105C33 110 34 115 35 118"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Detalhe presa esquerda */}
      <path
        d="M22 40C24 35 26 30 28 28"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Presa direita */}
      <path
        d="M170 10C175 10 182 20 184 35C186 50 184 65 180 75C176 85 172 95 170 105C169 110 168 115 167 118"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Detalhe presa direita */}
      <path
        d="M180 40C178 35 176 30 174 28"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Curva decorativa conectando as presas */}
      <path
        d="M45 20C60 15 80 10 100 10C120 10 140 15 155 20"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* Gotas decorativas */}
      <circle cx="28" cy="85" r="2" className="fill-current" opacity="0.4" />
      <circle cx="174" cy="85" r="2" className="fill-current" opacity="0.4" />
    </svg>
  );
}
