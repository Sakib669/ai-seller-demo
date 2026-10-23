import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderCode: string }> }
) {
  const { orderCode } = await params;

  const order = await prisma.order.findUnique({
    where: { orderCode },
    include: {
      items: true,
    },
  });

  if (!order) {
    return new NextResponse("Order not found", { status: 404 });
  }

  const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invoice - ${order.orderCode}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        * { box-sizing: border-box; }
        body {
          font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1a1a1a;
          margin: 0;
          padding: 20px;
          background: #fff;
          font-size: 13px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #16a34a;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        .brand {
          font-family: "Outfit", "Plus Jakarta Sans", sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #16a34a;
          letter-spacing: -0.5px;
        }
        .font-mono, td.mono, th.mono, .cred-box {
          font-family: "JetBrains Mono", monospace;
        }
        }
        .brand-sub {
          font-size: 11px;
          color: #666;
          margin-top: 3px;
        }
        .invoice-title {
          text-align: right;
        }
        .invoice-title h1 {
          margin: 0;
          font-size: 20px;
          color: #111;
        }
        .invoice-title p {
          margin: 3px 0 0;
          color: #666;
          font-size: 11px;
        }
        .info-grid {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        .info-col {
          width: 48%;
        }
        .info-col h3 {
          font-size: 12px;
          text-transform: uppercase;
          color: #555;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
          margin-bottom: 8px;
        }
        .info-col p {
          margin: 3px 0;
          line-height: 1.4;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
        }
        th {
          background: #f0fdf4;
          text-align: left;
          padding: 8px 10px;
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid #16a34a;
          color: #064e3b;
        }
        td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        .text-right { text-align: right; }
        .total-box {
          margin-left: auto;
          width: 280px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
        }
        .grand-total {
          font-size: 15px;
          font-weight: bold;
          color: #16a34a;
          border-top: 2px solid #16a34a;
          padding-top: 6px;
          margin-top: 6px;
        }
        .license-note {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 12px;
          margin-top: 25px;
          font-size: 11px;
          color: #475569;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 10px;
          color: #888;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 15px; text-align: right;">
        <button onclick="window.print()" style="background: #16a34a; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer;">
          Print / Save as PDF
        </button>
      </div>

      <div class="header">
        <div>
          <div class="brand">Subscriptions BD</div>
          <div class="brand-sub">Holding: Tomsombridge, Adarsha Sadar, Comilla-3500</div>
          <div class="brand-sub">Trade Licence: 2201010800020367 | DBID: 453105002</div>
          <div class="brand-sub">WhatsApp: +880 1622-633671 | Email: info@subscriptionsbd.com</div>
        </div>
        <div class="invoice-title">
          <h1>INVOICE</h1>
          <p><strong>Order Ref:</strong> ${order.orderCode}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" })}</p>
          <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-col">
          <h3>Billed To (Customer):</h3>
          <p><strong>Name:</strong> ${order.customerName}</p>
          <p><strong>Phone:</strong> ${order.customerPhone}</p>
          <p><strong>Email:</strong> ${order.customerEmail}</p>
          <p><strong>Target Delivery:</strong> ${order.deliveryEmail}</p>
        </div>
        <div class="info-col">
          <h3>Payment Information:</h3>
          <p><strong>Gateway:</strong> ${order.paymentGateway}</p>
          <p><strong>Transaction Ref:</strong> ${order.paymentTrxId || "Direct"}</p>
          <p><strong>Status:</strong> ${order.status}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Package / Tier</th>
            <th class="text-right">Qty</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Line Total</th>
          </tr>
        </thead>
        <tbody>
          ${(order.items || [])
            .map(
              (item: any) => `
            <tr>
              <td><strong>${item.productTitle}</strong></td>
              <td>${item.variantTitle}</td>
              <td class="text-right">${item.quantity}</td>
              <td class="text-right">${formatPrice(item.unitPrice)}</td>
              <td class="text-right">${formatPrice(item.totalPrice)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="total-box">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>${formatPrice(order.subtotal)}</span>
        </div>
        <div class="total-row">
          <span>Discount:</span>
          <span>${formatPrice(order.discount)}</span>
        </div>
        <div class="total-row grand-total">
          <span>Total Paid:</span>
          <span>${formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div class="license-note">
        <strong>Digital Service Delivery Terms:</strong>
        <p style="margin: 4px 0 0;">
          All software license keys and credentials delivered remain under active replacement guarantee for the duration of the subscription package purchased. For any activation assistance, reach our verified WhatsApp support directly.
        </p>
      </div>

      <div class="footer">
        <p>Thank you for choosing Subscriptions BD - The Largest Digital Product Marketplace in Bangladesh.</p>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(invoiceHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
