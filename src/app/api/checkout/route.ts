import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateOrderCode } from "@/lib/utils";
import { initiateSSLCommerzPayment } from "@/lib/sslcommerz";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryEmail,
      customerNote,
      paymentMethod,
      trxId,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Shopping cart is empty" },
        { status: 400 }
      );
    }

    if (!customerName || !customerEmail || !customerPhone || !deliveryEmail) {
      return NextResponse.json(
        { error: "Please fill in all required customer contact details" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.unitPrice * item.quantity,
      0
    );
    const totalAmount = subtotal;
    const orderCode = generateOrderCode();

    // Check inventory for instant license keys
    let deliveredCredentialsSummary: string[] = [];

    // Create Order with Prisma transaction
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderCode,
          customerName,
          customerEmail,
          customerPhone,
          deliveryEmail,
          customerNote: customerNote || null,
          subtotal,
          totalAmount,
          paymentGateway: paymentMethod || "SSLCOMMERZ",
          paymentTrxId: trxId || null,
          status: paymentMethod === "MANUAL_BKASH" || paymentMethod === "MANUAL_NAGAD" ? "PENDING" : "PAID",
          paymentStatus: paymentMethod === "MANUAL_BKASH" || paymentMethod === "MANUAL_NAGAD" ? "UNPAID" : "VALID",
        },
      });

      for (const item of items) {
        // Attempt to allocate pre-existing license key if available
        let assignedKeyData: string | null = null;
        const availableKey = await tx.inventoryItem.findFirst({
          where: {
            variantId: item.variantId,
            isRedeemed: false,
          },
        });

        if (availableKey) {
          assignedKeyData = availableKey.secretData;
          await tx.inventoryItem.update({
            where: { id: availableKey.id },
            data: {
              isRedeemed: true,
              redeemedAt: new Date(),
              orderId: order.id,
            },
          });
          deliveredCredentialsSummary.push(
            `${item.productTitle} (${item.variantTitle}): Key: ${assignedKeyData}`
          );
        }

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            variantId: item.variantId,
            productTitle: item.productTitle,
            variantTitle: item.variantTitle,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
            deliveredCredentials: assignedKeyData || "Credential will be shared via Dashboard/WhatsApp",
          },
        });
      }

      return order;
    });

    // Handle SSLCommerz Gateway Redirection if selected
    if (paymentMethod === "SSLCOMMERZ") {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const sslResponse = await initiateSSLCommerzPayment({
        total_amount: totalAmount,
        currency: "BDT",
        tran_id: orderCode,
        success_url: `${appUrl}/api/payment/sslcommerz/callback?status=success&orderCode=${orderCode}`,
        fail_url: `${appUrl}/api/payment/sslcommerz/callback?status=fail&orderCode=${orderCode}`,
        cancel_url: `${appUrl}/api/payment/sslcommerz/callback?status=cancel&orderCode=${orderCode}`,
        ipn_url: `${appUrl}/api/payment/sslcommerz/ipn`,
        cus_name: customerName,
        cus_email: customerEmail,
        cus_add1: "Dhaka, Bangladesh",
        cus_city: "Dhaka",
        cus_country: "Bangladesh",
        cus_phone: customerPhone,
        shipping_method: "NO",
        product_name: items.map((i: any) => i.productTitle).join(", ").slice(0, 50),
        product_category: "Digital Goods",
        product_profile: "non-physical-goods",
      });

      if (sslResponse.status === "SUCCESS" && sslResponse.GatewayPageURL) {
        return NextResponse.json({
          orderCode,
          gatewayUrl: sslResponse.GatewayPageURL,
        });
      }
    }

    // Default or Manual MFS redirection to order confirmation
    return NextResponse.json({
      orderCode,
      redirectUrl: `/order/${orderCode}`,
    });
  } catch (error: any) {
    console.error("Checkout order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process checkout order" },
      { status: 500 }
    );
  }
}
