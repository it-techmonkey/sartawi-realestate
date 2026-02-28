"use client";

import ScrollReveal from "./ScrollReveal";

const ITEMS = [
  { title: "Prime Communities", description: "Hand-picked developments in Dubai’s most sought-after locations.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "Smart Investments", description: "Data-driven guidance for projects with strong growth potential.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { title: "Luxury Villas", description: "Exclusive villas with premium finishes and world-class amenities.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Mansions", description: "Statement homes: exceptional scale, design, and privacy.", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
];

export default function HomeExpertise() {
  return (
    <section className="py-24 sm:py-32 px-4 bg-zinc-950 overflow-hidden">
      <ScrollReveal className="max-w-6xl mx-auto mb-12">
        <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.25em] mb-4 text-center">
          What we offer
        </p>
        <h2 className="text-4xl sm:text-5xl font-light text-center text-white mb-4 tracking-tight">
          Our <span className="font-semibold text-[#e0b973]">Expertise</span>
        </h2>
      </ScrollReveal>
      <div className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <div className="h-full min-h-[220px] rounded-2xl bg-black border border-zinc-800 p-6 sm:p-8 hover:border-[#e0b973]/40 transition-colors flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#e0b973]/15 flex items-center justify-center text-[#e0b973] mb-5 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
