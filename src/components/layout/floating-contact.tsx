"use client";

import { useState } from "react";
import { MessageSquare, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-3 space-y-2.5 flex flex-col items-end"
          >
            {/* WhatsApp Direct */}
            <motion.a
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              href="https://web.whatsapp.com/send?phone=8801622633671"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </motion.a>

            {/* Facebook Messenger */}
            <motion.a
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              href="https://m.me/web.subscriptionsbd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#0084FF] text-white px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 text-xs font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Facebook Messenger</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 p-3.5 rounded-full bg-[#16a34a] text-white shadow-emerald hover:bg-[#15803d] transition-colors flex items-center justify-center focus:outline-none"
        aria-label="Contact Customer Support"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
