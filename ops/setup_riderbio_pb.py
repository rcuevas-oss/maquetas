"""Provisiona PocketBase RiderBio (puerto 8094).

Crea las 6 colecciones del producto en orden topológico. Resuelve los
collectionId de las relaciones dinámicamente — no usa IDs hardcodeados.
Idempotente: omite colecciones que ya existen.

Uso:
    python clients/riderbio/ops/setup_riderbio_pb.py
"""
import sys
import os
import json
import requests

REPO_ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "..")
sys.path.append(REPO_ROOT)

from ops.infra_config import get_riderbio_pb_config
from ops.ssh_utils import create_ssh_client, run_command

PB_URL = "http://127.0.0.1:8094"

# Orden topológico de creación
COLLECTIONS_ORDER = [
    "riders",
    "brands",
    "rider_links",
    "link_clicks",
    "campaigns",
    "collaborations",
]

# Campos que contienen collectionName placeholder → se reemplaza con collectionId real
RELATION_FIELDS = {
    "rider_links":    [("rider",  "riders")],
    "link_clicks":    [("link",   "rider_links")],
    "campaigns":      [("brand",  "brands"), ("rider", "riders")],
    "collaborations": [("brand",  "brands"), ("rider", "riders")],
}

SCHEMA_DIR = os.path.join(os.path.dirname(__file__), "..", "schema")

# Script que corre en el VPS via SSH
REMOTE_SCRIPT = "/tmp/_pb_setup_riderbio.py"

SCRIPT_BODY = r"""
import sys, requests, json

pb_url         = {pb_url!r}
admin_email    = {admin_email!r}
admin_password = {admin_password!r}
schemas        = {schemas!r}
order          = {order!r}
relation_map   = {relation_map!r}

def auth():
    r = requests.post(
        pb_url + "/api/collections/_superusers/auth-with-password",
        json={{"identity": admin_email, "password": admin_password}},
        timeout=20,
    )
    r.raise_for_status()
    return r.json()["token"]

token = auth()
headers = {{"Authorization": token}}

# Colecciones existentes con sus IDs
r = requests.get(pb_url + "/api/collections?perPage=200", headers=headers, timeout=20)
r.raise_for_status()
existing = {{c["name"]: c["id"] for c in r.json().get("items", [])}}
created_ids = dict(existing)

created = []
skipped = []

for name in order:
    if name in existing:
        skipped.append(name)
        continue

    schema = schemas[name]

    # Resolver collectionId en campos relation
    for field in schema.get("fields", []):
        if field.get("type") == "relation":
            col_name = field.pop("collectionName", None)
            if col_name and col_name in created_ids:
                field["collectionId"] = created_ids[col_name]

    r = requests.post(pb_url + "/api/collections", json=schema, headers=headers, timeout=20)
    if r.status_code in (200, 201):
        new_id = r.json().get("id", "")
        created_ids[name] = new_id
        created.append(name)
    else:
        print(f"ERROR creando {{name}}: {{r.status_code}} {{r.text}}", file=sys.stderr)
        sys.exit(1)

if created:
    print(f"Creadas: {{created}}")
if skipped:
    print(f"Ya existian (omitidas): {{skipped}}")
if not created and not skipped:
    print("Sin cambios.")
"""


def load_schemas() -> dict:
    schemas = {}
    for name in COLLECTIONS_ORDER:
        path = os.path.join(SCHEMA_DIR, f"{name}.json")
        with open(path, "r", encoding="utf-8") as f:
            schemas[name] = json.load(f)
    return schemas


def run() -> None:
    schemas = load_schemas()
    admin_email, admin_password = get_riderbio_pb_config()

    script = SCRIPT_BODY.format(
        pb_url=PB_URL,
        admin_email=admin_email,
        admin_password=admin_password,
        schemas=schemas,
        order=COLLECTIONS_ORDER,
        relation_map=RELATION_FIELDS,
    )

    client = create_ssh_client(timeout=15)
    try:
        sftp = client.open_sftp()
        with sftp.file(REMOTE_SCRIPT, "w") as fh:
            fh.write(script)
        sftp.close()

        venv_python = "/opt/larefactoria-chat/.venv/bin/python3"
        code, out, err = run_command(client, f"{venv_python} {REMOTE_SCRIPT}")
        run_command(client, f"rm -f {REMOTE_SCRIPT}")

        if out:
            print(out)
        if err:
            print(f"STDERR: {err}", file=sys.stderr)
        if code != 0:
            sys.exit(code)
    finally:
        client.close()


if __name__ == "__main__":
    run()
