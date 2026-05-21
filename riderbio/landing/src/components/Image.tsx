import { useState, type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackGradient?: string;
  wrapperClassName?: string;
}

export function Image({
  src,
  alt,
  fallbackGradient = "from-accent/30 via-emerald-500/20 to-blue-500/30",
  wrapperClassName = "",
  className = "",
  ...rest
}: ImageProps) {
  const [error, setError] = useState(false);

  return (
    <div
      className={[
        "relative overflow-hidden",
        `bg-gradient-to-br ${fallbackGradient}`,
        wrapperClassName,
      ].join(" ")}
    >
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          className={["h-full w-full object-cover", className].join(" ")}
          {...rest}
        />
      ) : null}
    </div>
  );
}
