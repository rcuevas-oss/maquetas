import type { ReactNode } from "react";

type Tone = "accent" | "blue" | "amber" | "neutral" | "green";

const tones: Record<Tone, string> = {
  accent: "bg-accent/15 text-accent border-accent/30",
  blue: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  amber: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  neutral: "bg-white/5 text-zinc-300 border-white/10",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider",
        tones[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
