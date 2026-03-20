import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Terrabuild Construction",
    avatar: "SC",
    rating: 5,
    text: "GluonMind transformed our legacy infrastructure into a modern cloud-native platform. Their AI-driven approach cut our deployment time by 70% and dramatically improved system reliability.",
  },
  {
    name: "Marcus Rivera",
    role: "Founder, Streamline Labs",
    avatar: "MR",
    rating: 5,
    text: "The SaaS product they built for us exceeded every expectation. Clean architecture, incredible performance, and they delivered two weeks ahead of schedule. Truly world-class engineering.",
  },
  {
    name: "Elena Kowalski",
    role: "VP Engineering, DataPulse",
    avatar: "EK",
    rating: 5,
    text: "We needed a partner who understood both AI and enterprise compliance. GluonMind delivered an automated backup system that saved us $200K annually while keeping us fully compliant.",
  },
];

const logos = [
  "Terrabuild",
  "Amal Health",
  "Connect Africa Countries",
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative z-10 px-6 py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              Client Success
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              Trusted by <span className="gm-glow-text">Industry Leaders</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="gm-card-hover rounded-xl p-7 flex flex-col relative overflow-hidden"
              variants={staggerItem}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/15 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust logos */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-8">
              Trusted by innovative companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="text-muted-foreground/40 font-display font-semibold text-lg tracking-wide hover:text-primary/60 transition-colors duration-300 cursor-default"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
