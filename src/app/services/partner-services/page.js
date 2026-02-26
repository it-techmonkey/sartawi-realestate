"use client";

import Link from "next/link";
import { IconGlobe, IconHandshake } from "@/components/ServiceIcons";

export default function PartnerServices() {
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
                                    <IconGlobe />
                                </div>
                                <span className="text-sm font-semibold tracking-wider uppercase">Global Network</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                Empowering
                                <span className="block bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                    Global Partners
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                Exclusive real estate solutions and partner networks for international investors. We bridge the gap between global capital and Dubai&apos;s premier real estate opportunities.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="relative group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b973] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-3xl min-h-[44px]"
                            aria-label="Go to Property Inquiry – collaboration and partnership"
                        >
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-[#262626] hover:border-[#e0b973] transition-all duration-500 hover:shadow-2xl hover:shadow-[#e0b973]/20 overflow-hidden min-h-[400px] flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-20 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110"
                                    style={{ backgroundImage: "url('/serviceimage/PartnerServices.png')" }}
                                ></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#e0b973] to-[#f4d03f] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-[#e0b973]/25 text-black">
                                        <IconHandshake />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                            Collaboration
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            Unlocking unique value through strategic collaborations and a comprehensive suite of investor-focused services.
                                        </p>
                                        <span className="inline-block mt-4 text-[#e0b973] font-semibold">Property Inquiry →</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Partnership Section */}
            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Partner with Sartawi</h2>
                        <p className="text-gray-300 text-lg">Join our growing network of international partners and investors</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-3xl border border-[#262626] p-8 shadow-2xl shadow-black/50">
                        <div className="max-w-xl mx-auto text-center">
                            <h3 className="text-3xl font-bold mb-4 text-white">Partnership & Property Inquiry</h3>
                            <p className="text-gray-300 mb-8">Submit your inquiry through our Contact page for property or partnership requests.</p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center min-h-[48px] px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-[#e0b973] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e0b973] focus:ring-offset-2 focus:ring-offset-black"
                            >
                                Go to Property Inquiry
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
