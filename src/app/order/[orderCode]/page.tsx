import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Download,
  Key,
  ShieldCheck,
  Copy,
  Printer,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface OrderPageProps {
  params: Promise<{
    orderCode: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderCode } = await params;

  const order = await prisma.order.findUnique({
    where: { orderCode },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  const isPaid = order.status === "PAID" || order.paymentStatus === "VALID";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      {/* Header Banner */}
      <div className="hermes-card rounded-2xl p-8 text-center space-y-4 border border-[#16a34a]/40 bg-gradient-to-b from-[#04241b] to-[#031711]">
        <div className="w-16 h-16 rounded-full bg-[#16a34a]/20 border border-[#16a34a] flex items-center justify-center mx-auto text-[#86efac] shadow-emerald">
          {isPaid ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          ) : (
            <Clock className="w-8 h-8 text-amber-400" />
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#86efac] font-bold">
            Order Confirmation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {isPaid ? "Thank You! Order Completed" : "Order Received & Pending"}
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Order Reference Code: <span className="text-white font-bold">{order.orderCode}</span>
          </p>
        </div>

        {/* Invoice Actions */}
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href={`/api/orders/${order.orderCode}/invoice`}
            target="_blank"
            className="btn-hermes-secondary text-xs px-4 py-2 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Invoice</span>
          </Link>
          <Link
            href="/shop"
            className="btn-hermes-primary text-xs px-4 py-2 flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Delivered Digital Credentials Box */}
      <div className="hermes-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#064e3b]">
          <Key className="w-5 h-5 text-[#86efac]" />
          <h2 className="text-base font-bold text-white">
            Delivered Digital Credentials & Keys
          </h2>
        </div>

        <div className="space-y-4">
          {(order.items || []).map((item) => (
            <div
              key={item.id}
              className="bg-[#04241b] border border-[#064e3b] rounded-xl p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white">{item.productTitle}</h3>
                  <span className="text-xs text-[#86efac] font-medium">{item.variantTitle}</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  {formatPrice(item.totalPrice)}
                </span>
              </div>

              {/* Secret Key Display */}
              <div className="mt-2 bg-[#031711] border border-[#064e3b] rounded-lg p-3 flex items-center justify-between font-mono text-xs text-emerald-400 select-all">
                <span>{item.deliveredCredentials || "Pending delivery via dashboard / WhatsApp"}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Assigned
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Customer Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="hermes-card rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-[#064e3b]">
            Customer & Delivery Details
          </h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white font-medium">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Contact Email:</span>
              <span className="text-white font-medium">{order.customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Target Delivery Email:</span>
              <span className="text-[#86efac] font-medium">{order.deliveryEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">WhatsApp / Phone:</span>
              <span className="text-white font-medium">{order.customerPhone}</span>
            </div>
          </div>
        </div>

        <div className="hermes-card rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-white text-sm pb-2 border-b border-[#064e3b]">
            Payment & Settlement
          </h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Channel:</span>
              <span className="text-white font-medium uppercase">{order.paymentGateway}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction Status:</span>
              <span className="text-emerald-400 font-bold">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction Reference:</span>
              <span className="text-white font-mono">{order.paymentTrxId || "N/A"}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#064e3b] font-bold text-sm">
              <span className="text-white">Total Amount:</span>
              <span className="text-[#86efac] font-mono">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
