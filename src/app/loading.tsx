import { Header } from "@/components/layout/header";
import { ProductGridSkeleton } from "@/components/ui/product-card-skeleton";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-5 w-96 animate-pulse rounded bg-muted" />
        </div>
        <ProductGridSkeleton count={8} />
      </main>
    </>
  );
}
