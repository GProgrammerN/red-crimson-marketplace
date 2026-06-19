import { VampireFangs } from "@/components/ui/vampire-fangs";
import { cn } from "@/lib/utils";

type BackgroundFangsProps = {
  className?: string;
  position?: "bottom-left" | "bottom-right" | "both";
  opacity?: number;
};

/**
 * Componente decorativo que posiciona as presas de vampiro
 * nos cantos inferiores do container pai.
 * O container pai deve ter position: relative.
 */
export function BackgroundFangs({
  className,
  position = "both",
  opacity = 0.08,
}: BackgroundFangsProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {position === "bottom-left" || position === "both" ? (
        <div className="absolute bottom-0 left-0">
          <VampireFangs size={160} opacity={opacity} />
        </div>
      ) : null}

      {position === "bottom-right" || position === "both" ? (
        <div className="absolute bottom-0 right-0 scale-x-[-1]">
          <VampireFangs size={160} opacity={opacity} />
        </div>
      ) : null}
    </div>
  );
}
