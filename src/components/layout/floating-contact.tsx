"use client";

import { useState } from "react";
import { MessageSquare, MessageCircle, X } from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 space-y-2 flex flex-col items-end animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* WhatsApp Direct */}
          <a
            href="https://web.whatsapp.com/send?phone=8801622633671"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 transition-transform active:scale-95 text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Facebook Messenger */}
          <a
            href="https://m.me/web.subscriptionsbd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#0084FF] text-white px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 transition-transform active:scale-95 text-xs font-semibold"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Facebook Messenger</span>
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 p-3.5 rounded-full bg-[#16a34a] text-white shadow-emerald hover:bg-[#15803d] hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none"
        aria-label="Contact Customer Support"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
