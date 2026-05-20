import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, RotateCcw, ChevronDown } from 'lucide-react'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  quickReplies?: string[]
}

const WELCOME: Message = {
  id: 0,
  from: 'bot',
  text: '¡Hola! 👋 Soy el asistente de **LimpiaMás**. Estoy aquí para ayudarte con productos, envíos y todo lo que necesites.',
  quickReplies: ['¿Qué productos tienen?', '¿Cómo es el envío?', 'Ver ofertas', 'Hablar con alguien'],
}

const BOT_RESPONSES: { keywords: string[]; text: string; quickReplies?: string[] }[] = [
  {
    keywords: ['producto', 'tienen', 'venden', 'catálogo', 'catalogo', 'que hay', 'que venden'],
    text: 'Tenemos 5 categorías de productos:\n\n🍋 **Cocina** — lavavajillas y desengrasantes\n🚿 **Baño** — desinfectantes y limpiadores\n👕 **Ropa** — detergentes y quitamanchas\n🏠 **Pisos** — limpiadores multiuso\n🧴 **Desinfectantes** — aerosoles y líquidos\n\nTodas marcas líderes: Ariel, Clorox, Vanish, Poett y más.',
    quickReplies: ['¿Cuál es el más vendido?', '¿Tienen ofertas?', '¿Cómo despachan?'],
  },
  {
    keywords: ['más vendido', 'popular', 'mejor', 'recomiendan', 'recomendado'],
    text: '⭐ Nuestros 3 más vendidos:\n\n1. **Ariel Pods** — 57 cápsulas, lo más práctico\n2. **Poett Lavanda** — limpiador de pisos favorito\n3. **Quix Limón** — lavalozas concentrado #1\n\n¿Te interesa alguno?',
    quickReplies: ['¿Cómo despachan?', 'Ver todos los productos'],
  },
  {
    keywords: ['envío', 'envio', 'despacho', 'entrega', 'llega', 'costo envío', 'costo envio', 'despachan'],
    text: '🚚 Así funciona nuestro despacho:\n\n✅ **Envío GRATIS** sobre **$15.000**\n💰 Compras menores: **$2.990**\n⏱ Entrega en **2 a 5 días hábiles**\n📍 A todo Chile, incluyendo regiones',
    quickReplies: ['¿Tienen ofertas?', '¿Qué productos tienen?'],
  },
  {
    keywords: ['oferta', 'descuento', 'rebaja', 'precio', 'barato', 'promo'],
    text: '🎉 ¡Ofertas activas ahora!\n\n🔖 Cif Crema Limón → **$3.290**\n🔖 Vanish Oxi-Gel → **$4.990**\n🔖 Ariel Pods 57un → **$12.990**\n🔖 Lysol 5L → **$4.990**\n\nEncuéntralas en la sección **Ofertas** del menú.',
    quickReplies: ['¿Cómo compro?', '¿Tienen envío gratis?'],
  },
  {
    keywords: ['compro', 'comprar', 'agregar', 'carrito', 'pagar', 'checkout'],
    text: '🛒 Comprar es muy simple:\n\n1. Ve a **Productos** u **Ofertas**\n2. Haz clic en **"Agregar"**\n3. Revisa tu **carrito** arriba\n4. Haz clic en **"Proceder al pago"**',
    quickReplies: ['¿Cuánto demora el envío?', '¿Tienen boleta?', 'Hablar con alguien'],
  },
  {
    keywords: ['boleta', 'factura', 'documento', 'tributario'],
    text: '🧾 Emitimos **boleta electrónica** y **factura** para empresas.\n\nEl documento llega automáticamente a tu correo al confirmar la compra.',
    quickReplies: ['¿Cómo despachan?', 'Hablar con alguien'],
  },
  {
    keywords: ['devolucion', 'devolución', 'cambio', 'garantia', 'garantía', 'reclamo'],
    text: '↩️ Política de devolución:\n\n✅ **15 días** desde la compra\n✅ Producto sin abrir o con defecto\n✅ Retiro sin costo para ti\n\nEscríbenos con tu número de pedido.',
    quickReplies: ['Hablar con alguien', 'Ir a Contacto'],
  },
  {
    keywords: ['hablar', 'persona', 'humano', 'asesor', 'ejecutivo', 'alguien'],
    text: '👤 ¡Con gusto te conectamos!\n\n📞 **+56 2 2345 6789**\n📧 **contacto@limpiamas.cl**\n🕐 Lunes a Viernes · 9:00–18:00\n\nO déjanos un mensaje en **Contacto**.',
    quickReplies: ['Ir a Contacto', '¿Qué productos tienen?'],
  },
  {
    keywords: ['gracias', 'listo', 'ok', 'okey', 'perfecto', 'genial', 'excelente'],
    text: '¡Con mucho gusto! 😊 Estoy aquí si necesitas algo más. ¡Que tengas un excelente día!',
    quickReplies: ['¿Qué productos tienen?', 'Ver ofertas'],
  },
  {
    keywords: ['hola', 'buenas', 'buenos', 'saludos', 'hey'],
    text: '¡Hola! 👋 ¿En qué te puedo ayudar hoy?',
    quickReplies: ['¿Qué productos tienen?', '¿Cómo es el envío?', 'Ver ofertas'],
  },
]

