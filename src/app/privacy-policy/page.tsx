import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Subscriptions BD Official Disclosures",
  description: "Official privacy practices, data handling, and encryption policies of Subscriptions BD.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Security</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Privacy <span className="text-[#86efac]">Policy</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-xs sm:text-sm">
            Last updated: October 2026. Compliant with Bangladesh ICT Act and international data privacy norms.
          </p>
        </div>

        <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#86efac]" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When purchasing digital subscriptions on Subscriptions BD, we collect customer full names, contact email addresses, mobile phone numbers for WhatsApp delivery, and target invitation email addresses necessary to activate software or streaming family memberships.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#16a34a]" />
              <span>2. Payment Data & Security</span>
            </h2>
            <p>
              We do not store your credit card, debit card, or mobile banking PIN numbers on our web infrastructure. All digital payment transactions are securely handled through licensed payment gateways including SSLCommerz, bKash Merchant Gateway, and Nagad using bank grade 256 bit TLS encryption.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>3. How We Use Collected Data</span>
            </h2>
            <p className="mb-2">Your information is used strictly to:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Process digital orders and deliver software activation keys.</li>
              <li>Send transaction confirmation receipts and official tax invoices.</li>
              <li>Provide ongoing customer support and fulfillment replacement assistance.</li>
              <li>Verify transactions to prevent fraudulent MFS activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Third Party Disclosures</h2>
            <p>
              Subscriptions BD never sells, rents, or commercializes personal customer records to third party marketing networks. Information is only shared with authorized payment settlement providers (SSLCommerz, bKash) solely to fulfill payment clearing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Contact Legal Desk</h2>
            <p>
              For privacy inquiries or to request data record deletion, write to our data protection officer at <strong className="text-white">info@subscriptionsbd.com</strong> or reach our physical corporate office at 942/12/E, S Alam Jam Jam Tower, Tomsombridge, Comilla 3500.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
