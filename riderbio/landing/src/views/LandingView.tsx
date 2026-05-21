import {
  ArrowRight, Bike, ChartLine, CheckCircle2, CircleDollarSign,
  Eye, Handshake, Link as LinkIcon, MapPin, Megaphone,
  Rocket, ShoppingBag, Sparkles, Trophy, Users, Wrench, Zap,
} from "lucide-react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { heroShowcaseImage, profileExamples, refactoriaServices } from "../data/mock";
import type { View } from "../types";

interface Props { onNavigate: (v: View) => void; onRequestRider: () => void; onRequestBrand: () => void; }

const riderBenefits = [
  { icon: <LinkIcon size={20} />, title: "Tu vitrina en un solo link", desc: "Un perfil profesional listo para Instagram, Strava y tarjeta digital." },
  { icon: <Trophy size={20} />, title: "Muestra logros y sponsors", desc: "Convierte tu bio en una vitrina deportiva creíble para marcas." },
  { icon: <CircleDollarSign size={20} />, title: "Monetiza con referidos", desc: "Gana comisiones con links de tiendas, productos y servicios." },
  { icon: <ChartLine size={20} />, title: "Métricas reales", desc: "Visitas, clics y leads para negociar mejor con tus sponsors." },
];

const brandBenefits = [
  { icon: <Users size={20} />, title: "Embajadores ciclistas", desc: "Conecta con riders que ya tienen comunidad activa en tu disciplina." },
  { icon: <Megaphone size={20} />, title: "Códigos y campañas", desc: "Activa códigos de descuento medibles por canal y por embajador." },
  { icon: <ShoppingBag size={20} />, title: "Visibilidad en perfiles", desc: "Aparece como sponsor en perfiles segmentados por ciudad y disciplina." },
  { icon: <Eye size={20} />, title: "Medición clara", desc: "Clics, leads y conversiones por embajador, sin planillas." },
];

const steps = [
  { n: "01", icon: <Bike size={18} />, title: "Crea tu perfil", desc: "Sube foto, disciplina, ciudad y bio. Tardas menos que en armar la bici." },
  { n: "02", icon: <Sparkles size={18} />, title: "Conecta sponsors y links", desc: "Suma redes, sponsors actuales, equipamiento y links." },
  { n: "03", icon: <Rocket size={18} />, title: "Comparte tu RiderBio", desc: "Tu único link en Instagram, Strava y conversaciones con marcas." },
  { n: "04", icon: <CircleDollarSign size={18} />, title: "Monetiza tu influencia", desc: "Gana comisiones, descuentos y oportunidades reales." },
];

