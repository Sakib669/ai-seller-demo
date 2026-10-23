import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Clock, User, Calendar, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return { title: "Blog Not Found | Subscriptions BD" };
  }

  return {
    title: `${post.title} | Subscriptions BD Blog`,
    description: post.summary,
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // Fetch 3 related subscriptions
  const relatedProducts = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { variants: true },
  });

  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#86efac] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold mb-4">
            {post.category}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 pb-6 border-b border-[#064e3b]">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#86efac]" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        {post.imageUrl && (
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-10 border border-[#064e3b]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Content Body */}
        <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 sm:p-10 mb-12 shadow-2xl">
          <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed space-y-4">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-2xl font-bold text-white mt-6 mb-3">
                    {paragraph.replace("# ", "")}
                  </h1>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-xl font-bold text-[#86efac] mt-6 mb-3">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-2 text-gray-300">
                    {paragraph.split("\n").map((line, i) => (
                      <li key={i}>{line.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Social Share / Help Box */}
          <div className="mt-10 pt-6 border-t border-[#064e3b] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#86efac]">
              <ShieldCheck className="w-4 h-4 text-[#86efac]" />
              <span>Verified Subscriptions BD Technical Editorial Guide</span>
            </div>
            <a
              href={`https://wa.me/8801622633671?text=Hi%20SubscriptionsBD,%20I%20read%20your%20article:%20${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-emerald"
            >
              <span>Ask Technical Questions on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Related Subscriptions Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#86efac]" />
              <span>Featured Subscriptions in This Category</span>
            </h3>
            <Link href="/shop" className="text-xs font-semibold text-[#86efac] hover:underline">
              View All 94 Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#04241b] border border-[#064e3b] rounded-xl p-4 flex flex-col justify-between hover:border-[#16a34a] transition-colors"
              >
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                    {product.shortDesc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#064e3b]/80">
                  <span className="text-sm font-extrabold text-[#86efac]">
                    ৳ {product.minPrice.toFixed(2)}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold transition-colors shadow-emerald"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
