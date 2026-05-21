import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MousePointerClick, Link2, TrendingUp, Trophy, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../hooks/useAuth";
import { getDashboardMetrics, publicProfileUrl } from "../lib/pb";
import type { DashboardMetrics } from "../lib/pb";

function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  hint?: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--rb-subtle)" }}>
          {label}
        </p>
        <Icon size={16} className="text-accent" />
      </div>
      <p className="mt-3 font-display text-3xl font-bold" style={{ color: "var(--rb-text)" }}>
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs" style={{ color: "var(--rb-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function DashboardPage() {
  const { rider } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!rider) return;
    getDashboardMetrics(rider.id)
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, [rider]);

  if (!rider) return null;

  const url = publicProfileUrl(rider.username);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="heading-1">Hola, {rider.display_name.split(" ")[0]} 👋</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
            Aquí está el resumen de tu RiderBio.
          </p>
        </div>
        {!rider.is_active && <Badge tone="amber">⏳ Perfil pendiente de activación</Badge>}
      </div>

      {/* Card de tu link público */}
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--rb-subtle)" }}>
              Tu link público
            </p>
            <p
              className="mt-2 truncate font-display text-base font-semibold sm:text-lg"
              style={{ color: "var(--rb-text)" }}
            >
              {url}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyLink}
              leadingIcon={copied ? <Check size={14} /> : <Copy size={14} />}
            >
              {copied ? "Copiado" : "Copiar"}
            </Button>
            {rider.is_active && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" leadingIcon={<ExternalLink size={14} />}>
                  Abrir
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Clics totales"
          value={loading ? "—" : metrics?.totalClicks ?? 0}
          icon={MousePointerClick}
        />
        <StatCard
          label="Links activos"
          value={loading ? "—" : `${metrics?.activeLinks ?? 0}/${metrics?.totalLinks ?? 0}`}
          icon={Link2}
        />
        <StatCard
          label="Top link"
          value={loading ? "—" : metrics?.topLink?.clicks ?? 0}
          icon={Trophy}
          hint={metrics?.topLink?.label}
        />
        <StatCard
          label="Últimos 30 días"
          value={loading ? "—" : metrics?.clicksLast30Days ?? 0}
          icon={TrendingUp}
        />
      </div>

      {/* Empty state si no tiene links */}
      {!loading && metrics && metrics.totalLinks === 0 && (
        <div className="card p-8 text-center">
          <p className="font-display text-lg font-semibold" style={{ color: "var(--rb-text)" }}>
            Aún no tienes links
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--rb-muted)" }}>
            Agrega tu Instagram, Strava, sponsors o tienda recomendada.
          </p>
          <div className="mt-5">
            <Link to="/links">
              <Button>Agregar mi primer link</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Acciones rápidas */}
      {!loading && metrics && metrics.totalLinks > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/perfil" className="card card-hover p-5">
            <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>
              Editar mi perfil
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
              Bio, foto, ciudad, disciplina.
            </p>
          </Link>
          <Link to="/links" className="card card-hover p-5">
            <p className="font-display text-base font-semibold" style={{ color: "var(--rb-text)" }}>
              Gestionar links
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
              Agregar, editar, reordenar.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
