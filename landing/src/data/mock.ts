import type { Cyclist, MetricRow, ProfileExample, ReferralRow } from "../types";

const u = (id: string, w = 1200, q = 75, extra = "") =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop${extra}`;

export const cyclist: Cyclist = {
  name: "Martín Rojas",
  discipline: "MTB / Gravel",
  city: "Linares, Chile",
  initials: "MR",
  // Confirmed: "person riding a mountain bike on a trail" — Invermere, BC
  coverImage: u("1633625463244-19e22598bceb", 1800, 80),
  // Confirmed: cyclist portrait search
  avatar: u("1629733613868-a37c4cf8bdf3", 400, 80, "&crop=face"),
  quote: "La bicicleta me enseñó que el esfuerzo siempre tiene recompensa.",
  bio: "Llevo 8 años compitiendo en MTB y Gravel en la región del Maule. Empecé en XCM amateur y fui escalando hasta el nivel elite regional. Hoy combino la competencia con la creación de contenido sobre entrenamiento, equipamiento y rutas del sur de Chile. Soy embajador de marcas locales con las que realmente entreno y compito — nada que no haya probado en pista.",
  bioStats: [
    { label: "Años compitiendo", value: "8" },
    { label: "Km anuales", value: "+12.000" },
    { label: "Carreras completadas", value: "47" },
    { label: "Disciplinas", value: "MTB · Gravel" },
  ],
  socials: [
    { label: "Instagram", handle: "@martinrojasbike", url: "https://instagram.com/martinrojasbike", icon: "instagram", brand: { slug: "instagram", color: "E4405F", name: "Instagram" } },
    { label: "Strava", handle: "Martín Rojas", url: "https://strava.com/athletes/martinrojas", icon: "strava", brand: { slug: "strava", color: "FC4C02", name: "Strava" } },
    { label: "YouTube", handle: "Martín Rojas Cycling", url: "https://youtube.com/@martinrojascycling", icon: "youtube", brand: { slug: "youtube", color: "FF0000", name: "YouTube" } },
  ],
  // Public-facing links — zero commission language
  publicLinks: [
    { label: "Instagram", sublabel: "@martinrojasbike", url: "https://instagram.com/martinrojasbike", icon: "instagram", brand: { slug: "instagram", color: "E4405F", name: "Instagram" } },
    { label: "Strava", sublabel: "Martín Rojas · 12.400 km 2026", url: "https://strava.com/athletes/martinrojas", icon: "strava", brand: { slug: "strava", color: "FC4C02", name: "Strava" } },
    { label: "YouTube", sublabel: "Rutas, reviews y carrera", url: "https://youtube.com/@martinrojascycling", icon: "youtube", brand: { slug: "youtube", color: "FF0000", name: "YouTube" } },
    { label: "Mi tienda recomendada", sublabel: "BikeStore Linares — 10% con mi código", url: "#", icon: "store" },
    { label: "Productos que uso", sublabel: "Specialized · Garmin · Maxxis", url: "#", icon: "star" },
    { label: "Contacto comercial", sublabel: "Para marcas y sponsors", url: "mailto:martin@riderbio.cl", icon: "mail" },
  ],
  sponsors: [
    { name: "BikeStore Linares", category: "Tienda oficial", initials: "BS", accent: "from-emerald-400/30 to-emerald-700/10", image: u("1556221620-3616894469d9", 800, 70) },
    { name: "Nova Nutrition", category: "Nutrición deportiva", initials: "NN", accent: "from-lime-300/30 to-lime-700/10", image: u("1599729008570-9c6aa5c043d9", 800, 70) },
    { name: "Andes Cycling Wear", category: "Indumentaria", initials: "AC", accent: "from-blue-400/30 to-blue-700/10", image: u("1695808403942-52a9b38a4e06", 800, 70) },
  ],
  upcomingRaces: [
    { name: "Copa Regional MTB — Fecha 3", date: "10 May 2026", location: "San Javier" },
    { name: "Gravel Challenge Maule", date: "21 Jun 2026", location: "Talca" },
    { name: "XCM Andes Open", date: "9 Ago 2026", location: "Curicó" },
  ],
  gear: [
    { category: "Bicicleta", item: "Epic", brand: "Specialized", logo: { url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Specialized_wordmark.svg", slug: null, color: "E4002B", name: "Specialized" } },
    { category: "Casco", item: "Prevail", brand: "Specialized", logo: { url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Specialized_wordmark.svg", slug: null, color: "E4002B", name: "Specialized" } },
    { category: "GPS", item: "Edge 840", brand: "Garmin", logo: { slug: "garmin", color: "007CC3", name: "Garmin" } },
    { category: "Neumáticos", item: "Ikon 2.2", brand: "Maxxis", logo: { url: "https://upload.wikimedia.org/wikipedia/commons/b/b3/MAXXIS_logo.svg", slug: null, color: "C8102E", name: "Maxxis" } },
    { category: "Zapatillas", item: "XC-5", brand: "Shimano", logo: { url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Shimano.svg", slug: null, color: "0057A8", name: "Shimano" } },
  ],
  palmares: [
    { year: "2025", race: "Copa Regional MTB Maule — Fecha 4", position: "8°", category: "Elite", type: "XCM", podium: false },
    { year: "2025", race: "Gravel Challenge Maule 120K", position: "Finisher Top 20", category: "Open", type: "Gravel", podium: false },
    { year: "2025", race: "XCM Linares — Apertura", position: "2°", category: "Elite", type: "XCM", podium: true },
    { year: "2024", race: "XCM Linares", position: "1°", category: "Elite", type: "XCM", podium: true },
    { year: "2024", race: "Copa Regional MTB Maule — Fecha 2", position: "3°", category: "Elite", type: "XCM", podium: true },
    { year: "2024", race: "Gravel 100K Constitución", position: "Finisher", category: "Open", type: "Gravel", podium: false },
    { year: "2023", race: "XCM Talca Open", position: "5°", category: "Sub-23", type: "XCM", podium: false },
    { year: "2023", race: "Copa Regional MTB Maule — General", position: "4°", category: "Sub-23", type: "XCM", podium: false },
  ],
  tips: [
    {
      title: "Alimentación antes de una carrera XCM",
      body: "72h antes evito fibra y aumento carbos. La noche previa: pasta simple, sin salsas pesadas. En carrera: gel cada 40 min + electrolitos desde el km 20.",
      // confirmed cycling training search
      image: u("1704650311190-7eeb9c4f6e11", 700, 70),
      tag: "Nutrición",
    },
    {
      title: "Cómo preparar tu primera Gravel de 100K",
      body: "Empieza con salidas largas de 3–4h a zona 2. Tres semanas de carga, una de descarga. No debutes con menos de 800km de rodaje base.",
      // confirmed MTB training
      image: u("1732611321835-43f0bdd5687f", 700, 70),
      tag: "Entrenamiento",
    },
    {
      title: "Configuración de suspensión para senderos del Maule",
      body: "SAG al 25% adelante y 30% atrás para terreno mixto. Aumenta compresión en descensos técnicos de laja. Lleva siempre una bomba de piso en carrera.",
      // confirmed cycling
      image: u("1689753859549-624b0e6061a5", 700, 70),
      tag: "Setup técnico",
    },
  ],
  merch: [
    {
      name: "Kit Temporada 2026",
      tag: "Jersey + Culote",
      price: "$45.000 CLP",
      // confirmed cycling jersey search
      image: u("1615387084735-da47536882ab", 600, 75),
      ctaLabel: "Pedir kit",
      url: "#",
    },
    {
      name: "Gorra ciclista MR",
      tag: "Edición limitada",
      price: "$12.000 CLP",
      // confirmed cycling jersey search
      image: u("1632812981840-410a96d43f44", 600, 75),
      ctaLabel: "Ver gorra",
      url: "#",
    },
    {
      name: "Pack Geles Nova x6",
      tag: "Mi nutrición de carrera",
      price: "$18.000 CLP",
      // confirmed sports nutrition search
      image: u("1579758629938-03607ccdbaba", 600, 75),
      ctaLabel: "Comprar pack",
      url: "#",
    },
    {
      name: "Bidón oficial 750ml",
      tag: "Con mi logo",
      price: "$9.500 CLP",
      // confirmed sports nutrition/hydration
      image: u("1558017487-06bf9f82613a", 600, 75),
      ctaLabel: "Comprar",
      url: "#",
    },
  ],
};

export const metrics: MetricRow[] = [
  { label: "Visitas al perfil", value: "1.248", delta: "+18%", trend: "up", hint: "Últimos 30 días" },
  { label: "Clics en links", value: "342", delta: "+9%", trend: "up", hint: "Tasa 27,4%" },
  { label: "Leads generados", value: "7", delta: "+2", trend: "up", hint: "Marcas + tiendas" },
  { label: "Comisiones pendientes", value: "$85.000", delta: "CLP", trend: "neutral", hint: "3 pagos por liquidar" },
  { label: "Comisiones pagadas", value: "$120.000", delta: "CLP", trend: "up", hint: "Acumulado 2026" },
  { label: "Links activos", value: "12", delta: "4 monetizados", trend: "neutral", hint: "Sin links rotos" },
  { label: "Sponsors activos", value: "3", delta: "1 en negociación", trend: "neutral", hint: "Renovación Q3" },
];

export const referrals: ReferralRow[] = [
  { date: "12 Abr 2026", origin: "BikeStore Linares", action: "Ecommerce solicitado", status: "Pendiente", commission: "$50.000" },
  { date: "05 Abr 2026", origin: "Andes Cycling Wear", action: "Venta referida", status: "Pagado", commission: "$15.000" },
  { date: "28 Mar 2026", origin: "La Refactoría", action: "Lead tienda bicicleta", status: "En revisión", commission: "$35.000" },
  { date: "20 Mar 2026", origin: "Nova Nutrition", action: "Código de descuento usado", status: "Pagado", commission: "$8.500" },
  { date: "11 Mar 2026", origin: "Specialized Concept Store", action: "Lead taller", status: "Pendiente", commission: "$22.000" },
];

export const refactoriaServices = [
  "Ecommerce para tiendas de bicicletas",
  "Catálogos digitales",
  "Sistemas de reservas para taller",
  "Automatizaciones de ventas",
  "Integración con WhatsApp",
  "Dashboards comerciales",
  "SEO local para tiendas",
];

export const profileExamples: ProfileExample[] = [
  { name: "Martín Rojas", discipline: "MTB / Gravel", city: "Linares", initials: "MR", sponsors: 3, cover: u("1754546552679-9c742012bbd1", 800, 70), avatar: u("1629733613868-a37c4cf8bdf3", 200, 80, "&crop=face") },
  { name: "Camila Pérez", discipline: "Ruta / Crit", city: "Santiago", initials: "CP", sponsors: 5, cover: u("1615845522846-02f89af04c2e", 800, 70), avatar: u("1697182113488-d079854897ff", 200, 80, "&crop=face") },
  { name: "Diego Salinas", discipline: "Enduro", city: "Pucón", initials: "DS", sponsors: 2, cover: u("1629056528325-f328b5f27ae7", 800, 70), avatar: u("1623604944442-e11589f39746", 200, 80, "&crop=face") },
];

// Confirmed "cyclist races on a mountain bike"
export const heroShowcaseImage = u("1754546552679-9c742012bbd1", 1200, 75);
// Road cycling confirmed
export const brandsHeroImage = u("1541625602330-2277a4c46182", 1600, 75);
