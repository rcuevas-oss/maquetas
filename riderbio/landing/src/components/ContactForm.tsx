import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "./Button";
import { submitLead } from "../lib/pb";

type UserType = "ciclista" | "tienda" | "marca";

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  type: UserType;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

interface ContactFormProps {
  variant?: "rider" | "brand";
  onSuccess: () => void;
}

const labels = {
  rider: { cta: "Solicitar mi perfil" },
  brand: { cta: "Quiero conectar con ciclistas" },
};

const COUNTRIES = [
  "Chile", "Argentina", "Colombia", "México", "Perú", "España",
  "Uruguay", "Brasil", "Bolivia", "Ecuador", "Otro",
];

export function ContactForm({ variant = "rider", onSuccess }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "Chile",
    type: variant === "brand" ? "tienda" : "ciclista",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "El nombre es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Ingresa un email válido";
    return next;
  };

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
        type: form.type,
        message: form.message || undefined,
      });
      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(`Error: ${msg.slice(0, 120)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-accent/50";
  const inputStyle = { background: "var(--rb-elevated)", borderColor: "var(--rb-border)", color: "var(--rb-text)" };
  const errStyle = { ...inputStyle, borderColor: "rgb(239 68 68 / 0.6)" };
  const types: UserType[] = variant === "brand" ? ["tienda", "marca"] : ["ciclista", "tienda", "marca"];

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>

      {/* Nombre */}
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>Nombre *</label>
        <input type="text" value={form.name} onChange={set("name")}
          placeholder="Tu nombre completo"
          className={inputBase} style={errors.name ? errStyle : inputStyle} />
        {errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>Email *</label>
        <input type="email" value={form.email} onChange={set("email")}
          placeholder="tu@email.cl"
          className={inputBase} style={errors.email ? errStyle : inputStyle} />
        {errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
      </div>

      {/* Teléfono */}
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>Teléfono</label>
        <input type="tel" value={form.phone} onChange={set("phone")}
          placeholder="+56 9 1234 5678"
          className={inputBase} style={inputStyle} />
      </div>

      {/* Ciudad + País en fila */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>Ciudad</label>
          <input type="text" value={form.city} onChange={set("city")}
            placeholder="Santiago"
            className={inputBase} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>País</label>
          <select value={form.country} onChange={set("country")}
            className={inputBase} style={inputStyle}>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Soy */}
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>Soy</label>
        <div className={types.length === 2 ? "grid gap-2 grid-cols-2" : "grid gap-2 grid-cols-3"}>
          {types.map((t) => {
            const active = form.type === t;
            return (
              <button key={t} type="button" onClick={() => setForm((f) => ({ ...f, type: t }))}
                className="rounded-xl border px-3 py-2 text-sm capitalize transition"
                style={active
                  ? { borderColor: "rgba(199,255,99,0.6)", background: "rgba(199,255,99,0.1)", color: "#c7ff63" }
                  : { borderColor: "var(--rb-border)", background: "var(--rb-elevated)", color: "var(--rb-muted)" }}>
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--rb-muted)" }}>Mensaje</label>
        <textarea value={form.message} onChange={set("message")} rows={3}
          placeholder={variant === "brand"
            ? "Cuéntanos qué tipo de campaña te interesa"
            : "Cuéntanos sobre ti y tu disciplina"}
          className={[inputBase, "resize-none"].join(" ")} style={inputStyle} />
      </div>

      <Button type="submit" size="lg" fullWidth disabled={submitting}
        leadingIcon={<Send size={16} />}>
        {submitting ? "Enviando..." : labels[variant].cta}
      </Button>

      {submitError ? <p className="text-center text-xs text-red-400">{submitError}</p> : null}
    </form>
  );
}
