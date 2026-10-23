import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const tranId = formData.get("tran_id") as string;
    const status = formData.get("status") as string;
    const valId = formData.get("val_id") as string;

    const url = new URL(req.url);
    const orderCode = tranId || url.searchParams.get("orderCode");

    if (orderCode && (status === "VALID" || status === "VALIDATED" || status === "SUCCESS")) {
      await prisma.order.update({
        where: { orderCode },
        data: {
          status: "PAID",
          paymentStatus: "VALID",
          paymentTrxId: valId || tranId,
        },
      });
    }

    const appUrl = process.env.APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/order/${orderCode}`, 303);
  } catch (error) {
    console.error("SSLCommerz callback processing error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderCode = url.searchParams.get("orderCode");
  const appUrl = process.env.APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return NextResponse.redirect(`${appUrl}/order/${orderCode || ""}`);
}
