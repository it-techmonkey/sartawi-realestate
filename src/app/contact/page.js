"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <PageHero
        title={
          <>
            Contact <span className="text-[#e0b973]">us</span>
          </>
        }
        subtitle="Get in touch for property inquiries, valuations, or general support."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 space-y-10">
            <div>
              <p className="text-[#e0b973] text-[11px] font-medium uppercase tracking-[0.2em] mb-3">
                Reach us
              </p>
              <a href="tel:+97145525643" className="block text-white hover:text-[#e0b973] transition-colors py-1.5 text-base">
                +971 45 525 643
              </a>
              <a href="mailto:admin@sartawiproperties.com" className="block text-zinc-400 hover:text-[#e0b973] transition-colors py-1.5 text-sm break-all">
                admin@sartawiproperties.com
              </a>
              <p className="text-zinc-500 text-sm pt-2">
                Sartawi Properties, Parklane Tower, 901
              </p>
            </div>
            <div>
              <p className="text-[#e0b973] text-[11px] font-medium uppercase tracking-[0.2em] mb-3">
                Quick links
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#sell-property" className="text-zinc-400 hover:text-[#e0b973]">Sell your property</Link></li>
                <li><Link href="/featured-properties" className="text-zinc-400 hover:text-[#e0b973]">Featured properties</Link></li>
                <li><Link href="/developers" className="text-zinc-400 hover:text-[#e0b973]">Developers</Link></li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-8">
            {sent ? (
              <div className="bg-zinc-900/80 rounded-xl px-6 py-10 text-center">
                <p className="text-[#e0b973] font-medium text-base mb-1">Thank you</p>
                <p className="text-zinc-400 text-sm">We&apos;ve received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-zinc-900/60 rounded-xl p-6 sm:p-8 space-y-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 mb-4">Send a message</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Name</label>
                    <input id="name" name="name" type="text" required className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-[#e0b973]/50" aria-required="true" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Phone</label>
                    <input id="phone" name="phone" type="tel" className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-[#e0b973]/50" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Email</label>
                  <input id="email" name="email" type="email" required className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-[#e0b973]/50" aria-required="true" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Subject</label>
                  <input id="subject" name="subject" type="text" placeholder="e.g. Property inquiry" className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 min-h-[100px] bg-black/50 border border-zinc-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-[#e0b973]/50 resize-none" aria-required="true" />
                </div>
                <button type="submit" className="w-full py-3.5 min-h-[48px] bg-[#e0b973] hover:bg-[#d4a85f] text-black font-semibold text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#e0b973] focus:ring-offset-2 focus:ring-offset-black">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
