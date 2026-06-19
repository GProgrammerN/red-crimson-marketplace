import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { prisma } from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug, isArchived: false },
      include: { category: true },
    });
    return product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="animate-fade-in-up container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Gallery */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              {product.category && (
                <p className="mb-2 text-sm text-muted-foreground">
                  {product.category.name}
                </p>
              )}
              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold text-red-crimson">
                R$ {Number(product.price).toFixed(2)}
              </span>
              {product.comparePrice &&
                Number(product.comparePrice) > Number(product.price) && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {Number(product.comparePrice).toFixed(2)}
                  </span>
                )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{product.description}</p>
            </div>

            {/* Stock info */}
            <p className="text-sm text-muted-foreground">
              {product.stock > 0
                ? `${product.stock} unidade(s) disponível(is)`
                : "Fora de estoque"}
            </p>

            {/* Add to cart */}
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              image={product.images[0] || ""}
              slug={product.slug}
              disabled={product.stock <= 0}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
