"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

export default function SellPropertyForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  };

  return (
    <section id="sell-property" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-zinc-950/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <ScrollReveal className="lg:col-span-5">
            <p className="text-[#e0b973] text-[11px] font-medium uppercase tracking-[0.2em] mb-3">
              Property enquiry
            </p>
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight mb-5">
              Sell your property
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-6">
              Share your property details and we&apos;ll provide a professional valuation and clear next steps.
            </p>
            <p className="text-zinc-500 text-sm">
              Prefer to talk?{" "}
              <Link href="/contact" className="text-[#e0b973] hover:underline">
                Contact us directly
              </Link>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:col-span-7">
            {sent ? (
              <div className="bg-zinc-900/80 rounded-xl px-6 py-10 sm:px-8 text-center">
                <p className="text-[#e0b973] font-medium text-base mb-1">Thank you</p>
                <p className="text-zinc-400 text-sm">
                  We&apos;ve received your details and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-zinc-900/60 rounded-xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50 transition-colors min-h-[44px]"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50 transition-colors min-h-[44px]"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50 transition-colors min-h-[44px]"
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="location" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Property location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      placeholder="Area, building or community"
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50 transition-colors min-h-[44px]"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="askingPrice" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Asking price (AED)
                    </label>
                    <input
                      id="askingPrice"
                      name="askingPrice"
                      type="text"
                      placeholder="e.g. 2,500,000"
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50 transition-colors min-h-[44px]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="additionalNotes" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                    Additional details
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    placeholder="Property type, size, key features"
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50 transition-colors resize-none min-h-[88px]"
                    aria-label="Additional details"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 min-h-[48px] bg-[#e0b973] hover:bg-[#d4a85f] disabled:opacity-70 text-black font-semibold text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#e0b973] focus:ring-offset-2 focus:ring-offset-black"
                >
                  {sending ? "Sending…" : "Submit enquiry"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
