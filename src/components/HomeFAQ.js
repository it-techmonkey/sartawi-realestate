"use client";

import ScrollReveal from "./ScrollReveal";

const PLACEHOLDER_ITEMS = [
  { q: "How do I list my property with Sartawi?", a: "Get in touch via the form above or contact us directly. We’ll arrange a visit and guide you through the process." },
  { q: "Which areas do you cover?", a: "We focus on Dubai’s prime and emerging communities, from Downtown and Marina to Dubai South and beyond." },
  { q: "Do you work with international investors?", a: "Yes. We specialise in helping international clients buy, sell, and rent property in Dubai with full support." },
];

export default function HomeFAQ() {
  return (
    <section className="bg-zinc-950 text-white py-24 sm:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-[#e0b973] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Support
        </p>
        <h2 className="text-4xl sm:text-5xl font-light text-center mb-6 tracking-tight">
          FAQ&apos;s
        </h2>
          <p className="text-gray-400 text-center mb-14 text-lg">
            Quick answers to common questions. More content coming soon.
          </p>
        </ScrollReveal>
        <ul className="space-y-4">
          {PLACEHOLDER_ITEMS.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border border-zinc-800 bg-black/50 p-6 hover:border-zinc-700 transition-colors"
            >
              <p className="font-semibold text-white mb-2">{item.q}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
