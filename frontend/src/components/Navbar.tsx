import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "/about" },
  { label: "Managed Apps", href: "/managed-apps" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book a Demo", href: "#booking" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

  useEffect(() => {
    const storedContrast = localStorage.getItem("gm-contrast") === "1";
    const storedScale = Number(localStorage.getItem("gm-text-scale") || "1");
    const storedMotion = localStorage.getItem("gm-reduce-motion") === "1";
    setHighContrast(storedContrast);
    setTextScale(Number.isFinite(storedScale) ? storedScale : 1);
    setReduceMotion(storedMotion);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("reduce-motion", reduceMotion);
    root.style.setProperty("--font-scale", String(textScale));
    localStorage.setItem("gm-contrast", highContrast ? "1" : "0");
    localStorage.setItem("gm-text-scale", String(textScale));
    localStorage.setItem("gm-reduce-motion", reduceMotion ? "1" : "0");
  }, [highContrast, textScale, reduceMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHref(location.pathname);
      return;
    }

    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (location.pathname !== "/") {
        navigate(`/${href}`);
        return;
      }
      return;
    }
    navigate(href);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
            : "bg-transparent"
        }`}
        aria-label="Primary"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => handleClick("#hero")}
          className="flex items-center gap-3 font-display font-bold text-xl text-foreground tracking-tight"
          aria-label="Go to home section"
        >
          <img
            src="/gluonmind_logo.png"
            alt="Gluonmind logo"
            className="h-8 w-auto max-w-[140px] object-contain"
            loading="eager"
            decoding="async"
          />
          <span>
            Gluon<span className="text-primary">Mind</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`text-sm transition-colors duration-200 font-medium ${
                activeHref === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleClick("#booking")}
            className="text-sm px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all duration-200 shadow-md shadow-primary/20"
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground hover:border-primary/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={`text-left text-sm transition-colors py-2 font-medium ${
                    activeHref === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={activeHref === item.href ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleClick("#booking")}
                className="text-sm px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium mt-1 w-full"
              >
                Get Started
              </button>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground hover:border-primary/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>
      <div className="fixed bottom-4 left-1/2 z-50 w-[92vw] max-w-[640px] -translate-x-1/2">
        <div className="relative flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/80 px-2.5 py-2 text-[11px] text-foreground shadow-md backdrop-blur md:rounded-full md:px-3 md:text-xs">
          <span className="sr-only">Theme and accessibility controls</span>
          <span className="uppercase tracking-[0.2em] text-muted-foreground">Theme</span>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 transition-colors md:px-3 md:py-1.5 md:text-xs"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <span className="uppercase tracking-[0.2em] text-muted-foreground ml-1">Access</span>
          <button
            type="button"
            onClick={() => setAccessOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 transition-colors md:px-3 md:py-1.5 md:text-xs"
            aria-haspopup="menu"
            aria-expanded={accessOpen}
            aria-controls="access-menu"
          >
            Text / Zoom
          </button>
          <button
            type="button"
            onClick={() => setHighContrast((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 transition-colors md:px-3 md:py-1.5 md:text-xs"
            aria-label="Toggle high contrast"
            aria-pressed={highContrast}
          >
            Contrast
          </button>
          <button
            type="button"
            onClick={() => setReduceMotion((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 transition-colors md:px-3 md:py-1.5 md:text-xs"
            aria-label="Toggle reduced motion"
            aria-pressed={reduceMotion}
          >
            Motion
          </button>

          {accessOpen && (
            <div
              id="access-menu"
              role="menu"
              className="absolute bottom-14 left-1/2 z-50 w-56 -translate-x-1/2 rounded-xl border border-border/70 bg-background/95 p-2 shadow-lg backdrop-blur"
            >
              <p className="px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Text Size
              </p>
              <div className="flex items-center gap-2 px-2 pb-2">
                <button
                  type="button"
                  onClick={() => setTextScale((v) => Math.max(0.9, Number((v - 0.1).toFixed(2))))}
                  className="flex-1 rounded-lg border border-border/60 bg-background/70 px-2 py-1 text-xs hover:border-primary/50"
                  aria-label="Zoom out text"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setTextScale(1)}
                  className="flex-1 rounded-lg border border-border/60 bg-background/70 px-2 py-1 text-xs hover:border-primary/50"
                  aria-label="Reset text size"
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setTextScale((v) => Math.min(1.4, Number((v + 0.1).toFixed(2))))}
                  className="flex-1 rounded-lg border border-border/60 bg-background/70 px-2 py-1 text-xs hover:border-primary/50"
                  aria-label="Zoom in text"
                >
                  A+
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 px-2 pb-2">
                {[1, 1.1, 1.2, 1.3].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setTextScale(scale)}
                    className={`rounded-lg border px-2 py-1 text-xs ${
                      textScale === scale
                        ? "border-primary/70 bg-primary/10"
                        : "border-border/60 bg-background/70 hover:border-primary/50"
                    }`}
                    role="menuitemradio"
                    aria-checked={textScale === scale}
                  >
                    {Math.round(scale * 100)}%
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
