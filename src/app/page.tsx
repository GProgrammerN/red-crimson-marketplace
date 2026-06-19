import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ProductGrid } from "@/components/product/product-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type FeaturedProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  images: string[];
  badge: string;
};

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
};

async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true, isArchived: false },
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    console.log(`[DB] Produtos encontrados: ${products.length}`);

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      comparePrice: product.comparePrice
        ? Number(product.comparePrice)
        : null,
      images: product.images,
      badge: "Vermelho Intenso",
    }));
  } catch (error) {
    console.error("[DB] Erro ao buscar produtos:", error);
    return [];
  }
}

async function getCategories(): Promise<CategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return categories;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-16">
          <ProductGrid
            products={featuredProducts}
            title="Coleção em Destaque"
          />
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="container mx-auto px-4 pb-16">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Categorias
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {categories.map((category: CategoryItem) => (
                <a
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-purple-dark to-dark-base transition-all hover:border-red-crimson/30"
                >
                  <span className="font-heading text-lg font-semibold text-ivory transition-colors group-hover:text-red-crimson">
                    {category.name}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Empty state when no DB connection */}
        {featuredProducts.length === 0 && (
          <section className="container mx-auto px-4 pb-16 text-center">
            <div className="rounded-lg border border-border bg-card p-12">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Bem-vindo ao Red Crimson Marketplace
              </h2>
              <p className="mt-4 text-muted-foreground">
                Conecte o banco de dados e adicione produtos para começar a
                exibir sua coleção.
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
