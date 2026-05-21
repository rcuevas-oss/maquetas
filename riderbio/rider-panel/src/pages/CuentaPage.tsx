import { useState, type FormEvent } from "react";
import { Lock, Check, ExternalLink, Copy } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../hooks/useAuth";
import { changePassword, publicProfileUrl } from "../lib/pb";

export function CuentaPage() {
  const { rider } = useAuth();

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  if (!rider) return null;

  const url = publicProfileUrl(rider.username);

  const onChangePwd = async (e: FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(false);

    if (newPwd.length < 8) {
      setPwdError("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError("Las contraseñas no coinciden");
      return;
    }

    setPwdLoading(true);
    try {
      await changePassword(rider.id, oldPwd, newPwd);
      setPwdSuccess(true);
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setTimeout(() => setPwdSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("oldpassword") || msg.includes("400")) {
        setPwdError("La contraseña actual es incorrecta");
      } else {
        setPwdError(`Error: ${msg.slice(0, 120)}`);
      }
    } finally {
      setPwdLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Cuenta</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--rb-muted)" }}>
          Tu cuenta y configuración de privacidad.
        </p>
      </div>

      {/* Estado del perfil */}
      <div className="card p-6 sm:p-8">
        <h2 className="heading-3">Estado del perfil</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--rb-muted)" }}>Username</span>
            <span className="font-mono text-sm" style={{ color: "var(--rb-text)" }}>
              @{rider.username}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--rb-muted)" }}>Email</span>
            <span className="text-sm" style={{ color: "var(--rb-text)" }}>{rider.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--rb-muted)" }}>Estado público</span>
            {rider.is_active ? (
              <Badge tone="green">✓ Activo</Badge>
            ) : (
              <Badge tone="amber">⏳ Pendiente</Badge>
            )}
          </div>
        </div>

        {!rider.is_active && (
          <div
            className="mt-5 rounded-xl p-4 text-sm"
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              color: "var(--rb-muted)",
            }}
          >
            Tu perfil aún no es público. Estamos revisando tu cuenta — recibirás un email cuando esté activo (típicamente menos de 24h).
            Mientras tanto puedes preparar tu bio, foto y links.
          </div>
        )}

        {rider.is_active && (
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--rb-subtle)" }}>
              Tu link público
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <code className="flex-1 truncate rounded-lg px-3 py-2 text-sm"
                style={{ background: "var(--rb-elevated)", color: "var(--rb-text)" }}>
                {url}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={copyLink}
                leadingIcon={copied ? <Check size={14} /> : <Copy size={14} />}
              >
                {copied ? "Copiado" : "Copiar"}
              </Button>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" leadingIcon={<ExternalLink size={14} />}>
                  Abrir
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Cambiar contraseña */}
      <div className="card p-6 sm:p-8">
        <h2 className="heading-3">Cambiar contraseña</h2>
        <form onSubmit={onChangePwd} className="mt-4 space-y-4">
          <div>
            <label className="label-rb">Contraseña actual</label>
            <input
              type="password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className="input-rb"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-rb">Nueva contraseña</label>
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="input-rb"
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label className="label-rb">Confirmar nueva</label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="input-rb"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pwdLoading}
              leadingIcon={pwdSuccess ? <Check size={16} /> : <Lock size={16} />}>
              {pwdLoading ? "Guardando..." : pwdSuccess ? "Contraseña actualizada" : "Cambiar contraseña"}
            </Button>
            {pwdError && <p className="text-sm text-red-400">{pwdError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
