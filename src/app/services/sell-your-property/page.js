"use client";

import { IconStar } from "@/components/ServiceIcons";
import SellPropertyForm from "@/components/SellPropertyForm";

export default function SellYourProperty() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1a1a] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
              <div className="w-8 h-8 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-lg flex items-center justify-center text-black shrink-0">
                <IconStar />
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Sell With Confidence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Sell Your{" "}
              <span className="block sm:inline bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                Property
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get the best value for your property with our dedicated sales team. From valuation and marketing to negotiations and closing, we handle every step so you can sell with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Why Sell With Sartawi?</h2>
          <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-12">
            Expert valuation, premium marketing, and a seamless process from listing to handover.
          </p>
        </div>
      </section>

      <SellPropertyForm />
    </main>
  );
}
