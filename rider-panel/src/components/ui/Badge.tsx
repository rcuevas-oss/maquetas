import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "blue" | "green" | "amber" | "red";

const tones: Record<Tone, string> = {
  neutral: "bg-[var(--rb-elevated)] text-[var(--rb-muted)] border-[var(--rb-border)]",
  accent: "bg-accent/10 text-accent border-accent/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        tones[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
