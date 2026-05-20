import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page title */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Contacto</h1>
        <p className="text-slate-500">¿Tienes preguntas o necesitas ayuda? Escríbenos, respondemos en menos de 24 horas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-5">Información de contacto</h2>
            <ul className="space-y-5">
              {[
                { icon: MapPin, label: 'Dirección', value: 'Av. Providencia 1234\nProvidencia, Santiago' },
                { icon: Phone, label: 'Teléfono', value: '+56 2 2345 6789' },
                { icon: Mail, label: 'Email', value: 'contacto@limpiamas.cl' },
                { icon: Clock, label: 'Horario', value: 'Lunes a Viernes\n9:00 – 18:00 hrs' },
              ].map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-3">
                  <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                    <p className="text-sm text-slate-700 whitespace-pre-line">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden h-48 flex items-center justify-center border border-slate-200">
            <div className="text-center text-slate-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-teal-400" />
              <p className="text-sm font-medium">Providencia, Santiago</p>
              <p className="text-xs">Ver en Google Maps</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-500 mb-6">Te responderemos a la brevedad en tu correo.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                  className="text-teal-600 text-sm font-semibold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-slate-800 mb-6">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Tu nombre completo"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+56 9 XXXX XXXX"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="tu@correo.cl"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Mensaje *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Enviar mensaje
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
