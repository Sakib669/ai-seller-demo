import Link from "next/link";
import { prisma } from "@/lib/db";
import { Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";

export const metadata = {
  title: "Official Tech Blog & Guides | Subscriptions BD",
  description: "Comprehensive guides, pricing comparisons, and tutorials on AI models, streaming, and software licenses in Bangladesh.",
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const whereClause: any = {};
  if (category) {
    whereClause.category = category;
  }

  const posts = await prisma.blogPost.findMany({
    where: whereClause,
    orderBy: { publishedAt: "desc" },
  });

  const categories = [
    "All",
    "Artificial Intelligence",
    "Video Editing",
    "Software & OS",
    "Streaming & OTT",
  ];

  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Knowledge Hub</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Subscriptions BD <span className="text-[#86efac]">Editorial Blog</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-sm md:text-base leading-relaxed">
            In depth reviews, pricing breakdowns, activation tutorials, and digital productivity guides for creators, developers, and students in Bangladesh.
          </p>
        </FadeIn>

        {/* Category Pills */}
        <FadeIn delay={0.1} className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = (!category && cat === "All") || category === cat;
            const href = cat === "All" ? "/blogs" : `/blogs?category=${encodeURIComponent(cat)}`;
            return (
              <ScaleOnHover key={cat} scaleHover={1.05} scaleTap={0.95}>
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all inline-block ${
                    isSelected
                      ? "bg-[#16a34a] text-white shadow-emerald"
                      : "bg-[#04241b] border border-[#064e3b] text-gray-300 hover:text-white hover:border-[#16a34a]"
                  }`}
                >
                  {cat}
                </Link>
              </ScaleOnHover>
            );
          })}
        </FadeIn>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <FadeIn className="text-center py-16 bg-[#04241b] rounded-2xl border border-[#064e3b] p-8">
            <p className="text-gray-400 mb-4">No articles found in this category.</p>
            <Link
              href="/blogs"
              className="inline-block px-5 py-2.5 rounded-xl bg-[#16a34a] text-white text-sm font-semibold hover:bg-[#15803d] transition-colors shadow-emerald"
            >
              View All Articles
            </Link>
          </FadeIn>
        ) : (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts || []).map((post) => (
              <StaggerItem key={post.id}>
                <ScaleOnHover scaleHover={1.02} className="h-full">
                  <article className="group flex flex-col bg-[#04241b] border border-[#064e3b] hover:border-[#16a34a] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-emerald h-full">
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                      <img
                        src={post.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#064e3b]/90 backdrop-blur-sm text-[11px] font-semibold text-[#86efac]">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#86efac]" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            {post.author}
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-white group-hover:text-[#86efac] transition-colors line-clamp-2 mb-2 tracking-tight">
                          <Link href={`/blogs/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#064e3b] flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">
                          {new Date(post.publishedAt).toLocaleDateString("en-BD", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#86efac] hover:underline"
                        >
                          <span>Read Full Guide</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}
