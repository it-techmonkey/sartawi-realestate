"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ExternalImage from "@/components/ExternalImage";
import { useParams } from "next/navigation";
import {
  getPropertyBySlug,
  formatPrice,
  formatArea,
  hasBuy,
  hasRent,
} from "@/lib/properties";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [property, setProperty] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetch("/data/all_data.json").then((r) => r.json()),
      fetch("/data/project-descriptions.json")
        .then((r) => r.json())
        .catch(() => ({})),
    ])
      .then(([data, descData]) => {
        const items = data?.data?.items ?? [];
        const prop = getPropertyBySlug(items, slug);
        setProperty(prop);
        const desc =
          typeof descData[slug] === "string"
            ? descData[slug]
            : descData[slug]?.description || "";
        setDescription(desc);
      })
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#e0b973] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading property...</p>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-gray-400">Property not found.</p>
        <Link
          href="/featured-properties"
          className="text-[#e0b973] font-medium hover:underline py-2 px-4 rounded-lg border border-[#e0b973]/50"
        >
          Back to Featured Properties
        </Link>
      </main>
    );
  }

  const total = property.statistics?.total || {};
  const units = property.statistics?.units || {};
  const photos = property.photos || [];
  const coverUrl = property.cover?.logo || property.cover?.src;
  const forSale = hasBuy(property);
  const forRent = hasRent(property);
  const hasCoords = property.latitude != null && property.longitude != null;
  const allImages = coverUrl
    ? [coverUrl, ...photos.map((p) => p.logo || p.src).filter(Boolean)]
    : photos.map((p) => p.logo || p.src).filter(Boolean);
  const mainImage = allImages[activePhotoIndex] || coverUrl;
  const hasDescription = description && description.trim().length > 0;

  return (
    <main className="min-h-screen bg-black text-white pb-24 pt-20">
      {/* Back link - subtle */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link
          href="/featured-properties"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#e0b973] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Featured Properties
        </Link>
      </div>

      {/* Hero image + badges */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="relative w-full aspect-[21/9] min-h-[280px] rounded-2xl overflow-hidden bg-zinc-900">
          {mainImage ? (
            <ExternalImage
              src={mainImage}
              alt={property.title || property.slug}
              variant="hero"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Image unavailable
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            {forSale && (
              <span className="bg-[#e0b973] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                For Sale
              </span>
            )}
            {forRent && (
              <span className="bg-white/90 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                For Rent
              </span>
            )}
          </div>
          {/* Thumbnail strip when multiple images */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {allImages.slice(0, 8).map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhotoIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative shrink-0 w-16 h-16 min-h-[44px] min-w-[64px] rounded-lg overflow-hidden border-2 transition-all ${
                    activePhotoIndex === i
                      ? "border-[#e0b973] ring-2 ring-[#e0b973]/30"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <ExternalImage src={url} alt="" variant="gallery" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 lg:pt-10">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Left: content */}
          <div className="lg:flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-2">
              {property.title || property.slug}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mb-8">
              {property.builder && (
                <Link
                  href={`/developers/${encodeURIComponent(property.builder)}`}
                  className="text-[#e0b973] hover:underline"
                >
                  {property.builder}
                </Link>
              )}
              {property.district?.title && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {property.district.title}
                </span>
              )}
            </div>

            {/* Price card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Price</p>
              <p className="text-2xl sm:text-3xl font-semibold text-[#e0b973]">
                {total.price_from != null && formatPrice(total.price_from)}
                {total.price_from != null &&
                  total.price_to != null &&
                  total.price_to !== total.price_from &&
                  " – "}
                {total.price_to != null &&
                  total.price_to !== total.price_from &&
                  formatPrice(total.price_to)}
                {total.price_from == null && total.price_to == null && "—"}
              </p>
              {total.price_m2_from != null && (
                <p className="text-gray-400 text-sm mt-2">
                  {formatPrice(total.price_m2_from)} – {formatPrice(total.price_m2_to)} per sqm
                </p>
              )}
            </div>

            {/* Overview */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Overview</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {total.units_count != null && (
                  <li className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-gray-400">Units</span>
                    <span className="text-white font-medium">{total.units_count}</span>
                  </li>
                )}
                {total.units_area_mt != null && (
                  <li className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-gray-400">Total area</span>
                    <span className="text-white font-medium">{formatArea(total.units_area_mt)}</span>
                  </li>
                )}
                {total.units_max_floor != null && (
                  <li className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-gray-400">Max floors</span>
                    <span className="text-white font-medium">{total.units_max_floor}</span>
                  </li>
                )}
                {property.construction_percent != null && property.construction_percent !== "0" && (
                  <li className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-gray-400">Construction</span>
                    <span className="text-white font-medium">{property.construction_percent}%</span>
                  </li>
                )}
                {property.agent_fee_value != null && (
                  <li className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-gray-400">Agent fee</span>
                    <span className="text-white font-medium">{property.agent_fee_value}%</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Unit types */}
            {Object.keys(units).length > 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Unit types</h2>
                <ul className="space-y-3 text-sm">
                  {Object.entries(units).map(([key, u]) => (
                    <li
                      key={key}
                      className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-zinc-800 last:border-0"
                    >
                      <span className="text-gray-400">
                        {u.count} units · {u.area_from != null && formatArea(u.area_from)}
                        {u.area_to != null && ` – ${formatArea(u.area_to)}`}
                      </span>
                      <span className="text-[#e0b973] font-medium">
                        {formatPrice(u.price_from)} – {formatPrice(u.price_to)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description - only when we have content */}
            {hasDescription && (
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {description.trim()}
                </p>
              </section>
            )}
          </div>

          {/* Right: sticky CTA card */}
          <div className="lg:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Interested in this property?</h3>
              <p className="text-sm text-gray-400">
                Get in touch with our team for more details and viewing arrangements.
              </p>

              <a
                href="https://wa.me/97145525643"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-[#e0b973] hover:bg-[#d4a85f] text-black font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#e0b973]/20"
              >
                Enquire now
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {hasCoords && (
                <a
                  href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 border-2 border-zinc-600 hover:border-[#e0b973] text-white font-semibold rounded-xl transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
                    />
                  </svg>
                  View on map
                </a>
              )}

              <div className="pt-2 border-t border-zinc-800">
                <p className="text-xs text-gray-500">
                  +971 45 525 643 · admin@sartawiproperties.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
