import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Music,
  Phone,
  Quote,
  Scissors,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import InstagramIcon from '@/components/InstagramIcon'
import Layout from '@/components/Layout'
import PrimaryButton from '@/components/PrimaryButton'
import SectionTitle from '@/components/SectionTitle'
import ServiceCard from '@/components/ServiceCard'
import BarberCard from '@/components/BarberCard'
import { BARBERS, SERVICES, STUDIO } from '@/data/mockData'
import {
  beardCloseImage,
  beardImage,
  clippersImage,
  experienceImages,
  fadeCutImage,
  heroBarberImage,
  shopAmbientImage,
  shopInteriorImage,
  toolsImage,
} from '@/data/images'

const ABOUT_ATTRIBUTES = [
  { icon: Scissors, label: 'Detalle al milímetro' },
  { icon: Sparkles, label: 'Productos premium' },
  { icon: Coffee, label: 'Música y café mientras te atendemos' },
  { icon: Heart, label: 'Atención cercana, sin apuros' },
]

const EXPERIENCE_STEPS = [
  {
    image: experienceImages.choose,
    eyebrow: '01 · Elige',
    title: 'Elige tu estilo',
    text: 'Selecciona el servicio, el barbero y la hora disponible.',
  },
  {
    image: experienceImages.arrive,
    eyebrow: '02 · Llega',
    title: 'Llega a tu hora',
    text: 'Evita esperas y llega directo a tu atención.',
  },
  {
    image: experienceImages.leave,
    eyebrow: '03 · Sal listo',
    title: 'Sal listo',
    text:
      'Corte, barba o perfilado con una experiencia ordenada desde el inicio.',
  },
]

const GALLERY = [
  { src: shopInteriorImage, alt: 'Interior del local', span: 'col-span-2 row-span-2' },
  { src: fadeCutImage, alt: 'Fade detallado', span: '' },
  { src: beardImage, alt: 'Perfilado de barba', span: '' },
  { src: toolsImage, alt: 'Herramientas', span: '' },
  { src: clippersImage, alt: 'Máquina de corte', span: '' },
  { src: beardCloseImage, alt: 'Detalle de barba', span: 'col-span-2' },
]

const TESTIMONIALS = [
  {
    quote:
      'Llegué buscando un fade y salí con un look que no esperaba. Diego sabe lo que hace. Ya volví tres veces.',
    name: 'Sebastián R.',
    service: 'Fade premium',
  },
  {
    quote:
      'Encontré la cuenta por Instagram y reservé en dos minutos. Llegué a mi hora exacta. Buena onda y trabajo prolijo.',
    name: 'Felipe M.',
    service: 'Corte + barba',
  },
  {
    quote:
      'La barba quedó como siempre quise. Matías se toma el tiempo para hacer cada detalle. 100% recomendado.',
    name: 'Andrés C.',
    service: 'Perfilado de barba',
  },
]

