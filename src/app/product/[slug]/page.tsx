import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, Shield, RefreshCw, Check } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductPurchaseBox } from "@/components/catalog/product-purchase-box";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductItem } from "@/types";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const productRaw = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: {
        where: { isAvailable: true },
        orderBy: { price: "asc" },
      },
    },
  });

  if (!productRaw) {
    notFound();
  }

  const product: ProductItem = {
    id: productRaw.id,
    title: productRaw.title,
    slug: productRaw.slug,
    shortDesc: productRaw.shortDesc || undefined,
    description: productRaw.description || undefined,
    categoryId: productRaw.categoryId,
    categoryName: productRaw.category.name,
    badge: productRaw.badge || undefined,
    isFeatured: productRaw.isFeatured,
    inStock: productRaw.inStock,
    imageUrl: productRaw.imageUrl || undefined,
    minPrice: productRaw.minPrice,
    maxPrice: productRaw.maxPrice,
    variants: productRaw.variants.map((v) => ({
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
  };

  // Fetch related products in same category
  const relatedRaw = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    include: {
      category: true,
      variants: true,
    },
  });

  const relatedProducts: ProductItem[] = relatedRaw.map((p) => ({
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

  let parsedFaqs: Array<{ q: string; a: string }> = [];
  if (productRaw.faqs) {
    try {
      parsedFaqs = JSON.parse(productRaw.faqs);
    } catch {
      parsedFaqs = [];
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Back Link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Products</span>
      </Link>

      {/* Main Grid: Details Left, Purchase Box Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Information */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#86efac] uppercase tracking-wider">
                {product.categoryName}
              </span>
              {product.badge && (
                <span className="bg-[#16a34a]/20 border border-[#16a34a] text-[#86efac] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {product.badge}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.title}
            </h1>
          </div>

          {/* Credential Requirement Alert if Applicable */}
          {productRaw.requiresCredentials && (
            <div className="bg-[#04241b] border border-[#16a34a]/40 rounded-xl p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#86efac] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                <strong className="text-white block mb-0.5">Direct Account Activation:</strong>
                This digital product is activated directly on your personal account ({productRaw.credentialFields || "Target Account Email"}). You will provide these delivery coordinates securely during checkout.
              </div>
            </div>
          )}

          {/* Description Box */}
          <div className="hermes-card rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#86efac]" />
              <span>Product Overview & Features</span>
            </h2>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description || product.shortDesc}
            </div>

            <div className="pt-4 border-t border-[#064e3b] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Dedicated Profile / Own Email Upgrade</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Fast Customer Care Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Official bKash / SSLCommerz Receipt</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Full Duration Guarantee Replacement</span>
              </div>
            </div>
          </div>

          {/* Product Specific FAQs if Seeded */}
          {parsedFaqs.length > 0 && (
            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#86efac]">
                Product Questions & Activation Details
              </h3>
              <div className="space-y-3">
                {parsedFaqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#031711] border border-[#064e3b]/60">
                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1.5">
                      {faq.q}
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Purchase Box */}
        <div className="lg:col-span-5 sticky top-24">
          <ProductPurchaseBox product={product} />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#064e3b] space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Related Products in {product.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
