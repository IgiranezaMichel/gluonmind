import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "What IT services does Gluonmind provide?",
    a: "We provide IT consulting, SaaS development, web applications, mobile app development, cloud deployment, app migration, automated backup, and AI solutions.",
  },
  {
    q: "Do you build AI solutions for businesses in Rwanda?",
    a: "Yes. We design AI automation, analytics, and intelligent workflows tailored to Rwandan and regional business needs.",
  },
  {
    q: "Can you modernize or migrate an existing system?",
    a: "Yes. Our app migration and cloud deployment services modernize legacy systems with minimal downtime.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We manage and support applications after release, including performance monitoring and continuous improvements.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="relative z-10 px-6 py-32 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              FAQ
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              AI & IT Questions <span className="gm-glow-text">Answered</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Short, direct answers about Gluonmind’s AI and IT services.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="gm-card-hover rounded-xl p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {faq.q}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