export default function Landing() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="container-app relative grid gap-10 py-12 sm:py-16 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12 md:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-7"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              <Sparkles className="h-3 w-3" /> Good Style Studios · Barbería en Linares
            </span>
            <h1 className="font-display text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl md:text-[3.4rem] lg:text-6xl">
              Reserva tu <span className="gold-text">corte</span>.
              <br className="hidden sm:block" /> Llega a tu hora. Siéntate
              en la <span className="gold-text">silla</span>.
            </h1>
            <p className="max-w-xl text-base text-ink-muted sm:text-lg">
              Cortes modernos, fade y barba en el centro de Linares. Reserva
              online en menos de un minuto y llega directo a tu atención.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/reservar">
                <PrimaryButton
                  size="lg"
                  full
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="sm:w-auto"
                >
                  Reservar ahora
                </PrimaryButton>
              </Link>
              <a href="#servicios">
                <PrimaryButton variant="secondary" size="lg" full className="sm:w-auto">
                  Ver estilos y servicios
                </PrimaryButton>
              </a>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <Scissors className="h-4 w-4 text-gold" />
                Fade, barba y cortes premium
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" />
                Reserva online 24 hrs
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" />
                Confirmación inmediata
              </span>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroBarberImage})`,
                  backgroundColor: '#0F0F16',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute left-4 top-4 rounded-2xl border border-line/80 bg-bg/85 px-3.5 py-2.5 backdrop-blur-xl shadow-soft sm:left-5 sm:top-5"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="font-medium text-success">Próxima hora libre</span>
                </div>
                <p className="mt-1 font-display text-base font-semibold text-gold">
                  Hoy · 15:00
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute bottom-4 left-4 right-4 rounded-2xl border border-gold/30 bg-bg/85 p-4 backdrop-blur-xl shadow-gold sm:bottom-6 sm:left-6 sm:right-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/15">
                    <Scissors className="h-4 w-4 text-gold" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">Corte + barba · 60 min</p>
                    <p className="truncate text-xs text-ink-muted">
                      Barbero: Diego Morales
                    </p>
                  </div>
                  <span className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-bg shadow-soft">
                    Confirmada
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-line/60">
        <div className="container-app grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line shadow-card">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${shopInteriorImage})`,
                backgroundColor: '#0F0F16',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              <span className="badge border-gold/30 bg-bg/80 text-gold backdrop-blur-md">
                <MapPin className="h-3 w-3" />
                Linares · Centro
              </span>
              <span className="badge border-line bg-bg/70 text-ink backdrop-blur-md">
                <Music className="h-3 w-3 text-gold" />
                Buena música siempre
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionTitle
              eyebrow="Sobre Good Style"
              title={
                <>
                  Cortamos sin apuro.
                  <br />
                  Salimos con <span className="gold-text">estilo</span>.
                </>
              }
              description="Tres barberos, una barbería en el centro de Linares y un mismo objetivo: que salgas con el corte que querías. Música, productos premium y atención cercana — la clase de detalles que se sienten apenas te sentás en la silla."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {ABOUT_ATTRIBUTES.map((it, i) => {
                const Icon = it.icon
                return (
                  <motion.div
                    key={it.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="card flex items-center gap-3 p-4"
                  >
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium leading-tight">
                      {it.label}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="border-t border-line/60">
        <div className="container-app py-14 sm:py-20">
          <SectionTitle
            eyebrow="Carta de servicios"
            title={
              <>
                Cortes, barba y <span className="gold-text">estilo al detalle</span>
              </>
            }
            description="Servicios pensados para salir listo: desde un corte clásico hasta un fade premium con terminación profesional."
          />
          <div className="mt-8 grid sm:mt-12 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TRIO */}
      <section className="border-t border-line/60">
        <div className="container-app py-14 sm:py-20">
          <SectionTitle
            eyebrow="La experiencia Good Style"
            title={
              <>
                Tres pasos. <span className="gold-text">Cero fricción.</span>
              </>
            }
            description="Reservar online es así de simple."
          />
          <div className="mt-8 grid sm:mt-12 gap-6 md:grid-cols-3">
            {EXPERIENCE_STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line shadow-card"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${s.image})`,
                    backgroundColor: '#0F0F16',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                    {s.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BARBERS */}
      <section id="barberos" className="border-t border-line/60">
        <div className="container-app py-14 sm:py-20">
          <SectionTitle
            eyebrow="El equipo"
            title={
              <>
                Elige tu <span className="gold-text">barbero</span>
              </>
            }
            description="Tres especialistas, tres estilos. Reserva con quien mejor te interpreta."
          />
          <div className="mt-8 grid sm:mt-12 gap-6 md:grid-cols-3">
            {BARBERS.map((b, i) => (
              <BarberCard key={b.id} barber={b} index={i} showBookCTA />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-line/60">
        <div className="container-app py-14 sm:py-20">
          <SectionTitle
            eyebrow="El local"
            title={
              <>
                Un poco del <span className="gold-text">ambiente</span>
              </>
            }
            description="Cortes, detalles y la barbería por dentro."
          />
          <div className="mt-8 grid sm:mt-12 auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-4">
            {GALLERY.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border border-line ${g.span}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${g.src})`, backgroundColor: '#0F0F16' }}
                  aria-label={g.alt}
                  role="img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden border-t border-line/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${shopAmbientImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg" aria-hidden />
        <div className="container-app relative py-20">
          <SectionTitle
            eyebrow="Lo que dicen los clientes"
            title={
              <>
                Reseñas del <span className="gold-text">trabajo</span>
              </>
            }
            description="Buena energía, buen corte y las ganas de volver."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card flex h-full flex-col gap-4 p-6 sm:p-7"
              >
                <Quote className="h-7 w-7 text-gold/60" />
                <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-line/70 pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 bg-gold/10 font-display text-xs font-semibold text-gold">
                    {t.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div className="text-xs">
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="text-ink-dim">{t.service}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="ubicacion" className="border-t border-line/60">
        <div className="container-app grid gap-10 py-14 sm:py-20 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl border border-line">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${shopAmbientImage})`,
                backgroundColor: '#0F0F16',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-bg/80 backdrop-blur-md">
                <MapPin className="h-5 w-5 text-gold" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  Estamos en
                </p>
                <p className="font-display text-base font-semibold">
                  {STUDIO.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionTitle
              eyebrow="Dónde estamos"
              title={
                <>
                  Una barbería en el centro de{' '}
                  <span className="gold-text">Linares</span>
                </>
              }
              description="A pasos de la plaza, atendemos solo con reserva previa para que llegues a tu hora."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="card p-4">
                <p className="flex items-center gap-2 text-xs text-ink-muted">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> Dirección
                </p>
                <p className="mt-1 text-sm font-medium">{STUDIO.address}</p>
              </div>
              <div className="card p-4">
                <p className="flex items-center gap-2 text-xs text-ink-muted">
                  <Clock className="h-3.5 w-3.5 text-gold" /> Horario
                </p>
                <p className="mt-1 text-sm font-medium">{STUDIO.hours}</p>
              </div>
              <div className="card p-4">
                <p className="flex items-center gap-2 text-xs text-ink-muted">
                  <Phone className="h-3.5 w-3.5 text-gold" /> Teléfono
                </p>
                <p className="mt-1 text-sm font-medium">{STUDIO.phone}</p>
              </div>
              <div className="card p-4">
                <p className="flex items-center gap-2 text-xs text-ink-muted">
                  <InstagramIcon className="h-3.5 w-3.5 text-gold" /> Instagram
                </p>
                <p className="mt-1 text-sm font-medium">{STUDIO.instagram}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-line/60">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBarberImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/40" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60" aria-hidden />
        <div className="container-app relative py-24 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              <Calendar className="h-3 w-3" />
              Reserva online
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Agenda tu próximo corte en{' '}
              <span className="gold-text">Good Style Studios</span>
            </h2>
            <p className="mt-4 text-base text-ink-muted sm:text-lg">
              Reserva online, llega a tu hora y disfruta una atención ordenada
              desde el primer minuto.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/reservar">
                <PrimaryButton
                  size="lg"
                  full
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="sm:w-auto"
                >
                  Reservar ahora
                </PrimaryButton>
              </Link>
              <a href="#servicios">
                <PrimaryButton variant="secondary" size="lg" full className="sm:w-auto">
                  Ver servicios
                </PrimaryButton>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
