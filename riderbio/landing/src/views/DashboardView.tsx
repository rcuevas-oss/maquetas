import { ArrowUpRight, Eye, MousePointerClick, Plus, Sparkles } from "lucide-react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { MetricCard } from "../components/MetricCard";
import { metrics, referrals, cyclist } from "../data/mock";
import type { ReferralRow, View } from "../types";

interface Props { onNavigate: (v: View) => void; }

const statusTone: Record<ReferralRow["status"], "amber" | "green" | "blue"> = {
  Pendiente: "amber",
  Pagado: "green",
  "En revisión": "blue",
};

export function DashboardView({ onNavigate }: Props) {
  return (
    <div className="container-rb py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> Dashboard ciclista</span>
          <h1 className="heading-2 mt-3">Hola, {cyclist.name.split(" ")[0]}.</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--rb-muted)" }}>Tus métricas de RiderBio · Últimos 30 días.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" leadingIcon={<Eye size={14} />} onClick={() => onNavigate("profile")}>Ver perfil público</Button>
          <Button size="sm" leadingIcon={<Plus size={14} />}>Agregar link</Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="card p-5 sm:p-7 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Visitas y clics</p>
              <p className="text-xs" style={{ color: "var(--rb-muted)" }}>Últimos 30 días · Datos demo</p>
            </div>
            <Badge tone="green"><ArrowUpRight size={12} /> +18%</Badge>
          </div>
          <FakeChart />
        </div>

        <div className="card p-5 sm:p-7 lg:col-span-5">
          <div className="flex items-center gap-2">
            <MousePointerClick size={18} className="text-accent" />
            <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Top links de la semana</p>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { label: "Mi tienda recomendada", clicks: 92, share: 27 },
              { label: "Productos que uso", clicks: 64, share: 19 },
              { label: "Instagram", clicks: 58, share: 17 },
              { label: "Strava", clicks: 41, share: 12 },
              { label: "Agenda con La Refactoría", clicks: 28, share: 8 },
            ].map((row) => (
              <li key={row.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate pr-3" style={{ color: "var(--rb-text)" }}>{row.label}</span>
                  <span className="tabular-nums" style={{ color: "var(--rb-muted)" }}>{row.clicks}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full overflow-hidden" style={{ background: "var(--rb-elevated)" }}>
                  <div className="h-full bg-gradient-to-r from-accent to-accent-dim" style={{ width: `${row.share * 3}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 card overflow-hidden">
        <div className="p-5 sm:p-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>Referidos recientes</p>
            <p className="text-xs" style={{ color: "var(--rb-muted)" }}>Comisiones, leads y ventas atribuidas a tu RiderBio.</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Badge tone="green">Pagado</Badge>
            <Badge tone="amber">Pendiente</Badge>
            <Badge tone="blue">En revisión</Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider" style={{ background: "var(--rb-elevated)", color: "var(--rb-subtle)" }}>
                {["Fecha", "Origen", "Acción", "Estado", "Comisión"].map((h) => (
                  <th key={h} className={["px-5 py-3 font-medium", h === "Comisión" ? "text-right" : ""].join(" ")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={`${r.date}-${r.origin}`} style={{ borderTop: "1px solid var(--rb-border)" }}>
                  <td className="px-5 py-4 whitespace-nowrap" style={{ color: "var(--rb-muted)" }}>{r.date}</td>
                  <td className="px-5 py-4 font-medium" style={{ color: "var(--rb-text)" }}>{r.origin}</td>
                  <td className="px-5 py-4" style={{ color: "var(--rb-muted)" }}>{r.action}</td>
                  <td className="px-5 py-4"><Badge tone={statusTone[r.status]}>{r.status}</Badge></td>
                  <td className="px-5 py-4 text-right font-display font-semibold tabular-nums" style={{ color: "var(--rb-text)" }}>{r.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 flex items-center justify-between text-xs" style={{ borderTop: "1px solid var(--rb-border)", color: "var(--rb-subtle)" }}>
          <span>Mostrando {referrals.length} movimientos · Demo</span>
          <Button size="sm" variant="ghost">Ver historial completo</Button>
        </div>
      </div>
    </div>
  );
}

function FakeChart() {
  const points = [12, 18, 15, 22, 28, 24, 32, 38, 30, 42, 48, 44, 52, 60];
  const max = Math.max(...points), min = Math.min(...points), range = max - min || 1;
  const w = 100, h = 40, step = w / (points.length - 1);
  const norm = (v: number) => h - ((v - min) / range) * h;
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(v)}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="mt-6 h-48 w-full rounded-xl p-4" style={{ background: "var(--rb-elevated)", border: "1px solid var(--rb-border)" }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="rb-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c7ff63" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c7ff63" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#rb-grad)" />
        <path d={path} fill="none" stroke="#c7ff63" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
