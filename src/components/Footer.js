"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Developers", href: "/developers" },
  { label: "Featured Properties", href: "/featured-properties" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Homes for Sale", href: "/services/homes-for-sale" },
  { label: "Homes for Rent", href: "/services/homes-for-rent" },
  { label: "Commercial for Sale", href: "/services/commercial-for-sale" },
  { label: "Commercial for Rent", href: "/services/commercial-for-rent" },
  { label: "Sell Your Property", href: "/services/sell-your-property" },
  { label: "Partner Services", href: "/services/partner-services" },
];

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-black text-white border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              {logoError ? (
                <span className="text-2xl font-semibold text-white tracking-tight">Sartawi</span>
              ) : (
                <Image
                  alt="Sartawi Properties"
                  width={180}
                  height={56}
                  className="h-12 w-auto object-contain"
                  src="/logo.png"
                  onError={() => setLogoError(true)}
                  unoptimized
                />
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              Trust. Resilience. Ambition. Premium real estate in Dubai for investors and families.
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#e0b973] mb-3">
                Stay updated
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e0b973]/60 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#e0b973] hover:bg-[#d4a85f] text-black font-semibold rounded-lg text-sm transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#e0b973] mb-4">
              Explore
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#e0b973] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#e0b973] mb-4">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#e0b973] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-16 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a href="tel:+97145525643" className="hover:text-[#e0b973] transition-colors">
              +971 45 525 643
            </a>
            <a href="mailto:admin@sartawiproperties.com" className="hover:text-[#e0b973] transition-colors whitespace-nowrap">
              admin@sartawiproperties.com
            </a>
            <span>Sartawi Properties, Parklane Tower, 901</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/sartawiproperties"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-[#e0b973] hover:border-[#e0b973]/50 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/sartawi-properties"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-[#e0b973] hover:border-[#e0b973]/50 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-8 pt-6 border-t border-zinc-800/80 text-xs text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} Sartawi Properties. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
