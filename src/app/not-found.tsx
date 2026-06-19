import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundFangs } from "@/components/ui/background-fangs";
import { VampireFangs } from "@/components/ui/vampire-fangs";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-purple-dark to-dark-base">
        <BackgroundFangs position="both" opacity={0.15} />

        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--red-crimson)_0%,_transparent_60%)] opacity-10" />

        <div className="relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="scale-150 opacity-40">
              <VampireFangs size={120} opacity={1} />
            </div>
          </div>

          <h1 className="font-heading text-8xl font-bold text-red-crimson md:text-9xl">
            404
          </h1>
          <p className="mt-4 text-xl text-ivory/80 md:text-2xl">
            Este brilho se perdeu na escuridão.
          </p>
          <p className="mt-2 text-sm text-ivory/50">
            A página que você procura não existe ou foi levada pelas sombras.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-red-crimson px-8 py-3 text-sm font-medium text-ivory transition-colors hover:bg-red-crimson/80"
          >
            Retornar à Luz
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
