import { useEffect, useState, type FormEvent } from "react";
import { Plus, ArrowUp, ArrowDown, Trash2, Eye, EyeOff, Edit2, MousePointerClick, Link as LinkIcon, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../hooks/useAuth";
import { listLinks, createLink, updateLink, deleteLink, reorderLinks } from "../lib/pb";
import type { RiderLink, LinkIcon as LinkIconType, NewLink } from "../lib/types";

const ICON_OPTIONS: { value: LinkIconType; label: string; emoji: string }[] = [
  { value: "instagram", label: "Instagram", emoji: "📸" },
  { value: "strava", label: "Strava", emoji: "🚴" },
  { value: "youtube", label: "YouTube", emoji: "▶️" },
  { value: "mail", label: "Email", emoji: "✉️" },
  { value: "store", label: "Tienda", emoji: "🛒" },
  { value: "star", label: "Sponsor", emoji: "⭐" },
  { value: "heart", label: "Recomendado", emoji: "❤️" },
  { value: "link", label: "Otro", emoji: "🔗" },
];

const iconEmoji = (icon?: string): string => {
  return ICON_OPTIONS.find((o) => o.value === icon)?.emoji ?? "🔗";
};

interface FormData {
  label: string;
  sublabel: string;
  url: string;
  icon: LinkIconType;
}

const emptyForm: FormData = { label: "", sublabel: "", url: "", icon: "link" };

export function LinksPage() {
  const { rider } = useAuth();
  const [links, setLinks] = useState<RiderLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<RiderLink | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    if (!rider) return;
    setLoading(true);
    const result = await listLinks(rider.id);
    setLinks(result);
    setLoading(false);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rider?.id]);

  if (!rider) return null;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (link: RiderLink) => {
    setEditing(link);
    setForm({
      label: link.label,
      sublabel: link.sublabel ?? "",
      url: link.url,
      icon: (link.icon as LinkIconType) || "link",
    });
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setError(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (editing) {
        await updateLink(editing.id, form as Partial<NewLink>);
      } else {
        await createLink(rider.id, {
          label: form.label,
          sublabel: form.sublabel,
          url: form.url,
          icon: form.icon,
          position: links.length,
        });
      }
      await reload();
      closeForm();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Error: ${msg.slice(0, 120)}`);
    } finally {
      setBusy(false);
    }
  };

  const onToggle = async (link: RiderLink) => {
    await updateLink(link.id, { is_active: !link.is_active });
    await reload();
  };

  const onDelete = async (link: RiderLink) => {
    if (!confirm(`¿Eliminar "${link.label}"? No se puede deshacer.`)) return;
    await deleteLink(link.id);
    await reload();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const next = [...links];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLinks(next);
    await reorderLinks(next.map((l) => l.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="heading-1">Links</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
            Los links que aparecen en tu perfil público. Reordena según prioridad.
          </p>
        </div>
        <Button onClick={openCreate} leadingIcon={<Plus size={16} />}>
          Nuevo link
        </Button>
      </div>

      {loading ? (
        <div className="card animate-pulse p-8 text-center text-sm" style={{ color: "var(--rb-muted)" }}>
          Cargando...
        </div>
      ) : links.length === 0 ? (
        <div className="card p-10 text-center">
          <LinkIcon size={32} className="mx-auto text-accent" />
          <p className="mt-4 font-display text-lg font-semibold" style={{ color: "var(--rb-text)" }}>
            No tienes links aún
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
            Empieza con tu Instagram o Strava — son los más clickeados.
          </p>
          <div className="mt-5">
            <Button onClick={openCreate} leadingIcon={<Plus size={16} />}>
              Crear mi primer link
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, idx) => (
            <div
              key={link.id}
              className="card p-4 sm:p-5"
              style={{ opacity: link.is_active ? 1 : 0.55 }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Icon */}
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg"
                  style={{ background: "var(--rb-elevated)" }}
                >
                  {iconEmoji(link.icon)}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-display text-sm font-semibold" style={{ color: "var(--rb-text)" }}>
                      {link.label}
                    </p>
                    {!link.is_active && <Badge tone="neutral">oculto</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-xs" style={{ color: "var(--rb-muted)" }}>
                    {link.sublabel || link.url}
                  </p>
                </div>

                {/* Click count */}
                <div className="hidden shrink-0 items-center gap-1.5 text-xs sm:flex" style={{ color: "var(--rb-muted)" }}>
                  <MousePointerClick size={13} />
                  {link.click_count}
                </div>

                {/* Acciones */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    className="grid h-8 w-8 place-items-center rounded-lg disabled:opacity-30"
                    style={{ color: "var(--rb-muted)" }}
                    aria-label="Subir"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => move(idx, 1)}
                    disabled={idx === links.length - 1}
                    className="grid h-8 w-8 place-items-center rounded-lg disabled:opacity-30"
                    style={{ color: "var(--rb-muted)" }}
                    aria-label="Bajar"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    onClick={() => onToggle(link)}
                    className="grid h-8 w-8 place-items-center rounded-lg"
                    style={{ color: "var(--rb-muted)" }}
                    aria-label={link.is_active ? "Ocultar" : "Mostrar"}
                  >
                    {link.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => openEdit(link)}
                    className="grid h-8 w-8 place-items-center rounded-lg"
                    style={{ color: "var(--rb-muted)" }}
                    aria-label="Editar"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(link)}
                    className="grid h-8 w-8 place-items-center rounded-lg hover:text-red-400"
                    style={{ color: "var(--rb-muted)" }}
                    aria-label="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeForm}>
          <div
            className="card w-full max-w-lg flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 sm:p-8 pb-0 shrink-0">
              <div>
                <h2 className="heading-3">{editing ? "Editar link" : "Nuevo link"}</h2>
                <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
                  Aparecerá en tu perfil público.
                </p>
              </div>
              <button
                onClick={closeForm}
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ color: "var(--rb-muted)", background: "var(--rb-hover)" }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="overflow-y-auto p-6 sm:p-8 pt-4 sm:pt-4 space-y-4">
              <div>
                <label className="label-rb">Título *</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="Mi Instagram"
                  className="input-rb"
                  required
                />
              </div>

              <div>
                <label className="label-rb">URL *</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://instagram.com/tu_usuario"
                  className="input-rb"
                  required
                />
              </div>

              <div>
                <label className="label-rb">Subtítulo (opcional)</label>
                <input
                  type="text"
                  value={form.sublabel}
                  onChange={(e) => setForm({ ...form, sublabel: e.target.value })}
                  placeholder="@tu_usuario"
                  className="input-rb"
                />
              </div>

              <div>
                <label className="label-rb">Ícono</label>
                <div className="grid grid-cols-4 gap-2">
                  {ICON_OPTIONS.map((opt) => {
                    const active = form.icon === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm({ ...form, icon: opt.value })}
                        className="rounded-xl border px-2 py-3 text-center transition"
                        style={
                          active
                            ? { borderColor: "rgba(199,255,99,0.6)", background: "rgba(199,255,99,0.1)" }
                            : { borderColor: "var(--rb-border)", background: "var(--rb-elevated)" }
                        }
                      >
                        <div className="text-xl">{opt.emoji}</div>
                        <div
                          className="mt-1 text-[11px]"
                          style={{ color: active ? "#c7ff63" : "var(--rb-muted)" }}
                        >
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={busy}>
                  {busy ? "Guardando..." : editing ? "Actualizar" : "Crear"}
                </Button>
              </div>

              {error && <p className="text-center text-sm text-red-400">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
