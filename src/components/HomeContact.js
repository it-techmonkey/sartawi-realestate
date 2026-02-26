"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function HomeContact() {
  return (
    <section id="contact-section" className="relative bg-black text-white py-24 sm:py-32 px-4 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#e0b973]/5 rounded-full blur-3xl" />
      <ScrollReveal className="relative max-w-4xl mx-auto text-center">
        <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Get in touch
        </p>
        <h2 className="text-4xl sm:text-5xl font-light mb-6 tracking-tight">
          Contact <span className="font-semibold text-[#e0b973]">us</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          Whether you’re buying, selling, or renting—our team is here to help with expert advice and personalised service.
        </p>
      </ScrollReveal>
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
          <a
            href="tel:+97145525643"
            className="flex items-center gap-4 rounded-xl bg-zinc-900/70 px-6 py-5 sm:px-6 sm:py-6 hover:bg-zinc-800/80 transition-colors group min-h-[72px] sm:min-h-0"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#e0b973] group-hover:bg-[#e0b973]/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Phone</p>
              <p className="text-white font-medium truncate">+971 45 525 643</p>
            </div>
          </a>
          <a
            href="mailto:admin@sartawiproperties.com"
            className="flex items-center gap-4 rounded-xl bg-zinc-900/70 px-6 py-5 sm:px-6 sm:py-6 hover:bg-zinc-800/80 transition-colors group min-h-[72px] sm:min-h-0"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#e0b973] group-hover:bg-[#e0b973]/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.875a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Email</p>
              <p className="text-white font-medium text-sm break-all">admin@sartawiproperties.com</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-xl bg-zinc-900/70 px-6 py-5 sm:px-6 sm:py-6 min-h-[72px] sm:min-h-0">
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#e0b973]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Office</p>
              <p className="text-white font-medium text-sm">Parklane Tower, 901</p>
            </div>
          </div>
      </div>

      <div className="relative text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[#e0b973] font-semibold hover:underline"
        >
          Send a message or view contact details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

