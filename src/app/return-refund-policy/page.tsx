import { RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Return & Refund Policy | Subscriptions BD Guarantee",
  description: "Official refund guidelines, timeline, and replacement rules for digital purchases on Subscriptions BD.",
};

export default function ReturnRefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Buyer Assurance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Return & Refund <span className="text-[#86efac]">Policy</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-xs sm:text-sm">
            Transparent refund timelines and instant replacement policies for all digital transactions.
          </p>
        </div>

        <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>1. 100% Replacement Priority</span>
            </h2>
            <p>
              Because digital software keys and streaming accounts are non physical goods, our first commitment is providing an immediate replacement or technical resolution if an item encounters an unexpected deactivation. If our technical desk is unable to restore your access within 24 hours, you are eligible for a full or prorated financial refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>2. When Refunds Are Approved</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>An ordered software key is verified as non functional upon initial activation attempt and no replacement is available.</li>
              <li>An account delivery is delayed beyond 24 hours without prior customer notification.</li>
              <li>Accidental duplicate payments made through bKash, Nagad, or card gateways.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Non Refundable Conditions</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Delivered software keys that have already been viewed and activated successfully on the customer machine.</li>
              <li>Purchases made by mistake where the customer decides they no longer want the product after credentials have been issued.</li>
              <li>Account suspensions caused by customer violation of third party provider policies (e.g. sharing single screen profiles with unauthorized third parties).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Refund Settlement Timelines</h2>
            <p className="mb-2">Once approved by our verification desk:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#031711] border border-[#064e3b]">
                <strong className="block text-white mb-1">bKash, Nagad & Rocket MFS:</strong>
                <span className="text-xs text-[#86efac]">Credited back within 24 to 72 hours</span>
              </div>
              <div className="p-4 rounded-xl bg-[#031711] border border-[#064e3b]">
                <strong className="block text-white mb-1">Credit / Debit Cards via SSLCommerz:</strong>
                <span className="text-xs text-[#86efac]">Credited back within 5 to 10 banking days</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
