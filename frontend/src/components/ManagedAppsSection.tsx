import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, ShoppingBag, Building2 } from "lucide-react";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";

const managedApps = [
  {
    icon: Stethoscope,
    title: "PulseCare Clinic Portal",
    desc: "Appointment scheduling, patient intake, and secure messaging for multi-location clinics.",
  },
  {
    icon: ShoppingBag,
    title: "NovaCart Commerce Suite",
    desc: "Inventory sync, order orchestration, and real-time sales analytics for retail teams.",
  },
  {
    icon: Building2,
    title: "CivicFlow Permitting",
    desc: "End-to-end digital permitting with automated routing, e-signatures, and audit trails.",
  },
  {
    icon: ShieldCheck,
    title: "AegisOps Compliance Hub",
    desc: "Policy tracking, evidence collection, and compliance reporting in one secure workspace.",
  },
];

const ManagedAppsSection = () => {
  return (
    <section id="managed-apps" className="relative z-10 px-6 py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              Managed Applications
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              Products We Build <span className="gm-glow-text">And Run</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A curated portfolio of applications we designed, shipped, and continue to manage with proactive support.
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
          {managedApps.map((app) => (
            <motion.div
              key={app.title}
              className="gm-card-hover rounded-xl p-6 group cursor-default"
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <app.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {app.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {app.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ManagedAppsSection;
