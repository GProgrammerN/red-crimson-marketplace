import { ProductCard } from "@/components/product/product-card";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  badge?: string;
};

type ProductGridProps = {
  products: Product[];
  title?: string;
};

export function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          Nenhum produto encontrado nesta coleção.
        </p>
      </div>
    );
  }

  return (
    <section>
      {title && (
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h2>
      )}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            comparePrice={product.comparePrice}
            images={product.images}
            badge={product.badge}
          />
        ))}
      </div>
    </section>
  );
}
