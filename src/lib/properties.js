/**
 * Property data utilities for all_data.json structure.
 */

export function getBuilders(items) {
  if (!items || !Array.isArray(items)) return [];
  const seen = new Set();
  const builders = [];
  items.forEach((p) => {
    if (p.builder && !seen.has(p.builder)) {
      seen.add(p.builder);
      builders.push({ name: p.builder, slug: encodeURIComponent(p.builder) });
    }
  });
  return builders.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

export function getPropertiesByBuilder(items, builderNameEncoded) {
  if (!items || !Array.isArray(items) || !builderNameEncoded) return [];
  const name = decodeURIComponent(builderNameEncoded);
  return items.filter((p) => p.builder === name);
}

export function getPropertyBySlug(items, slug) {
  if (!items || !Array.isArray(items) || !slug) return null;
  return items.find((p) => p.slug === slug) || null;
}

export function hasBuy(item) {
  const s = item?.statistics;
  return s && (s.transactions || (s.total && s.total.count > 0));
}

export function hasRent(item) {
  const s = item?.statistics;
  return s && s.rents && Object.keys(s.rents).length > 0;
}

/** Normalize a field (string or { ur, en }) to a single string for search. */
function searchableText(val) {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && ("ur" in val || "en" in val))
    return [val.ur, val.en].filter(Boolean).join(" ");
  return "";
}

export function filterProperties(items, { search = "", type = "All" }) {
  if (!items || !Array.isArray(items)) return [];
  let list = items;
  if (type === "Buy") list = list.filter(hasBuy);
  else if (type === "Rent") list = list.filter(hasRent);
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        searchableText(p.title).toLowerCase().includes(q) ||
        searchableText(p.builder).toLowerCase().includes(q) ||
        searchableText(p.district?.title).toLowerCase().includes(q) ||
        (p.slug && p.slug.toLowerCase().includes(q))
    );
  }
  return list;
}

export function formatPrice(n) {
  if (n == null) return "N/A";
  return new Intl.NumberFormat("en-AE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n) + " AED";
}

export function formatArea(sqm) {
  if (sqm == null) return "N/A";
  return `${Number(sqm).toLocaleString("en-AE")} sqm`;
}

/**
 * Strip HTML tags and decode common entities for plain text display.
 */
export function stripHtml(html) {
  if (typeof html !== "string") return "";
  const doc = typeof document !== "undefined"
    ? new DOMParser().parseFromString(html, "text/html")
    : null;
  if (doc?.body) {
    return doc.body.textContent?.trim() ?? html.replace(/<[^>]*>/g, "").trim();
  }
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
