import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addDays, format, isToday, isWeekend } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  Clock,
  MapPin,
  MessageSquareMore,
  Scissors,
  User,
} from 'lucide-react'
import Layout from '@/components/Layout'
import BookingStep from '@/components/BookingStep'
import ServiceCard from '@/components/ServiceCard'
import BarberCard from '@/components/BarberCard'
import TimeSlotButton from '@/components/TimeSlotButton'
import PrimaryButton from '@/components/PrimaryButton'
import { BARBERS, SERVICES, STUDIO, TIME_SLOTS } from '@/data/mockData'
import type { BookingDraft } from '@/types'
import { cn, formatCLP, formatDuration } from '@/lib/utils'

const TOTAL_STEPS = 6

const clientSchema = z.object({
  clientName: z.string().min(2, 'Ingresa tu nombre'),
  clientPhone: z
    .string()
    .min(8, 'Ingresa un teléfono válido')
    .regex(/^[0-9+\s-]+$/, 'Solo números, espacios, + o -'),
  clientEmail: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  comment: z.string().max(280, 'Máximo 280 caracteres').optional().or(z.literal('')),
})

type ClientForm = z.infer<typeof clientSchema>

export default function Reservar() {
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<BookingDraft>({})

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === draft.serviceId),
    [draft.serviceId],
  )
  const selectedBarber = useMemo(
    () => BARBERS.find((b) => b.id === draft.barberId),
    [draft.barberId],
  )

  // Build next 14 days for date picker
  const days = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i))
  }, [])

  const form = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      clientName: draft.clientName ?? '',
      clientPhone: draft.clientPhone ?? '',
      clientEmail: draft.clientEmail ?? '',
      comment: draft.comment ?? '',
    },
    mode: 'onTouched',
  })

  const submitClient = (values: ClientForm) => {
    setDraft((d) => ({ ...d, ...values }))
    next()
  }

  const canGoNext = (() => {
    if (step === 1) return Boolean(draft.serviceId)
    if (step === 2) return Boolean(draft.barberId)
    if (step === 3) return Boolean(draft.date)
    if (step === 4) return Boolean(draft.time)
    return true
  })()

  return (
    <Layout hideFooter>
      <div className="container-app py-10 sm:py-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <p className="hidden text-xs text-ink-dim sm:block">
            <MapPin className="mr-1 inline h-3 w-3" /> {STUDIO.address}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Wizard */}
          <div className="card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <BookingStep
                  step={1}
                  total={TOTAL_STEPS}
                  title="Elige tu servicio"
                  subtitle="¿Qué te haremos hoy?"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {SERVICES.map((s, i) => (
                      <ServiceCard
                        key={s.id}
                        service={s}
                        selected={draft.serviceId === s.id}
                        onSelect={(svc) =>
                          setDraft((d) => ({ ...d, serviceId: svc.id }))
                        }
                        index={i}
                      />
                    ))}
                  </div>
                </BookingStep>
              )}

              {step === 2 && (
                <BookingStep
                  step={2}
                  total={TOTAL_STEPS}
                  title="Elige tu barbero"
                  subtitle="Cada uno con su especialidad"
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {BARBERS.map((b, i) => (
                      <BarberCard
                        key={b.id}
                        barber={b}
                        selected={draft.barberId === b.id}
                        onSelect={(br) =>
                          setDraft((d) => ({ ...d, barberId: br.id }))
                        }
                        index={i}
                      />
                    ))}
                  </div>
                </BookingStep>
              )}

              {step === 3 && (
                <BookingStep
                  step={3}
                  total={TOTAL_STEPS}
                  title="Elige una fecha"
                  subtitle="Disponibilidad de los próximos 14 días"
                >
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
                    {days.map((d) => {
                      const value = format(d, 'yyyy-MM-dd')
                      const selected = draft.date === value
                      const disabled = isWeekend(d) && d.getDay() === 0
                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={disabled}
                          onClick={() =>
                            setDraft((s) => ({ ...s, date: value, time: undefined }))
                          }
                          className={cn(
                            'flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border text-sm transition',
                            selected
                              ? 'border-gold bg-gold/10 text-gold shadow-gold'
                              : 'border-line bg-bg-card text-ink hover:border-gold/40 hover:text-gold',
                            disabled &&
                              'pointer-events-none border-line/50 text-ink-dim',
                          )}
                        >
                          <span className="text-[10px] uppercase tracking-wider opacity-80">
                            {format(d, 'EEE', { locale: es })}
                          </span>
                          <span className="font-display text-2xl font-semibold">
                            {format(d, 'd')}
                          </span>
                          <span className="text-[10px] capitalize opacity-80">
                            {format(d, 'MMM', { locale: es })}
                          </span>
                          {isToday(d) && (
                            <span className="text-[10px] font-medium text-gold">
                              Hoy
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-xs text-ink-dim">
                    Domingos cerrados. Horario: {STUDIO.hours}.
                  </p>
                </BookingStep>
              )}

              {step === 4 && (
                <BookingStep
                  step={4}
                  total={TOTAL_STEPS}
                  title="Elige una hora"
                  subtitle={
                    draft.date
                      ? format(new Date(draft.date + 'T00:00'), "EEEE d 'de' MMMM", {
                          locale: es,
                        })
                      : 'Selecciona una hora'
                  }
                >
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {TIME_SLOTS.map((t, i) => {
                      const disabled = i === 3 // mock unavailable
                      return (
                        <TimeSlotButton
                          key={t}
                          time={t}
                          disabled={disabled}
                          selected={draft.time === t}
                          onClick={() => setDraft((s) => ({ ...s, time: t }))}
                        />
                      )
                    })}
                  </div>
                  <p className="mt-4 text-xs text-ink-dim">
                    Las horas tachadas ya están reservadas.
                  </p>
                </BookingStep>
              )}

              {step === 5 && (
                <BookingStep
                  step={5}
                  total={TOTAL_STEPS}
                  title="Tus datos"
                  subtitle="Para confirmarte la cita"
                >
                  <form
                    onSubmit={form.handleSubmit(submitClient)}
                    className="grid gap-5 sm:grid-cols-2"
                    id="client-form"
                    noValidate
                  >
                    <div className="sm:col-span-2">
                      <label className="label" htmlFor="clientName">
                        Nombre <span className="text-gold">*</span>
                      </label>
                      <input
                        id="clientName"
                        className="input"
                        placeholder="Ej: Diego Soto"
                        {...form.register('clientName')}
                      />
                      {form.formState.errors.clientName && (
                        <p className="mt-1 text-xs text-danger">
                          {form.formState.errors.clientName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label" htmlFor="clientPhone">
                        Teléfono <span className="text-gold">*</span>
                      </label>
                      <input
                        id="clientPhone"
                        className="input"
                        placeholder="+56 9 1234 5678"
                        inputMode="tel"
                        {...form.register('clientPhone')}
                      />
                      {form.formState.errors.clientPhone && (
                        <p className="mt-1 text-xs text-danger">
                          {form.formState.errors.clientPhone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label" htmlFor="clientEmail">
                        Email <span className="text-ink-dim">(opcional)</span>
                      </label>
                      <input
                        id="clientEmail"
                        className="input"
                        placeholder="tu@correo.cl"
                        type="email"
                        {...form.register('clientEmail')}
                      />
                      {form.formState.errors.clientEmail && (
                        <p className="mt-1 text-xs text-danger">
                          {form.formState.errors.clientEmail.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label" htmlFor="comment">
                        Comentario <span className="text-ink-dim">(opcional)</span>
                      </label>
                      <textarea
                        id="comment"
                        rows={3}
                        className="input resize-none"
                        placeholder="Cuéntanos algo de tu corte ideal…"
                        {...form.register('comment')}
                      />
                    </div>
                  </form>
                </BookingStep>
              )}

              {step === 6 && (
                <BookingStep
                  step={6}
                  total={TOTAL_STEPS}
                  title="Reserva confirmada"
                  subtitle="Te esperamos en el estudio"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="flex flex-col items-center gap-6 py-8 text-center"
                  >
                    <span className="grid h-20 w-20 place-items-center rounded-3xl border border-success/30 bg-success/10 shadow-[0_0_0_8px_rgba(34,197,94,0.05)]">
                      <Check className="h-10 w-10 text-success" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold">
                        ¡Listo, {draft.clientName?.split(' ')[0]}!
                      </h3>
                      <p className="mt-2 text-sm text-ink-muted">
                        Te enviamos los detalles a tu teléfono. Si necesitas
                        cambiar algo, escríbenos por Instagram.
                      </p>
                    </div>
                    <Link to="/" className="w-full max-w-xs">
                      <PrimaryButton full size="lg">
                        Volver al inicio
                      </PrimaryButton>
                    </Link>
                  </motion.div>
                </BookingStep>
              )}
            </AnimatePresence>

            {/* Nav */}
            {step < 6 && (
              <div className="mt-10 flex items-center justify-between gap-3 border-t border-line/70 pt-6">
                <PrimaryButton
                  variant="ghost"
                  onClick={back}
                  disabled={step === 1}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                  Atrás
                </PrimaryButton>
                {step === 5 ? (
                  <PrimaryButton
                    type="submit"
                    form="client-form"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Confirmar reserva
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    onClick={next}
                    disabled={!canGoNext}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Continuar
                  </PrimaryButton>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden p-0">
              <div className="border-b border-line bg-bg-soft px-6 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                  Resumen
                </p>
                <p className="mt-1 font-display text-base font-semibold">
                  Tu reserva
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 text-sm">
                <SummaryRow
                  icon={Scissors}
                  label="Servicio"
                  value={selectedService?.name ?? 'Por elegir'}
                  hint={
                    selectedService
                      ? `${formatDuration(selectedService.durationMin)} · ${formatCLP(
                          selectedService.price,
                        )}`
                      : undefined
                  }
                />
                <SummaryRow
                  icon={User}
                  label="Barbero"
                  value={selectedBarber?.name ?? 'Por elegir'}
                  hint={selectedBarber?.specialty}
                />
                <SummaryRow
                  icon={CalendarIcon}
                  label="Fecha"
                  value={
                    draft.date
                      ? format(new Date(draft.date + 'T00:00'), "EEEE d 'de' MMMM", {
                          locale: es,
                        })
                      : 'Por elegir'
                  }
                />
                <SummaryRow
                  icon={Clock}
                  label="Hora"
                  value={draft.time ?? 'Por elegir'}
                />
                <SummaryRow
                  icon={MessageSquareMore}
                  label="Cliente"
                  value={draft.clientName ?? 'Por completar'}
                  hint={draft.clientPhone}
                />
              </div>
              {selectedService && (
                <div className="border-t border-line/70 bg-bg-soft px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-ink-muted">
                      Total
                    </span>
                    <span className="font-display text-2xl font-semibold text-gold">
                      {formatCLP(selectedService.price)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-ink-dim">
              Pagas en el local. Cancela hasta 2 horas antes sin costo.
            </p>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof CalendarIcon
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-ink-dim">
          {label}
        </p>
        <p className="truncate font-medium text-ink">{value}</p>
        {hint && <p className="truncate text-xs text-ink-muted">{hint}</p>}
      </div>
    </div>
  )
}

