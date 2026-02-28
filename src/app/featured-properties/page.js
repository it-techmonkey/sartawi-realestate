"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import PageHero from "@/components/PageHero";
import ExternalImage from "@/components/ExternalImage";
import {
  filterProperties,
  formatPrice,
  formatArea,
  hasBuy,
  hasRent,
} from "@/lib/properties";

const PropertiesMap = dynamic(
  () => import("@/components/PropertiesMap"),
  { ssr: false, loading: () => <div className="w-full h-[400px] bg-zinc-900 rounded-xl animate-pulse" /> }
);

function FeaturedPropertiesFallback() {
  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <PageHero title={<>Featured <span className="text-[#e0b973]">Properties</span></>} subtitle="Loading…" />
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <p className="text-zinc-500">Loading properties…</p>
      </div>
    </main>
  );
}

function FeaturedPropertiesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Buy");
  const [showMap, setShowMap] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const PROPERTIES_PER_PAGE = 12;

  useEffect(() => {
    const q = searchParams.get("search") ?? "";
    const t = searchParams.get("type");
    const id = requestAnimationFrame(() => {
      if (q) setSearch(q);
      if (t === "Buy" || t === "Rent") setType(t);
    });
    return () => cancelAnimationFrame(id);
  }, [searchParams]);

  useEffect(() => {
    fetch("/data/all_data.json")
      .then((r) => r.json())
      .then((data) => {
        setItems(data?.data?.items ?? []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const updateUrl = useCallback((newSearch, newType) => {
    const params = new URLSearchParams();
    if (newSearch.trim()) params.set("search", newSearch.trim());
    params.set("type", newType);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearch(v);
    updateUrl(v, type);
  };
  const handleTypeChange = (newType) => {
    setType(newType);
    updateUrl(search, newType);
  };

  const filteredProperties = filterProperties(items, { search, type });
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE));
  const paginatedProperties = filteredProperties.slice(
    (page - 1) * PROPERTIES_PER_PAGE,
    page * PROPERTIES_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, type]);

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <PageHero
        title={
          <>
            Featured <span className="text-[#e0b973]">Properties</span>
          </>
        }
        subtitle="Explore properties in Dubai. Search, filter by Buy or Rent, and view on map."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-2 rounded-xl sm:rounded-full px-4 py-3 w-full lg:max-w-md bg-zinc-900/50 border border-zinc-800/80 min-h-[48px]">
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
              placeholder="Search by name, developer, or area..."
              aria-label="Search properties"
              className="focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 focus:ring-inset w-full text-white bg-transparent placeholder-gray-500 min-h-[44px] rounded-xl sm:rounded-full"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex flex-wrap items-stretch gap-3 sm:gap-4">
            <div className="flex bg-zinc-800/80 rounded-full p-1 border border-zinc-700/80 h-12">
              <button
                type="button"
                onClick={() => handleTypeChange("Buy")}
                aria-pressed={type === "Buy"}
                className={`h-full flex items-center ${
                  type === "Buy"
                    ? "bg-[#e0b973] text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                } text-xs md:text-sm px-5 sm:px-6 rounded-full transition-all`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("Rent")}
                aria-pressed={type === "Rent"}
                className={`h-full flex items-center ${
                  type === "Rent"
                    ? "bg-[#e0b973] text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                } text-xs md:text-sm px-5 sm:px-6 rounded-full transition-all`}
              >
                Rent
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              aria-expanded={showMap}
              aria-label={showMap ? "Hide map" : "Show on map"}
              className={`h-12 flex items-center justify-center gap-2 rounded-full transition-colors duration-200 text-xs md:text-sm font-semibold px-5 sm:px-6 ${
                showMap
                  ? "bg-[#e0b973] text-black hover:bg-[#d4a85f]"
                  : "bg-zinc-800/80 text-white hover:bg-zinc-700 border border-zinc-700/80"
              }`}
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {showMap ? "Hide Map" : "Show on Map"}
            </button>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="rounded-xl overflow-hidden border border-zinc-800 h-[500px]">
            <PropertiesMap items={filteredProperties} dark />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => setShowMap(false)}
              aria-label="Hide map"
              className="h-12 px-6 rounded-full bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 flex items-center gap-2 text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
              </svg>
              Hide Map
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
          Loading properties...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 max-w-7xl mx-auto pb-8">
          {paginatedProperties.map((prop, index) => {
            const total = prop.statistics?.total || {};
            const coverUrl = prop.cover?.logo || prop.cover?.src;
            const forSale = hasBuy(prop);
            const forRent = hasRent(prop);
            const isPriority = page === 1 && index < 6;
            return (
              <Link
                key={prop.id}
                href={`/properties/${prop.slug}`}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#e0b973] transition-all duration-300 shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full bg-zinc-800">
                  {coverUrl ? (
                    <ExternalImage
                      src={coverUrl}
                      alt={prop.title || prop.slug}
                      variant="card"
                      fill
                      priority={isPriority}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {type === "Buy" && forSale && (
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider">
                        For Sale
                      </span>
                    )}
                    {type === "Rent" && forRent && (
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider">
                        For Rent
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold group-hover:text-[#e0b973] transition-colors leading-tight line-clamp-2">
                      {prop.title || prop.slug}
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      {prop.district?.title && (
                        <>
                          <svg
                            className="w-4 h-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {prop.district.title}
                        </>
                      )}
                      {prop.builder && !prop.district?.title && prop.builder}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <div className="text-[#e0b973] font-bold text-lg">
                      {total.price_from != null && formatPrice(total.price_from)}
                      {total.price_from != null &&
                        total.price_to != null &&
                        total.price_to !== total.price_from &&
                        " - "}
                      {total.price_to != null &&
                        total.price_to !== total.price_from &&
                        formatPrice(total.price_to)}
                      {total.price_from == null && total.price_to == null && "N/A"}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 text-[#bebebe] text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold">
                        {total.units_count ?? "N/A"} units
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-x border-zinc-800">
                      <span className="text-xs font-semibold">
                        {total.units_area_mt != null
                          ? formatArea(total.units_area_mt)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold">
                        {total.units_max_floor != null
                          ? `Up to ${total.units_max_floor} floors`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && filteredProperties.length > 0 && totalPages > 1 && (
        <nav className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center gap-2" aria-label="Properties pagination">
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

      {!loading && filteredProperties.length === 0 && (
        <div className="text-center py-20 px-4">
          <p className="text-gray-500 text-lg">
            No properties found
            {search && ` matching "${search}"`}
            {type !== "All" && ` for ${type}`}.
          </p>
        </div>
      )}
    </main>
  );
}

export default function FeaturedPropertiesPage() {
  return (
    <Suspense fallback={<FeaturedPropertiesFallback />}>
      <FeaturedPropertiesContent />
    </Suspense>
  );
}
