import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { MetricRow } from "../types";

const trendStyles = { up: "text-emerald-500", down: "text-red-400", neutral: "text-amber-500" };

export function MetricCard({ metric }: { metric: MetricRow }) {
  const Icon = metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : Minus;
  return (
    <div className="card card-hover p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider" style={{ color: "var(--rb-subtle)" }}>{metric.label}</p>
        <span className={["inline-flex items-center gap-1 text-xs", trendStyles[metric.trend]].join(" ")}>
          <Icon size={14} />{metric.delta}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight" style={{ color: "var(--rb-text)" }}>{metric.value}</p>
      <p className="mt-1 text-xs" style={{ color: "var(--rb-subtle)" }}>{metric.hint}</p>
    </div>
  );
}
