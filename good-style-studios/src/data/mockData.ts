import type { Appointment, Barber, Metric, Service } from '@/types'
import { barberImages, serviceImages } from './images'

export const STUDIO = {
  name: 'Good Style Studios',
  tagline: 'Reserva tu corte en segundos',
  description:
    'Agenda online moderna para una experiencia rápida, simple y profesional.',
  address: 'Av. Brasil 850, Local 3 — Linares, Chile',
  hours: 'Lun a Sáb · 09:00 a 19:00',
  phone: '+56 9 1234 5678',
  instagram: '@goodstyle.studios',
}

export const SERVICES: Service[] = [
  {
    id: 'svc-classic',
    name: 'Corte clásico',
    description:
      'Corte tradicional con tijera y máquina, lavado y peinado final.',
    durationMin: 45,
    price: 12000,
    active: true,
    tag: 'Más reservado',
    image: serviceImages['svc-classic'],
  },
  {
    id: 'svc-cut-beard',
    name: 'Corte + barba',
    description:
      'Corte completo más perfilado de barba con toalla caliente y aceites.',
    durationMin: 60,
    price: 18000,
    active: true,
    highlight: true,
    tag: 'Barba',
    image: serviceImages['svc-cut-beard'],
  },
  {
    id: 'svc-beard',
    name: 'Perfilado de barba',
    description: 'Diseño y perfilado de barba con navaja y productos premium.',
    durationMin: 30,
    price: 8000,
    active: true,
    tag: 'Navaja',
    image: serviceImages['svc-beard'],
  },
  {
    id: 'svc-premium',
    name: 'Fade premium',
    description:
      'Fade detallado con terminación profesional, ritual de barba y skincare.',
    durationMin: 75,
    price: 25000,
    active: true,
    highlight: true,
    tag: 'Fade · Premium',
    image: serviceImages['svc-premium'],
  },
  {
    id: 'svc-skincare',
    name: 'Limpieza facial express',
    description: 'Limpieza profunda con vapor, exfoliación e hidratación.',
    durationMin: 30,
    price: 10000,
    active: true,
    tag: 'Express',
    image: serviceImages['svc-skincare'],
  },
]

export const BARBERS: Barber[] = [
  {
    id: 'br-diego',
    name: 'Diego Morales',
    specialty: 'Fade y cortes modernos',
    bio: '8 años trabajando degradados precisos y estilo urbano.',
    available: true,
    initials: 'DM',
    todayBookings: 5,
    image: barberImages['br-diego'],
    nextSlot: 'Hoy 15:00',
  },
  {
    id: 'br-matias',
    name: 'Matías Rojas',
    specialty: 'Barba y estilo clásico',
    bio: 'Perfilado clásico, navaja y rituales con toalla caliente.',
    available: true,
    initials: 'MR',
    todayBookings: 4,
    image: barberImages['br-matias'],
    nextSlot: 'Hoy 16:30',
  },
  {
    id: 'br-felipe',
    name: 'Felipe Araya',
    specialty: 'Corte premium',
    bio: 'Cortes premium, asesoría de estilo y experiencias completas.',
    available: false,
    initials: 'FA',
    todayBookings: 3,
    image: barberImages['br-felipe'],
    nextSlot: 'Mañana 10:00',
  },
]

export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

const today = new Date().toISOString().slice(0, 10)

