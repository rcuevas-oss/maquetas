/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0B0F',
          soft: '#111118',
          card: '#181820',
          elevated: '#1F1F29',
        },
        line: {
          DEFAULT: '#27272F',
          soft: '#1F1F27',
        },
        ink: {
          DEFAULT: '#F5F5F5',
          muted: '#A1A1AA',
          dim: '#71717A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          hover: '#B8941F',
          soft: 'rgba(212, 175, 55, 0.12)',
          ring: 'rgba(212, 175, 55, 0.35)',
        },
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)',
        gold: '0 0 0 1px rgba(212, 175, 55, 0.35), 0 8px 32px rgba(212, 175, 55, 0.18)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 6px 24px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'radial-gold':
          'radial-gradient(120% 80% at 50% 0%, rgba(212,175,55,0.18) 0%, rgba(11,11,15,0) 60%)',
        'radial-soft':
          'radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, rgba(11,11,15,0) 70%)',
        'card-gradient':
          'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
