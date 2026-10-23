"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Demo session authorization
      if (email && password) {
        setTimeout(() => {
          router.push("/customer/orders");
        }, 500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
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
            Sign In to Your Account
          </h1>
          <p className="text-xs text-[#86efac]/80">
            Access your purchased licenses, renewal keys, and order history.
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
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-300 font-semibold">Password</label>
              <Link href="#" className="text-[11px] text-[#86efac] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            <span>{loading ? "Signing in..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#064e3b] text-center text-xs text-gray-400">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/signup" className="text-[#86efac] font-semibold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
