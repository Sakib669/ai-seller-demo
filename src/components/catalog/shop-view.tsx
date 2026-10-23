"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { LayoutSwitcher } from "@/components/catalog/layout-switcher";
import { ProductItem, CategoryItem } from "@/types";
import { Filter, Search } from "lucide-react";

interface ShopViewProps {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
  initialCategory?: string;
  initialQuery?: string;
}

export function ShopView({
  initialProducts,
  categories,
  initialCategory,
  initialQuery,
}: ShopViewProps) {
  const [cols, setCols] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [searchTerm, setSearchTerm] = useState(initialQuery || "");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">(
    "newest"
  );

  useEffect(() => {
    const savedCols = localStorage.getItem("hermes-shop-grid-cols");
    if (savedCols) {
      setCols(Number(savedCols));
    }
  }, []);

  const handleColChange = (newCols: number) => {
    setCols(newCols);
    localStorage.setItem("hermes-shop-grid-cols", String(newCols));
  };

  // Filter products
  const filteredProducts = initialProducts
    .filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.categoryId === selectedCategory;
      const matchSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.shortDesc &&
          p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.minPrice - b.minPrice;
      if (sortBy === "price-desc") return b.minPrice - a.minPrice;
      return 0;
    });

  const getGridClasses = () => {
    switch (cols) {
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 gap-6";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
      case 4:
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Pills & Controls Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#064e3b]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-[#16a34a] text-white shadow-emerald"
                : "bg-[#04241b] border border-[#064e3b] text-gray-300 hover:text-white hover:border-[#16a34a]"
            }`}
          >
            All Items ({initialProducts.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#16a34a] text-white shadow-emerald"
                  : "bg-[#04241b] border border-[#064e3b] text-gray-300 hover:text-white hover:border-[#16a34a]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* View Controls: Sort & Grid Layout */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#04241b] border border-[#064e3b] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#16a34a]"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Column Layout Switcher */}
          <LayoutSwitcher currentCols={cols} onChange={handleColChange} />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#86efac]/80">
        <span>Showing {filteredProducts.length} digital products</span>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="hermes-card rounded-2xl p-16 text-center space-y-3">
          <div className="w-16 h-16 bg-[#064e3b]/50 rounded-full flex items-center justify-center mx-auto text-[#86efac]">
            <Search className="w-8 h-8 text-[#86efac]" />
          </div>
          <h3 className="text-base font-bold text-white">No products matched your search</h3>
          <p className="text-xs text-gray-400">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
            }}
            className="btn-hermes-secondary text-xs px-4 py-2 mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className={getGridClasses()}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
