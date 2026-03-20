import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { apiFetch, getToken } from "@/lib/api";

type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

type Announcement = {
  id: string;
  title: string;
  message: string;
  linkUrl?: string;
  displayOrder: number;
  active: boolean;
  publishedAt?: string;
};

type Publication = {
  id: string;
  title: string;
  summary: string;
  url?: string;
  coverImageUrl?: string;
  source?: string;
  displayOrder: number;
  active: boolean;
  publishedAt?: string;
};

const Admin = () => {
  const [token, setToken] = useState<string | null>(getToken());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [tab, setTab] = useState<"announcements" | "publications">("announcements");

  const [annPage, setAnnPage] = useState<Page<Announcement> | null>(null);
  const [pubPage, setPubPage] = useState<Page<Publication> | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [annForm, setAnnForm] = useState<Partial<Announcement>>({ active: true, displayOrder: 0 });
  const [pubForm, setPubForm] = useState<Partial<Publication>>({ active: true, displayOrder: 0 });

  const activePage = tab === "announcements" ? annPage : pubPage;

  const fetchAnnouncements = async () => {
    const data = await apiFetch<Page<Announcement>>(
      `/api/admin/content/announcements?page=${pageIndex}&size=${pageSize}`,
      {},
      true
    );
    setAnnPage(data);
  };

  const fetchPublications = async () => {
    const data = await apiFetch<Page<Publication>>(
      `/api/admin/content/publications?page=${pageIndex}&size=${pageSize}`,
      {},
      true
    );
    setPubPage(data);
  };

  useEffect(() => {
    if (!token) return;
    if (tab === "announcements") fetchAnnouncements();
    if (tab === "publications") fetchPublications();
  }, [token, tab, pageIndex]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await apiFetch<{ token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem("gm_token", res.token);
      setToken(res.token);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const onLogout = () => {
    localStorage.removeItem("gm_token");
    setToken(null);
  };

  const handleAnnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: annForm.title,
      message: annForm.message,
      linkUrl: annForm.linkUrl || null,
      displayOrder: Number(annForm.displayOrder || 0),
      active: Boolean(annForm.active),
      publishedAt: annForm.publishedAt || null,
    };
    if (annForm.id) {
      await apiFetch(`/api/admin/content/announcements/${annForm.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }, true);
    } else {
      await apiFetch(`/api/admin/content/announcements`, {
        method: "POST",
        body: JSON.stringify(payload),
      }, true);
    }
    setAnnForm({ active: true, displayOrder: 0 });
    fetchAnnouncements();
  };

  const handlePubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: pubForm.title,
      summary: pubForm.summary,
      url: pubForm.url || null,
      coverImageUrl: pubForm.coverImageUrl || null,
      source: pubForm.source || null,
      displayOrder: Number(pubForm.displayOrder || 0),
      active: Boolean(pubForm.active),
      publishedAt: pubForm.publishedAt || null,
    };
    if (pubForm.id) {
      await apiFetch(`/api/admin/content/publications/${pubForm.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }, true);
    } else {
      await apiFetch(`/api/admin/content/publications`, {
        method: "POST",
        body: JSON.stringify(payload),
      }, true);
    }
    setPubForm({ active: true, displayOrder: 0 });
    fetchPublications();
  };

  const pagination = useMemo(() => {
    if (!activePage) return null;
    return (
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
        <span>
          Page {activePage.number + 1} of {activePage.totalPages} • {activePage.totalElements} items
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-border/60 hover:border-primary/50"
            onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
            disabled={activePage.number === 0}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded border border-border/60 hover:border-primary/50"
            onClick={() => setPageIndex(Math.min(activePage.totalPages - 1, pageIndex + 1))}
            disabled={activePage.number >= activePage.totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    );
  }, [activePage, pageIndex]);

  if (!token) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 px-6 max-w-md mx-auto">
          <h1 className="gm-section-title mb-6">Admin Login</h1>
          <form onSubmit={onLogin} className="gm-card rounded-xl p-6 space-y-4">
            {loginError && (
              <div className="text-sm text-destructive">{loginError}</div>
            )}
            <div>
              <label className="text-sm">Username</label>
              <input
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full rounded-lg bg-primary text-primary-foreground py-2">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="gm-section-title">Admin Panel</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg border border-border/60 hover:border-primary/50"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg border ${tab === "announcements" ? "border-primary/70" : "border-border/60"}`}
            onClick={() => { setTab("announcements"); setPageIndex(0); }}
          >
            Announcements
          </button>
          <button
            className={`px-4 py-2 rounded-lg border ${tab === "publications" ? "border-primary/70" : "border-border/60"}`}
            onClick={() => { setTab("publications"); setPageIndex(0); }}
          >
            Publications
          </button>
        </div>

        {tab === "announcements" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleAnnSubmit} className="gm-card rounded-xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg">{annForm.id ? "Edit" : "New"} Announcement</h3>
              <input
                placeholder="Title"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                value={annForm.title || ""}
                onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Message"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                rows={4}
                value={annForm.message || ""}
                onChange={(e) => setAnnForm({ ...annForm, message: e.target.value })}
                required
              />
              <input
                placeholder="Link URL (optional)"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                value={annForm.linkUrl || ""}
                onChange={(e) => setAnnForm({ ...annForm, linkUrl: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Display order"
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                  value={annForm.displayOrder ?? 0}
                  onChange={(e) => setAnnForm({ ...annForm, displayOrder: Number(e.target.value) })}
                />
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                  value={annForm.publishedAt ? annForm.publishedAt.slice(0, 10) : ""}
                  onChange={(e) => setAnnForm({ ...annForm, publishedAt: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(annForm.active)}
                  onChange={(e) => setAnnForm({ ...annForm, active: e.target.checked })}
                />
                Active
              </label>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                  Save
                </button>
                {annForm.id && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-border/60"
                    onClick={() => setAnnForm({ active: true, displayOrder: 0 })}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="gm-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4">All Announcements</h3>
              <div className="space-y-3">
                {annPage?.content.map((a) => (
                  <div key={a.id} className="rounded-lg border border-border/60 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-sm text-primary"
                          onClick={() => setAnnForm(a)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-sm text-destructive"
                          onClick={async () => {
                            await apiFetch(`/api/admin/content/announcements/${a.id}`, { method: "DELETE" }, true);
                            fetchAnnouncements();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!annPage?.content.length && (
                  <div className="text-sm text-muted-foreground">No announcements yet.</div>
                )}
              </div>
              {pagination}
            </div>
          </div>
        )}

        {tab === "publications" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handlePubSubmit} className="gm-card rounded-xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg">{pubForm.id ? "Edit" : "New"} Publication</h3>
              <input
                placeholder="Title"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                value={pubForm.title || ""}
                onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Summary"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                rows={4}
                value={pubForm.summary || ""}
                onChange={(e) => setPubForm({ ...pubForm, summary: e.target.value })}
                required
              />
              <input
                placeholder="URL"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                value={pubForm.url || ""}
                onChange={(e) => setPubForm({ ...pubForm, url: e.target.value })}
              />
              <input
                placeholder="Cover image URL"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                value={pubForm.coverImageUrl || ""}
                onChange={(e) => setPubForm({ ...pubForm, coverImageUrl: e.target.value })}
              />
              <input
                placeholder="Source"
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                value={pubForm.source || ""}
                onChange={(e) => setPubForm({ ...pubForm, source: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Display order"
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                  value={pubForm.displayOrder ?? 0}
                  onChange={(e) => setPubForm({ ...pubForm, displayOrder: Number(e.target.value) })}
                />
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2"
                  value={pubForm.publishedAt ? pubForm.publishedAt.slice(0, 10) : ""}
                  onChange={(e) => setPubForm({ ...pubForm, publishedAt: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(pubForm.active)}
                  onChange={(e) => setPubForm({ ...pubForm, active: e.target.checked })}
                />
                Active
              </label>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                  Save
                </button>
                {pubForm.id && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-border/60"
                    onClick={() => setPubForm({ active: true, displayOrder: 0 })}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="gm-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4">All Publications</h3>
              <div className="space-y-3">
                {pubPage?.content.map((p) => (
                  <div key={p.id} className="rounded-lg border border-border/60 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.summary}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-sm text-primary"
                          onClick={() => setPubForm(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-sm text-destructive"
                          onClick={async () => {
                            await apiFetch(`/api/admin/content/publications/${p.id}`, { method: "DELETE" }, true);
                            fetchPublications();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!pubPage?.content.length && (
                  <div className="text-sm text-muted-foreground">No publications yet.</div>
                )}
              </div>
              {pagination}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
