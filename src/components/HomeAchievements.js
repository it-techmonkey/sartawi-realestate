"use client";

import ScrollReveal from "./ScrollReveal";

const STATS = [
  { value: "30+", label: "Years in Real Estate" },
  { value: "60+", label: "Nationalities Helped" },
  { value: "1000+", label: "Properties in Portfolio" },
  { value: "100+", label: "Properties Sold" },
];

export default function HomeAchievements() {
  return (
    <section className="relative py-20 sm:py-28 px-4 bg-black border-t border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.2em] mb-3 text-center">
            Our track record
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-center text-white mb-14 tracking-tight">
            What we have <span className="font-semibold text-[#e0b973]">achieved</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.06}>
              <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col items-center justify-center py-8 sm:py-10 px-4 sm:px-6 text-center min-h-[120px] sm:min-h-[140px] lg:min-h-0">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#e0b973] tabular-nums">{item.value}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2 font-medium line-clamp-2">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