export function LandingView({ onNavigate, onRequestRider, onRequestBrand }: Props) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-rb pt-16 sm:pt-24 pb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow"><Zap size={14} /> RiderBio · Demo MVP</span>
              <h1 className="heading-1 mt-4">
                Tu perfil ciclista <span className="text-accent">profesional</span> en un solo link.
              </h1>
              <p className="mt-5 max-w-xl text-base sm:text-lg" style={{ color: "var(--rb-muted)" }}>
                Muestra tus redes, sponsors, logros, palmarés y productos. Monetiza tu influencia dentro del mundo bicicleta.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => onNavigate("profile")} trailingIcon={<ArrowRight size={16} />}>Ver demo de RiderBio</Button>
                <Button size="lg" variant="outline" onClick={onRequestRider}>Quiero mi RiderBio</Button>
                <Button size="lg" variant="ghost" onClick={onRequestBrand}>Soy tienda o marca</Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: "var(--rb-muted)" }}>
                {["Mobile-first", "Métricas reales", "Links monetizados"].map((f) => (
                  <span key={f} className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent" /> {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/30 via-blue-500/10 to-transparent blur-2xl" />
                <div className="card overflow-hidden">
                  <div className="relative">
                    <Image src={heroShowcaseImage} alt="Ciclista MTB en sendero" wrapperClassName="h-44 w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="px-5 -mt-12 relative">
                    <Image src={profileExamples[0].avatar} alt="Martín Rojas" wrapperClassName="h-20 w-20 rounded-2xl border-4" style={{ borderColor: "var(--rb-card)" }} />
                    <div className="mt-3">
                      <p className="font-display text-lg font-semibold" style={{ color: "var(--rb-text)" }}>Martín Rojas</p>
                      <p className="text-xs" style={{ color: "var(--rb-muted)" }}>MTB / Gravel · Linares, Chile</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge tone="accent">3 sponsors</Badge>
                      <Badge tone="green">Palmarés activo</Badge>
                      <Badge tone="blue">Merch</Badge>
                    </div>
                  </div>
                  <div className="mt-5 px-5 pb-5 space-y-2.5">
                    {["Instagram · @martinrojasbike", "Strava · 12.400 km 2026", "Mi tienda recomendada", "Productos que uso"].map((t) => (
                      <div key={t} className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm" style={{ border: "1px solid var(--rb-border)", background: "var(--rb-elevated)" }}>
                        <span className="truncate" style={{ color: "var(--rb-text)" }}>{t}</span>
                        <ArrowRight size={14} style={{ color: "var(--rb-subtle)" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIDER BENEFITS */}
      <section className="section pt-0">
        <div className="container-rb">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow"><Bike size={14} /> Para ciclistas</span>
              <h2 className="heading-2 mt-3">Convierte tu bio en una vitrina deportiva.</h2>
            </div>
            <p className="max-w-md text-sm" style={{ color: "var(--rb-muted)" }}>
              Pensado para ciclistas competitivos, embajadores y creadores de contenido.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {riderBenefits.map((b) => (
              <div key={b.title} className="card card-hover p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">{b.icon}</div>
                <h3 className="mt-4 font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>{b.title}</h3>
                <p className="mt-1.5 text-sm" style={{ color: "var(--rb-muted)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND BENEFITS */}
      <section className="section pt-0">
        <div className="container-rb">
          <div className="card p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <span className="eyebrow"><Handshake size={14} /> Para marcas y tiendas</span>
                <h2 className="heading-2 mt-3">Conecta tu tienda con ciclistas que ya tienen comunidad.</h2>
                <p className="mt-3 text-sm" style={{ color: "var(--rb-muted)" }}>
                  Activa campañas medibles con embajadores reales del ciclismo chileno.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={() => onNavigate("brands")} trailingIcon={<ArrowRight size={16} />}>Ver propuesta para marcas</Button>
                  <Button variant="outline" onClick={onRequestBrand}>Soy tienda o marca</Button>
                </div>
              </div>
              <div className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
                {brandBenefits.map((b) => (
                  <div key={b.title} className="rounded-xl p-4" style={{ border: "1px solid var(--rb-border)", background: "var(--rb-elevated)" }}>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/15 text-blue-500">{b.icon}</div>
                      <p className="font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>{b.title}</p>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: "var(--rb-muted)" }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section pt-0">
        <div className="container-rb">
          <span className="eyebrow"><Sparkles size={14} /> Cómo funciona</span>
          <h2 className="heading-2 mt-3">De tu primera carrera a tu primera comisión.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="card p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-bold text-accent">{s.n}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--rb-elevated)", color: "var(--rb-muted)" }}>{s.icon}</span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>{s.title}</h3>
                <p className="mt-1.5 text-sm" style={{ color: "var(--rb-muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILE EXAMPLES */}
      <section className="section pt-0">
        <div className="container-rb">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow"><Users size={14} /> Ejemplos</span>
              <h2 className="heading-2 mt-3">Perfiles RiderBio en acción.</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate("profile")} trailingIcon={<ArrowRight size={14} />}>Abrir demo completa</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profileExamples.map((p) => (
              <button key={p.name} onClick={() => onNavigate("profile")} className="card card-hover overflow-hidden text-left group">
                <div className="relative">
                  <Image src={p.cover} alt={`${p.name} en acción`} wrapperClassName="h-40 w-full transition group-hover:scale-105 duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="px-5 -mt-10 pb-5 relative">
                  <Image src={p.avatar} alt={p.name} wrapperClassName="h-16 w-16 rounded-2xl border-4" style={{ borderColor: "var(--rb-card)" }} />
                  <p className="mt-3 font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>{p.name}</p>
                  <p className="text-xs" style={{ color: "var(--rb-muted)" }}>{p.discipline}</p>
                  <div className="mt-3 flex items-center justify-between text-xs" style={{ color: "var(--rb-subtle)" }}>
                    <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {p.city}</span>
                    <span className="inline-flex items-center gap-1.5"><Handshake size={12} /> {p.sponsors} sponsors</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LA REFACTORÍA */}
      <section className="section pt-0">
        <div className="container-rb">
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 sm:p-10">
                <span className="eyebrow"><Wrench size={14} /> Creado por La Refactoría</span>
                <h2 className="heading-2 mt-3">RiderBio es una iniciativa de <span className="text-accent">La Refactoría</span>.</h2>
                <p className="mt-3 text-sm max-w-xl" style={{ color: "var(--rb-muted)" }}>
                  Agencia chilena especializada en ecommerce, sitios web y automatización para tiendas de bicicletas.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button trailingIcon={<ArrowRight size={16} />} onClick={onRequestBrand}>Digitaliza tu tienda de bicicletas</Button>
                  <Button variant="outline" onClick={onRequestBrand}>Solicitar diagnóstico gratuito</Button>
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10" style={{ borderTop: "1px solid var(--rb-border-sm)", background: "var(--rb-elevated)" }}>
                <p className="font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>Lo que construimos</p>
                <ul className="mt-4 space-y-2.5">
                  {refactoriaServices.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--rb-muted)" }}>
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section pt-0">
        <div className="container-rb">
          <div className="card p-8 sm:p-12 text-center" style={{ background: "var(--rb-elevated)" }}>
            <span className="eyebrow justify-center"><Sparkles size={14} /> Empieza hoy</span>
            <h2 className="heading-2 mt-3">Conecta ciclistas, marcas y tiendas de bicicletas.</h2>
            <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "var(--rb-muted)" }}>
              Demo navegable con todas las vistas. Crea tu RiderBio, prueba el dashboard y descubre cómo trabajamos con marcas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={onRequestRider} trailingIcon={<ArrowRight size={16} />}>Quiero mi RiderBio</Button>
              <Button size="lg" variant="outline" onClick={onRequestBrand}>Soy tienda o marca</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
