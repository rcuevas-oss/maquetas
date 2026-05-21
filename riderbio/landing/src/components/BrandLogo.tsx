import { useState } from "react";

export type BrandLogoStyle = {
  /** Direct image URL (takes precedence over slug). Use for brands not in simpleicons. */
  url?: string;
  /** simpleicons.org slug (e.g. "strava", "garmin"). If null and no url, render typographic logo. */
  slug: string | null;
  /** Hex color (no #). For simpleicons tinting OR typographic background. */
  color?: string;
  /** Brand name shown if image fails or as label */
  name: string;
};

interface BrandLogoProps extends BrandLogoStyle {
  className?: string;
  size?: number;
  variant?: "icon" | "wordmark";
}

export function BrandLogo({
  url: directUrl,
  slug,
  color,
  name,
  className = "",
  size = 40,
  variant = "icon",
}: BrandLogoProps) {
  const [error, setError] = useState(false);

  const imgSrc = !error
    ? directUrl ?? (slug ? `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}` : null)
    : null;

  if (imgSrc) {
    return (
      <img
        src={imgSrc}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setError(true)}
        className={["object-contain", className].join(" ")}
      />
    );
  }

  // Typographic fallback: brand color block with stylized name
  const bg = color ? `#${color}` : "#1d1d22";
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (variant === "wordmark") {
    return (
      <span
        className={[
          "inline-flex items-center font-display font-bold tracking-tight uppercase",
          className,
        ].join(" ")}
        style={{ color: bg, fontSize: size * 0.35 }}
      >
        {name}
      </span>
    );
  }

  return (
    <span
      className={[
        "grid place-items-center rounded-lg font-display font-bold text-white",
        className,
      ].join(" ")}
      style={{
        background: bg,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
      aria-label={name}
    >
      {initials}
    </span>
  );
}
