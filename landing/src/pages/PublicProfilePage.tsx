import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink, MapPin, Wrench } from "lucide-react";
import { getRiderByUsername, getPublicLinks, trackClick } from "../lib/pb";
import type { Rider, RiderLink } from "../types";
import { Logo } from "../components/Logo";
import { Button } from "../components/Button";
import { Image } from "../components/Image";

type State = "loading" | "found" | "not_found";

const iconEmoji: Record<string, string> = {
  instagram: "📸",
  strava: "🚴",
  youtube: "▶️",
  mail: "✉️",
  store: "🛒",
  star: "⭐",
  heart: "❤️",
};

function avatarUrl(rider: Rider): string | undefined {
  return rider.avatar_url || undefined;
}

function coverUrl(rider: Rider): string | undefined {
  return rider.cover_url || undefined;
}

function LinkCard({ link }: { link: RiderLink }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackClick(link.id);
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={link.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-2xl p-4 transition cursor-pointer"
      style={{ background: "var(--rb-card)", border: "1px solid var(--rb-border)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(199,255,99,0.4)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--rb-border)"; }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="grid h-10 w-10 place-items-center rounded-xl shrink-0 text-lg"
          style={{ background: "var(--rb-elevated)" }}
        >
          {iconEmoji[link.icon ?? "heart"] ?? "🔗"}
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold truncate" style={{ color: "var(--rb-text)" }}>
            {link.label}
          </p>
          {link.sublabel ? (
            <p className="text-xs truncate" style={{ color: "var(--rb-muted)" }}>{link.sublabel}</p>
          ) : null}
        </div>
      </div>
      <ExternalLink
        size={16}
        className="text-accent shrink-0 opacity-0 group-hover:opacity-100 transition"
      />
    </a>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-40 sm:h-56 w-full rounded-none" style={{ background: "var(--rb-elevated)" }} />
      <div className="max-w-lg mx-auto px-4 -mt-12 relative z-10">
        <div className="h-24 w-24 rounded-2xl" style={{ background: "var(--rb-card)" }} />
        <div className="mt-4 h-6 w-48 rounded-xl" style={{ background: "var(--rb-elevated)" }} />
        <div className="mt-2 h-4 w-32 rounded-xl" style={{ background: "var(--rb-elevated)" }} />
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-2xl" style={{ background: "var(--rb-card)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotFoundView({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl mb-4">🚴</p>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--rb-text)" }}>
        Perfil no encontrado
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--rb-muted)" }}>
        <span className="font-medium text-accent">@{username}</span> no existe o aún no está activo.
      </p>
      <a href="/" className="mt-6">
        <Button variant="outline" size="sm">Volver al inicio</Button>
      </a>
    </div>
  );
}

export function PublicProfilePage() {
  const { username = "" } = useParams<{ username: string }>();
  const [state, setState] = useState<State>("loading");
  const [rider, setRider] = useState<Rider | null>(null);
  const [links, setLinks] = useState<RiderLink[]>([]);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (!username) { setState("not_found"); return; }
    setState("loading");
    getRiderByUsername(username).then(async (r) => {
      if (!r) { setState("not_found"); return; }
      const rLinks = await getPublicLinks(r.id);
      setRider(r);
      setLinks(rLinks);
      setState("found");
      document.title = `${r.display_name} — RiderBio`;
    });
  }, [username]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--rb-bg)", color: "var(--rb-text)" }}>
      {/* Minimal nav */}
      <header
        className="sticky top-0 z-40 backdrop-blur"
        style={{ background: "var(--rb-nav-bg)", borderBottom: "1px solid var(--rb-border)" }}
      >
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo />
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark((d) => !d)}
              aria-label="Cambiar tema"
              className="grid h-8 w-8 place-items-center rounded-lg text-xs transition"
              style={{ color: "var(--rb-muted)", background: "var(--rb-hover)" }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <a href="/">
              <Button size="sm">Crear mi RiderBio</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {state === "loading" && <Skeleton />}
        {state === "not_found" && <NotFoundView username={username} />}
        {state === "found" && rider && (
          <div>
            {/* Cover */}
            <div className="relative h-40 sm:h-56 w-full overflow-hidden">
              {coverUrl(rider) ? (
                <Image
                  src={coverUrl(rider)!}
                  alt={`${rider.display_name} cover`}
                  wrapperClassName="h-full w-full"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{ background: "linear-gradient(135deg, var(--rb-elevated) 0%, var(--rb-card) 100%)" }}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[var(--rb-bg)]" />
            </div>

            {/* Profile card */}
            <div className="max-w-lg mx-auto px-4 -mt-12 relative z-10 pb-16">
              <div className="flex items-end gap-4">
                <div
                  className="h-24 w-24 rounded-2xl border-4 overflow-hidden shrink-0"
                  style={{ borderColor: "var(--rb-card)", background: "var(--rb-elevated)" }}
                >
                  {avatarUrl(rider) ? (
                    <Image
                      src={avatarUrl(rider)!}
                      alt={rider.display_name}
                      wrapperClassName="h-full w-full"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center font-display text-2xl font-bold text-accent">
                      {rider.display_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <h1 className="font-display text-2xl font-bold leading-tight" style={{ color: "var(--rb-text)" }}>
                  {rider.display_name}
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: "var(--rb-muted)" }}>
                  {rider.discipline && (
                    <span className="inline-flex items-center gap-1.5">
                      <Wrench size={13} className="text-accent" />
                      {rider.discipline}
                    </span>
                  )}
                  {rider.city && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {rider.city}
                    </span>
                  )}
                </p>
              </div>

              {rider.quote && (
                <p
                  className="mt-4 text-sm leading-relaxed italic"
                  style={{ color: "var(--rb-muted)", borderLeft: "2px solid var(--rb-accent, #c7ff63)", paddingLeft: "0.75rem" }}
                >
                  "{rider.quote}"
                </p>
              )}

              {rider.bio && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--rb-muted)" }}>
                  {rider.bio}
                </p>
              )}

              {links.length > 0 && (
                <div className="mt-6 space-y-3">
                  {links.map((link) => (
                    <LinkCard key={link.id} link={link} />
                  ))}
                </div>
              )}

              {links.length === 0 && (
                <p className="mt-8 text-center text-sm" style={{ color: "var(--rb-subtle)" }}>
                  Este rider aún no ha agregado links.
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-xs" style={{ color: "var(--rb-subtle)", borderTop: "1px solid var(--rb-border)" }}>
        Perfil creado con <span className="text-accent font-medium">RiderBio</span> by{" "}
        <a href="https://larefactoria.cl" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
          La Refactoría
        </a>
      </footer>
    </div>
  );
}
