import Link from "next/link";
import {
  Package,
  Download,
  Key,
  Calendar,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
  const orders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Customer Orders & Active Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Review your purchased license keys, streaming credentials, and official tax invoices.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="hermes-card rounded-2xl p-16 text-center space-y-4">
          <div className="w-16 h-16 bg-[#064e3b]/50 rounded-full flex items-center justify-center mx-auto text-[#86efac]">
            <ShoppingBag className="w-8 h-8 text-[#86efac]" />
          </div>
          <h2 className="text-base font-bold text-white">No Orders Found</h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            You have not placed any orders yet. Browse our digital catalog to find AI tools and subscriptions.
          </p>
          <Link href="/shop" className="btn-hermes-primary inline-flex text-xs px-6 py-2.5">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="hermes-card rounded-2xl p-6 space-y-4 border border-[#064e3b]"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#064e3b]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono text-sm">
                      {order.orderCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        order.status === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>Gateway: {order.paymentGateway}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#86efac] font-mono">
                    {formatPrice(order.totalAmount)}
                  </span>
                  <Link
                    href={`/api/orders/${order.orderCode}/invoice`}
                    target="_blank"
                    className="btn-hermes-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
                    title="Download Invoice"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Invoice</span>
                  </Link>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#04241b] border border-[#064e3b] rounded-xl p-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.productTitle}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {item.variantTitle} × {item.quantity}
                      </p>
                    </div>

                    <div className="bg-[#031711] border border-[#064e3b] rounded-lg px-3 py-2 font-mono text-xs text-emerald-400 flex items-center gap-2 select-all">
                      <Key className="w-3.5 h-3.5 text-[#86efac] shrink-0" />
                      <span className="truncate max-w-xs">
                        {item.deliveredCredentials || "Provisioning in progress"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer with delivery destination */}
              <div className="pt-2 text-[11px] text-gray-400 flex items-center justify-between">
                <span>Target Email: <strong className="text-white">{order.deliveryEmail}</strong></span>
                <Link
                  href={`/order/${order.orderCode}`}
                  className="text-[#86efac] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>View Full Order Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
