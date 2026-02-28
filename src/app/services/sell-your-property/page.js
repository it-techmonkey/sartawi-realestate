"use client";

import Link from "next/link";
import { IconStar } from "@/components/ServiceIcons";

export default function SellYourProperty() {
    return (
        <main className="min-h-screen bg-black text-white">
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
                                <span className="text-sm font-semibold tracking-wider uppercase">Sell With Confidence</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                Sell Your
                                <span className="block bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                    Property
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                Get the best value for your property with our dedicated sales team. From valuation and marketing to negotiations and closing, we handle every step so you can sell with confidence.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="relative group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b973] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-3xl min-h-[44px]"
                            aria-label="Get a valuation and sell your property"
                        >
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-[#262626] hover:border-[#e0b973] transition-all duration-500 hover:shadow-2xl hover:shadow-[#e0b973]/20 overflow-hidden min-h-[400px] flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-35 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110 bg-zinc-900"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80')" }}
                                ></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#e0b973] to-[#f4d03f] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-[#e0b973]/25 text-black">
                                        <IconStar />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                            Get a Free Valuation
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            Contact us for a no obligation valuation and personalised sales strategy.
                                        </p>
                                        <span className="inline-block mt-4 text-[#e0b973] font-semibold">Request valuation →</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Why Sell With Sartawi?</h2>
                    <p className="text-gray-300 text-lg mb-12">Expert valuation, premium marketing, and a seamless process from listing to handover.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center min-h-[48px] px-8 py-4 bg-[#e0b973] text-black rounded-xl font-bold text-lg hover:bg-[#d4a85f] transition-all duration-300"
                    >
                        Contact Us to Sell
                    </Link>
                </div>
            </section>
        </main>
    );
}
