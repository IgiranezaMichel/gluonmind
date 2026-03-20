import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { apiFetch } from "@/lib/api";

interface Publication {
  id: string;
  title: string;
  summary: string;
  url?: string;
  coverImageUrl?: string;
  source?: string;
  publishedAt?: string;
}

const PublicationsSection = () => {
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch<Publication[]>("/api/content/publications")
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="publications" className="relative z-10 px-6 py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              Publications
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              Research & Insights <span className="gm-glow-text">We Share</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Articles, whitepapers, and case studies from the Gluonmind team.
            </p>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading publications...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="gm-card-hover rounded-xl overflow-hidden">
                {item.coverImageUrl && (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.source || "Gluonmind"}</span>
                    {item.url && (
                      <a
                        href={item.url}
                        className="text-primary font-medium hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {!items.length && (
              <div className="text-center text-muted-foreground col-span-full">
                No publications yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
