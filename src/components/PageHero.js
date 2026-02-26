"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PageHero({ title, subtitle, children }) {
  return (
    <header className="relative w-full min-h-[32vh] sm:min-h-[36vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/bgimg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
        >
          {typeof title === "string" ? title : title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-xl text-gray-300 text-sm sm:text-base"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  );
}
