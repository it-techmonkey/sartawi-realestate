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
  stripHtml,
} from "@/lib/properties";
import { useLanguage } from "@/context/LanguageContext";
import { useDisplayText } from "@/hooks/useDisplayText";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [property, setProperty] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const { language } = useLanguage();

  const [displayTitle] = useDisplayText(property?.title || property?.slug || "", language);
  const [displayBuilder] = useDisplayText(property?.builder || "", language);
  const [displayDistrict] = useDisplayText(property?.district?.title || "", language);
  const [displayDescription] = useDisplayText(description || "", language);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetch("/data/all_data.json").then((r) => r.json()),
      fetch("/data/project-descriptions.json")
        .then((r) => r.json())
        .catch(() => ({})),
      fetch(`https://api.alnair.ae/project/look/${encodeURIComponent(slug)}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([data, descData, apiProject]) => {
        const items = data?.data?.items ?? [];
        const prop = getPropertyBySlug(items, slug);
        setProperty(prop);

        const rawFromApi =
          apiProject?.data?.description ??
          apiProject?.description ??
          apiProject?.data?.content ??
          apiProject?.content ??
          apiProject?.body ??
          "";
        const fromApi = rawFromApi ? stripHtml(rawFromApi) : "";

        const fallbackDesc =
          typeof descData[slug] === "string"
            ? descData[slug]
            : descData[slug]?.description || "";
        const cleanedFallback = fallbackDesc ? stripHtml(fallbackDesc) : "";

        setDescription(fromApi || cleanedFallback);
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
  const coverUrl = property.cover?.src || property.cover?.logo;
  const forSale = hasBuy(property);
  const forRent = hasRent(property);
  const hasCoords = property.latitude != null && property.longitude != null;
  const allImages = coverUrl
    ? [coverUrl, ...photos.map((p) => p.src || p.logo).filter(Boolean)]
    : photos.map((p) => p.src || p.logo).filter(Boolean);
  const mainImage = allImages[activePhotoIndex] || coverUrl;
  const hasDescription = description && description.trim().length > 0;

  return (
    <main className="min-h-screen bg-black text-white pb-24 pt-4 sm:pt-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Back link - more visible */}
        <Link
          href="/featured-properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#e0b973] transition-colors py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-white/5"
          aria-label="Back to Featured Properties"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Featured Properties
        </Link>
      </div>

      {/* Hero: on mobile = image only + content below; on md+ = overlay */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-3 sm:mt-4">
        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9] min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl">
          {mainImage ? (
            <ExternalImage
              src={mainImage}
              alt={displayTitle}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none md:from-black/90" />
          {/* Badges on image only */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2 z-10">
            {forSale && (
              <span className="bg-[#e0b973] text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg">
                For Sale
              </span>
            )}
            {forRent && (
              <span className="bg-white/95 text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg">
                For Rent
              </span>
            )}
          </div>
          {/* Desktop: title + meta over image at bottom */}
          <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-6 lg:p-8 hidden md:block">
            <div className={`${allImages.length > 1 ? "mb-20" : ""}`}>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-white drop-shadow-lg max-w-4xl leading-tight">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-sm text-gray-300">
                {displayBuilder && (
                  <Link href={`/developers/${encodeURIComponent(property.builder)}`} className="font-medium text-[#e0b973] hover:underline">
                    {displayBuilder}
                  </Link>
                )}
                {displayDistrict && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {displayDistrict}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Desktop: thumbnails over image */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-6 sm:right-6 hidden md:flex gap-2 overflow-x-auto pb-1 scrollbar-thin z-10">
              {allImages.slice(0, 10).map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhotoIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhotoIndex === i ? "border-[#e0b973] ring-2 ring-[#e0b973]/50 ring-offset-2 ring-offset-black" : "border-white/30 opacity-80 hover:opacity-100 hover:border-white/60"
                  }`}
                >
                  <ExternalImage src={url} alt="" variant="gallery" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile only: title, meta, icon buttons and thumbnails BELOW image (no overlay) */}
        <div className="md:hidden mt-4 px-1">
          <h1 className="text-xl font-semibold text-white leading-tight mb-2">
            {displayTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4">
            {displayBuilder && (
              <Link href={`/developers/${encodeURIComponent(property.builder)}`} className="font-medium text-[#e0b973] hover:underline">
                {displayBuilder}
              </Link>
            )}
            {displayDistrict && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {displayDistrict}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <a
              href="https://wa.me/97145525643"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#e0b973] hover:bg-[#d4a85f] text-black transition-all shadow-lg"
              aria-label="Enquire now on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {hasCoords && (
              <a
                href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl border-2 border-zinc-600 hover:border-[#e0b973] text-white transition-all"
                aria-label="View location on map"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin -mx-1">
              {allImages.slice(0, 10).map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhotoIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhotoIndex === i ? "border-[#e0b973] ring-2 ring-[#e0b973]/50 ring-offset-2 ring-offset-black" : "border-zinc-600 opacity-80 hover:opacity-100"
                  }`}
                >
                  <ExternalImage src={url} alt="" variant="gallery" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-6 sm:mt-12">
        <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 sm:gap-10">
          <div className="lg:flex-1 min-w-0 space-y-6 sm:space-y-8">
            {/* Price - prominent card */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4 sm:p-6 lg:p-8">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Price</p>
              <p className="text-2xl sm:text-4xl font-bold text-[#e0b973] leading-tight">
                {total.price_from != null && formatPrice(total.price_from)}
                {total.price_from != null &&
                  total.price_to != null &&
                  total.price_to !== total.price_from &&
                  " – "}
                {total.price_to != null &&
                  total.price_to !== total.price_from &&
                  formatPrice(total.price_to)}
                {total.price_from == null && total.price_to == null && "N/A"}
              </p>
              {total.price_m2_from != null && (
                <p className="text-gray-400 text-base mt-3">
                  {formatPrice(total.price_m2_from)} – {formatPrice(total.price_m2_to)} per sqm
                </p>
              )}
            </div>

            {/* Overview - clearer grid */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Overview</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                {total.units_count != null && (
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-black/30">
                    <span className="text-gray-400">Units</span>
                    <span className="text-white font-semibold">{total.units_count}</span>
                  </li>
                )}
                {total.units_area_mt != null && (
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-black/30">
                    <span className="text-gray-400">Total area</span>
                    <span className="text-white font-semibold">{formatArea(total.units_area_mt)}</span>
                  </li>
                )}
                {total.units_max_floor != null && (
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-black/30">
                    <span className="text-gray-400">Max floors</span>
                    <span className="text-white font-semibold">{total.units_max_floor}</span>
                  </li>
                )}
                {property.construction_percent != null && property.construction_percent !== "0" && (
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-black/30">
                    <span className="text-gray-400">Construction</span>
                    <span className="text-white font-semibold">{property.construction_percent}%</span>
                  </li>
                )}
                {property.agent_fee_value != null && (
                  <li className="flex justify-between items-center py-3 px-4 rounded-xl bg-black/30">
                    <span className="text-gray-400">Agent fee</span>
                    <span className="text-white font-semibold">{property.agent_fee_value}%</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Unit types */}
            {Object.keys(units).length > 0 && (
              <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Unit types</h2>
                <ul className="space-y-4">
                  {Object.entries(units).map(([key, u]) => (
                    <li
                      key={key}
                      className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 rounded-xl bg-black/30 border-b border-zinc-800/50 last:border-0"
                    >
                      <span className="text-gray-300">
                        {u.count} units · {u.area_from != null && formatArea(u.area_from)}
                        {u.area_to != null && ` – ${formatArea(u.area_to)}`}
                      </span>
                      <span className="text-[#e0b973] font-semibold">
                        {formatPrice(u.price_from)} – {formatPrice(u.price_to)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasDescription && (
              <section className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                  {displayDescription.trim()}
                </p>
              </section>
            )}
          </div>

          {/* Sticky CTA - larger, email has room */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-28 rounded-xl sm:rounded-2xl border-2 border-zinc-700 bg-zinc-900/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 shadow-xl">
              <h3 className="text-xl font-semibold text-white">Interested in this property?</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Get in touch with our team for more details and viewing arrangements.
              </p>

              <a
                href="https://wa.me/97145525643"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#e0b973] hover:bg-[#d4a85f] text-black font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#e0b973]/25 text-lg"
              >
                Enquire now
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {hasCoords && (
                <a
                  href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 border-2 border-zinc-600 hover:border-[#e0b973] text-white font-semibold rounded-xl transition-all duration-200"
                  aria-label="View location on map"
                >
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Show on Map
                </a>
              )}

              <div className="pt-4 border-t border-zinc-700">
                <p className="text-sm text-gray-400 mb-1">Contact</p>
                <p className="text-gray-200 font-medium text-base break-all">
                  +971 45 525 643
                </p>
                <p className="text-gray-200 font-medium text-base break-all mt-1">
                  admin@sartawiproperties.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
