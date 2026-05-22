# Maquetas y prototipos

Colección de prototipos web del día a día — front-end completo, sin backend
real. Cada maqueta vive en su propia subcarpeta con su historial conservado
desde el repositorio original.

## Cuándo usar este repo vs `apps/demos-vitrina/` del agencia

Estos son **dos sistemas distintos** para dos casos distintos:

| Caso | Va en | Por qué |
|---|---|---|
| Prototipo que **NO está en producción** — exploración, idea descartada, cliente que aún no contrata, demo aislada que muestra al cliente | **Este repo** (`rcuevas-oss/maquetas`) | No requiere infra, se mantiene como referencia/portfolio sin cargar el repo de la agencia |
| Demo comercial que **se sirve en `larefactoria.cl/demos/<slug>/`** como parte de la propuesta comercial pública | **`apps/demos-vitrina/` del repo `agencia-infraestructura`** | Vive junto al deploy de la landing pública. La landing serve estos demos como iframe. Hay receta en `AGENTS.md` del agencia |

**Regla simple:** si la URL final del demo es `larefactoria.cl/demos/...`,
va al agencia. Si es solo para tu disco o para mostrarle a un prospect que
no contrata aún, va acá.

## Catálogo

| Carpeta | Descripción |
|---|---|
| [`fitosanitario/`](./fitosanitario) | Sistema de control fitosanitario — dashboard de gestión agrícola. |
| [`bicycle-workshop-pro-saas/`](./bicycle-workshop-pro-saas) | SaaS para talleres de bicicletas — landing + dashboard demo. |
| [`good-style-studios/`](./good-style-studios) | Barbería premium en Linares — landing + reserva online + panel admin. |
| [`tienda-limpieza-mockup/`](./tienda-limpieza-mockup) | E-commerce de tienda de limpieza — catálogo + carrito. |
| [`riderbio/`](./riderbio) | Prototipo de plataforma SaaS para ciclistas y tiendas de bicicletas — landing + paneles rider/marca + integraciones (PB, R2, Resend). Idea descartada como cliente, mantenida como referencia. |

## Cómo correr una maqueta

Cada subcarpeta es una maqueta independiente:

```bash
cd <nombre-de-la-maqueta>
npm install
npm run dev
```

Stack común: React + Vite + TypeScript + Tailwind. Sin servicios externos.
Cada maqueta tiene su propio `README.md` con detalles específicos.

## Historial

Cada maqueta importada vino con su historial completo conservado vía
`git subtree add --squash`. Para ver los commits originales:

```bash
git log -- <nombre-de-la-maqueta>/
```
