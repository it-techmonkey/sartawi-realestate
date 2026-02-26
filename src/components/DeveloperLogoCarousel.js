"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Display name -> logo filename in public/logos (without .svg). Use exact filenames from folder.
const DEVELOPERS = [
  { name: "Emaar", file: "emaar" },
  { name: "Ellington", file: "ellington" },
  { name: "Deyaar", file: "deyaar" },
  { name: "Omniyat", file: "omniyat" },
  { name: "Arada", file: "arada" },
  { name: "Damac", file: "damac" },
  { name: "Binghatti", file: "binghatti" },
  { name: "Meraas", file: "merras" },
  { name: "Nakheel", file: "nakheel" },
  { name: "Azizi", file: "azizi" },
];

// Logos that are black in the SVG – we show them white on the dark carousel
const BLACK_LOGOS = new Set(["arada", "merras"]);

function DeveloperItem({ developer }) {
  const [imgError, setImgError] = useState(false);
  const { name, file } = developer;
  const logoPath = `/logos/${file}.svg`;
  const isBlackLogo = BLACK_LOGOS.has(file);

  return (
    <Link
      href={`/developers/${encodeURIComponent(name)}`}
      className="flex-shrink-0 flex items-center justify-center h-40 w-40 sm:h-52 sm:w-52 cursor-pointer group"
      aria-label={`View ${name} properties`}
    >
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
        {!imgError ? (
          <Image
            src={logoPath}
            alt={name}
            fill
            className={`object-contain ${isBlackLogo ? "brightness-0 invert" : ""}`}
            sizes="(max-width: 640px) 96px, 112px"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-white font-medium text-xs sm:text-sm tracking-widest uppercase text-center px-2">
            {name}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function DeveloperLogoCarousel() {
  const list = [...DEVELOPERS, ...DEVELOPERS];
  return (
    <section className="h-40 sm:h-48 overflow-hidden bg-black relative" aria-label="Our developers">
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
        <div className="flex w-max animate-marquee gap-14 sm:gap-20 items-center">
          {list.map((dev, i) => (
            <DeveloperItem key={`${dev.name}-${i}`} developer={dev} />
          ))}
        </div>
      </div>
    </section>
  );
}
