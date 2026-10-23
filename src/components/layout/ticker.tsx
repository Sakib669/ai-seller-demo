"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const announcements = [
  { text: "Huge Discounts on ChatGPT Personal !!", href: "/product/chatgpt-subscription-bd" },
  { text: "YouTube Premium In Stock Now!! Instant Activation", href: "/product/yt-premium" },
  { text: "Gemini Advanced 1 Year Available Again !!", href: "/product/gemini-advanced" },
  { text: "Windows 11 Pro Lifetime License at 600৳ Only!", href: "/product/windows-11-pro-product-key-bd" },
];

export function Ticker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[index];

  return (
    <div className="bg-[#04241b] border-b border-[#064e3b] text-xs py-2 px-4 text-center">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#86efac] animate-pulse" />
        <Link
          href={current.href}
          className="text-[#f0fdf4] hover:text-[#86efac] font-medium transition-colors"
        >
          {current.text}
        </Link>
      </div>
    </div>
  );
}
