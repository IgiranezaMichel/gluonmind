import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SectionSeparatorProps = {
  direction?: "left" | "right";
};

const SectionSeparator = ({ direction = "left" }: SectionSeparatorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.85, 0.85, 0.2]);

  return (
    <div ref={ref} className="relative z-10 px-6 py-8">
      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="relative h-6 w-full max-w-3xl flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            style={{
              width: "60%",
              transformOrigin: direction === "left" ? "left center" : "right center",
              scaleX,
              opacity,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionSeparator;
