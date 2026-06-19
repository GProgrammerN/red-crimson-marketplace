import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Logo size={28} />
              <span className="font-heading text-lg font-bold text-red-crimson">
                Red Crimson
              </span>
            </Link>
            <p className="text-sm italic text-muted-foreground">
              &ldquo;Para aqueles que veem o mundo em vermelho.&rdquo;
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Categorias
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categoria/roupas"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Roupas
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/acessorios"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Acessórios
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/casa"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Casa
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/beleza"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Beleza
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Suporte
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Red Crimson Marketplace. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
