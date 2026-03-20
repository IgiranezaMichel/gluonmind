import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ScrollReveal from "./ScrollReveal";

const BookingSection = () => {
  const contactEmail = "im.igiranezamichel@gmail.com";
  const contactPhone = "+250 783 402 443";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length > 100) errs.name = "Name is required (max 100 chars)";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Valid email is required";
    if (message.length > 1000) errs.message = "Message must be under 1000 characters";
    if (!date) errs.date = "Please select a preferred date";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const payload = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || null,
        preferredDate: date?.toISOString().slice(0, 10),
        message: message.trim() || null,
      };
      const res = await fetch(`${baseUrl}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to submit appointment. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to submit appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="relative z-10 px-6 py-32 scroll-mt-20">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal direction="scale">
            <div className="gm-card rounded-2xl p-14" role="status" aria-live="polite">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Demo Scheduled!
              </h3>
              <p className="text-muted-foreground">
                Thank you, {name.trim()}. We'll reach out to{" "}
                <span className="text-primary">{email.trim()}</span> to confirm
                your{" "}
                {date && (
                  <span className="text-primary">{format(date, "PPP")}</span>
                )}{" "}
                appointment.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative z-10 px-6 py-32 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Copy */}
          <ScrollReveal direction="left">
            <div>
              <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
                Get Started
              </p>
              <h2 className="gm-section-title mb-6">
                Schedule a <span className="gm-glow-text">Demo</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                See how GluonMind can transform your business operations. Book a
                personalized demo with our solutions team — no commitment, just
                a conversation about your goals.
              </p>

              {/* Trust points */}
              <div className="space-y-4">
                {[
                  "30-minute personalized consultation",
                  "Custom solution roadmap for your business",
                  "Transparent pricing — no surprises",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 text-foreground/80 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="rounded-2xl border border-border/70 bg-background/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_22px_hsl(var(--primary)/0.15)]">
                  <p className="text-foreground font-medium mb-3">Contact</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 transition-colors hover:border-primary/50">
                      <p className="text-xs uppercase tracking-widest text-foreground/70">
                        Email
                      </p>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="mt-1 block text-primary hover:underline"
                      >
                        {contactEmail}
                      </a>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 transition-colors hover:border-primary/50">
                      <p className="text-xs uppercase tracking-widest text-foreground/70">
                        Phone
                      </p>
                      <a
                        href={`tel:${contactPhone.replace(/\s/g, "")}`}
                        className="mt-1 block text-primary hover:underline"
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="gm-card rounded-2xl p-8 space-y-5"
              noValidate
            >
              {apiError && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  {apiError}
                </div>
              )}
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="John Doe"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                {errors.name && (
                  <p id="name-error" className="text-destructive text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Work Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  placeholder="john@company.com"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                {errors.email && (
                  <p id="email-error" className="text-destructive text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  maxLength={100}
                  placeholder="Acme Inc."
                  className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>

              {/* Date picker */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Preferred Date <span className="text-primary">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-2 rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/40",
                    !date && "text-muted-foreground"
                  )}
                  aria-required="true"
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "date-error" : undefined}
                >
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-card border-border"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p id="date-error" className="text-destructive text-xs mt-1">{errors.date}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  rows={3}
                  placeholder="Tell us about your project..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                />
                {errors.message && (
                  <p id="message-error" className="text-destructive text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 35px hsl(214 82% 55% / 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Schedule Demo"}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
