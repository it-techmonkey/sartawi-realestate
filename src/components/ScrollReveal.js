"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  variants = defaultVariants,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
