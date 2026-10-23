/**
 * SSLCommerz Gateway Integration for Bangladesh Payment Ecosystem
 * Supports bKash, Nagad, Rocket, Visa, Mastercard, and Local Banks
 */

export interface SSLCommerzInitPayload {
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_city: string;
  cus_country: string;
  cus_phone: string;
  shipping_method: string;
  product_name: string;
  product_category: string;
  product_profile: string;
}

export async function initiateSSLCommerzPayment(
  payload: SSLCommerzInitPayload
): Promise<{ status: string; GatewayPageURL?: string; message?: string }> {
  const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
  const storeId = process.env.SSLCOMMERZ_STORE_ID || "testbox";
  const storePass = process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty";

  const endpoint = isLive
    ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
    : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

  const formBody = new URLSearchParams();
  formBody.append("store_id", storeId);
  formBody.append("store_passwd", storePass);

  Object.entries(payload).forEach(([key, val]) => {
    formBody.append(key, String(val));
  });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      status: "FAILED",
      message: err.message || "Failed to connect to SSLCommerz gateway",
    };
  }
}

export async function validateSSLCommerzPayment(
  valId: string
): Promise<{ status: string; data?: any }> {
  const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
  const storeId = process.env.SSLCOMMERZ_STORE_ID || "testbox";
  const storePass = process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty";

  const endpoint = isLive
    ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${storeId}&store_passwd=${storePass}&format=json`
    : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${storeId}&store_passwd=${storePass}&format=json`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return { status: data.status, data };
  } catch (err: any) {
    return { status: "FAILED", data: err.message };
  }
}
