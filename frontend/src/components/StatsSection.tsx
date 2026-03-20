import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Coverage" },
  { value: "12+", label: "Years of Experience" },
];

const AnimatedStat = ({ value, label, index }: { value: string; label: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.span
        className="block text-4xl md:text-5xl font-display font-bold gm-glow-text"
        initial={{ y: 20 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
      >
        {value}
      </motion.span>
      <span className="text-muted-foreground text-sm mt-2 block">{label}</span>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative z-10 px-6 py-28">
      <div className="max-w-5xl mx-auto">
        {/* Divider line */}
        <ScrollReveal direction="scale" className="mb-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.3} className="text-center">
          <div className="gm-card rounded-2xl p-10 md:p-16 relative overflow-hidden">
            {/* Glow orb background */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10">
              <h2 className="gm-section-title mb-4">
                Ready to <span className="gm-glow-text">Transform</span> Your Business?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Let's discuss how GluonMind can accelerate your technology goals with intelligent, scalable solutions.
              </p>
              <motion.button
                className="px-10 py-4 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(214 82% 55% / 0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Conversation
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsSection;
