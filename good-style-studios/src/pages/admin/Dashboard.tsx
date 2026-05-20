import { motion } from 'framer-motion'
import {
  Activity,
  Armchair,
  CalendarRange,
  CircleDollarSign,
  Clock,
  Plus,
  Scissors,
  Sparkles,
} from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import MetricCard from '@/components/MetricCard'
import AppointmentCard from '@/components/AppointmentCard'
import PrimaryButton from '@/components/PrimaryButton'
import StatusBadge from '@/components/StatusBadge'
import { APPOINTMENTS, BARBERS, CHAIRS, METRICS, SERVICES } from '@/data/mockData'
import { shopInteriorImage } from '@/data/images'
import { cn, formatCLP } from '@/lib/utils'

const METRIC_ICONS = [Scissors, CircleDollarSign, Armchair, Clock]

const CHAIR_STYLES = {
  busy: {
    label: 'Ocupada',
    dot: 'bg-danger',
    badge: 'border-danger/30 bg-danger/10 text-danger',
  },
  next: {
    label: 'Próxima cita',
    dot: 'bg-warning',
    badge: 'border-warning/30 bg-warning/10 text-warning',
  },
  free: {
    label: 'Disponible',
    dot: 'bg-success',
    badge: 'border-success/30 bg-success/10 text-success',
  },
} as const

export default function Dashboard() {
  const todayAppointments = [...APPOINTMENTS].sort((a, b) =>
    a.time.localeCompare(b.time),
  )
  const upcoming = todayAppointments
    .filter((a) => a.status !== 'cancelada')
    .slice(0, 3)

  return (
    <AdminLayout
      title="Agenda Good Style Studios"
      subtitle="Tu día en una sola pantalla"
      actions={
        <>
          <PrimaryButton leftIcon={<Plus className="h-4 w-4" />}>
            Nueva reserva
          </PrimaryButton>
          <PrimaryButton variant="secondary">Exportar día</PrimaryButton>
          <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
            <Activity className="h-3.5 w-3.5" /> Sistema operativo
          </span>
        </>
      }
    >
      {/* Banner */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-line">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${shopInteriorImage})`,
            backgroundColor: '#0F0F16',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/30" />
        <div className="relative flex flex-col gap-1 p-6 sm:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            Panel del dueño
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            Reservas, barberos y horarios en un solo lugar.
          </h2>
          <p className="max-w-xl text-sm text-ink-muted">
            La agenda real de Good Style Studios — actualizada con cada reserva
            que llega desde Instagram.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            delta={m.delta}
            trend={m.trend}
            icon={METRIC_ICONS[i]}
            index={i}
          />
        ))}
      </section>

      {/* Estado de sillas */}
      <section className="mt-6">
        <div className="card p-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Estado de sillas
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                Quién está atendiendo ahora
              </h3>
            </div>
            <span className="badge border-line bg-bg-soft text-ink-muted">
              {CHAIRS.length} sillas activas
            </span>
          </header>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {CHAIRS.map((c, i) => {
              const styles = CHAIR_STYLES[c.status]
              const barber = BARBERS.find((b) => b.id === c.barberId)
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="relative overflow-hidden rounded-2xl border border-line/70 bg-bg-soft/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    {barber?.image ? (
                      <span
                        className="h-12 w-12 flex-shrink-0 rounded-2xl border border-gold/30 bg-cover bg-center"
                        style={{ backgroundImage: `url(${barber.image})` }}
                      />
                    ) : (
                      <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/10 font-display text-sm font-semibold text-gold">
                        {barber?.initials ?? '—'}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-ink-dim">
                        {c.label}
                      </p>
                      <p className="font-semibold">{c.barberName}</p>
                    </div>
                    <span className={cn('badge', styles.badge)}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />
                      {styles.label}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-ink-muted">{c.detail}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Agenda timeline */}
        <div className="card flex flex-col p-6 lg:col-span-2">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Agenda del día
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold">Hoy</h2>
            </div>
            <span className="badge border-line bg-bg-soft">
              <CalendarRange className="h-3 w-3 text-gold" />
              {todayAppointments.length} reservas
            </span>
          </header>

          <div className="mt-6 flex flex-col gap-3">
            {todayAppointments.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl border border-line/70 bg-bg-soft/40 p-4 transition hover:border-gold/40"
              >
                <div className="flex flex-col items-center justify-center rounded-xl border border-gold/30 bg-gold/10 py-2 text-center">
                  <span className="font-display text-base font-semibold text-gold">
                    {a.time}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gold/80">
                    hrs
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold">{a.clientName}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="truncate text-xs text-ink-muted">
                    {a.serviceName} · {a.barberName}
                  </p>
                </div>
                <p className="hidden text-sm font-medium sm:block">
                  {formatCLP(a.price)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="card p-6">
            <header>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Próximas reservas
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                Lo que viene
              </h3>
            </header>
            <div className="mt-4 flex flex-col gap-3">
              {upcoming.map((a, i) => (
                <AppointmentCard key={a.id} appointment={a} compact index={i} />
              ))}
            </div>
          </div>

          <div className="card p-6">
            <header>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Estado del sistema
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                Todo en orden
              </h3>
            </header>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {[
                { label: 'Reservas online', ok: true },
                { label: 'Confirmaciones automáticas', ok: true },
                { label: 'Sincronización agenda', ok: true },
                { label: 'Notificaciones SMS', ok: true },
              ].map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-ink-muted">{s.label}</span>
                  <span className="badge border-success/30 bg-success/10 text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Activo
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Servicios + barberos */}
      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Carta
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                Servicios activos
              </h3>
            </div>
            <span className="badge border-gold/30 bg-gold/5 text-gold">
              <Sparkles className="h-3 w-3" />{' '}
              {SERVICES.filter((s) => s.active).length} activos
            </span>
          </header>
          <ul className="mt-4 divide-y divide-line/60">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-3">
                {s.image ? (
                  <span
                    className="h-10 w-10 flex-shrink-0 rounded-xl border border-line bg-cover bg-center"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-soft text-gold">
                    <Scissors className="h-4 w-4" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-ink-muted">
                    {s.durationMin} min · {formatCLP(s.price)}
                  </p>
                </div>
                <span className="badge border-success/30 bg-success/10 text-success">
                  Activo
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <header>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Equipo
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold">
              Barberos del día
            </h3>
          </header>
          <ul className="mt-4 flex flex-col gap-3">
            {BARBERS.map((b) => (
              <li
                key={b.id}
                className="flex items-center gap-4 rounded-2xl border border-line/70 bg-bg-soft/40 p-3"
              >
                {b.image ? (
                  <span
                    className="h-12 w-12 flex-shrink-0 rounded-2xl border border-gold/30 bg-cover bg-center"
                    style={{ backgroundImage: `url(${b.image})` }}
                  />
                ) : (
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/10 font-display text-sm font-semibold text-gold">
                    {b.initials}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{b.name}</p>
                  <p className="text-xs text-ink-muted">{b.specialty}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs">
                  <span className="font-medium text-ink">
                    {b.todayBookings} citas
                  </span>
                  <span className={b.available ? 'text-success' : 'text-ink-dim'}>
                    {b.available ? 'Disponible' : 'Ocupado'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AdminLayout>
  )
}
