"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";
import ExternalImage from "./ExternalImage";
import { formatPrice, hasBuy, hasRent } from "@/lib/properties";

const PropertiesMap = dynamic(
  () => import("@/components/PropertiesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] bg-zinc-900 flex items-center justify-center text-gray-500">
        Loading map...
      </div>
    ),
  }
);

const FEATURED_COUNT = 3;

export default function HomeFeaturedSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data/all_data.json")
      .then((r) => r.json())
      .then((data) => {
        const list = data?.data?.items ?? [];
        setItems(list.slice(0, 500));
      })
      .catch(() => setItems([]));
  }, []);

  const withCoords = items.filter(
    (p) => p.latitude != null && p.longitude != null
  );
  const featured = items.slice(0, FEATURED_COUNT);

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 sm:pt-32 pb-12">
        <ScrollReveal>
          <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.25em] mb-4 text-center">
            Dubai portfolio
          </p>
          <h2 className="text-4xl sm:text-5xl font-light text-center mb-4 tracking-tight">
            Featured <span className="font-semibold text-[#e0b973]">Properties</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14 text-lg">
            Explore our properties across Dubai on the map and click to learn more about projects.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 h-[480px] sm:h-[520px] bg-zinc-900">
            <PropertiesMap items={withCoords.length > 0 ? withCoords : items} dark />
          </div>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featured.map((prop, i) => {
            const total = prop.statistics?.total || {};
            const coverUrl = prop.cover?.src || prop.cover?.logo;
            const forSale = hasBuy(prop);
            const forRent = hasRent(prop);
            return (
              <ScrollReveal key={prop.id} delay={0.1 + i * 0.06}>
                <Link
                  href={`/properties/${prop.slug}`}
                  className="group block relative"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-[#e0b973]/50 hover:shadow-xl hover:shadow-[#e0b973]/10">
                    <div className="relative aspect-[4/3] w-full bg-zinc-800">
                      {coverUrl ? (
                        <ExternalImage
                          src={coverUrl}
                          alt={prop.title || prop.slug}
                          variant="card"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                          No image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {forSale && (
                          <span className="bg-[#e0b973] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                            Sale
                          </span>
                        )}
                        {forRent && (
                          <span className="bg-white/90 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                            Rent
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-semibold text-lg text-white line-clamp-2">
                          {prop.title || prop.slug}
                        </h3>
                        <p className="text-[#e0b973] font-bold mt-1">
                          {total.price_from != null && formatPrice(total.price_from)}
                          {total.price_to != null && total.price_to !== total.price_from && ` – ${formatPrice(total.price_to)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3} className="text-center mt-16">
          <Link
            href="/featured-properties"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#e0b973] hover:bg-[#d4a85f] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#e0b973]/25 focus:outline-none focus:ring-2 focus:ring-[#e0b973] focus:ring-offset-2 focus:ring-offset-black"
          >
            View more properties
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-gray-500 text-sm mt-4">Browse our full collection across Dubai</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
