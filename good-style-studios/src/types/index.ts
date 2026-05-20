export type Service = {
  id: string
  name: string
  description: string
  durationMin: number
  price: number
  active: boolean
  highlight?: boolean
  tag?: string
  image?: string
}

export type Barber = {
  id: string
  name: string
  specialty: string
  bio: string
  available: boolean
  initials: string
  todayBookings: number
  image?: string
  nextSlot?: string
}

export type AppointmentStatus = 'confirmada' | 'pendiente' | 'cancelada'

export type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  serviceId: string
  serviceName: string
  barberId: string
  barberName: string
  date: string // ISO yyyy-mm-dd
  time: string // HH:mm
  status: AppointmentStatus
  price: number
  notes?: string
}

export type Metric = {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  icon?: string
}

export type BookingDraft = {
  serviceId?: string
  barberId?: string
  date?: string
  time?: string
  clientName?: string
  clientPhone?: string
  clientEmail?: string
  comment?: string
}
