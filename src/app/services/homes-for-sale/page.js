"use client";

import Link from "next/link";
import { IconStar, IconHome } from "@/components/ServiceIcons";

export default function HomesForSale() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1a1a] text-white py-24 px-6 sm:px-10 lg:px-24 overflow-hidden min-h-[70vh] flex items-center">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-lg flex items-center justify-center text-black">
                                    <IconStar />
                                </div>
                                <span className="text-sm font-semibold tracking-wider uppercase">Premium Service</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                Find Your
                                <span className="block bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                    Dream Home
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                Discover your dream home with our extensive collection of residential properties. From cozy apartments to luxury villas, we offer a wide range of homes for sale across Dubai&apos;s most desirable locations.
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-[#262626] hover:border-[#e0b973] transition-all duration-500 hover:shadow-2xl hover:shadow-[#e0b973]/20 overflow-hidden min-h-[400px] flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-20 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110"
                                    style={{ backgroundImage: "url('/serviceimage/HomeforSale.png')" }}
                                ></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#e0b973] to-[#f4d03f] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-[#e0b973]/25 text-black">
                                        <IconHome />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                            Premium Selection
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            Handpicked properties with premium amenities, prime locations, and exceptional value
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-16">
                <div className="max-w-xl mx-auto">
                    <p className="text-[#e0b973] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 text-center">Property enquiry</p>
                    <h2 className="text-2xl sm:text-3xl font-normal text-white mb-2 text-center">Request a callback</h2>
                    <p className="text-zinc-400 text-sm text-center mb-8">Tell us what you&apos;re looking for and we&apos;ll get in touch. Or <Link href="/contact" className="text-[#e0b973] hover:underline">contact us</Link> directly.</p>
                    <form className="bg-zinc-900/60 rounded-xl p-6 sm:p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Full name</label>
                            <input type="text" placeholder="Your name" className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Phone</label>
                                <input type="tel" required placeholder="+971 50 000 0000" className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Email</label>
                                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Property type</label>
                            <select className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-[#e0b973]/50">
                                <option value="">Select</option>
                                <option value="1 Bedroom">1 Bedroom</option>
                                <option value="2 Bedrooms">2 Bedrooms</option>
                                <option value="3 Bedrooms">3 Bedrooms</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Preferred area</label>
                            <input type="text" placeholder="Area or community" className="w-full px-4 py-3 min-h-[44px] bg-black/50 border border-zinc-700/80 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#e0b973]/50" />
                        </div>
                        <button type="submit" className="w-full py-3.5 min-h-[48px] bg-[#e0b973] hover:bg-[#d4a85f] text-black font-semibold text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#e0b973] focus:ring-offset-2 focus:ring-offset-black">
                            Submit enquiry
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
