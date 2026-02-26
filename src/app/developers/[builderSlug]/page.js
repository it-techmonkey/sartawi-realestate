"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ExternalImage from "@/components/ExternalImage";
import { useParams } from "next/navigation";
import {
  getPropertiesByBuilder,
  formatPrice,
  hasBuy,
  hasRent,
} from "@/lib/properties";

export default function DeveloperPropertiesPage() {
  const params = useParams();
  const builderSlug = params?.builderSlug;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/all_data.json")
      .then((r) => r.json())
      .then((data) => {
        setItems(data?.data?.items ?? []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const properties = getPropertiesByBuilder(items, builderSlug);
  const builderName = builderSlug ? decodeURIComponent(builderSlug) : "";

  return (
    <main className="min-h-screen bg-black text-white pb-24 pt-20">
      <div className="relative w-full h-[25vh] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-black/80" />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
          <Link
            href="/developers"
            className="text-sm text-gray-400 hover:text-[#e0b973] mb-2"
          >
            ← Developers
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-[#e0b973]">{builderName}</span>
          </h1>
          <p className="text-gray-300 text-sm">{properties.length} properties</p>
        </div>
      </div>

      {loading ? (
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-400">
          Loading...
        </div>
      ) : properties.length === 0 ? (
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-500">
          No properties found for this developer.
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => {
            const total = prop.statistics?.total || {};
            const priceFrom = total.price_from;
            const priceTo = total.price_to;
            const coverUrl = prop.cover?.logo || prop.cover?.src;
            const forSale = hasBuy(prop);
            const forRent = hasRent(prop);
            return (
              <Link
                key={prop.id}
                href={`/properties/${prop.slug}`}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#e0b973] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-zinc-800">
                  {coverUrl ? (
                    <ExternalImage
                      src={coverUrl}
                      alt={prop.title || prop.slug}
                      variant="card"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {forSale && (
                      <span className="bg-black/70 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">
                        Sale
                      </span>
                    )}
                    {forRent && (
                      <span className="bg-black/70 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">
                        Rent
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-[#e0b973] transition-colors line-clamp-2">
                    {prop.title || prop.slug}
                  </h3>
                  {prop.district?.title && (
                    <p className="text-sm text-gray-400">{prop.district.title}</p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className="text-[#e0b973] font-bold">
                      {priceFrom != null && formatPrice(priceFrom)}
                      {priceFrom != null && priceTo != null && priceTo !== priceFrom && " - "}
                      {priceTo != null && priceTo !== priceFrom && formatPrice(priceTo)}
                      {priceFrom == null && priceTo == null && "—"}
                    </span>
                  </div>
                  {total.units_count != null && (
                    <p className="text-xs text-gray-500">
                      {total.units_count} units · up to {total.units_max_floor} floors
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
