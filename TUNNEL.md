# Cloudflare Tunnel — RiderBio

## Convención de naming

Cloudflare Universal SSL solo cubre 2 niveles de subdominio (`*.larefactoria.cl`),
no anidados (`*.*.larefactoria.cl`). Por eso usamos guiones y todos los hostnames
quedan en el mismo nivel:

| Hostname | Servicio |
|----------|----------|
| `riderbio.larefactoria.cl` | Landing pública + perfiles `/p/:username` |
| `pb-riderbio.larefactoria.cl` | PocketBase 8094 (admin + API) |
| `panel-riderbio.larefactoria.cl` | Rider panel (auth + dashboard) |
| `marcas-riderbio.larefactoria.cl` | Brand panel (planificado, Fase 3) |

## Hostnames en `/etc/cloudflared/config.yml`

Agregar antes del `- service: http_status:404`:

```yaml
- hostname: riderbio.larefactoria.cl
  service: http://localhost:80

- hostname: pb-riderbio.larefactoria.cl
  service: http://localhost:8094

- hostname: panel-riderbio.larefactoria.cl
  service: http://localhost:80

- hostname: marcas-riderbio.larefactoria.cl
  service: http://localhost:80
```

Las apps estáticas (landing, panels) se sirven via nginx en `localhost:80`
con `server_name` matching. PocketBase es el único que tiene su puerto propio.

## Crear CNAMEs

Desde el VPS (con `cloudflared` autenticado):

```bash
cloudflared tunnel route dns bd6ef8b8-4a95-44ff-a451-f64fc488afa8 riderbio.larefactoria.cl
cloudflared tunnel route dns bd6ef8b8-4a95-44ff-a451-f64fc488afa8 pb-riderbio.larefactoria.cl
cloudflared tunnel route dns bd6ef8b8-4a95-44ff-a451-f64fc488afa8 panel-riderbio.larefactoria.cl
cloudflared tunnel route dns bd6ef8b8-4a95-44ff-a451-f64fc488afa8 marcas-riderbio.larefactoria.cl
systemctl restart cloudflared
```

## Verificar

```bash
curl https://riderbio.larefactoria.cl/
curl https://pb-riderbio.larefactoria.cl/api/health
curl https://panel-riderbio.larefactoria.cl/
```
