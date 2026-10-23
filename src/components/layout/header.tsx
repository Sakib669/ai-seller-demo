"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const totalCount = useCartStore((state) => state.getTotalCount());
  const openCart = useCartStore((state) => state.openCart);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#031711]/90 backdrop-blur-md border-b border-[#064e3b]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#16a34a] flex items-center justify-center shadow-emerald group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-lg tracking-wider">H</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#f0fdf4] group-hover:text-[#86efac] transition-colors">
                Subscriptions<span className="text-[#16a34a]">BD</span>
              </span>
              <span className="block text-[10px] text-[#86efac]/80 font-medium tracking-wide uppercase">
                Forest & Mint Market
              </span>
            </div>
          </Link>

          {/* Navigation links for Desktop */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-[#86efac] transition-colors">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#86efac] transition-colors">
              All Products
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdown(!categoryDropdown)}
                className="flex items-center gap-1 hover:text-[#86efac] transition-colors focus:outline-none"
              >
                <Layers className="w-4 h-4 text-[#86efac]" />
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {categoryDropdown && (
                <div
                  onMouseLeave={() => setCategoryDropdown(false)}
                  className="absolute left-0 mt-2 w-72 bg-[#04241b] border border-[#064e3b] rounded-lg shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <Link
                    href="/shop?category=ai-grammer-and-writing-products"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    AI, Grammar & Writing
                  </Link>
                  <Link
                    href="/shop?category=video-streaming"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    Video Streaming & OTT
                  </Link>
                  <Link
                    href="/shop?category=key"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    License Keys & OS
                  </Link>
                  <Link
                    href="/shop?category=educational-tools"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    Educational Tools
                  </Link>
                  <Link
                    href="/shop?category=utilities"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    Utilities & Productivity
                  </Link>
                  <Link
                    href="/shop?category=vpn"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    VPN & Privacy
                  </Link>
                  <Link
                    href="/shop?category=audio-streaming"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    Audio Streaming
                  </Link>
                  <Link
                    href="/shop?category=apple-products"
                    className="block px-3 py-2 rounded-md text-sm text-[#f0fdf4] hover:bg-[#16a34a]/20 hover:text-white"
                    onClick={() => setCategoryDropdown(false)}
                  >
                    Apple Products & Cards
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blogs" className="hover:text-[#86efac] transition-colors">
              Blogs
            </Link>
            <Link href="/about" className="hover:text-[#86efac] transition-colors">
              About
            </Link>
            <Link href="/faq" className="hover:text-[#86efac] transition-colors">
              FAQ
            </Link>
            <Link href="/contact-us" className="hover:text-[#86efac] transition-colors">
              Contact
            </Link>
            <Link href="/customer/orders" className="hover:text-[#86efac] transition-colors">
              My Orders
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ChatGPT, YouTube, Windows keys..."
              className="w-full bg-[#04241b] border border-[#064e3b] rounded-full py-2 pl-4 pr-10 text-sm text-[#f0fdf4] placeholder-[#86efac]/50 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[#86efac] hover:text-white hover:bg-[#16a34a] transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* User Account / Sign In */}
          <Link
            href="/login"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#064e3b] transition-colors"
            title="Account"
          >
            <User className="w-5 h-5 text-[#86efac]" />
            <span className="hidden sm:inline text-xs font-semibold">Sign In</span>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg bg-[#16a34a]/15 border border-[#16a34a]/40 text-white hover:bg-[#16a34a] hover:shadow-emerald transition-all"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-[#86efac]" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#16a34a] text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#031711]">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#031711] border-b border-[#064e3b] px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#04241b] border border-[#064e3b] rounded-md py-2 pl-4 pr-10 text-sm text-[#f0fdf4]"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86efac]"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Browse All Products
            </Link>
            <Link
              href="/shop?category=ai-grammer-and-writing-products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              AI & Writing Products
            </Link>
            <Link
              href="/shop?category=video-streaming"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Streaming & OTT Accounts
            </Link>
            <Link
              href="/shop?category=key"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Windows & Office Keys
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Tech Blogs & Guides
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              About Subscriptions BD
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Help & FAQ
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Contact Support
            </Link>
            <Link
              href="/customer/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-gray-200 hover:text-[#86efac]"
            >
              Customer Order Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
