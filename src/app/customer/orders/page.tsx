import { prisma } from "@/lib/db";
import { CustomerOrdersView } from "@/components/customer/customer-orders-view";

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

      <CustomerOrdersView initialOrders={orders as any[]} />
    </div>
  );
}
