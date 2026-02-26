"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGE } from "@/lib/imageDimensions";

/**
 * Renders external (files.alnair.ae) or local images with fixed dimensions.
 * Falls back to placeholder on error. Use for property/developer images so they always display.
 */
export default function ExternalImage({
  src,
  alt = "",
  variant = "card", // "card" | "hero" | "gallery" | "developerLogo"
  className = "",
  fill = false,
  priority = false,
  ...props
}) {
  const [error, setError] = useState(false);

  const dimensions = {
    card: { width: IMAGE.CARD_WIDTH, height: IMAGE.CARD_HEIGHT, sizes: "(max-width: 768px) 100vw, 400px" },
    hero: { width: IMAGE.DETAIL_HERO_WIDTH, height: IMAGE.DETAIL_HERO_HEIGHT, sizes: "100vw" },
    gallery: { width: IMAGE.GALLERY_THUMB_WIDTH, height: IMAGE.GALLERY_THUMB_HEIGHT, sizes: "200px" },
    developerLogo: { width: IMAGE.DEVELOPER_LOGO_WIDTH, height: IMAGE.DEVELOPER_LOGO_HEIGHT, sizes: "160px" },
  };
  const dim = dimensions[variant] || dimensions.card;

  if (!src || error) {
    return (
      <div
        className={`bg-zinc-800 flex items-center justify-center text-gray-500 text-sm ${fill ? "absolute inset-0" : ""} ${className}`}
        style={fill ? {} : { width: dim.width, height: dim.height }}
        {...(fill ? {} : props)}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : dim.width}
      height={fill ? undefined : dim.height}
      fill={fill}
      className={className}
      sizes={dim.sizes}
      onError={() => setError(true)}
      unoptimized
      priority={priority}
      {...props}
    />
  );
}
