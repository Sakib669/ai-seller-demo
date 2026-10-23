import Link from "next/link";
import { ShieldCheck, Award, Globe2, Building2, CheckCircle2, Headphones } from "lucide-react";

export const metadata = {
  title: "About Us | Subscriptions BD Legal Registry & History",
  description: "Learn about Subscriptions BD, Bangladesh largest verified digital products and subscriptions marketplace operating since 2019.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Official Corporate Overview</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Empowering Bangladesh With <span className="text-[#86efac]">Affordable Digital Tools</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-sm sm:text-base leading-relaxed">
            Subscriptions BD has committed to delivering the best digital tools with convenient pricing for educational platforms, OTT entertainment, and AI models across Bangladesh since 2019.
          </p>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#86efac] mb-1">20,000+</div>
            <div className="text-xs text-gray-400 font-medium">Satisfied Customers</div>
          </div>
          <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#16a34a] mb-1">15,000+</div>
            <div className="text-xs text-gray-400 font-medium">Delivered Orders</div>
          </div>
          <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">4.8 / 5</div>
            <div className="text-xs text-gray-400 font-medium">Trustpilot Rating</div>
          </div>
          <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#d1fae5] mb-1">8+ Years</div>
            <div className="text-xs text-gray-400 font-medium">Industry Experience</div>
          </div>
        </div>

        {/* Legal Registry Box */}
        <div className="bg-gradient-to-br from-[#04241b] to-[#062e23] border border-[#16a34a]/40 rounded-2xl p-8 mb-16 shadow-emerald">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#16a34a] flex items-center justify-center text-white shadow-emerald">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Official Government Registrations</h2>
              <p className="text-xs text-[#86efac]/80">Verified by local and international commercial authorities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#064e3b]">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[#86efac] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bangladesh Legal Entities</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>
                  <strong className="text-white">Trade Licence Number:</strong> 2201010800020367 (Comilla City Corporation)
                </li>
                <li>
                  <strong className="text-white">DBID Registration:</strong> 453105002 (Ministry of Commerce)
                </li>
                <li>
                  <strong className="text-white">Registered Address:</strong> 942/12/E, S Alam Jam Jam Tower, Laksam Road, Tomsombridge, Adarsha Sadar, Comilla 3500
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-[#86efac] flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#86efac]" />
                <span>United Kingdom International Registry</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>
                  <strong className="text-white">UK Company Number:</strong> 16441306
                </li>
                <li>
                  <strong className="text-white">London Office:</strong> Flat 809, 71 to 75 Shelton Street, Covent Garden, London, WC2H 9JQ
                </li>
                <li>
                  <strong className="text-white">Operating Time:</strong> 10:30 AM to 12:30 AM Bangladesh Standard Time
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Subscriptions BD */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Customers Trust Our Marketplace</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <Award className="w-8 h-8 text-[#86efac] mb-4" />
              <h3 className="text-base font-bold text-white mb-2">100% Genuine Licenses</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Direct partnerships with authorized distributors guarantee that all software keys and licenses activate without counterfeit risks.
              </p>
            </div>
            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <Headphones className="w-8 h-8 text-[#16a34a] mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Live WhatsApp Support</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Dedicated support team resolves activation questions, email changes, and setup guidance directly through verified WhatsApp chat.
              </p>
            </div>
            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Instant Replacement Warranty</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Every subscription carries our complete replacement guarantee for the entire duration of the purchased subscription package.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 px-6 bg-[#04241b] border border-[#064e3b] rounded-2xl">
          <h3 className="text-xl font-bold mb-3">Ready to upgrade your software and entertainment?</h3>
          <p className="text-xs text-gray-300 max-w-lg mx-auto mb-6">
            Explore our curated catalog of 94 digital products, license keys, and streaming passes with instant bKash and Nagad payment.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-bold shadow-emerald transition-all"
          >
            Browse Digital Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
