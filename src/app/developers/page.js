"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import ExternalImage from "@/components/ExternalImage";
import { getBuilders } from "@/lib/properties";

export default function DevelopersPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/data/all_data.json")
      .then((r) => r.json())
      .then((data) => {
        setItems(data?.data?.items ?? []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const builders = getBuilders(items);
  const filteredDevelopers = builders.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  const DEVELOPERS_PER_PAGE = 24;
  const totalPages = Math.max(1, Math.ceil(filteredDevelopers.length / DEVELOPERS_PER_PAGE));
  const paginatedDevelopers = filteredDevelopers.slice(
    (page - 1) * DEVELOPERS_PER_PAGE,
    page * DEVELOPERS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <PageHero
        title={
          <>
            Top <span className="text-[#e0b973]">Developers</span>
          </>
        }
        subtitle="Explore developers and their properties in Dubai."
      />

      <div className="flex my-20 gap-6 max-w-6xl justify-center items-center mx-auto px-4">
        <div className="max-w-xl mx-auto flex justify-center rounded-xl items-center h-full w-full bg-zinc-800/50 border border-zinc-700 pl-5">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="20"
            width="20"
            className="text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            placeholder="Search developers..."
            aria-label="Search developers"
            className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 focus:ring-inset"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="max-w-6xl mx-auto px-4 text-center py-20 text-gray-400">
          Loading developers...
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {paginatedDevelopers.map((dev) => {
            const count = items.filter((p) => p.builder === dev.name).length;
            const projectsForBuilder = items.filter((p) => p.builder === dev.name);
            const withLogo = projectsForBuilder.find((p) => p.logo?.src || p.logo?.logo);
            const firstProject = withLogo || projectsForBuilder[0];
            const logoUrl = firstProject?.logo?.src || firstProject?.logo?.logo || firstProject?.cover?.src || firstProject?.cover?.logo;
            return (
              <Link
                key={dev.name}
                href={`/developers/${dev.slug}`}
                className="group relative aspect-square bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col items-center justify-center p-6 hover:border-[#e0b973] transition-all duration-300"
              >
                <div className="w-full h-20 flex items-center justify-center mb-4">
                  {logoUrl ? (
                    <div className="relative w-24 h-16">
                      <ExternalImage
                        src={logoUrl}
                        alt={dev.name}
                        variant="developerLogo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-500 font-bold uppercase text-xs text-center border border-zinc-800 rounded px-3 py-1 line-clamp-2">
                      {dev.name}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center line-clamp-2">
                  {dev.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{count} properties</p>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && filteredDevelopers.length > 0 && totalPages > 1 && (
        <nav className="max-w-6xl mx-auto px-4 py-10 flex items-center justify-center gap-2" aria-label="Developers pagination">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-zinc-700 bg-zinc-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="px-4 text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            aria-label="Next page"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-zinc-700 bg-zinc-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </nav>
      )}

      {!loading && filteredDevelopers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No developers found matching &quot;{search}&quot;
        </p>
      )}
    </main>
  );
}
