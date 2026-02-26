"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function HomeBlogs() {
  return (
    <section className="bg-black text-white py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-[#e0b973] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Insights
          </p>
          <h2 className="text-4xl sm:text-5xl font-light text-center mb-6 tracking-tight">
            <span className="font-semibold text-[#e0b973]">Blogs</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-14 text-lg">
            Market updates, neighbourhood guides, and expert advice—coming soon.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 min-h-[200px] flex flex-col justify-center items-center text-center"
            >
              <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center text-gray-500 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Blog post coming soon</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link href="/about" className="text-[#e0b973] font-medium hover:underline text-sm">
            Explore our story in the meantime →
          </Link>
        </p>
      </div>
    </section>
  );
}
