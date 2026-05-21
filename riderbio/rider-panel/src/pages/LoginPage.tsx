import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "../components/ui/Button";
import { AuthShell } from "../components/layout/AuthShell";
import { loginRider } from "../lib/pb";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginRider(identity, password);
      navigate(from, { replace: true });
    } catch {
      setError("Credenciales inválidas. Verifica tu email y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Inicia sesión"
      subtitle="Accede a tu panel de RiderBio"
      footer={
        <>
          ¿Aún no tienes cuenta?{" "}
          <Link to="/register" className="font-semibold text-accent hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label className="label-rb">Email o username</label>
          <input
            type="text"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder="tu@email.cl"
            className="input-rb"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="label-rb">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-rb"
            autoComplete="current-password"
            required
          />
        </div>

        <Button type="submit" size="lg" fullWidth disabled={loading} leadingIcon={<LogIn size={16} />}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        {error && <p className="text-center text-sm text-red-400">{error}</p>}
      </form>
    </AuthShell>
  );
}
