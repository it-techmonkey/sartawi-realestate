"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHero from "@/components/PageHero";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("/data/blogs.json")
      .then((r) => r.json())
      .then((list) => list.find((b) => b.slug === slug) || null)
      .then(setBlog)
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#e0b973] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-gray-400">Blog post not found.</p>
        <Link href="/blog" className="text-[#e0b973] font-medium hover:underline">
          Back to Blogs
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#e0b973] transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Blogs
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {(blog.date || blog.readTime) && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
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
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-8">
          {blog.title}
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
          {blog.content || blog.excerpt}
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-zinc-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#e0b973] font-medium hover:underline"
        >
          ← Back to Blogs
        </Link>
      </div>
    </main>
  );
}
