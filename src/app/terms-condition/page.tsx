import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Subscriptions BD Legal Agreement",
  description: "Terms and conditions governing the purchase and usage of digital goods on Subscriptions BD.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Terms & <span className="text-[#86efac]">Conditions</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-xs sm:text-sm">
            Please read these terms carefully before placing an order on Subscriptions BD.
          </p>
        </div>

        <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Digital Products Nature</h2>
            <p>
              Subscriptions BD provides non physical digital goods, including software license activation keys, private digital subscriptions, cloud storage expansions, and educational memberships. By placing an order, you acknowledge that delivery is carried out electronically through our website dashboard, email, or verified WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Account Usage Guidelines</h2>
            <p className="mb-2">For shared accounts or managed profile services:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Customers must not alter master passwords, recovery emails, or billing parameters of shared accounts.</li>
              <li>Single screen packages must be logged into on only one active device simultaneously.</li>
              <li>Unauthorized distribution or reselling of credentials will result in instant license termination without refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Warranty & Support Duration</h2>
            <p>
              Every product purchased comes with an active replacement warranty matching the exact duration chosen (for example, 1 month, 6 months, or 12 months). Should an account or key experience vendor level reset, Subscriptions BD guarantees free credential renewal or technical repair within 24 hours of notification.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Applicable Law & Jurisdiction</h2>
            <p>
              These terms are regulated by the laws of Bangladesh. Any dispute arising from purchase transactions will fall under the exclusive jurisdiction of the civil courts of Comilla and Dhaka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
