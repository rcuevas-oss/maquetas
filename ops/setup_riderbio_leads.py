"""Crea la colección `interested_leads` en PB core (8090).

Almacena contactos del formulario de la landing de RiderBio.
Regla de acceso: anyone puede crear (formulario público), solo auth puede leer.
Idempotente — no hace nada si la colección ya existe.

Uso:
    python clients/riderbio/ops/setup_riderbio_leads.py
"""
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", ".."))

from ops.infra_config import get_pocketbase_superuser_config
from ops.ssh_utils import create_ssh_client, run_command

REMOTE_PATH = "/tmp/_pb_setup_riderbio_leads.py"

SCRIPT_TEMPLATE = """\
import sys, requests

pb_url = {pb_url!r}
admin_email = {admin_email!r}
admin_password = {admin_password!r}

r = requests.post(
    pb_url + "/api/collections/_superusers/auth-with-password",
    json={{"identity": admin_email, "password": admin_password}},
    timeout=20,
)
r.raise_for_status()
token = r.json()["token"]
headers = {{"Authorization": token}}

# Verificar si la colección ya existe
r = requests.get(pb_url + "/api/collections/interested_leads", headers=headers, timeout=20)
if r.status_code == 200:
    print("Colección 'interested_leads' ya existe — nada que hacer.")
    sys.exit(0)

# Crear la colección
payload = {{
    "name": "interested_leads",
    "type": "base",
    "listRule": "@request.auth.id != \\\"\\\"",
    "viewRule": "@request.auth.id != \\\"\\\"",
    "createRule": "",
    "updateRule": None,
    "deleteRule": "@request.auth.id != \\\"\\\"",
    "fields": [
        {{"name": "name",    "type": "text",   "required": True}},
        {{"name": "email",   "type": "email",  "required": True}},
        {{"name": "phone",   "type": "text",   "required": False}},
        {{"name": "city",    "type": "text",   "required": False}},
        {{"name": "country", "type": "text",   "required": False}},
        {{"name": "type",    "type": "select", "required": True,
          "maxSelect": 1, "values": ["ciclista", "tienda", "marca"]}},
        {{"name": "message", "type": "text",   "required": False}},
        {{"name": "source",  "type": "text",   "required": False}},
    ],
    "indexes": [
        "CREATE INDEX idx_interested_leads_email ON interested_leads (email)",
        "CREATE INDEX idx_interested_leads_type  ON interested_leads (type)",
        "CREATE INDEX idx_interested_leads_city  ON interested_leads (city)",
    ],
}}
r = requests.post(pb_url + "/api/collections", json=payload, headers=headers, timeout=20)
r.raise_for_status()
print("Colección 'interested_leads' creada con éxito.")
"""


def run() -> None:
    admin_email, _, admin_password = get_pocketbase_superuser_config()

    script = SCRIPT_TEMPLATE.format(
        pb_url="http://127.0.0.1:8090",
        admin_email=admin_email,
        admin_password=admin_password,
    )

    client = create_ssh_client(timeout=15)
    try:
        sftp = client.open_sftp()
        with sftp.file(REMOTE_PATH, "w") as fh:
            fh.write(script)
        sftp.close()

        venv_python = "/opt/larefactoria-chat/.venv/bin/python3"
        code, out, err = run_command(client, f"{venv_python} {REMOTE_PATH}")
        run_command(client, f"rm -f {REMOTE_PATH}")

        if out:
            print(out)
        if err:
            print(f"STDERR: {err}", file=sys.stderr)
        if code != 0:
            print(f"Remote script exited with code {code}", file=sys.stderr)
            sys.exit(code)
    finally:
        client.close()


if __name__ == "__main__":
    run()
