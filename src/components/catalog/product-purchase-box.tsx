"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Zap, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { ProductItem, ProductVariantItem } from "@/types";

interface ProductPurchaseBoxProps {
  product: ProductItem;
}

export function ProductPurchaseBox({ product }: ProductPurchaseBoxProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantItem>(
    product.variants[0] || ({} as ProductVariantItem)
  );

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedVariant.id) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productTitle: product.title,
      variantTitle: selectedVariant.title,
      imageUrl: product.imageUrl,
      unitPrice: selectedVariant.price,
      quantity: 1,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant.id) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productTitle: product.title,
      variantTitle: selectedVariant.title,
      imageUrl: product.imageUrl,
      unitPrice: selectedVariant.price,
      quantity: 1,
    });
    router.push("/checkout");
  };

  const currentPrice = selectedVariant.price || product.minPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="hermes-card rounded-2xl p-6 space-y-6 border border-[#064e3b]"
    >
      {/* Price Header with animated price change */}
      <div className="pb-4 border-b border-[#064e3b]">
        <span className="text-xs text-[#86efac]/80 block uppercase font-medium">Selected Tier Price</span>
        <div className="flex items-baseline gap-3 mt-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentPrice}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-extrabold text-white font-mono"
            >
              {formatPrice(currentPrice)}
            </motion.span>
          </AnimatePresence>
          {selectedVariant.originalPrice && (
            <span className="text-sm text-gray-500 line-through font-mono">
              {formatPrice(selectedVariant.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Variant Selector */}
      {product.variants.length > 0 && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#f0fdf4] uppercase tracking-wider block">
            Select Subscription Package / Tier:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              return (
                <motion.button
                  key={v.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? "bg-[#16a34a]/20 border-[#16a34a] shadow-emerald"
                      : "bg-[#04241b] border-[#064e3b] hover:border-[#16a34a]/50 text-gray-300"
                  }`}
                >
                  <div className="font-semibold text-xs text-white line-clamp-1">{v.title}</div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                    <span>{v.screenType || "Standard"}</span>
                    <span className="font-bold text-[#86efac] font-mono">{formatPrice(v.price)}</span>
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="selectedVariantDot"
                      className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#86efac]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="space-y-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyNow}
          className="w-full btn-hermes-primary py-3.5 text-sm flex items-center justify-center gap-2 rounded-xl"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Buy Now with Instant Checkout</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full btn-hermes-secondary py-3 text-sm flex items-center justify-center gap-2 rounded-xl"
        >
          <ShoppingCart className="w-4 h-4 text-[#86efac]" />
          <span>Add to Cart</span>
        </motion.button>
      </div>

      {/* Trust Checklist */}
      <div className="space-y-2 pt-4 border-t border-[#064e3b] text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#86efac] shrink-0" />
          <span>Instant Digital Delivery via Dashboard & WhatsApp</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#86efac] shrink-0" />
          <span>100% Genuine Warranty for the entire duration</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Verified Merchant Payment via bKash, Nagad & SSLCommerz</span>
        </div>
      </div>
    </motion.div>
  );
}
