import { Logo } from "./Logo";

export function Footer({ context = "default" }: { context?: "default" | "profile" }) {
  return (
    <footer className="mt-24" style={{ borderTop: "1px solid var(--rb-border)", background: "var(--rb-surface)" }}>
      <div className="container-rb py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm max-w-xs" style={{ color: "var(--rb-muted)" }}>
            Tu perfil ciclista profesional en un solo link. Conecta ciclistas, marcas y tiendas de bicicletas.
          </p>
        </div>
        {[
          { title: "Producto", items: ["Perfil público", "Dashboard de métricas", "Links de referido", "Integración con sponsors"] },
          { title: "Para tiendas", items: ["Embajadores ciclistas", "Códigos de descuento", "Medición de leads", "Campañas con marcas"] },
          { title: "La Refactoría", items: ["Ecommerce para bicicletas", "Sistemas de reservas", "Automatizaciones", "SEO local"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--rb-muted)" }}>
              {col.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--rb-border)" }}>
        <div className="container-rb py-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs" style={{ color: "var(--rb-subtle)" }}>
          <p>
            {context === "profile"
              ? "Perfil creado con RiderBio by La Refactoría"
              : "© 2026 RiderBio · Creado por La Refactoría"}
          </p>
          <p>Linares, Chile · Equipo remoto</p>
        </div>
      </div>
    </footer>
  );
}
