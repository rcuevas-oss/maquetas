# RiderBio · Landing demo

Maqueta visual funcional del producto **RiderBio** (Linktree para ciclistas), iniciativa de **La Refactoría**.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 3
- Lucide Icons
- Datos 100% mock (sin backend)

## Vistas

- **Landing** — propuesta para ciclistas, marcas/tiendas y La Refactoría.
- **Perfil público** — demo de Martín Rojas (MTB / Gravel · Linares).
- **Dashboard ciclista** — métricas, top links y tabla de referidos.
- **Marcas y tiendas** — features + planes de colaboración.
- **Formularios** — "Quiero mi RiderBio" y "Soy tienda o marca" con validación visual y modal de éxito.

Navegación interna por estado (sin router, sin backend).

## Comandos

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run preview
```

## Estructura

```
src/
  App.tsx            # shell + estado de vista + modales
  data/mock.ts       # ciclista, sponsors, métricas, referidos
  components/        # Button, Badge, Modal, Navbar, Footer, ContactForm, ...
  views/             # LandingView, ProfileView, DashboardView, BrandsView
```

## Notas

- Identidad visual de La Refactoría (lime `#c7ff63`, dark, Space Grotesk) — RiderBio es un producto propio de la agencia.
- Sin imágenes externas: covers/avatars con gradientes e iniciales para que la demo funcione offline.
- Sin backend: validación de formularios solo en cliente y "envío" simulado con `setTimeout`.
