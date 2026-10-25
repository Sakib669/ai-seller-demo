"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { ProductItem } from "@/types";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariant) return;

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      productTitle: product.title,
      variantTitle: defaultVariant.title,
      imageUrl: product.imageUrl,
      unitPrice: defaultVariant.price,
      quantity: 1,
    });
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="hermes-card rounded-2xl p-5 flex flex-col justify-between group h-full relative border border-[#064e3b] hover:border-[#16a34a] hover:shadow-emerald transition-colors"
    >
      {/* Top Header: Category & Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-[#86efac] uppercase tracking-wider">
            {product.categoryName || "Digital Subscription"}
          </span>
          {product.badge && (
            <motion.span
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-[#16a34a]/20 border border-[#16a34a] text-[#86efac] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-sm"
            >
              {product.badge}
            </motion.span>
          )}
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="block group-hover:text-[#86efac] transition-colors"
        >
          <h3 className="text-base font-bold text-white line-clamp-1 mb-1.5 tracking-tight">
            {product.title}
          </h3>
        </Link>

        {/* Short Description */}
        {product.shortDesc && (
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
            {product.shortDesc}
          </p>
        )}
      </div>

      {/* Pricing & Actions */}
      <div className="pt-4 border-t border-[#064e3b] flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[10px] text-[#86efac]/70 block uppercase font-medium">Starting from</span>
          <div className="text-sm md:text-base font-bold text-white font-mono">
            {product.minPrice === product.maxPrice
              ? formatPrice(product.minPrice)
              : `${formatPrice(product.minPrice)} - ${formatPrice(product.maxPrice)}`}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickAdd}
            className="p-2.5 rounded-xl bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] hover:bg-[#16a34a] hover:text-white transition-all shadow-emerald active:scale-95"
            title="Quick Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/product/${product.slug}`}
              className="btn-hermes-secondary text-xs px-3.5 py-2 font-semibold block rounded-xl"
            >
              Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
