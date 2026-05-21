/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#101013",
          800: "#16161a",
          700: "#1d1d22",
          600: "#26262d",
        },
        accent: {
          DEFAULT: "#c7ff63",
          soft: "#dfffa0",
          dim: "#9bd83a",
        },
        electric: "#3b82f6",
        // Theme-aware aliases → CSS vars switch light/dark
        "t-base": "var(--rb-bg)",
        "t-surface": "var(--rb-surface)",
        "t-card": "var(--rb-card)",
        "t-elevated": "var(--rb-elevated)",
        "t-hover": "var(--rb-hover)",
        "t-primary": "var(--rb-text)",
        "t-muted": "var(--rb-muted)",
        "t-subtle": "var(--rb-subtle)",
        "t-border": "var(--rb-border)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(199,255,99,0.25), 0 10px 40px -10px rgba(199,255,99,0.35)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
