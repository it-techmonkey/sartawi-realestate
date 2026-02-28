"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function HomeBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((r) => r.json())
      .then(setBlogs)
      .catch(() => setBlogs([]));
  }, []);

  const displayBlogs = blogs.slice(0, 3);

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
            Market updates, neighbourhood guides, and expert advice.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayBlogs.length > 0 ? (
            displayBlogs.map((blog, i) => (
              <ScrollReveal key={blog.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 min-h-[220px] flex flex-col justify-between hover:border-[#e0b973]/50 hover:bg-zinc-900/50 transition-all duration-300 group"
                >
                  <div>
                    {blog.readTime && <p className="text-xs text-gray-500 mb-2">{blog.readTime}</p>}
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#e0b973] transition-colors line-clamp-2 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{blog.excerpt}</p>
                  </div>
                  <span className="inline-block mt-4 text-[#e0b973] text-sm font-medium">
                    Read more →
                  </span>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 min-h-[200px] flex flex-col justify-center items-center text-center"
              >
                <p className="text-gray-500 text-sm">Blog post coming soon</p>
              </div>
            ))
          )}
        </div>
        <p className="text-center mt-10">
          <Link href="/blog" className="text-[#e0b973] font-medium hover:underline text-sm">
            View all blogs →
          </Link>
        </p>
      </div>
    </section>
  );
}
