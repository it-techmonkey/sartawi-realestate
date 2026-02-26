"use client";

import { useEffect, useState } from "react";
import { useMap, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FitBounds({ items }) {
  const map = useMap();
  useEffect(() => {
    const withCoords = items.filter(
      (p) => p.latitude != null && p.longitude != null
    );
    if (withCoords.length === 0) return;
    if (withCoords.length === 1) {
      map.setView([withCoords[0].latitude, withCoords[0].longitude], 14);
      return;
    }
    const bounds = L.latLngBounds(
      withCoords.map((p) => [p.latitude, p.longitude])
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, items]);
  return null;
}

const markerIcon =
  typeof L !== "undefined"
    ? L.divIcon({
        className: "custom-marker",
        html: '<div style="background:#e0b973;width:24px;height:24px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
    : null;

export default function PropertiesMap({ items, selectedSlug, dark = false }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const withCoords = (items || []).filter(
    (p) => p.latitude != null && p.longitude != null
  );

  if (!mounted || withCoords.length === 0) {
    return (
      <div className="w-full h-full min-h-[400px] bg-zinc-900 rounded-xl flex items-center justify-center text-gray-500">
        {!mounted ? "Loading map..." : "No locations to show."}
      </div>
    );
  }

  const center =
    withCoords.length > 0
      ? [
          withCoords.reduce((a, p) => a + p.latitude, 0) / withCoords.length,
          withCoords.reduce((a, p) => a + p.longitude, 0) / withCoords.length,
        ]
      : [25.2, 55.27];

  const tileUrl = dark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = dark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <MapContainer
      center={center}
      zoom={11}
      className={`w-full h-full min-h-[400px] rounded-xl z-0 ${dark ? "map-dark" : ""}`}
      scrollWheelZoom
    >
      <TileLayer attribution={attribution} url={tileUrl} />
      <FitBounds items={withCoords} />
      {withCoords.map((prop) => (
        <Marker
          key={prop.id}
          position={[prop.latitude, prop.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <a
              href={`/properties/${prop.slug}`}
              className="text-[#e0b973] font-semibold hover:underline"
            >
              {prop.title || prop.slug}
            </a>
            {prop.statistics?.total?.price_from != null && (
              <p className="text-sm text-gray-600 mt-1">
                from {Number(prop.statistics.total.price_from).toLocaleString()} AED
              </p>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
