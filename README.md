# Good Style Studios — Maqueta visual premium

Sistema web de reservas para una barbería premium. Maqueta **frontend funcional** y navegable, lista para mostrar a un cliente. Sin backend real: todo trabaja con datos mock.

## Cómo correr

```bash
npm install
npm run dev
```

Abre el navegador en la URL que muestre la consola (por defecto `http://localhost:5173`, puede caer a `5174` / `5175` / `5176` si ese puerto está ocupado).

> Requiere Node 20.19+ idealmente. En Node 20.17 igual corre, solo verás algunos warnings de "engine" durante la instalación.

## Build

```bash
npm run build      # genera /dist
npm run preview    # sirve el build localmente
```

## Rutas

| Ruta                | Descripción                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `/`                 | Landing pública (hero, servicios, barberos, beneficios, ubicación, CTA)  |
| `/reservar`         | Wizard de reserva en 6 pasos + pantalla de confirmación                  |
| `/admin`            | Dashboard del dueño (métricas, agenda del día, estado del sistema)       |
| `/admin/reservas`   | Lista de reservas con filtros por estado y buscador                      |
| `/admin/servicios`  | Gestión de servicios (tabla en desktop, tarjetas en mobile)              |
| `/admin/barberos`   | Equipo, especialidad, disponibilidad y reservas del día                  |

## Estructura

```
src/
├── components/        Layout, PublicNavbar, AdminSidebar/AdminLayout,
│                      ServiceCard, BarberCard, BookingStep, TimeSlotButton,
│                      MetricCard, AppointmentCard, StatusBadge,
│                      SectionTitle, PrimaryButton, InstagramIcon
├── pages/
│   ├── Landing.tsx
│   ├── Reservar.tsx
│   └── admin/         Dashboard.tsx · Reservas.tsx · Servicios.tsx · Barberos.tsx
├── data/mockData.ts   Servicios, barberos, reservas, métricas (datos dummy)
├── types/index.ts     Tipos compartidos
├── lib/utils.ts       cn(), formatCLP(), formatDuration()
└── index.css          Tailwind + tipografías + utilidades
```

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS (con tokens custom: `bg`, `gold`, `ink`, `line`, etc.)
- framer-motion (microanimaciones y transiciones del wizard)
- react-router-dom v7
- react-hook-form + zod (validación del paso de datos del cliente)
- date-fns (selector de fechas en español)
- lucide-react (iconos) + `InstagramIcon` propio (porque lucide quitó iconos de marca)

## Identidad visual

- Modo oscuro permanente, mobile-first
- Paleta: `#0B0B0F` fondo · `#181820` cards · `#27272F` bordes · `#D4AF37` dorado premium · `#22C55E` confirmación · `#EF4444` cancelación
- Tipografías Google Fonts: **Space Grotesk** (titulares) e **Inter** (UI)
- Cards `rounded-2xl`, sombras suaves, acentos dorados, gradientes sutiles, microinteracciones con framer-motion

## Notas

- Todos los datos son mock y viven en `src/data/mockData.ts`. Editar ahí para cambiar nombres, precios, horarios o reservas.
- Los botones "Editar / Eliminar / Confirmar / Cancelar" del panel son visuales: no mutan estado.
- El wizard valida con zod (nombre y teléfono requeridos; email y comentario opcionales) y termina en una pantalla de éxito con resumen y botón "Volver al inicio".
- Hecha para impresionar en una reunión comercial: prioridad al impacto visual.