const DEFAULT_RESPONSE: Omit<Message, 'id' | 'from'> = {
  text: 'No entendí bien tu pregunta 😅 Prueba con alguna de estas opciones:',
  quickReplies: ['¿Qué productos tienen?', '¿Cómo es el envío?', 'Ver ofertas', 'Hablar con alguien'],
}

let nextId = 1

function getBotResponse(input: string): Omit<Message, 'id' | 'from'> {
  const lower = input.toLowerCase()
  for (const r of BOT_RESPONSES) {
    if (r.keywords.some(k => lower.includes(k))) {
      return { text: r.text, quickReplies: r.quickReplies }
    }
  }
  return DEFAULT_RESPONSE
}

function renderText(text: string) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    )
  })
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  const sendMessage = (text: string) => {
    if (!text.trim() || typing) return
    setMessages(prev => [...prev, { id: nextId++, from: 'user', text: text.trim() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const response = getBotResponse(text)
      setMessages(prev => [...prev, { id: nextId++, from: 'bot', ...response }])
      setTyping(false)
    }, 800 + Math.random() * 500)
  }

  const reset = () => {
    nextId = 1
    setMessages([WELCOME])
    setInput('')
    setTyping(false)
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-slate-800 scale-90' : 'bg-teal-600 hover:bg-teal-700 scale-100'
        }`}
        aria-label="Chat"
      >
        {open
          ? <ChevronDown className="w-6 h-6 text-white" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Chat panel — full screen on mobile, bounded panel on desktop */}
      <div
        className={`fixed z-50 flex flex-col bg-white shadow-2xl transition-all duration-300 origin-bottom-right
          /* mobile: full screen below header */
          inset-x-0 bottom-0 top-16 rounded-t-2xl
          /* desktop: fixed bottom-right, capped to viewport */
          sm:inset-auto sm:bottom-20 sm:right-5 sm:top-auto sm:left-auto sm:w-[400px]
          sm:h-[560px] sm:max-h-[calc(100vh-7rem)] sm:rounded-2xl
          border border-slate-200
          ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
        `}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 py-4 bg-teal-600 sm:rounded-t-2xl shrink-0">
          <div className="relative shrink-0">
            <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-teal-600 rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base leading-tight">Asistente LimpiaMás</p>
            <p className="text-teal-100 text-xs mt-0.5">En línea · responde al instante</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              title="Reiniciar conversación"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* ── Messages area ── */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 bg-slate-50" style={{ minHeight: 0 }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.from === 'bot' ? (
                <div className="flex items-end gap-2 max-w-[85%]">
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shrink-0 mb-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  {/* Bubble */}
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-slate-100 text-sm text-slate-700 leading-relaxed">
                    {renderText(msg.text)}
                  </div>
                </div>
              ) : (
                <div className="max-w-[80%] bg-teal-600 rounded-2xl rounded-br-sm px-4 py-3 text-sm text-white leading-relaxed">
                  {msg.text}
                </div>
              )}

              {/* Quick replies */}
              {msg.from === 'bot' && msg.quickReplies && (
                <div className="flex flex-wrap gap-2 pl-10">
                  {msg.quickReplies.map(qr => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="text-xs px-3.5 py-2 rounded-full border border-teal-300 text-teal-700 bg-white hover:bg-teal-50 hover:border-teal-400 transition-colors font-medium shadow-sm"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm border border-slate-100">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="px-4 py-4 bg-white border-t border-slate-100 shrink-0 sm:rounded-b-2xl">
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input) }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-300 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-700 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0 shadow-md"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
