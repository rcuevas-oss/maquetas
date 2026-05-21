import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink-950 hover:bg-accent-soft shadow-glow font-semibold",
  secondary: "bg-white text-ink-950 hover:bg-zinc-200 font-semibold",
  ghost: "bg-transparent hover:bg-[var(--rb-hover)] font-medium",
  outline: "border hover:border-accent/40 font-medium",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  fullWidth,
  className = "",
  style,
  children,
  ...rest
}: ButtonProps) {
  const themeStyle =
    variant === "ghost"
      ? { color: "var(--rb-muted)", ...style }
      : variant === "outline"
        ? { color: "var(--rb-text)", borderColor: "var(--rb-border)", background: "var(--rb-elevated)", ...style }
        : style;

  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 transition outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      style={themeStyle}
      {...rest}
    >
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </button>
  );
}
