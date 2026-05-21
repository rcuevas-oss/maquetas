export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="grid place-items-center rounded-lg bg-accent text-ink-950 font-bold"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        aria-hidden
      >
        R
      </span>
      <span className="font-display text-base font-semibold tracking-tight">
        Rider<span className="text-accent">Bio</span>
      </span>
    </span>
  );
}
