import { motion } from "framer-motion";
import {
  Bot,
  ShieldCheck,
  Cloud,
  Database,
  Cpu,
  Network,
  LineChart,
  Workflow,
} from "lucide-react";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";

const focusAreas = [
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Workflow automation, intelligent chat, and data-driven assistants that connect to your tools.",
  },
  {
    icon: LineChart,
    title: "AI Insights",
    desc: "Dashboards and predictive analytics that turn business data into decisions.",
  },
  {
    icon: Cpu,
    title: "Custom Software",
    desc: "SaaS platforms and web applications engineered for scale and reliability.",
  },
  {
    icon: Network,
    title: "IT Consulting",
    desc: "Technology roadmaps, architecture reviews, and modernization plans.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Cloud deployment, app migration, and CI/CD pipelines for stable releases.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    desc: "Secure data pipelines, backups, and governance for business continuity.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    desc: "Risk assessments, access controls, and compliance-ready systems.",
  },
  {
    icon: Workflow,
    title: "Mobile Solutions",
    desc: "Native and cross-platform mobile apps with enterprise-grade performance.",
  },
];

const FocusAreasSection = () => {
  return (
    <section id="ai-it" className="relative z-10 px-6 py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              AI + IT Expertise
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              AI & IT Solutions <span className="gm-glow-text">That Rank</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Gluonmind delivers AI solutions, IT consulting, cloud deployment, app migration,
              automated backups, SaaS development, web applications, and mobile app development.
              This focus helps teams searching for AI and IT partners find the right fit fast.
            </p>
          </ScrollReveal>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {focusAreas.map((area) => (
            <motion.div
              key={area.title}
              className="gm-card-hover rounded-xl p-6 group cursor-default"
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <area.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {area.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FocusAreasSection;
