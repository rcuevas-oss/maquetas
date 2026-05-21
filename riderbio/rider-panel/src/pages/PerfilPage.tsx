import { useEffect, useState, type FormEvent } from "react";
import { Save, Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { updateProfile, pb } from "../lib/pb";
import type { ProfilePatch } from "../lib/types";

export function PerfilPage() {
  const { rider } = useAuth();
  const [form, setForm] = useState<ProfilePatch>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rider) return;
    setForm({
      display_name: rider.display_name,
      discipline: rider.discipline ?? "",
      city: rider.city ?? "",
      bio: rider.bio ?? "",
      quote: rider.quote ?? "",
      avatar_url: rider.avatar_url ?? "",
      cover_url: rider.cover_url ?? "",
    });
  }, [rider]);

  if (!rider) return null;

  const set =
    (k: keyof ProfilePatch) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await updateProfile(rider.id, form);
      // Refrescar authStore con el rider actualizado
      pb.authStore.save(pb.authStore.token, updated as unknown as Parameters<typeof pb.authStore.save>[1]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Error al guardar: ${msg.slice(0, 120)}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Mi perfil</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
          Esta información aparece en tu perfil público.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Card básicos */}
        <div className="card p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="heading-3">Datos básicos</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
              Lo principal que verán las marcas y visitantes.
            </p>
          </div>

          <div>
            <label className="label-rb">Nombre completo *</label>
            <input
              type="text"
              value={form.display_name ?? ""}
              onChange={set("display_name")}
              className="input-rb"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-rb">Disciplina</label>
              <input
                type="text"
                value={form.discipline ?? ""}
                onChange={set("discipline")}
                placeholder="MTB, Gravel, Ruta..."
                className="input-rb"
              />
            </div>
            <div>
              <label className="label-rb">Ciudad</label>
              <input
                type="text"
                value={form.city ?? ""}
                onChange={set("city")}
                placeholder="Santiago, Chile"
                className="input-rb"
              />
            </div>
          </div>

          <div>
            <label className="label-rb">Quote (frase corta de identidad)</label>
            <input
              type="text"
              value={form.quote ?? ""}
              onChange={set("quote")}
              placeholder="La bicicleta me enseñó que el esfuerzo siempre tiene recompensa"
              className="input-rb"
              maxLength={160}
            />
            <p className="mt-1 text-xs" style={{ color: "var(--rb-subtle)" }}>
              {(form.quote ?? "").length} / 160
            </p>
          </div>

          <div>
            <label className="label-rb">Bio</label>
            <textarea
              value={form.bio ?? ""}
              onChange={set("bio")}
              rows={4}
              placeholder="Cuéntanos tu historia: años en bici, logros, qué te mueve..."
              className="input-rb resize-none"
              maxLength={600}
            />
            <p className="mt-1 text-xs" style={{ color: "var(--rb-subtle)" }}>
              {(form.bio ?? "").length} / 600
            </p>
          </div>
        </div>

        {/* Card imágenes */}
        <div className="card p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="heading-3">Imágenes</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
              Por ahora ingresa URLs públicas (Imgur, Cloudinary, Drive público). Próximamente podrás subir directo.
            </p>
          </div>

          <div>
            <label className="label-rb">Avatar (URL cuadrada, ideal 400x400)</label>
            <input
              type="url"
              value={form.avatar_url ?? ""}
              onChange={set("avatar_url")}
              placeholder="https://..."
              className="input-rb"
            />
            {form.avatar_url && (
              <img
                src={form.avatar_url}
                alt="avatar preview"
                className="mt-3 h-20 w-20 rounded-2xl object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>

          <div>
            <label className="label-rb">Portada (URL horizontal, ideal 1600x600)</label>
            <input
              type="url"
              value={form.cover_url ?? ""}
              onChange={set("cover_url")}
              placeholder="https://..."
              className="input-rb"
            />
            {form.cover_url && (
              <img
                src={form.cover_url}
                alt="cover preview"
                className="mt-3 h-32 w-full rounded-xl object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>
        </div>

        <div className="sticky bottom-0 -mx-5 px-5 py-4 sm:relative sm:mx-0 sm:p-0"
          style={{ background: "linear-gradient(to top, var(--rb-bg) 60%, transparent)" }}>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving} leadingIcon={success ? <Check size={16} /> : <Save size={16} />}>
              {saving ? "Guardando..." : success ? "Guardado" : "Guardar cambios"}
            </Button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
