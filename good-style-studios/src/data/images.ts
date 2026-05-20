// Imágenes curadas de Unsplash para Good Style Studios.
// Todas con `?w=...&q=80&auto=format&fit=crop` para optimizar carga.
// Cada constante apunta a una foto real de barbería / barbero / herramientas.

const u = (id: string, w = 1400, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`

// HERO + secciones editoriales
export const heroBarberImage = u('1503951914875-452162b0f3f1', 1600)
export const shopInteriorImage = u('1521590832167-7bcbfaa6381f', 1600)
export const shopAmbientImage = u('1585747860715-2ba37e788b70', 1600)
export const barberChairImage = u('1622287162716-f311baa1a2b8', 1400)

// Herramientas / detalles
export const toolsImage = u('1605497788044-5a32c7078486', 1200)
export const clippersImage = u('1567894340315-735d7c361db0', 1200)

// Cortes / barba
export const fadeCutImage = u('1622286342621-4bd786c2447c', 1200)
export const beardImage = u('1599351431202-1e0f0137899a', 1200)
export const beardCloseImage = u('1493256338651-d82f7acb2b38', 1200)

// Mapa de imágenes por servicio (ids del mock)
export const serviceImages: Record<string, string> = {
  'svc-classic': u('1503951914875-452162b0f3f1', 800),
  'svc-cut-beard': u('1599351431202-1e0f0137899a', 800),
  'svc-beard': u('1493256338651-d82f7acb2b38', 800),
  'svc-premium': u('1622286342621-4bd786c2447c', 800),
  'svc-skincare': u('1605497788044-5a32c7078486', 800),
}

// Retratos para barberos (Diego, Matías, Felipe)
export const barberImages: Record<string, string> = {
  'br-diego': u('1507003211169-0a1dd7228f2d', 800),
  'br-matias': u('1500648767791-00dcc994a43e', 800),
  'br-felipe': u('1531427186611-ecfd6d936c79', 800),
}

// Imágenes para la sección "La experiencia Good Style"
export const experienceImages = {
  choose: u('1622286342621-4bd786c2447c', 900), // elige tu estilo (fade)
  arrive: u('1622287162716-f311baa1a2b8', 900), // llega a tu hora (silla)
  leave: u('1605497788044-5a32c7078486', 900), // sal listo (herramientas)
}