export const APPOINTMENTS: Appointment[] = [
  {
    id: 'ap-001',
    clientName: 'Juan Pérez',
    clientPhone: '+56 9 8765 4321',
    serviceId: 'svc-classic',
    serviceName: 'Corte clásico',
    barberId: 'br-diego',
    barberName: 'Diego Morales',
    date: today,
    time: '09:00',
    status: 'confirmada',
    price: 12000,
  },
  {
    id: 'ap-002',
    clientName: 'Carlos Muñoz',
    clientPhone: '+56 9 7654 3210',
    serviceId: 'svc-cut-beard',
    serviceName: 'Corte + barba',
    barberId: 'br-matias',
    barberName: 'Matías Rojas',
    date: today,
    time: '10:00',
    status: 'confirmada',
    price: 18000,
  },
  {
    id: 'ap-003',
    clientName: 'Andrés Silva',
    clientPhone: '+56 9 6543 2109',
    serviceId: 'svc-premium',
    serviceName: 'Corte premium',
    barberId: 'br-felipe',
    barberName: 'Felipe Araya',
    date: today,
    time: '11:30',
    status: 'pendiente',
    price: 25000,
    notes: 'Primera vez, prefiere fade medio.',
  },
  {
    id: 'ap-004',
    clientName: 'Tomás Rivas',
    clientPhone: '+56 9 5432 1098',
    serviceId: 'svc-beard',
    serviceName: 'Perfilado de barba',
    barberId: 'br-diego',
    barberName: 'Diego Morales',
    date: today,
    time: '15:00',
    status: 'confirmada',
    price: 8000,
  },
  {
    id: 'ap-005',
    clientName: 'Marcelo Soto',
    clientPhone: '+56 9 4321 0987',
    serviceId: 'svc-classic',
    serviceName: 'Corte clásico',
    barberId: 'br-matias',
    barberName: 'Matías Rojas',
    date: today,
    time: '17:00',
    status: 'pendiente',
    price: 12000,
  },
  {
    id: 'ap-006',
    clientName: 'Ignacio Vargas',
    clientPhone: '+56 9 3210 9876',
    serviceId: 'svc-cut-beard',
    serviceName: 'Corte + barba',
    barberId: 'br-felipe',
    barberName: 'Felipe Araya',
    date: today,
    time: '18:00',
    status: 'cancelada',
    price: 18000,
    notes: 'Canceló por tema laboral.',
  },
  {
    id: 'ap-007',
    clientName: 'Roberto Castro',
    clientPhone: '+56 9 2109 8765',
    serviceId: 'svc-skincare',
    serviceName: 'Limpieza facial express',
    barberId: 'br-felipe',
    barberName: 'Felipe Araya',
    date: today,
    time: '12:00',
    status: 'confirmada',
    price: 10000,
  },
]

export const METRICS: Metric[] = [
  { label: 'Cortes de hoy', value: '12', delta: '+3 vs ayer', trend: 'up' },
  {
    label: 'Ingresos estimados',
    value: '$168.000',
    delta: '+12%',
    trend: 'up',
  },
  { label: 'Sillas activas', value: '3 / 3', delta: '100% ocupadas', trend: 'up' },
  {
    label: 'Próxima hora libre',
    value: '15:00',
    delta: 'con Diego Morales',
    trend: 'flat',
  },
]

export const CHAIRS = [
  {
    id: 'silla-1',
    label: 'Silla 1',
    barberId: 'br-diego',
    barberName: 'Diego',
    status: 'busy' as const,
    detail: 'Ocupada hasta 10:30',
  },
  {
    id: 'silla-2',
    label: 'Silla 2',
    barberId: 'br-matias',
    barberName: 'Matías',
    status: 'next' as const,
    detail: 'Próxima cita 11:00',
  },
  {
    id: 'silla-3',
    label: 'Silla 3',
    barberId: 'br-felipe',
    barberName: 'Felipe',
    status: 'free' as const,
    detail: 'Disponible',
  },
]

export const BENEFITS = [
  {
    title: 'Reserva desde Instagram',
    description:
      'Un solo link en bio para que tus clientes agenden sin salir del feed.',
  },
  {
    title: 'Sin llamadas ni mensajes repetidos',
    description:
      'Olvídate de coordinar por WhatsApp. La hora queda confirmada al instante.',
  },
  {
    title: 'Horarios siempre actualizados',
    description:
      'La disponibilidad se ajusta sola con cada reserva, sin choques.',
  },
  {
    title: 'Confirmación automática',
    description:
      'Tu cliente recibe la confirmación apenas reserva, sin esperar respuesta.',
  },
  {
    title: 'Panel simple para administrar',
    description:
      'Un panel pensado para barberos: ves el día, mueves citas y listo.',
  },
]

export const FUTURE_FEATURES = [
  'Link directo para Instagram',
  'Agenda disponible 24/7',
  'Gestión simple desde el panel',
  'Experiencia profesional para tus clientes',
  'Base preparada para integraciones: WhatsApp, pagos online y reportes',
]
