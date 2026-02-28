"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [isOpen]);

    return (
        <nav
            className={`sticky top-0 left-0 right-0 px-4 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
                scrolled ? "bg-white/5 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-transparent"
            }`}
        >
            <Link href="/" className="flex items-center min-h-[44px]">
                {logoError ? (
                    <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        Sartawi
                    </span>
                ) : (
                    <Image
                        alt="Sartawi Properties"
                        width={220}
                        height={60}
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain object-left"
                        src="/logo.png"
                        priority
                        onError={() => setLogoError(true)}
                        unoptimized
                    />
                )}
            </Link>
            <div className="md:hidden flex items-center">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b973] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg -mr-2"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
                    <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                        aria-hidden
                    >
                        {isOpen ? (
                            <path d="M6 6l12 12M6 18L18 6" />
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center mr-10">
                <Link
                    href="/developers"
                    className="text-white hover:text-[#e0b973] transition-colors"
                >
                    Developers
                </Link>
                <Link
                    href="/featured-properties"
                    className="text-white hover:text-[#e0b973] transition-colors"
                >
                    Featured Properties
                </Link>
                <div className="relative group">
                    <button className="text-white hover:text-[#e0b973] flex items-center gap-1 transition-colors">
                        Our Services{" "}
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                        </svg>
                    </button>
                    <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-black border border-gray-700 rounded-md shadow-lg overflow-hidden">
                            {[
                                { name: "Homes for Sale", href: "/services/homes-for-sale" },
                                { name: "Homes for Rent", href: "/services/homes-for-rent" },
                                {
                                    name: "Commercial for Sale",
                                    href: "/services/commercial-for-sale",
                                },
                                {
                                    name: "Commercial for Rent",
                                    href: "/services/commercial-for-rent",
                                },
                                { name: "Sell Your Property", href: "/services/sell-your-property" },
                                { name: "Partner Services", href: "/services/partner-services" },
                            ].map((service) => (
                                <Link
                                    key={service.href}
                                    className="block px-4 py-3 text-sm text-white hover:bg-[#1a1a1a] hover:text-[#e0b973] transition-all"
                                    href={service.href}
                                >
                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <Link
                    href="/about"
                    className="text-white hover:text-[#e0b973] transition-colors"
                >
                    About Us
                </Link>
                <Link
                    href="/contact"
                    className="text-white hover:text-[#e0b973] transition-colors min-h-[44px] flex items-center"
                >
                    Contact Us
                </Link>
            </div>

            {/* Mobile Menu: full-screen overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!isOpen}
            >
                <button
                    type="button"
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                />
                <div
                    className={`absolute top-0 left-0 right-0 bg-black border-b border-zinc-800/80 transition-transform duration-300 ease-out ${
                        isOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                    style={{ paddingTop: "env(safe-area-inset-top)" }}
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80">
                        <span className="text-white font-semibold text-lg">Menu</span>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white rounded-lg hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b973]"
                            aria-label="Close menu"
                        >
                            <svg className="w-7 h-7" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 6l12 12M6 18L18 6" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col px-6 pb-8 pt-2 max-h-[calc(100vh-4rem)] overflow-y-auto" aria-label="Main">
                        <Link
                            href="/developers"
                            className="py-4 text-lg text-white hover:text-[#e0b973] border-b border-zinc-800/80 min-h-[48px] flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Developers
                        </Link>
                        <Link
                            href="/featured-properties"
                            className="py-4 text-lg text-white hover:text-[#e0b973] border-b border-zinc-800/80 min-h-[48px] flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Featured Properties
                        </Link>
                        <div className="py-4 border-b border-zinc-800/80">
                            <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-wider mb-3">
                                Our Services
                            </p>
                            <div className="flex flex-col gap-1">
                                {[
                                    { name: "Homes for Sale", href: "/services/homes-for-sale" },
                                    { name: "Homes for Rent", href: "/services/homes-for-rent" },
                                    { name: "Commercial for Sale", href: "/services/commercial-for-sale" },
                                    { name: "Commercial for Rent", href: "/services/commercial-for-rent" },
                                    { name: "Sell Your Property", href: "/services/sell-your-property" },
                                    { name: "Partner Services", href: "/services/partner-services" },
                                ].map((service) => (
                                    <Link
                                        key={service.href}
                                        className="py-3 text-white hover:text-[#e0b973] min-h-[44px] flex items-center"
                                        href={service.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {service.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link
                            href="/about"
                            className="py-4 text-lg text-white hover:text-[#e0b973] border-b border-zinc-800/80 min-h-[48px] flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="py-4 text-lg text-white hover:text-[#e0b973] min-h-[48px] flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
