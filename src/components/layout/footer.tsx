import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Lock,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#02110c] border-t border-[#064e3b] text-gray-400 text-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-[#16a34a] flex items-center justify-center font-bold text-white shadow-emerald">
                H
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Subscriptions<span className="text-[#16a34a]">BD</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Subscriptions BD has committed for the best service with convenient prices for educational OTT and AI tools across Bangladesh since 2019.
            </p>
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#86efac] shrink-0 mt-0.5" />
                <span>Holding: Tomsombridge, Adarsha Sadar, Comilla-3500, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>WhatsApp: +880 1622-633671 (Message Only)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>Email: info@subscriptionsbd.com</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop?category=ai-grammer-and-writing-products" className="hover:text-[#86efac] transition-colors">
                  AI Language Models & ChatGPT
                </Link>
              </li>
              <li>
                <Link href="/shop?category=video-streaming" className="hover:text-[#86efac] transition-colors">
                  OTT Video Streaming & YouTube
                </Link>
              </li>
              <li>
                <Link href="/shop?category=key" className="hover:text-[#86efac] transition-colors">
                  Windows 11 & Office 365 Product Keys
                </Link>
              </li>
              <li>
                <Link href="/shop?category=educational-tools" className="hover:text-[#86efac] transition-colors">
                  Duolingo Super & Coursera Plus
                </Link>
              </li>
              <li>
                <Link href="/shop?category=utilities" className="hover:text-[#86efac] transition-colors">
                  GitHub Copilot & Cloud Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Legal */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Information & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blogs" className="hover:text-[#86efac] transition-colors">
                  Tech Blogs & Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#86efac] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#86efac] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#86efac] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#86efac] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/return-refund-policy" className="hover:text-[#86efac] transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-condition" className="hover:text-[#86efac] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Verifications & Trust */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Government Verified
            </h4>
            <div className="bg-[#04241b] border border-[#064e3b] rounded-lg p-3 space-y-2.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-[#86efac]">
                <ShieldCheck className="w-4 h-4 text-[#86efac]" />
                <span className="font-semibold">Official Business Registry</span>
              </div>
              <div className="text-[11px] text-gray-300">
                <span className="text-gray-400">COCC Trade Licence No: </span>
                <span className="font-mono text-white font-medium">2201010800020367</span>
              </div>
              <div className="text-[11px] text-gray-300">
                <span className="text-gray-400">DBID No: </span>
                <span className="font-mono text-white font-medium">453105002</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5 text-[#86efac]" />
              <span>100% Encrypted SSL Checkout</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Banner */}
        <div className="border-t border-[#064e3b] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Subscriptions BD. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-[11px]">Accepted Payment Methods:</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#064e3b] text-[#f0fdf4] px-2 py-1 rounded font-bold text-[10px] tracking-wider">
                bKash
              </span>
              <span className="bg-[#064e3b] text-[#f0fdf4] px-2 py-1 rounded font-bold text-[10px] tracking-wider">
                Nagad
              </span>
              <span className="bg-[#064e3b] text-[#f0fdf4] px-2 py-1 rounded font-bold text-[10px] tracking-wider">
                Rocket
              </span>
              <span className="bg-[#16a34a] text-white px-2 py-1 rounded font-bold text-[10px] tracking-wider shadow-emerald">
                SSLCommerz
              </span>
              <span className="bg-[#064e3b] text-[#f0fdf4] px-2 py-1 rounded font-bold text-[10px] tracking-wider">
                VISA / MC
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
