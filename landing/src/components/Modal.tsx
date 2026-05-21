import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

export function Modal({ open, onClose, title, description, children, size = "md" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className={["card w-full relative flex flex-col", sizes[size]].join(" ")}
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header fijo */}
        <div className="p-6 sm:p-8 pb-0 shrink-0">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg transition"
            style={{ color: "var(--rb-muted)", background: "var(--rb-hover)" }}
          >
            <X size={16} />
          </button>
          {title ? <h3 className="heading-3 pr-8">{title}</h3> : null}
          {description ? <p className="mt-2 text-sm" style={{ color: "var(--rb-muted)" }}>{description}</p> : null}
        </div>
        {/* Contenido scrolleable */}
        <div className={["overflow-y-auto p-6 sm:p-8", title || description ? "pt-4 sm:pt-4" : ""].join(" ")}>
          {children}
        </div>
      </div>
    </div>
  );
}
