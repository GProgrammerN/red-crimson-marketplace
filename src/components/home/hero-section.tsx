import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundFangs } from "@/components/ui/background-fangs";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-purple-dark to-dark-base">
      {/* Background fangs decoration */}
      <BackgroundFangs position="both" opacity={0.12} />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--red-crimson)_0%,_transparent_60%)] opacity-20" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-ivory md:text-6xl lg:text-7xl">
          O Vermelho em Sua
          <br />
          <span className="text-red-crimson">Forma Mais Pura</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70 md:text-xl">
          Descubra uma curadoria exclusiva de produtos na mais intensa das cores.
          Dos tons mais sutis aos mais profundos.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/categoria/roupas">Explorar a Coleção</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold/10"
            asChild
          >
            <Link href="/categoria/acessorios">Ver Acessórios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
