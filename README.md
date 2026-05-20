# Maquetas y demos

Colección de prototipos web — front-end completo, sin backend real. Cada
maqueta vive en su propia subcarpeta con su historial conservado desde el
repositorio original.

## Catálogo

| Carpeta | Descripción |
|---|---|
| [`fitosanitario/`](./fitosanitario) | Sistema de control fitosanitario — dashboard de gestión agrícola. |
| [`bicycle-workshop-pro-saas/`](./bicycle-workshop-pro-saas) | SaaS para talleres de bicicletas — landing + dashboard demo. |
| [`good-style-studios/`](./good-style-studios) | Barbería premium en Linares — landing + reserva online + panel admin. |
| [`tienda-limpieza-mockup/`](./tienda-limpieza-mockup) | E-commerce de tienda de limpieza — catálogo + carrito. |

## Cómo usar este repositorio

Cada subcarpeta es una maqueta independiente. Para correr una localmente:

```bash
cd <nombre-de-la-maqueta>
npm install
npm run dev
```

Stack común: React + Vite + TypeScript + Tailwind. Sin servicios externos.

## Estructura

Cada maqueta mantiene su `README.md` original con detalles específicos. Si
necesitas el historial completo de commits de una maqueta concreta, está
preservado en este mismo repositorio (puedes ver los commits con
`git log -- <nombre-de-la-maqueta>/`).
