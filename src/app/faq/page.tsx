import Link from "next/link";
import { HelpCircle, ChevronRight, MessageSquare, CreditCard, ShieldAlert, Zap } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Subscriptions BD",
  description: "Find instant answers regarding ordering, payments, delivery speed, and warranty policies.",
};

export default function FAQPage() {
  const faqSections = [
    {
      title: "Ordering & Payment",
      icon: CreditCard,
      items: [
        {
          q: "Which payment channels do you support?",
          a: "We accept all leading Bangladeshi payment channels including automated SSLCommerz (bKash, Nagad, Rocket, Upay, Visa, MasterCard, and Internet Banking) as well as direct bKash and Nagad mobile money transfers.",
        },
        {
          q: "How do I make a direct bKash payment?",
          a: "Select the direct bKash payment option during checkout, send the exact order amount to our official merchant or agent number (01622633671), and enter your bKash Transaction ID (TrxID) in the checkout field.",
        },
        {
          q: "Are there any hidden payment gateway charges?",
          a: "Zero hidden charges. The total price you see in your cart is the exact amount deducted from your mobile wallet or bank account.",
        },
      ],
    },
    {
      title: "Delivery & Activation",
      icon: Zap,
      items: [
        {
          q: "How fast do I receive my digital purchase?",
          a: "Software license keys (Windows, Office, IDM) stored in automated stock are delivered immediately upon payment confirmation. Account upgrades (ChatGPT, Canva, YouTube invites) are typically completed within 10 to 30 minutes during support hours (10:30 AM to 12:30 AM).",
        },
        {
          q: "Where do I see my delivered license keys or credentials?",
          a: "You can view your active subscriptions, login credentials, and activation keys on your instant Order Confirmation screen as well as in your Customer Portal at /customer/orders.",
        },
        {
          q: "How do YouTube Premium and Canva Pro family invitations work?",
          a: "We send an official invitation link directly to the target email address you provide at checkout. You simply open your email and accept the invite. You never need to share your personal email password.",
        },
      ],
    },
    {
      title: "Warranty & Account Safety",
      icon: ShieldAlert,
      items: [
        {
          q: "Is my personal data and account safe?",
          a: "Yes. All checkout transmissions are encrypted using 256 bit SSL encryption. We never store debit or credit card credentials on our servers. For family invitations, your private watch and search histories remain isolated and invisible to other members.",
        },
        {
          q: "What is your replacement warranty policy?",
          a: "Every product sold is covered under our full duration warranty. In the rare event of a service interruption, contact our WhatsApp support team with your Order Code for an instant fix or replacement credentials.",
        },
        {
          q: "What if a software license key does not activate?",
          a: "Our software keys are 100% genuine OEM or retail licenses verified against vendor servers. If an installation issue occurs, our technical agents assist you remotely or issue a fresh replacement key within 24 hours.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked <span className="text-[#86efac]">Questions</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-sm sm:text-base leading-relaxed">
            Everything you need to know about purchasing digital subscriptions, instant key delivery, and replacement guarantees in Bangladesh.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-10 mb-16">
          {faqSections.map((section, sIdx) => {
            const Icon = section.icon;
            return (
              <div key={sIdx} className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#064e3b]">
                  <div className="w-8 h-8 rounded-lg bg-[#16a34a]/20 border border-[#16a34a]/40 flex items-center justify-center text-[#86efac]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="space-y-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-100 flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-[#86efac] mt-0.5 shrink-0" />
                        <span>{item.q}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-6">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-[#04241b] via-[#062e23] to-[#04241b] border border-[#16a34a]/40 rounded-2xl p-8 text-center shadow-emerald">
          <MessageSquare className="w-10 h-10 text-[#86efac] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Still need help or custom payment assistance?</h3>
          <p className="text-xs text-[#d1fae5]/80 max-w-md mx-auto mb-6">
            Our customer support specialists are ready to help you on WhatsApp every day from 10:30 AM to 12:30 AM Bangladesh time.
          </p>
          <a
            href="https://wa.me/8801622633671"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold transition-all shadow-emerald"
          >
            <span>Chat on WhatsApp: +880 1622 633671</span>
          </a>
        </div>
      </div>
    </div>
  );
}
