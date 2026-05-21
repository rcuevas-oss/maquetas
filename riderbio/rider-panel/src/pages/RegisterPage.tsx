import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { AuthShell } from "../components/layout/AuthShell";
import { registerRider, loginRider } from "../lib/pb";

interface FormState {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  display_name: string;
  discipline: string;
  city: string;
}

interface Errors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  username?: string;
  display_name?: string;
}

const usernameRegex = /^[a-z0-9_-]{3,30}$/;

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    display_name: "",
    discipline: "",
    city: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: k === "username" ? e.target.value.toLowerCase() : e.target.value }));

  const validate = (): Errors => {
    const next: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email inválido";
    if (form.password.length < 8) next.password = "Mínimo 8 caracteres";
    if (form.password !== form.passwordConfirm) next.passwordConfirm = "Las contraseñas no coinciden";
    if (!usernameRegex.test(form.username)) next.username = "3-30 caracteres, solo letras, números, _ o -";
    if (!form.display_name.trim()) next.display_name = "Tu nombre es requerido";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      await registerRider({
        email: form.email,
        password: form.password,
        username: form.username,
        display_name: form.display_name,
        discipline: form.discipline,
        city: form.city,
      });
      // Auto-login después del registro
      await loginRider(form.email, form.password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // PocketBase devuelve 400 con campos en `data` cuando el username/email ya existe
      if (msg.toLowerCase().includes("username") || msg.includes("400")) {
        setSubmitError("Ese username o email ya está en uso.");
      } else {
        setSubmitError(`Error: ${msg.slice(0, 120)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Crea tu RiderBio"
      subtitle="Tu perfil será revisado y activado en menos de 24 horas."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-accent hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label className="label-rb">Tu nombre *</label>
          <input
            type="text"
            value={form.display_name}
            onChange={set("display_name")}
            placeholder="Martín Rojas"
            className="input-rb"
            required
          />
          {errors.display_name && <p className="mt-1 text-xs text-red-400">{errors.display_name}</p>}
        </div>

        <div>
          <label className="label-rb">Username (será tu URL pública) *</label>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--rb-subtle)" }}>riderbio.larefactoria.cl/p/</span>
          </div>
          <input
            type="text"
            value={form.username}
            onChange={set("username")}
            placeholder="martinrojas"
            className="input-rb mt-1"
            autoCapitalize="none"
            spellCheck={false}
            required
          />
          {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
        </div>

        <div>
          <label className="label-rb">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="tu@email.cl"
            className="input-rb"
            autoComplete="email"
            required
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-rb">Contraseña *</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              className="input-rb"
              autoComplete="new-password"
              required
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </div>
          <div>
            <label className="label-rb">Confirmar *</label>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={set("passwordConfirm")}
              placeholder="••••••••"
              className="input-rb"
              autoComplete="new-password"
              required
            />
            {errors.passwordConfirm && <p className="mt-1 text-xs text-red-400">{errors.passwordConfirm}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-rb">Disciplina</label>
            <input
              type="text"
              value={form.discipline}
              onChange={set("discipline")}
              placeholder="MTB, Gravel, Ruta..."
              className="input-rb"
            />
          </div>
          <div>
            <label className="label-rb">Ciudad</label>
            <input
              type="text"
              value={form.city}
              onChange={set("city")}
              placeholder="Santiago, Chile"
              className="input-rb"
            />
          </div>
        </div>

        <Button type="submit" size="lg" fullWidth disabled={loading} leadingIcon={<UserPlus size={16} />}>
          {loading ? "Creando cuenta..." : "Crear mi RiderBio"}
        </Button>

        {submitError && <p className="text-center text-sm text-red-400">{submitError}</p>}

        <p className="text-center text-xs" style={{ color: "var(--rb-subtle)" }}>
          Al registrarte aceptas que tu perfil será revisado antes de hacerse público.
        </p>
      </form>
    </AuthShell>
  );
}
