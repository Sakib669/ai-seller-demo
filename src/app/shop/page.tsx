import { prisma } from "@/lib/db";
import { ShopView } from "@/components/catalog/shop-view";
import { ProductItem, CategoryItem } from "@/types";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  const searchQuery = params.q;

  const [categoriesRaw, productsRaw] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.product.findMany({
      include: {
        category: true,
        variants: {
          where: { isAvailable: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const categories: CategoryItem[] = categoriesRaw.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon || undefined,
    description: c.description || undefined,
  }));

  const products: ProductItem[] = productsRaw.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDesc: p.shortDesc || undefined,
    description: p.description || undefined,
    categoryId: p.categoryId,
    categoryName: p.category.name,
    badge: p.badge || undefined,
    isFeatured: p.isFeatured,
    inStock: p.inStock,
    imageUrl: p.imageUrl || undefined,
    minPrice: p.minPrice,
    maxPrice: p.maxPrice,
    variants: p.variants.map((v) => ({
      id: v.id,
      productId: v.productId,
      title: v.title,
      duration: v.duration || undefined,
      screenType: v.screenType || undefined,
      price: v.price,
      originalPrice: v.originalPrice || undefined,
      stockCount: v.stockCount,
      isAvailable: v.isAvailable,
    })),
  }));

  // Resolve category id from slug if provided
  let initialCategoryId: string | undefined = undefined;
  if (categorySlug) {
    const matched = categories.find((c) => c.slug === categorySlug);
    if (matched) initialCategoryId = matched.id;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          All Digital Products & Subscriptions
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Instant delivery, genuine warranties, and verified local payments across Bangladesh.
        </p>
      </div>

      <ShopView
        initialProducts={products}
        categories={categories}
        initialCategory={initialCategoryId}
        initialQuery={searchQuery}
      />
    </div>
  );
}
