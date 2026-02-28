"use client";

import { IconStar, IconChart } from "@/components/ServiceIcons";

export default function CommercialForSale() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1a1a] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-lg flex items-center justify-center text-black shrink-0">
                                    <IconStar />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Premium Service</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                Secure Your{" "}
                                <span className="block sm:inline bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                    Business Future
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Explore a vast array of commercial properties for sale in Dubai. From executive office spaces to prime retail units, we help you find the ideal investment for your business.
                            </p>
                        </div>

                        <div className="relative group hidden lg:block">
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-6 sm:p-8 rounded-2xl lg:rounded-3xl border border-[#262626] hover:border-[#e0b973] transition-all duration-500 hover:shadow-2xl hover:shadow-[#e0b973]/20 overflow-hidden min-h-[320px] lg:min-h-[400px] flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:opacity-35 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80')" }}
                                ></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#e0b973] to-[#f4d03f] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-[#e0b973]/25 text-black">
                                        <IconChart />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                            Strategic Investments
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            High-yield commercial opportunities in Dubai&apos;s most thriving business districts and economic zones.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Invest in Commercial Real Estate</h2>
                        <p className="text-gray-300 text-base sm:text-lg">Speak with our commercial investment specialists today</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-2xl lg:rounded-3xl border border-[#262626] p-6 sm:p-8 shadow-2xl shadow-black/50">
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-white">Commercial Inquiry</h2>
                            <form className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Company Name / Full Name"
                                    className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all"
                                />
                                <select className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all">
                                    <option value="">Commercial Property Type</option>
                                    <option value="Office Space">Office Space</option>
                                    <option value="Retail Unit">Retail Unit</option>
                                    <option value="Warehouse">Warehouse</option>
                                    <option value="Building / Land">Building / Land</option>
                                </select>
                                <select className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all">
                                    <option value="">Budget Range</option>
                                    <option value="AED 1M - 5M">AED 1M - 5M</option>
                                    <option value="AED 5M - 20M">AED 5M - 20M</option>
                                    <option value="AED 20M+">AED 20M+</option>
                                </select>
                                <input
                                    type="tel"
                                    placeholder="Contact Number *"
                                    required
                                    className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Desired Business Area"
                                    className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-[#e0b973] hover:text-white transition-all duration-300 transform active:scale-95"
                                >
                                    Request Consultation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
