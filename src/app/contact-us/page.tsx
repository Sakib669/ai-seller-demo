"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#031711] text-[#f0fdf4] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 text-[#86efac] text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Customer Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact <span className="text-[#86efac]">Subscriptions BD</span>
          </h1>
          <p className="text-[#d1fae5]/80 text-sm sm:text-base leading-relaxed">
            Have questions about subscriptions, order status, or custom business packages? Our support team is here to assist you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Details Column */}
          <div className="space-y-4">
            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <MessageCircle className="w-5 h-5 text-[#86efac]" />
                <h3 className="text-sm font-bold text-white">WhatsApp Support</h3>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                Message only support for instant order inquiries and verification.
              </p>
              <a
                href="https://wa.me/8801622633671"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-[#86efac] hover:underline"
              >
                +880 1622 633671
              </a>
            </div>

            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#16a34a] mb-2">
                <Mail className="w-5 h-5 text-[#86efac]" />
                <h3 className="text-sm font-bold text-white">Official Email</h3>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                For corporate billing inquiries, partnerships, and technical escalations.
              </p>
              <a
                href="mailto:info@subscriptionsbd.com"
                className="text-sm font-bold text-[#86efac] hover:underline"
              >
                info@subscriptionsbd.com
              </a>
            </div>

            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#86efac] mb-2">
                <Clock className="w-5 h-5 text-[#86efac]" />
                <h3 className="text-sm font-bold text-white">Working Hours</h3>
              </div>
              <p className="text-xs text-gray-300">
                Everyday: <strong className="text-white">10:30 AM to 12:30 AM</strong>
              </p>
              <p className="text-[11px] text-[#86efac]/70 mt-1">
                Bangladesh Standard Time (UTC+6)
              </p>
            </div>

            <div className="bg-[#04241b] border border-[#064e3b] rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#86efac] mb-2">
                <MapPin className="w-5 h-5 text-[#86efac]" />
                <h3 className="text-sm font-bold text-white">Office Location</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                942/12/E, S Alam Jam Jam Tower, Laksam Road, Tomsombridge, Adarsha Sadar, Comilla 3500, Bangladesh
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-2 bg-[#04241b] border border-[#064e3b] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-[#d1fae5]/80 mb-6">
              Fill out this form and our support engineers will review your request within 30 minutes.
            </p>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Message Dispatched Successfully</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Thank you, {formData.name || "Customer"}. Our technical desk has received your ticket and will respond to your contact details promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-[#16a34a] text-white text-xs font-semibold hover:bg-[#15803d] transition-colors shadow-emerald"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full bg-[#031711] border border-[#064e3b] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#031711] border border-[#064e3b] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1712345678"
                      className="w-full bg-[#031711] border border-[#064e3b] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Order query, renewal, or custom tool request"
                      className="w-full bg-[#031711] border border-[#064e3b] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your question, including order code if applicable..."
                    className="w-full bg-[#031711] border border-[#064e3b] rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#16a34a]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-emerald transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
