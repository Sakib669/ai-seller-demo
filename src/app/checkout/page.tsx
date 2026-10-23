"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("SSLCOMMERZ");
  const [trxId, setTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subtotal = getSubtotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add products first.");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone || !deliveryEmail) {
      setErrorMessage("Please fill in all mandatory customer details.");
      return;
    }

    if (
      (paymentMethod === "MANUAL_BKASH" || paymentMethod === "MANUAL_NAGAD") &&
      !trxId.trim()
    ) {
      setErrorMessage("Please provide your bKash/Nagad Transaction ID (TrxID).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone: customerPhone.startsWith("+880")
            ? customerPhone
            : `+880${customerPhone.replace(/^0+/, "")}`,
          deliveryEmail,
          customerNote,
          paymentMethod,
          trxId,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process order.");
      }

      // Clear local cart
      clearCart();

      if (data.gatewayUrl) {
        window.location.href = data.gatewayUrl;
      } else if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push(`/order/${data.orderCode}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-lg text-center space-y-4">
        <div className="w-16 h-16 bg-[#064e3b]/40 rounded-full flex items-center justify-center mx-auto text-[#86efac]">
          <ShoppingBag className="w-8 h-8 text-[#86efac]" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your Cart is Empty</h1>
        <p className="text-sm text-gray-400">
          Add any software keys or digital subscriptions to your cart before proceeding to checkout.
        </p>
        <Link href="/shop" className="btn-hermes-primary inline-flex text-xs px-6 py-2.5">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-[#86efac] hover:text-white mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Complete your digital purchase with instant verification and guaranteed delivery.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl text-sm mb-6">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Contact Information */}
          <div className="hermes-card rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-xs">1</span>
              <span>Customer Information</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Contact Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    WhatsApp / Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex">
                    <span className="bg-[#064e3b] border border-[#064e3b] border-r-0 rounded-l-lg px-3 py-2.5 text-[#86efac] font-mono text-xs">
                      +880
                    </span>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="1712345678"
                      className="w-full bg-[#04241b] border border-[#064e3b] rounded-r-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Delivery Target Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={deliveryEmail}
                  onChange={(e) => setDeliveryEmail(e.target.value)}
                  placeholder="Email address where credentials or family invites should be sent"
                  className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                />
                <p className="text-[11px] text-[#86efac]/70 mt-1">
                  For ChatGPT / YouTube invitations, provide your active personal Google / OpenAI email.
                </p>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Order Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Any specific profile instructions or preferred contact time"
                  className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="hermes-card rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-xs">2</span>
              <span>Select Payment Method</span>
            </h2>

            <div className="space-y-3 text-xs">
              {/* SSLCommerz Option */}
              <label
                className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "SSLCOMMERZ"
                    ? "bg-[#16a34a]/15 border-[#16a34a] shadow-emerald"
                    : "bg-[#04241b] border-[#064e3b] hover:border-[#16a34a]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="SSLCOMMERZ"
                      checked={paymentMethod === "SSLCOMMERZ"}
                      onChange={() => setPaymentMethod("SSLCOMMERZ")}
                      className="text-[#16a34a]"
                    />
                    <div>
                      <span className="font-bold text-white text-sm block">
                        SSLCommerz Automated Gateway
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Instant automated payment with bKash, Nagad, Rocket, Cards & Net Banking
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#16a34a] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      FASTEST
                    </span>
                  </div>
                </div>
              </label>

              {/* Direct bKash Push */}
              <label
                className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "MANUAL_BKASH"
                    ? "bg-[#16a34a]/15 border-[#16a34a] shadow-emerald"
                    : "bg-[#04241b] border-[#064e3b] hover:border-[#16a34a]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="MANUAL_BKASH"
                    checked={paymentMethod === "MANUAL_BKASH"}
                    onChange={() => setPaymentMethod("MANUAL_BKASH")}
                    className="text-[#16a34a]"
                  />
                  <div>
                    <span className="font-bold text-white text-sm block">
                      Direct bKash Send Money / Payment
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Send to Merchant Number: 01622633671 (Personal / Agent)
                    </span>
                  </div>
                </div>

                {paymentMethod === "MANUAL_BKASH" && (
                  <div className="mt-3 pt-3 border-t border-[#064e3b] space-y-2">
                    <label className="block text-gray-300 font-semibold">
                      bKash Transaction ID (TrxID) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. BL9A4K89PQ"
                      className="w-full bg-[#031711] border border-[#064e3b] rounded-lg p-2 text-white font-mono uppercase focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                )}
              </label>

              {/* Direct Nagad Push */}
              <label
                className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "MANUAL_NAGAD"
                    ? "bg-[#16a34a]/15 border-[#16a34a] shadow-emerald"
                    : "bg-[#04241b] border-[#064e3b] hover:border-[#16a34a]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="MANUAL_NAGAD"
                    checked={paymentMethod === "MANUAL_NAGAD"}
                    onChange={() => setPaymentMethod("MANUAL_NAGAD")}
                    className="text-[#16a34a]"
                  />
                  <div>
                    <span className="font-bold text-white text-sm block">
                      Direct Nagad Payment
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Send to Nagad Number: 01622633671
                    </span>
                  </div>
                </div>

                {paymentMethod === "MANUAL_NAGAD" && (
                  <div className="mt-3 pt-3 border-t border-[#064e3b] space-y-2">
                    <label className="block text-gray-300 font-semibold">
                      Nagad Transaction ID (TrxID) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. 78AGK923"
                      className="w-full bg-[#031711] border border-[#064e3b] rounded-lg p-2 text-white font-mono uppercase focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="hermes-card rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-[#064e3b]">
              Order Summary ({items.length} items)
            </h3>

            {/* Item List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start text-xs gap-3">
                  <div>
                    <span className="font-semibold text-white block">
                      {item.productTitle}
                    </span>
                    <span className="text-[#86efac]/80 text-[11px]">
                      {item.variantTitle} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-mono text-white font-bold shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#064e3b] space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="font-mono text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Gateway Fee</span>
                <span className="text-emerald-400">Free (0 ৳)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#064e3b]">
                <span>Total Payable</span>
                <span className="text-lg text-[#86efac] font-mono">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hermes-primary py-3.5 text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order & Pay {formatPrice(subtotal)}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-[#04241b] border border-[#064e3b] rounded-xl flex items-center gap-3 text-xs text-gray-300">
            <ShieldCheck className="w-8 h-8 text-[#86efac] shrink-0" />
            <div>
              <span className="text-white font-bold block">100% Buyer Protection</span>
              <span>Instant credential delivery and replacement warranty on all items.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
