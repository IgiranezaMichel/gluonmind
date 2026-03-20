import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ManagedAppsSection from "@/components/ManagedAppsSection";

const ManagedApps = () => {
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
        <ManagedAppsSection />
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

export default ManagedApps;
