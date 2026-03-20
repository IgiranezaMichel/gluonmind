import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import NeuralMind from "@/components/NeuralMind";
import ParticleField from "@/components/ParticleField";
import ServicesSection from "@/components/ServicesSection";
import FocusAreasSection from "@/components/FocusAreasSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import PublicationsSection from "@/components/PublicationsSection";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const Index = () => {
  const typedText = useTypingEffect();
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const mindY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <>
      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Background particles - slowest parallax */}
        <motion.div style={{ y: bgY }} className="fixed inset-0 z-0">
          <ParticleField />
        </motion.div>

        <main id="main-content">
        {/* Hero */}
        <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center overflow-hidden pt-16">
          {/* Neural Mind — upper half, behind text */}
          <motion.div
            className="relative w-full"
            style={{ y: mindY, height: "55vh", minHeight: 360 }}
          >
            <NeuralMind />
          </motion.div>

          {/* Text below brain */}
          <motion.div
            className="relative z-20 text-center px-6 max-w-4xl -mt-8"
            style={{ y: textY }}
          >
            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-5 text-foreground"
              initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Gluon<span className="gm-glow-text">Mind</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-3"
              initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              We provide{" "}
              <span className="text-primary font-medium">
                {typedText}
                <span className="typing-cursor text-primary">|</span>
              </span>
            </motion.p>

            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8"
              initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Empowering businesses with intelligent technology solutions,
              from AI-driven insights to enterprise-grade infrastructure.
              Gluonmind is a Rwanda-based app development company.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7 }}
            >
              <motion.button
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 transition-colors duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px hsl(214 82% 55% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="px-8 py-3 rounded-lg border border-border text-foreground font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05, borderColor: "hsl(214 82% 55% / 0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </section>

        {/* Services */}
        <ServicesSection />

        {/* AI + IT Focus Areas */}
        <FocusAreasSection />

        {/* Stats & CTA */}
        <StatsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Announcements */}
        <AnnouncementsSection />

        {/* Publications */}
        <PublicationsSection />

        {/* Booking */}
        <BookingSection />

        {/* Footer */}
        <motion.footer
          className="relative z-10 border-t border-border py-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GluonMind. All rights reserved.
          </p>
        </motion.footer>
        </main>
      </motion.div>
    </>
  );
};

export default Index;
