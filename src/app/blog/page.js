"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((r) => r.json())
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <PageHero
        title={
          <>
            Our <span className="text-[#e0b973]">Blogs</span>
          </>
        }
        subtitle="Market updates, neighbourhood guides, and expert advice for Dubai real estate."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="space-y-6 sm:space-y-8">
            {blogs.map((blog, i) => (
              <ScrollReveal key={blog.slug} delay={i * 0.05}>
                <li>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-[#e0b973]/50 hover:bg-zinc-900/60 transition-all duration-300 group"
                  >
                    {blog.image && (
                      <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] bg-zinc-900">
                        <Image
                          src={blog.image}
                          alt={blog.imageAlt || blog.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 896px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      {(blog.date || blog.readTime) && (
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                          {blog.date && (
                            <time dateTime={blog.date}>
                              {new Date(blog.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          )}
                          {blog.date && blog.readTime && <span>·</span>}
                          {blog.readTime && <span>{blog.readTime}</span>}
                        </div>
                      )}
                      <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#e0b973] transition-colors mb-3 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <span className="inline-block mt-4 text-[#e0b973] font-medium text-sm">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}

        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-500 py-16">No blogs yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}
