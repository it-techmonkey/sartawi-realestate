"use client";

import { IconStar, IconBriefcase } from "@/components/ServiceIcons";

export default function CommercialForRent() {
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
                                Premium
                                <span className="block bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                    Business Spaces
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                Discover executive office spaces and commercial properties for lease in Dubai. We provide bespoke solutions for businesses looking to establish or expand their presence in the region.
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-[#262626] hover:border-[#e0b973] transition-all duration-500 hover:shadow-2xl hover:shadow-[#e0b973]/20 overflow-hidden min-h-[400px] flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:opacity-35 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')" }}
                                ></div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#e0b973] to-[#f4d03f] flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-[#e0b973]/25 text-black">
                                        <IconBriefcase />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                            Bespoke Solutions
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            Flexible lease terms and premium amenities in top-tier commercial developments catering to your specific needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Find Your Business Home</h2>
                        <p className="text-gray-300 text-lg">Contact our leasing experts for a personalized property selection</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-3xl border border-[#262626] p-8 shadow-2xl shadow-black/50">
                        <div className="max-w-xl mx-auto">
                            <h3 className="text-center text-3xl font-bold mb-8 text-white">Leasing Inquiry</h3>
                            <form className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Company Name / Full Name"
                                    className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all"
                                />
                                <select className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all">
                                    <option value="">Desired Property Type</option>
                                    <option value="Office">Office</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Warehouse">Warehouse</option>
                                </select>
                                <select className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all">
                                    <option value="">Space Required (sqft)</option>
                                    <option value="Up to 1,000">Up to 1,000</option>
                                    <option value="1,000 - 5,000">1,000 - 5,000</option>
                                    <option value="5,000+">5,000+</option>
                                </select>
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    required
                                    className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Preferred Area"
                                    className="w-full bg-[#262626] border border-[#333] rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-[#e0b973] hover:text-white transition-all duration-300 transform active:scale-95"
                                >
                                    Request Availability
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
