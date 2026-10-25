"use client";

import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel with spring physics */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#031711] border-l border-[#064e3b] flex flex-col shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 border-b border-[#064e3b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#86efac]" />
                  <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
                  <motion.span
                    key={items.length}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xs bg-[#064e3b] text-[#86efac] px-2 py-0.5 rounded-full font-medium"
                  >
                    {items.length} items
                  </motion.span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCart}
                  className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#064e3b] transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-16 space-y-3"
                  >
                    <div className="w-16 h-16 bg-[#064e3b]/40 rounded-full flex items-center justify-center mx-auto text-[#86efac]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Your shopping cart is empty</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={closeCart}
                      className="btn-hermes-secondary text-xs px-4 py-2"
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="bg-[#04241b] border border-[#064e3b] hover:border-[#16a34a]/60 rounded-xl p-3.5 flex gap-3 relative group transition-colors shadow-sm"
                      >
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">
                            {item.productTitle}
                          </h3>
                          <p className="text-xs text-[#86efac] font-medium mt-0.5">
                            {item.variantTitle}
                          </p>
                          <p className="text-xs text-gray-400 font-mono mt-1">
                            {formatPrice(item.unitPrice)}
                          </p>

                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex items-center border border-[#064e3b] rounded-lg bg-[#031711] overflow-hidden">
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#064e3b] transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </motion.button>
                              <span className="px-2.5 text-xs font-semibold text-white font-mono">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#064e3b] transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() => removeItem(item.cartId)}
                              className="text-gray-500 hover:text-rose-400 p-1.5 transition-colors rounded-lg hover:bg-rose-500/10"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right flex flex-col justify-between">
                          <span className="text-sm font-bold text-white font-mono">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer with Checkout CTA */}
              {items.length > 0 && (
                <div className="p-4 border-t border-[#064e3b] bg-[#02110c] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-medium">Subtotal Amount</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      className="text-lg font-bold text-white font-mono text-[#86efac]"
                    >
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Taxes and gateway verification included at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full btn-hermes-primary flex items-center justify-center gap-2 text-sm py-3 font-semibold group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
