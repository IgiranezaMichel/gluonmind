import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScrollReveal from "@/components/ScrollReveal";
import SectionSeparator from "@/components/SectionSeparator";
import FaqSection from "@/components/FaqSection";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const About = () => {
  const founders = [
    {
      name: "Founder One",
      role: "Co-Founder & CEO",
      image: "/gluonmind_logo.png",
      bio: "Product-focused technologist committed to building practical AI and software solutions for businesses across Rwanda and beyond.",
      email: "founder@gluonmind.com",
      phone: "+250 780 000 000",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Founder Two",
      role: "Co-Founder & CTO",
      image: "/gluonmind_logo.png",
      bio: "Engineering leader specializing in scalable architecture, cloud infrastructure, and high-performance systems.",
      email: "cto@gluonmind.com",
      phone: "+250 780 000 001",
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  const [activeFounder, setActiveFounder] = useState(0);
  const current = founders[activeFounder];

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <motion.main
        id="main-content"
        className="pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <section id="about" className="relative z-10 px-6 py-32 scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0}>
              <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
                About Gluonmind
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <h1 className="gm-section-title">
                Rwanda-Based App Development <span className="gm-glow-text">Team</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Gluonmind is a Rwanda-based company specializing in app development, AI solutions,
                IT consulting, cloud deployment, app migration, and automated backup services.
                We build web applications, mobile apps, and SaaS platforms that help businesses
                modernize, scale, and compete with confidence.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.45}>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                From strategy to launch and ongoing support, we manage the full product lifecycle.
                Our team blends engineering rigor with practical business outcomes to deliver
                dependable, secure, and high-performance systems.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <SectionSeparator direction="left" />

        <section id="vision-mission-values" className="relative z-10 px-6 pb-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <ScrollReveal direction="up" delay={0}>
                <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
                  Vision, Mission, Values
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.15}>
                <h2 className="gm-section-title">
                  Why We Build <span className="gm-glow-text">What We Build</span>
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="gm-card-hover rounded-xl p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Vision
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To be Rwanda’s most trusted AI and app development partner, delivering
                  technology that helps businesses grow with confidence.
                </p>
              </div>
              <div className="gm-card-hover rounded-xl p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Mission
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Build secure, scalable, and user-centered digital products while providing
                  expert IT consulting and long-term support.
                </p>
              </div>
              <div className="gm-card-hover rounded-xl p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Values
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Integrity, craftsmanship, clarity, and measurable impact for every client.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionSeparator direction="right" />

        <section id="founder" className="relative z-10 px-6 pb-24 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <ScrollReveal direction="up" delay={0}>
                <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
                  Meet The Founder
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.15}>
                <h2 className="gm-section-title">
                  The Mind Behind <span className="gm-glow-text">Gluonmind</span>
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="space-y-4" role="tablist" aria-label="Founders">
                {founders.map((founder, index) => (
                  <motion.button
                    key={founder.name}
                    type="button"
                    onMouseEnter={() => setActiveFounder(index)}
                    onFocus={() => setActiveFounder(index)}
                    role="tab"
                    id={`founder-tab-${index}`}
                    aria-selected={activeFounder === index}
                    aria-controls="founder-panel"
                    className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
                      activeFounder === index
                        ? "border-primary/70 bg-primary/5 shadow-[0_0_24px_hsl(var(--primary)/0.2)]"
                        : "border-border/60 bg-background/40 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-xl overflow-hidden border border-border/60 bg-background">
                        <img
                          src={founder.image}
                          alt={`${founder.name} portrait`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {founder.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{founder.role}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  id="founder-panel"
                  role="tabpanel"
                  aria-labelledby={`founder-tab-${activeFounder}`}
                  className="gm-card-hover rounded-2xl p-6 border border-border/60 bg-background/50"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden border border-border/60 bg-background">
                      <img
                        src={current.image}
                        alt={`${current.name} portrait`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-foreground">
                        {current.name}
                      </h3>
                      <p className="text-primary text-sm">{current.role}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {current.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={`mailto:${current.email}`}
                      className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      {current.email}
                    </a>
                    <a
                      href={`tel:${current.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      {current.phone}
                    </a>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={current.socials.linkedin}
                      className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Linkedin className="h-4 w-4 text-primary" />
                      LinkedIn
                    </a>
                    <a
                      href={current.socials.twitter}
                      className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Twitter className="h-4 w-4 text-primary" />
                      Twitter
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <SectionSeparator direction="left" />

        <TestimonialsSection />

        <SectionSeparator direction="right" />

        <FaqSection />
      </motion.main>

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
    </div>
  );
};

export default About;
