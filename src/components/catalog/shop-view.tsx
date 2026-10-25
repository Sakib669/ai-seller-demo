"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/catalog/product-card";
import { LayoutSwitcher } from "@/components/catalog/layout-switcher";
import { ProductItem, CategoryItem } from "@/types";
import { Search } from "lucide-react";

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
            className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              selectedCategory === "all"
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {selectedCategory === "all" && (
              <motion.div
                layoutId="activeCategoryPill"
                className="absolute inset-0 bg-[#16a34a] rounded-full shadow-emerald"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">All Items ({initialProducts.length})</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isSelected
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#16a34a] rounded-full shadow-emerald"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* View Controls: Sort & Grid Layout */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#04241b] border border-[#064e3b] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#16a34a] transition-colors"
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

      {/* Grid of Products with Layout Animation */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hermes-card rounded-2xl p-16 text-center space-y-3"
        >
          <div className="w-16 h-16 bg-[#064e3b]/50 rounded-full flex items-center justify-center mx-auto text-[#86efac]">
            <Search className="w-8 h-8 text-[#86efac]" />
          </div>
          <h3 className="text-base font-bold text-white">No products matched your search</h3>
          <p className="text-xs text-gray-400">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
            }}
            className="btn-hermes-secondary text-xs px-4 py-2 mt-2"
          >
            Reset Filters
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={getGridClasses()}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
