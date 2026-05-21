"""Provisiona RiderBio en el VPS — one-time setup.

Crea el container PocketBase 8094, el superuser, despliega el hook de
click counting y agrega la entrada al Cloudflare tunnel.

Uso:
    python clients/riderbio/ops/provision_vps.py
"""
import sys
import os
import time

REPO_ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "..")
sys.path.append(REPO_ROOT)

from ops.infra_config import get_riderbio_pb_config
from ops.ssh_utils import create_ssh_client, run_command

HOOK_LOCAL  = os.path.join(os.path.dirname(__file__), "pb_hooks", "count_clicks.pb.js")
HOOK_REMOTE = "/opt/riderbio/pb_data/pb_hooks/count_clicks.pb.js"
TUNNEL_ID   = "bd6ef8b8-4a95-44ff-a451-f64fc488afa8"
TUNNEL_CONF = "/etc/cloudflared/config.yml"
TUNNEL_HOSTNAME = "pb-riderbio.larefactoria.cl"


def _ok(label: str) -> None:
    print(f"  OK {label}")


def step_container(client, admin_email: str, admin_password: str) -> None:
    print("\n[1/4] Container PocketBase 8094")

    code, out, _ = run_command(client, "docker ps -a --filter name=pocketbase-riderbio --format '{{.Names}}'")
    if "pocketbase-riderbio" in out:
        _ok("Container ya existe — omitido")
        return

    run_command(client, "mkdir -p /opt/riderbio/pb_data")

    docker_cmd = (
        "docker run -d "
        "--name pocketbase-riderbio "
        "--restart unless-stopped "
        "-p 127.0.0.1:8094:8090 "
        "-v /opt/riderbio/pb_data:/pb_data "
        "ghcr.io/muchobien/pocketbase:latest"
    )
    code, out, err = run_command(client, docker_cmd)
    if code != 0:
        print(f"ERROR docker run: {err}", file=sys.stderr)
        sys.exit(1)
    _ok("Container creado")

    time.sleep(3)

    superuser_cmd = (
        f"docker exec pocketbase-riderbio /usr/local/bin/pocketbase "
        f"superuser upsert {admin_email} {admin_password} --dir=/pb_data"
    )
    code, out, err = run_command(client, superuser_cmd)
    if code != 0:
        print(f"ERROR superuser: {err}", file=sys.stderr)
        sys.exit(1)
    _ok(f"Superuser creado: {admin_email}")

    code, out, _ = run_command(client, "curl -s http://127.0.0.1:8094/api/health")
    if '"code":200' in out or '"status":"ok"' in out:
        _ok("Health check OK")
    else:
        print(f"  WARN Health check retorno: {out[:80]}")


def step_hooks(client) -> None:
    print("\n[2/4] PB hook — count_clicks")

    run_command(client, "mkdir -p /opt/riderbio/pb_data/pb_hooks")

    sftp = client.open_sftp()
    sftp.put(HOOK_LOCAL, HOOK_REMOTE)
    sftp.close()
    _ok(f"Hook copiado: {HOOK_REMOTE}")

    run_command(client, "docker restart pocketbase-riderbio")
    time.sleep(2)
    _ok("Container reiniciado con hook activo")


def step_tunnel(client) -> None:
    print("\n[3/4] Cloudflare tunnel")

    code, conf, _ = run_command(client, f"cat {TUNNEL_CONF}")
    if TUNNEL_HOSTNAME in conf:
        _ok(f"{TUNNEL_HOSTNAME} ya está en la config — omitido")
    else:
        new_entry = (
            f"  - hostname: {TUNNEL_HOSTNAME}\n"
            f"    service: http://localhost:8094"
        )
        # Insertar antes del catch-all "- service: http_status:404"
        updated = conf.replace(
            "  - service: http_status:404",
            f"{new_entry}\n  - service: http_status:404",
        )
        if updated == conf:
            print("  WARN No se encontro el catch-all en config.yml -- agrega manualmente:")
            print(f"    {new_entry}")
        else:
            sftp = client.open_sftp()
            with sftp.file(TUNNEL_CONF, "w") as fh:
                fh.write(updated)
            sftp.close()
            _ok(f"Hostname {TUNNEL_HOSTNAME} agregado al tunnel")

    # Registrar CNAME
    code, out, err = run_command(
        client,
        f"cloudflared tunnel route dns {TUNNEL_ID} {TUNNEL_HOSTNAME} 2>&1"
    )
    if code == 0 or "already exists" in (out + err).lower():
        _ok(f"CNAME {TUNNEL_HOSTNAME} registrado")
    else:
        print(f"  WARN cloudflared route dns: {(out + err)[:120]}")

    run_command(client, "systemctl restart cloudflared")
    _ok("cloudflared reiniciado")


def step_verify(client) -> None:
    print("\n[4/4] Verificación final")
    time.sleep(2)
    code, out, _ = run_command(client, "docker ps --filter name=pocketbase-riderbio --format '{{.Status}}'")
    _ok(f"Container status: {out}")
    code, out, _ = run_command(client, "curl -s http://127.0.0.1:8094/api/health")
    if '"code":200' in out or '"status":"ok"' in out:
        _ok("PocketBase 8094 responde OK")
    else:
        print(f"  WARN Respuesta inesperada: {out[:100]}")


def run() -> None:
    admin_email, admin_password = get_riderbio_pb_config()
    print(f"Provisionando RiderBio en VPS...")
    print(f"  Admin: {admin_email}")

    client = create_ssh_client(timeout=20)
    try:
        step_container(client, admin_email, admin_password)
        step_hooks(client)
        step_tunnel(client)
        step_verify(client)
    finally:
        client.close()

    print("\nProvisioning completo.")
    print(f"  PB admin: https://{TUNNEL_HOSTNAME}/_/")
    print(f"  Login:    {admin_email}")


if __name__ == "__main__":
    run()
