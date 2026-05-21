# RiderBio

Plataforma para ciclistas y tiendas de bicicletas. Los riders crean un perfil público con un solo link — sponsors, logros, palmarés, links trackeados. Las marcas descubren embajadores reales, crean campañas con códigos únicos y miden conversiones.

**Desarrollado por [La Refactoría](https://larefactoria.cl).**

---

## El producto

Un ciclista comparte `riderbio.larefactoria.cl/p/martinrojas` en su bio de Instagram. Ese link lleva a su perfil completo: sponsors, palmarés, gear, tips, links a sus tiendas recomendadas. Cada click queda registrado.

Una tienda de bicicletas entra al panel de marcas, ve el directorio de ciclistas de su ciudad y disciplina, propone una colaboración y crea un código de descuento único para ese rider. Ambos ven los clicks y conversiones en tiempo real.

---

## Estado actual

| Fase | Descripción | Estado |
|------|-------------|--------|
| Fase 0 | Landing con maqueta visual + captura de leads | ✅ Listo |
| Fase 1 | Perfiles públicos reales + React Router + click tracking | 🚧 En desarrollo |
| Fase 2 | Panel del ciclista (gestionar perfil, links, ver métricas) | ⏳ Planificado |
| Fase 3 | Panel de marcas (directorio, campañas, métricas) | ⏳ Planificado |

---

## Estructura del repositorio

```
riderbio/
├── landing/          # React 19 + Vite — landing pública + perfiles /p/:username
├── rider-panel/      # React 19 + Vite — panel privado del ciclista (Fase 2)
├── brand-panel/      # React 19 + Vite — panel privado de marcas (Fase 3)
├── schema/           # Definición de colecciones PocketBase (JSON)
├── ops/              # Scripts de provisioning del backend
│   ├── setup_riderbio_pb.py      # Crea colecciones en PB 8094
│   └── setup_riderbio_leads.py   # Crea colección leads en PB core 8090
├── integrations/     # Documentación de integraciones activas y planificadas
├── data/             # Backups y datos de referencia
├── client.toml       # Config del cliente (infraestructura, URLs, features)
└── TUNNEL.md         # Instrucciones Cloudflare tunnel
```

---

## Stack

| App | Tecnologías |
|-----|-------------|
| `landing/` | React 19, Vite 6, TypeScript, Tailwind CSS, PocketBase SDK |
| `rider-panel/` | React 19, Vite 6, TypeScript, Tailwind CSS, PocketBase SDK, React Router |
| `brand-panel/` | React 19, Vite 6, TypeScript, Tailwind CSS, PocketBase SDK, React Router |
| Backend | PocketBase 0.22 (SQLite) — puerto 8094 en VPS |

---

## Correr la landing localmente

```bash
cd landing
npm install
cp .env.example .env.local
# Editar .env.local con las URLs de PocketBase
npm run dev
# → http://localhost:5180
```

La landing tiene una ruta `/demo` con la maqueta completa y datos mock (no requiere backend).

---

## Backend — PocketBase

### Crear el container en VPS

```bash
docker run -d \
  --name pocketbase-riderbio \
  --restart unless-stopped \
  -p 127.0.0.1:8094:8090 \
  -v /opt/riderbio/pb_data:/pb_data \
  ghcr.io/muchobien/pocketbase:latest

docker exec pocketbase-riderbio /usr/local/bin/pocketbase \
  superuser upsert admin@riderbio.cl <password> --dir=/pb_data
```

### Crear colecciones

```bash
# Requiere acceso SSH al VPS y las variables del .env del monorepo de la agencia
python ops/setup_riderbio_pb.py
```

### Colecciones

| Colección | Tipo | Descripción |
|-----------|------|-------------|
| `riders` | auth | Perfiles de ciclistas |
| `brands` | auth | Tiendas y marcas |
| `rider_links` | base | Links públicos del perfil — acceso público sin auth |
| `link_clicks` | base | Registro de clicks (anyone puede insertar, solo admin lee) |
| `campaigns` | base | Campañas con códigos/links creadas por marcas para riders |
| `collaborations` | base | Requests de colaboración marca ↔ rider |

Los schemas completos están en `schema/*.json`.

### Hook de click counting

PocketBase no tiene increment atómico. Se resuelve con un hook en JavaScript que se despliega en `pb_hooks/` del container:

```js
// ops/pb_hooks/count_clicks.pb.js
onRecordCreate((e) => {
  const link = $app.findRecordById("rider_links", e.record.get("link"))
  link.set("click_count", link.getInt("click_count") + 1)
  $app.save(link)
}, "link_clicks")
```

---

## URLs

| App | URL |
|-----|-----|
| Landing + perfiles públicos | https://riderbio.larefactoria.cl |
| Demo maqueta | https://riderbio.larefactoria.cl/demo |
| PocketBase admin | https://pb-riderbio.larefactoria.cl/_/ |
| Panel ciclistas | https://panel-riderbio.larefactoria.cl |
| Panel marcas | https://marcas-riderbio.larefactoria.cl |

Acceso local al PocketBase:
```bash
ssh -L 8094:127.0.0.1:8094 -i ~/.ssh/mi_agencia_do_ed25519_auto root@147.182.183.236
# → http://127.0.0.1:8094/_/
```

---

## Variables de entorno

### `landing/.env.local`

```env
# PocketBase RiderBio (8094) — perfiles públicos, links, tracking
VITE_PB_URL=https://pb-riderbio.larefactoria.cl

# PocketBase core agencia (8090) — captura de leads del formulario
VITE_PB_CORE_URL=https://pb.larefactoria.cl
```

---

## Flujo completo del producto

```
1. Rider se registra (admin lo activa en PB)
2. Rider edita perfil desde rider-panel
3. Rider comparte riderbio.larefactoria.cl/p/martinrojas en Instagram
4. Tienda crea cuenta en brand-panel
5. Tienda ve directorio → elige rider por disciplina/ciudad
6. Tienda propone colaboración → rider acepta
7. Tienda crea campaña con código "MAXXIS10"
8. Rider agrega el link desde su panel
9. Visitante hace click → registrado en link_clicks → redirect
10. Rider ve 47 clicks en su dashboard
11. Tienda ve 47 clicks atribuidos en su panel de métricas
```
