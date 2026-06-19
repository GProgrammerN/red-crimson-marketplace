import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold", className)}
      role="img"
      aria-label="Red Crimson Marketplace"
    >
      <defs>
        <radialGradient id="wine-glow" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wine-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B22222" />
          <stop offset="50%" stopColor="#6B0000" />
          <stop offset="100%" stopColor="#3D1B40" />
        </linearGradient>
      </defs>

      {/* Glow */}
      <ellipse cx="60" cy="40" rx="45" ry="40" fill="url(#wine-glow)" />

      {/* Corpo da taça */}
      <path
        d="M60 12 C45 12 32 26 32 42 C32 55 38 63 48 67 L46 86 C45 93 40 100 33 103 C27 106 24 111 24 117 C24 122 28 125 33 125 H87 C92 125 96 122 96 117 C96 111 93 106 87 103 C80 100 75 93 74 86 L72 67 C82 63 88 55 88 42 C88 26 75 12 60 12Z"
        fill="url(#wine-fill)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Líquido */}
      <path d="M36 46 C38 52 42 56 48 58 L46 65 C42 60 38 54 36 46Z" fill="#E63946" opacity="0.6" />
      <path d="M84 46 C82 52 78 56 72 58 L74 65 C78 60 82 54 84 46Z" fill="#E63946" opacity="0.6" />

      {/* Bolhas */}
      <circle cx="55" cy="48" r="2.5" fill="#FF8FAB" opacity="0.5" />
      <circle cx="65" cy="52" r="1.5" fill="#FF8FAB" opacity="0.4" />
      <circle cx="58" cy="43" r="1" fill="#FF8FAB" opacity="0.6" />

      {/* Haste */}
      <rect x="58" y="86" width="4" height="26" rx="2" fill="currentColor" />

      {/* Base */}
      <ellipse cx="60" cy="114" rx="5" ry="2" fill="currentColor" />
      <ellipse cx="60" cy="128" rx="30" ry="5" fill="currentColor" />
      <path d="M30 128 C30 128 60 120 90 128" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Brilho */}
      <path d="M44 24 C44 18 50 14 56 14" stroke="#F5E6D3" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M46 28 C46 24 50 20 54 20" stroke="#F5E6D3" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" />
    </svg>
  );
}

export function LogoIcon({ className, size = 16 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold", className)}
      role="img"
      aria-label="Red Crimson Marketplace"
    >
      <path
        d="M12 2 C8 2 5 5.5 5 9 C5 12 7.5 14 9.5 14.5 L9 18 C8.5 19.5 7 20.5 6 21.5 C5 22.5 5 24 7 24 H17 C19 24 19 22.5 18 21.5 C17 20.5 15.5 19.5 15 18 L14.5 14.5 C16.5 14 19 12 19 9 C19 5.5 16 2 12 2Z"
        fill="#B22222"
      />
      <rect x="11" y="18" width="2" height="5" rx="1" fill="currentColor" />
      <ellipse cx="12" cy="25" rx="6" ry="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="0.5" fill="#FF8FAB" opacity="0.6" />
      <circle cx="13" cy="11.5" r="0.3" fill="#FF8FAB" opacity="0.4" />
    </svg>
  );
}
