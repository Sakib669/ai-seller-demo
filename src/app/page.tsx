import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Film,
  Sparkles,
  KeyRound,
  GraduationCap,
  Wrench,
  Shield,
  Headphones,
  CreditCard,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductItem } from "@/types";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 8,
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDesc: p.shortDesc || undefined,
    description: p.description || undefined,
    categoryId: p.categoryId,
    categoryName: p.category?.name || "General",
    badge: p.badge || undefined,
    isFeatured: p.isFeatured,
    inStock: p.inStock,
    imageUrl: p.imageUrl || undefined,
    minPrice: p.minPrice,
    maxPrice: p.maxPrice,
    variants: (p.variants || []).map((v) => ({
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
  })) as ProductItem[];
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-[#064e3b]/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(22,163,74,0.35),rgba(3,23,17,0))]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Trustpilot Ribbon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#04241b] border border-[#064e3b] text-xs text-gray-300 shadow-sm">
              <span className="flex text-amber-400">
                {"★".repeat(5)}
              </span>
              <span className="font-semibold text-white">4.9 / 5.0</span>
              <span className="text-[#86efac]/80">on Trustpilot (240+ Verified Reviews)</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              The Largest Shop for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86efac] via-[#4ade80] to-[#16a34a]">
                Digital Products
              </span>{" "}
              in Bangladesh
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#d1fae5]/90 max-w-2xl mx-auto leading-relaxed">
              Unlock access to ChatGPT Plus, YouTube Premium, Windows Keys, and educational OTT tools. 100% verified merchant payment via bKash, Nagad, Rocket, and SSLCommerz.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/shop" className="btn-hermes-primary flex items-center gap-2 text-sm px-6 py-3">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop?category=ai-grammer-and-writing-products"
                className="btn-hermes-secondary text-sm px-6 py-3"
              >
                Browse AI Tools
              </Link>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#064e3b]">
              <div className="p-3 bg-[#04241b]/80 rounded-lg border border-[#064e3b]">
                <div className="text-xl font-extrabold text-white font-mono">100%</div>
                <div className="text-xs text-[#86efac]/80 mt-0.5">Secure Payment</div>
              </div>
              <div className="p-3 bg-[#04241b]/80 rounded-lg border border-[#064e3b]">
                <div className="text-xl font-extrabold text-[#86efac] font-mono">94+</div>
                <div className="text-xs text-[#86efac]/80 mt-0.5">Active Products</div>
              </div>
              <div className="p-3 bg-[#04241b]/80 rounded-lg border border-[#064e3b]">
                <div className="text-xl font-extrabold text-white font-mono">2019</div>
                <div className="text-xs text-[#86efac]/80 mt-0.5">Serving Customers</div>
              </div>
              <div className="p-3 bg-[#04241b]/80 rounded-lg border border-[#064e3b]">
                <div className="text-xl font-extrabold text-[#16a34a] font-mono">24/7</div>
                <div className="text-xs text-[#86efac]/80 mt-0.5">Support & Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#86efac] tracking-wider uppercase">Categories</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">Browse by Category</h2>
          </div>
          <Link href="/shop" className="text-xs text-[#86efac] hover:underline flex items-center gap-1 font-semibold">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Link
            href="/shop?category=ai-grammer-and-writing-products"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              AI & Writing
            </h3>
          </Link>

          <Link
            href="/shop?category=video-streaming"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              Streaming
            </h3>
          </Link>

          <Link
            href="/shop?category=key"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              Software Keys
            </h3>
          </Link>

          <Link
            href="/shop?category=educational-tools"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              Edu-Tech
            </h3>
          </Link>

          <Link
            href="/shop?category=utilities"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              Utilities
            </h3>
          </Link>

          <Link
            href="/shop?category=vpn"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              VPN & Privacy
            </h3>
          </Link>

          <Link
            href="/shop?category=audio-streaming"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              Audio
            </h3>
          </Link>

          <Link
            href="/shop?category=apple-products"
            className="hermes-card rounded-xl p-3 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-[#86efac] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-[#86efac] transition-colors">
              Apple Cards
            </h3>
          </Link>
        </div>
      </section>

      {/* 3. Featured & Best Selling Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#16a34a] tracking-wider uppercase">Top Picks</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">Best Selling Subscriptions</h2>
          </div>
          <Link href="/shop" className="btn-hermes-secondary text-xs px-4 py-2">
            See All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Verified Payment & Trust Banner */}
      <section className="container mx-auto px-4">
        <div className="hermes-card rounded-2xl p-8 border border-[#064e3b] bg-gradient-to-r from-[#04241b] via-[#062e23] to-[#04241b]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 text-xs text-[#86efac] font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#86efac]" />
                Merchant Verified
              </span>
              <h3 className="text-xl font-bold text-white">Instant & Secure Payment</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Pay securely through bKash, Nagad, Rocket, or SSLCommerz card gateways with automated receipt verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="bg-[#064e3b] border border-[#064e3b] px-4 py-2 rounded-lg text-sm font-bold text-[#f0fdf4]">
                bKash
              </div>
              <div className="bg-[#064e3b] border border-[#064e3b] px-4 py-2 rounded-lg text-sm font-bold text-[#f0fdf4]">
                Nagad
              </div>
              <div className="bg-[#064e3b] border border-[#064e3b] px-4 py-2 rounded-lg text-sm font-bold text-[#f0fdf4]">
                Rocket
              </div>
              <div className="bg-[#16a34a] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-emerald">
                SSLCommerz
              </div>
            </div>

            <div className="text-right flex flex-col md:items-end justify-center">
              <Link href="/shop" className="btn-hermes-primary text-xs px-5 py-2.5">
                Start Shopping Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-[#86efac] tracking-wider uppercase">Answers</span>
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          <details className="hermes-card rounded-xl p-5 group cursor-pointer" open>
            <summary className="font-semibold text-white text-sm flex items-center justify-between list-none">
              <span>Does Subscriptions BD offer official AI tools and ChatGPT Plus?</span>
              <span className="text-[#86efac] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs text-gray-300 mt-3 leading-relaxed border-t border-[#064e3b] pt-3">
              Yes, Subscriptions BD offers genuine AI tool subscriptions, including ChatGPT Plus, Google Gemini Advanced, and Grok AI. You can get upgrades directly on your personal mail or dedicated private accounts.
            </p>
          </details>

          <details className="hermes-card rounded-xl p-5 group cursor-pointer">
            <summary className="font-semibold text-white text-sm flex items-center justify-between list-none">
              <span>How does delivery work after completing payment?</span>
              <span className="text-[#86efac] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs text-gray-300 mt-3 leading-relaxed border-t border-[#064e3b] pt-3">
              Software product keys (like Windows 11 and Windows 10 Pro) are delivered instantly on your order page. For email invitations and private screen setups, credentials are provided within minutes via your customer dashboard and WhatsApp.
            </p>
          </details>

          <details className="hermes-card rounded-xl p-5 group cursor-pointer">
            <summary className="font-semibold text-white text-sm flex items-center justify-between list-none">
              <span>What payment methods are supported?</span>
              <span className="text-[#86efac] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs text-gray-300 mt-3 leading-relaxed border-t border-[#064e3b] pt-3">
              We support all popular Bangladeshi payment channels including bKash, Nagad, Rocket, alongside Visa, MasterCard, and local Internet Banking via SSLCommerz.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
