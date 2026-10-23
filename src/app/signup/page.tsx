"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (name && email && password) {
        setTimeout(() => {
          router.push("/customer/orders");
        }, 500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="hermes-card rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#16a34a] flex items-center justify-center font-bold text-white mx-auto shadow-emerald">
            H
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create Customer Account
          </h1>
          <p className="text-xs text-[#86efac]/80">
            Keep all your software keys, OTT profiles, and invoices in one secure place.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-300 p-3 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 pl-9 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
              />
              <User className="w-4 h-4 text-[#86efac] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 pl-9 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
              />
              <Mail className="w-4 h-4 text-[#86efac] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              WhatsApp / Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01712345678"
                className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 pl-9 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
              />
              <Phone className="w-4 h-4 text-[#86efac] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-[#04241b] border border-[#064e3b] rounded-lg p-2.5 pl-9 text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
              />
              <Lock className="w-4 h-4 text-[#86efac] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-hermes-primary py-3 text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            <span>{loading ? "Creating account..." : "Sign Up"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#064e3b] text-center text-xs text-gray-400">
          <span>Already registered? </span>
          <Link href="/login" className="text-[#86efac] font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
