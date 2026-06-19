import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:51214/template1",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Populando o Red Crimson Marketplace...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ─── Categories ──────────────────────────────────────────────

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Roupas",
        slug: "roupas",
        description: "Vestimentas na mais intensa das cores",
      },
    }),
    prisma.category.create({
      data: {
        name: "Acessórios",
        slug: "acessorios",
        description: "Detalhes rubros para completar seu visual",
      },
    }),
    prisma.category.create({
      data: {
        name: "Casa",
        slug: "casa",
        description: "Decoração escarlate para seu lar",
      },
    }),
    prisma.category.create({
      data: {
        name: "Beleza",
        slug: "beleza",
        description: "Cosméticos em tons vermelhos e rosados",
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categorias criadas`);

  // ─── Products ────────────────────────────────────────────────

  const productsData = [
    // ── Roupas ──
    {
      name: "Vestido Rubi Noturno",
      slug: "vestido-rubi-noturno",
      description:
        "Vestido longo em veludo vermelho-sangue com decote em V. Perfeito para ocasiões especiais onde a sofisticação encontra a ousadia. Corte acetinado que abraça o corpo com elegância.",
      price: 349.9,
      comparePrice: 499.9,
      images: [],
      categorySlug: "roupas",
      stock: 15,
      isFeatured: true,
    },
    {
      name: "Blazer Carmim Estruturado",
      slug: "blazer-carmim-estruturado",
      description:
        "Blazer estruturado em tom carmim profundo. Alfaiataria impecável com forro interno em cetim. Ideal para compor looks formais com personalidade.",
      price: 589.9,
      comparePrice: 749.9,
      images: [],
      categorySlug: "roupas",
      stock: 8,
      isFeatured: true,
    },
    {
      name: "Camisa Vermelha Seda Natural",
      slug: "camisa-vermelha-seda",
      description:
        "Camisa em seda natural vermelha com botões em madrepérola. Caimento leve e sofisticado, ideal para looks que transitam do escritório ao jantar.",
      price: 259.9,
      images: [""],
      categorySlug: "roupas",
      stock: 20,
    },
    {
      name: "Calça Vinho Tapered",
      slug: "calca-vinho-tapered",
      description:
        "Calça em alfaiataria no tom vinho, modelo tapered com barra ajustada. Cintura alta e tecido com elastano para conforto durante todo o dia.",
      price: 299.9,
      images: [""],
      categorySlug: "roupas",
      stock: 12,
    },
    // ── Acessórios ──
    {
      name: "Bolsa Vermelha Couro Legítimo",
      slug: "bolsa-vermelha-couro",
      description:
        "Bolsa em couro legítimo vermelho com ferragens douradas. Alça ajustável e compartimento interno forrado. A peça que rouba a cena em qualquer produção.",
      price: 429.9,
      comparePrice: 589.9,
      images: [""],
      categorySlug: "acessorios",
      stock: 10,
      isFeatured: true,
    },
    {
      name: "Scarf Pashmina Vermelha",
      slug: "scarf-pashmina-vermelha",
      description:
        "Pashmina em lã pura vermelha com bordas em franjas. Toque macio e aconchegante, ideal para os dias mais frios com muito estilo.",
      price: 149.9,
      images: [""],
      categorySlug: "acessorios",
      stock: 25,
    },
    {
      name: "Relógio Rubi Mostrador Vermelho",
      slug: "relogio-rubi-vermelho",
      description:
        "Relógio analógico com mostrador vermelho rubi, pulseira em aço inoxidável e vidro mineral. Resistente à água e com movimento automático.",
      price: 679.9,
      comparePrice: 899.9,
      images: [""],
      categorySlug: "acessorios",
      stock: 5,
      isFeatured: true,
    },
    {
      name: "Óculos Red Sunset Aviador",
      slug: "oculos-red-sunset",
      description:
        "Óculos estilo aviador com armação dourada e lentes vermelho-rosadas. Proteção UV400 e design atemporal que nunca sai de moda.",
      price: 189.9,
      images: [""],
      categorySlug: "acessorios",
      stock: 18,
    },
    // ── Casa ──
    {
      name: "Velas Aromáticas Sangue de Dragão",
      slug: "velas-sangue-dragao",
      description:
        "Conjunto com 3 velas artesanais vermelhas em cera de soja. Aroma amadeirado com notas de canela e cravo. Queima de 40 horas cada.",
      price: 89.9,
      images: [""],
      categorySlug: "casa",
      stock: 30,
    },
    {
      name: "Jogo de Taças Rubi Cristal",
      slug: "jogo-tacas-rubi",
      description:
        "Conjunto com 6 taças de cristal vermelho rubi para vinho tinto. Haste longa e cálice fino. Laváveis em máquina. Elegância à mesa.",
      price: 199.9,
      comparePrice: 299.9,
      images: [""],
      categorySlug: "casa",
      stock: 15,
      isFeatured: true,
    },
    {
      name: "Almofada Veludo Vermelho",
      slug: "almofada-veludo-vermelho",
      description:
        "Almofada em veludo vermelho-sangue com enchimento de fibra siliconada. Capa removível e lavável. Dimensões 50x50cm.",
      price: 69.9,
      images: [""],
      categorySlug: "casa",
      stock: 22,
    },
    {
      name: "Aromatizador Ambiente Rosa Vermelha",
      slug: "aromatizador-rosa-vermelha",
      description:
        "Difusor de varetas com fragrância de rosas vermelhas silvestres. Frasco em vidro âmbar com 100ml. Perfume suave e duradouro.",
      price: 59.9,
      images: [""],
      categorySlug: "casa",
      stock: 40,
    },
    // ── Beleza ──
    {
      name: "Batom Matte Red Velvet",
      slug: "batom-red-velvet",
      description:
        "Batom matte de alta pigmentação no tom Red Velvet. Fórmula hidratante com vitamina E. Longa duração de até 12 horas.",
      price: 49.9,
      images: [""],
      categorySlug: "beleza",
      stock: 50,
    },
    {
      name: "Esmalte Coleção Carmim (6 un)",
      slug: "esmalte-colecao-carmim",
      description:
        "Kit com 6 esmaltes em tons de vermelho: do cereja ao vinho. Fórmula hipoalergênica e secagem rápida. Cobertura intensa com uma camada.",
      price: 79.9,
      comparePrice: 119.9,
      images: [""],
      categorySlug: "beleza",
      stock: 35,
      isFeatured: true,
    },
    {
      name: "Perfume Rouge Intense",
      slug: "perfume-rouge-intense",
      description:
        "Eau de parfum com notas de saída de framboesa vermelha e pimenta rosa. Coração de rosa búlgara e jasmim. Fundo de âmbar e baunilha. 75ml.",
      price: 299.9,
      comparePrice: 399.9,
      images: [""],
      categorySlug: "beleza",
      stock: 10,
      isFeatured: true,
    },
    {
      name: "Pincéis Maquiagem Rubi (Kit 12)",
      slug: "pinceis-rubi-12",
      description:
        "Kit profissional com 12 pincéis de maquiagem cerdas sintéticas. Cabos vermelhos com detalhes dourados. Estojo incluso.",
      price: 129.9,
      images: [""],
      categorySlug: "beleza",
      stock: 20,
    },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    categoryMap[cat.slug] = cat.id;
  }

  for (const product of productsData) {
    const categoryId = categoryMap[product.categorySlug];
    if (!categoryId) {
      console.warn(`Categoria não encontrada para ${product.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice ?? null,
        images: product.images,
        categoryId,
        stock: product.stock,
        isFeatured: product.isFeatured ?? false,
      },
    });

    console.log(`  ✅ ${product.name}`);
  }

  console.log(`✅ ${productsData.length} produtos criados`);
  console.log("🎉 Red Crimson Marketplace populado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
