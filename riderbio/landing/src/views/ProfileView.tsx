import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Mail,
  MapPin,
  Medal,
  Quote,
  Settings2,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Trophy,
  Wrench,
} from "lucide-react";
import { Badge } from "../components/Badge";
import { BrandLogo } from "../components/BrandLogo";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { SocialIcon } from "../components/SocialIcon";
import { cyclist } from "../data/mock";
import type { View } from "../types";

interface Props {
  onNavigate: (v: View) => void;
  onContactBrand: () => void;
}

const typeColor: Record<string, string> = {
  XCM: "text-emerald-500",
  Gravel: "text-amber-500",
  Enduro: "text-orange-500",
  Ruta: "text-blue-500",
  DH: "text-red-500",
  Open: "text-purple-500",
};

const positionStyle = (pos: string, podium: boolean) => {
  if (!podium) return "text-t-muted";
  if (pos.startsWith("1")) return "text-yellow-500 font-bold";
  if (pos.startsWith("2")) return "text-zinc-400 font-bold";
  return "text-amber-600 font-bold";
};

const yearGroups = cyclist.palmares.reduce<Record<string, typeof cyclist.palmares>>((acc, e) => {
  (acc[e.year] ||= []).push(e);
  return acc;
}, {});

export function ProfileView({ onNavigate, onContactBrand }: Props) {
  return (
    <div className="pb-16">

      {/* ── Cover ─────────────────────────────────────── */}
      <div className="relative h-56 sm:h-80 w-full">
        <Image src={cyclist.coverImage} alt={`${cyclist.name} en acción`} wrapperClassName="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--rb-bg)]" />
      </div>

      {/* ── Profile header card ────────────────────────── */}
      <div className="container-rb -mt-20 relative z-10">
        <div className="card overflow-visible p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <Image
                src={cyclist.avatar}
                alt={cyclist.name}
                wrapperClassName="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border-4 shrink-0"
                style={{ borderColor: "var(--rb-card)" }}
              />
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--rb-text)" }}>
                  {cyclist.name}
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: "var(--rb-muted)" }}>
                  <span className="inline-flex items-center gap-1.5">
                    <Wrench size={14} className="text-accent" />
                    {cyclist.discipline}
                  </span>
                  <span style={{ color: "var(--rb-border)" }}>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} /> {cyclist.city}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="accent"><ShieldCheck size={12} /> Verificado</Badge>
                  <Badge tone="blue">{cyclist.sponsors.length} sponsors</Badge>
                  <Badge tone="green">Perfil activo</Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" leadingIcon={<Share2 size={14} />}>Compartir</Button>
              <Button size="sm" leadingIcon={<Settings2 size={14} />} onClick={() => onNavigate("dashboard")}>Dashboard</Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bio ───────────────────────────────────────── */}
      <section className="container-rb mt-8">
        <div className="card p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-start gap-3">
                <Quote size={28} className="text-accent shrink-0 mt-0.5" />
                <p className="font-display text-xl sm:text-2xl font-semibold leading-snug" style={{ color: "var(--rb-text)" }}>
                  {cyclist.quote}
                </p>
              </div>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--rb-muted)" }}>
                {cyclist.bio}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 content-start">
              {cyclist.bioStats.map((s) => (
                <div key={s.label} className="rounded-2xl p-4" style={{ background: "var(--rb-elevated)", border: "1px solid var(--rb-border)" }}>
                  <p className="font-display text-2xl font-bold text-accent">{s.value}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--rb-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Links principales ─────────────────────────── */}
      <section className="container-rb mt-8">
        <p className="font-display text-sm font-semibold mb-4" style={{ color: "var(--rb-muted)" }}>Links principales</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {cyclist.publicLinks.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl p-4 transition"
              style={{ background: "var(--rb-card)", border: "1px solid var(--rb-border)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(199,255,99,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--rb-border)"; }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl shrink-0 transition"
                  style={{ background: "var(--rb-elevated)" }}
                >
                  {l.brand ? (
                    <BrandLogo {...l.brand} size={22} />
                  ) : (
                    <span style={{ color: "var(--rb-muted)" }}><SocialIcon name={l.icon} /></span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold truncate" style={{ color: "var(--rb-text)" }}>{l.label}</p>
                  {l.sublabel ? <p className="text-xs truncate" style={{ color: "var(--rb-muted)" }}>{l.sublabel}</p> : null}
                </div>
              </div>
              <ExternalLink size={16} className="text-accent shrink-0 opacity-0 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>
      </section>

      {/* ── Sponsors ──────────────────────────────────── */}
      <section className="container-rb mt-10">
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle2 size={18} className="text-accent" />
          <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Sponsors actuales</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {cyclist.sponsors.map((sp) => (
            <div key={sp.name} className="card overflow-hidden">
              <div className="relative h-28">
                <Image src={sp.image} alt={sp.category} wrapperClassName="h-full w-full" fallbackGradient={sp.accent} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl font-display text-sm font-bold text-white shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    {sp.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{sp.name}</p>
                    <p className="text-xs text-white/70">{sp.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Palmarés ──────────────────────────────────── */}
      <section className="container-rb mt-10">
        <div className="flex items-center gap-2 mb-5">
          <Trophy size={18} className="text-accent" />
          <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Palmarés</p>
        </div>
        <div className="card overflow-hidden">
          {Object.entries(yearGroups)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, entries], yi) => (
              <div key={year}>
                {yi > 0 ? <div className="divider" /> : null}
                <div className="px-5 sm:px-7 py-4">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent mb-3">{year}</p>
                  <div className="space-y-2">
                    {entries.map((e) => (
                      <div
                        key={e.race}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 transition"
                        style={{ background: "var(--rb-elevated)", border: "1px solid var(--rb-border-sm)" }}
                      >
                        <span className={["w-20 shrink-0 font-display text-sm", positionStyle(e.position, e.podium)].join(" ")}>
                          {e.podium ? <Medal size={14} className="inline mr-1" /> : null}
                          {e.position}
                        </span>
                        <span className="flex-1 text-sm font-medium truncate" style={{ color: "var(--rb-text)" }}>{e.race}</span>
                        <span className={["text-xs font-medium shrink-0", typeColor[e.type] || "text-t-muted"].join(" ")}>{e.type}</span>
                        <span className="text-xs shrink-0" style={{ color: "var(--rb-subtle)" }}>{e.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── Próximas carreras ─────────────────────────── */}
      <section className="container-rb mt-10">
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays size={18} className="text-accent" />
          <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Próximas carreras</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {cyclist.upcomingRaces.map((r) => (
            <div key={r.name} className="card p-4">
              <p className="font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>{r.name}</p>
              <div className="mt-2 flex items-center justify-between text-xs" style={{ color: "var(--rb-muted)" }}>
                <span className="flex items-center gap-1"><MapPin size={11} />{r.location}</span>
                <Badge tone="blue">{r.date}</Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Equipamiento ──────────────────────────────── */}
      <section className="container-rb mt-10">
        <div className="flex items-center gap-2 mb-5">
          <Wrench size={18} className="text-accent" />
          <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Equipamiento que uso</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cyclist.gear.map((g) => (
            <div key={g.category} className="card p-4">
              <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--rb-subtle)" }}>{g.category}</p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="rounded-lg bg-white p-1 shrink-0">
                  <BrandLogo {...g.logo} size={28} />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold truncate" style={{ color: "var(--rb-text)" }}>{g.brand}</p>
                  <p className="text-xs truncate" style={{ color: "var(--rb-muted)" }}>{g.item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Consejos ──────────────────────────────────── */}
      <section className="container-rb mt-10">
        <div className="flex items-center gap-2 mb-5">
          <Lightbulb size={18} className="text-accent" />
          <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Consejos de Martín</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cyclist.tips.map((tip) => (
            <div key={tip.title} className="card overflow-hidden card-hover">
              <div className="relative h-44">
                <Image src={tip.image} alt={tip.title} wrapperClassName="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-accent/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-950">
                  {tip.tag}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>{tip.title}</p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--rb-muted)" }}>{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Merch / Productos ─────────────────────────── */}
      <section className="container-rb mt-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-accent" />
            <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Productos de Martín</p>
          </div>
          <Badge tone="accent">Disponibles ahora</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cyclist.merch.map((item) => (
            <div key={item.name} className="card overflow-hidden card-hover flex flex-col">
              <div className="relative">
                <Image src={item.image} alt={item.name} wrapperClassName="aspect-[4/3] w-full" />
                <span className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                  style={{ background: "var(--rb-card)", color: "var(--rb-muted)", border: "1px solid var(--rb-border)" }}>
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <p className="font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>{item.name}</p>
                <p className="mt-1 font-display text-lg font-bold text-accent">{item.price}</p>
                <div className="mt-auto pt-3">
                  <Button size="sm" fullWidth trailingIcon={<ArrowRight size={14} />}>{item.ctaLabel}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contacto para marcas ──────────────────────── */}
      <section className="container-rb mt-10">
        <div className="card p-6 sm:p-8 bg-gradient-to-br from-accent/10 via-transparent to-blue-500/5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="eyebrow"><Award size={14} /> Disponible para sponsors</span>
              <h3 className="heading-3 mt-2">¿Eres marca o tienda? Conversemos.</h3>
              <p className="mt-1 text-sm max-w-xl" style={{ color: "var(--rb-muted)" }}>
                Activa una colaboración medible: códigos, visibilidad en perfil o embajada de temporada.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button leadingIcon={<Mail size={16} />} onClick={onContactBrand}>Contacto comercial</Button>
              <Button variant="outline" onClick={() => onNavigate("brands")}>Ver propuesta</Button>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-10 text-center text-xs" style={{ color: "var(--rb-subtle)" }}>
        Perfil creado con <span className="text-accent">RiderBio</span> by La Refactoría
      </p>
    </div>
  );
}
