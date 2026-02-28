"use client";

import ScrollReveal from "./ScrollReveal";

const POINTS = [
  { title: "Trust & transparency", text: "We put your interests first. Clear communication, honest advice, and no hidden terms." },
  { title: "Local insight, global reach", text: "Deep knowledge of Dubai’s market combined with experience serving international clients." },
  { title: "End-to-end support", text: "From search and viewings to paperwork and handover, we guide you at every step." },
  { title: "Curated portfolio", text: "Only properties that meet our standards for quality, location, and value." },
];

export default function HomeWhyChoose() {
  return (
    <section className="py-24 sm:py-32 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
        <ScrollReveal className="lg:w-2/5 lg:sticky lg:top-32">
          <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            The Sartawi difference
          </p>
          <h2 className="text-4xl sm:text-5xl font-light mb-6 tracking-tight">
            Why choose <span className="font-semibold text-[#e0b973]">Sartawi</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We combine market expertise with a personal approach so you can invest and live in Dubai with confidence.
          </p>
          <div className="mt-10 h-px w-16 bg-[#e0b973]/50" />
        </ScrollReveal>
        <div className="lg:w-3/5 space-y-6">
          {POINTS.map((point, i) => (
            <ScrollReveal key={point.title} delay={i * 0.07}>
              <div className="flex gap-6 items-start group">
                <span className="flex-shrink-0 w-10 h-10 rounded-full border border-[#e0b973]/40 text-[#e0b973] flex items-center justify-center font-semibold text-sm">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#e0b973] transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{point.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
