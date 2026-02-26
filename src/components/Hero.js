"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter();
    const [isBuy, setIsBuy] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [videoReady, setVideoReady] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        params.set("type", isBuy ? "Buy" : "Rent");
        router.push(`/featured-properties?${params.toString()}`);
    };

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onCanPlay = () => setVideoReady(true);
        const onError = () => setVideoError(true);
        v.addEventListener("canplay", onCanPlay);
        v.addEventListener("error", onError);
        return () => {
            v.removeEventListener("canplay", onCanPlay);
            v.removeEventListener("error", onError);
        };
    }, []);

    const showVideo = videoReady && !videoError;

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white -mt-28 pt-28">
            {/* Fallback gradient when video is missing or fails (e.g. placeholder file) */}
            <div
                className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black"
                aria-hidden
            />
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${showVideo ? "opacity-100" : "opacity-0"}`}
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            <div className="absolute inset-0 top-28 bottom-0 left-0 right-0 z-10 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
                    Discover Your Dream Property
                    <br /> with <span className="font-semibold">Sartawi</span>
                </h1>

                <div className="mt-8 flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                    <button
                        type="button"
                        onClick={() => setIsBuy(true)}
                        aria-pressed={isBuy}
                        className={`min-h-[44px] px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            isBuy ? "bg-[#e0b973] text-black" : "text-white/90 hover:text-white"
                        }`}
                    >
                        Buy
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsBuy(false)}
                        aria-pressed={!isBuy}
                        className={`min-h-[44px] px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            !isBuy ? "bg-[#e0b973] text-black" : "text-white/90 hover:text-white"
                        }`}
                    >
                        Rent
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mt-6 w-full max-w-xl">
                    <div className="flex bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/20">
                        <input
                            type="search"
                            name="q"
                            placeholder="Search properties, location, developer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow min-w-0 px-5 py-3.5 sm:py-4 bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#e0b973]/50 focus:ring-inset rounded-full text-sm sm:text-base"
                            aria-label="Search properties"
                        />
                        <button
                            type="submit"
                            className="shrink-0 bg-[#e0b973] text-black py-3.5 px-6 sm:px-8 font-semibold hover:bg-[#d4a85f] transition-colors rounded-full m-1.5 min-h-[44px]"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Hero;
