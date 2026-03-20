import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Globe,
  MessageSquare,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";

const services = [
  { icon: MessageSquare, title: "IT Consulting", desc: "Strategic technology guidance to accelerate your digital transformation." },
  { icon: Code2, title: "SaaS Development", desc: "Scalable software-as-a-service platforms built for growth." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform apps with exceptional user experiences." },
  { icon: Globe, title: "Web Applications", desc: "High-performance web solutions tailored to your business needs." },
  { icon: Cloud, title: "Cloud Deployment", desc: "Seamless cloud infrastructure setup, migration, and management." },
  { icon: RefreshCw, title: "App Migration", desc: "Modernize legacy systems with zero-downtime migration strategies." },
  { icon: Database, title: "Automated Backup", desc: "Enterprise-grade backup systems ensuring business continuity." },
  { icon: Brain, title: "AI Solutions", desc: "Intelligent automation and AI-driven insights for small businesses." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 px-6 py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section header with staggered reveal */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              What We Do
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              Solutions That Drive <span className="gm-glow-text">Innovation</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              End-to-end IT and AI services designed to transform how you operate, compete, and grow.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards with stagger container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="gm-card-hover rounded-xl p-6 group cursor-default"
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <service.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
