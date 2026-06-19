"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Erro na aplicação:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-base px-4">
      <div className="max-w-md rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <span className="font-heading text-2xl text-destructive">!</span>
        </div>

        <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">
          Algo deu errado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro inesperado. Nossas sombras já foram investigar.
        </p>

        <Button
          onClick={reset}
          className="mt-6 w-full"
        >
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
}
