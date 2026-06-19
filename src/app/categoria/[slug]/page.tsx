import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/product/product-grid";
import { prisma } from "@/lib/prisma";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getCategory(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isArchived: false },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return category;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Categoria não encontrada" };
  }

  return {
    title: category.name,
    description:
      category.description || `Produtos na categoria ${category.name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = category.products.map(
    (product: {
      id: string;
      name: string;
      slug: string;
      price: { toString: () => string };
      comparePrice: { toString: () => string } | null;
      images: string[];
    }) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      comparePrice: product.comparePrice
        ? Number(product.comparePrice)
        : null,
      images: product.images,
    })
  );

  return (
    <>
      <Header />
      <main className="animate-fade-in-up container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-2 text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>

        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
