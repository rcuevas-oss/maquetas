import {
  ArrowRight, BarChart3, CheckCircle2, Handshake, Megaphone,
  ShoppingBag, Star, TicketPercent, Users, Wrench,
} from "lucide-react";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Image } from "../components/Image";
import { brandsHeroImage, refactoriaServices } from "../data/mock";
import type { View } from "../types";

interface Props { onNavigate: (v: View) => void; onContactBrand: () => void; }

const features = [
  { icon: <TicketPercent size={20} />, title: "Campañas con códigos de descuento", desc: "Distribuye códigos únicos por embajador y mide ventas reales por canal." },
  { icon: <Handshake size={20} />, title: "Links de referido", desc: "Cada ciclista tiene un link único con tracking de clics, leads y comisiones." },
  { icon: <Star size={20} />, title: "Embajadores ciclistas", desc: "Selecciona riders por disciplina, ciudad y comunidad. Sin agencias intermediarias." },
  { icon: <BarChart3 size={20} />, title: "Medición de clics y leads", desc: "Dashboard con conversiones, ROI por embajador y exportación a planilla." },
  { icon: <ShoppingBag size={20} />, title: "Visibilidad en perfiles RiderBio", desc: "Aparece como sponsor o tienda recomendada en perfiles de ciclistas activos." },
  { icon: <Megaphone size={20} />, title: "Lanzamientos coordinados", desc: "Activa lanzamientos sincronizados con varios embajadores el mismo día." },
];

const tiers = [
  { name: "Starter", badge: "Tienda local", price: "Sin costo de entrada", detail: "Aparece como tienda recomendada en perfiles segmentados por ciudad.", items: ["Hasta 3 embajadores activos", "Códigos de descuento medibles", "Reportes mensuales por email"], highlight: false },
  { name: "Marca", badge: "Recomendado", price: "Plan colaborativo", detail: "Para marcas que quieren activar campañas con múltiples embajadores.", items: ["Embajadores ilimitados", "Links de referido por SKU", "Dashboard en vivo de conversiones", "Onboarding con La Refactoría"], highlight: true },
  { name: "Ecosistema", badge: "Tienda + ecommerce", price: "Bundle La Refactoría", detail: "RiderBio + ecommerce + sistema de reservas para tu taller.", items: ["Ecommerce especializado en bicicletas", "Reservas de taller con automatización", "Integración WhatsApp + dashboard comercial", "Embajadores RiderBio incluidos"], highlight: false },
];

export function BrandsView({ onNavigate, onContactBrand }: Props) {
  return (
    <div>
      {/* HERO */}
      <section className="container-rb pt-14 sm:pt-20 pb-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow"><Handshake size={14} /> Tiendas y marcas</span>
            <h1 className="heading-1 mt-4">
              Conecta tu tienda con ciclistas que <span className="text-accent">ya tienen comunidad</span>.
            </h1>
            <p className="mt-5 text-base max-w-2xl" style={{ color: "var(--rb-muted)" }}>
              RiderBio te conecta con embajadores ciclistas reales. Activa campañas con códigos, links de referido y aparición en perfiles — todo medible en un dashboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={onContactBrand} trailingIcon={<ArrowRight size={16} />}>Quiero conectar con ciclistas</Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("profile")}>Ver perfil de ejemplo</Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/30 via-blue-500/10 to-transparent blur-2xl" />
              <div className="card overflow-hidden">
                <Image src={brandsHeroImage} alt="Ciclistas en ruta" wrapperClassName="aspect-[4/3] w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "+1.200", v: "Visitas mensuales por perfil" },
            { k: "27%", v: "Tasa de clic promedio" },
            { k: "3-5", v: "Embajadores recomendados por marca" },
            { k: "100%", v: "Trazabilidad de comisiones" },
          ].map((s) => (
            <div key={s.v} className="card p-5">
              <p className="font-display text-3xl font-bold text-accent">{s.k}</p>
              <p className="mt-1 text-xs" style={{ color: "var(--rb-muted)" }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section pt-0">
        <div className="container-rb">
          <span className="eyebrow"><Users size={14} /> Cómo funciona para marcas</span>
          <h2 className="heading-2 mt-3">Todo lo que necesitas para activar embajadores.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card card-hover p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">{f.icon}</div>
                <h3 className="mt-4 font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>{f.title}</h3>
                <p className="mt-1.5 text-sm" style={{ color: "var(--rb-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="section pt-0">
        <div className="container-rb">
          <span className="eyebrow"><Star size={14} /> Modelos de colaboración</span>
          <h2 className="heading-2 mt-3">Elige cómo quieres trabajar con la comunidad ciclista.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className={["card overflow-hidden", t.highlight ? "border-accent/40 shadow-glow" : ""].join(" ")}>
                <div className={["h-1.5", t.highlight ? "bg-accent" : ""].join(" ")} style={!t.highlight ? { background: "var(--rb-elevated)" } : undefined} />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg font-semibold" style={{ color: "var(--rb-text)" }}>{t.name}</p>
                    <Badge tone={t.highlight ? "accent" : "neutral"}>{t.badge}</Badge>
                  </div>
                  <p className="mt-4 font-display text-2xl font-bold" style={{ color: "var(--rb-text)" }}>{t.price}</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>{t.detail}</p>
                  <ul className="mt-5 space-y-2.5">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--rb-muted)" }}>
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button fullWidth variant={t.highlight ? "primary" : "outline"} onClick={onContactBrand} trailingIcon={<ArrowRight size={16} />}>
                      Contactar a La Refactoría
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFACTORÍA CLOSER */}
      <section className="section pt-0">
        <div className="container-rb">
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 sm:p-10">
                <span className="eyebrow"><Wrench size={14} /> La Refactoría</span>
                <h2 className="heading-2 mt-3">¿Eres tienda de bicicletas? También digitalizamos tu negocio completo.</h2>
                <p className="mt-3 text-sm max-w-xl" style={{ color: "var(--rb-muted)" }}>
                  RiderBio es una iniciativa de La Refactoría, agencia chilena especializada en ecommerce, sitios web y automatización para tiendas de bicicletas.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={onContactBrand} trailingIcon={<ArrowRight size={16} />}>Solicitar diagnóstico gratuito</Button>
                  <Button variant="outline" onClick={() => onNavigate("landing")}>Volver al inicio</Button>
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
    </div>
  );
}
