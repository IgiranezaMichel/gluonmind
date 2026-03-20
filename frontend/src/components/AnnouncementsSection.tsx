import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { apiFetch } from "@/lib/api";

interface Announcement {
  id: string;
  title: string;
  message: string;
  linkUrl?: string;
  publishedAt?: string;
}

const AnnouncementsSection = () => {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    apiFetch<Announcement[]>("/api/content/announcements")
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
    <section id="announcements" className="relative z-10 px-6 py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">
              Announcements
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="gm-section-title">
              Latest Updates <span className="gm-glow-text">From Gluonmind</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Product launches, partnerships, and important news in one place.
            </p>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading announcements...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.id} className="gm-card-hover rounded-xl p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.message}
                </p>
                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    className="text-primary text-sm font-medium hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more
                  </a>
                )}
              </div>
            ))}
            {!items.length && (
              <div className="text-center text-muted-foreground col-span-full">
                No announcements yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
