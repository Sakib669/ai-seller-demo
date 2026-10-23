"use client";

import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#031711] border-l border-[#064e3b] flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-4 border-b border-[#064e3b] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#86efac]" />
              <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
              <span className="text-xs bg-[#064e3b] text-[#86efac] px-2 py-0.5 rounded-full font-medium">
                {items.length} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#064e3b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-[#064e3b]/40 rounded-full flex items-center justify-center mx-auto text-[#86efac]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-400 font-medium">Your shopping cart is empty</p>
                <button
                  onClick={closeCart}
                  className="btn-hermes-secondary text-xs px-4 py-2"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-[#04241b] border border-[#064e3b] rounded-lg p-3 flex gap-3 relative group"
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
                      <div className="flex items-center border border-[#064e3b] rounded bg-[#031711]">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-right flex flex-col justify-between">
                    <span className="text-sm font-bold text-white font-mono">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#064e3b] bg-[#02110c] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Subtotal Amount</span>
                <span className="text-lg font-bold text-white font-mono">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Taxes and gateway verification included at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full btn-hermes-primary flex items-center justify-center gap-2 text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
