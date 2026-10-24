/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bxc: {
          bg: "#000000",
          surface: "#0a0a0a",
          card: "#121212",
          cardHover: "#181818",
          border: "#1f1f1f",
          borderLight: "#2e2e2e",
          volt: {
            DEFAULT: "#ccf141",
            hover: "#b8dc35",
            glow: "rgba(204, 241, 65, 0.3)"
          },
          red: {
            DEFAULT: "#ccf141",
            hover: "#b8dc35",
            glow: "rgba(204, 241, 65, 0.3)"
          },
          gold: {
            DEFAULT: "#ccf141",
            light: "#d9f560",
            glow: "rgba(204, 241, 65, 0.25)"
          },
          silver: "#a1a1aa",
          muted: "#71717a"
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Inter"', 'sans-serif'],
        athletic: ['"Bebas Neue"', '"Oswald"', '"Outfit"', 'sans-serif']
      },
      boxShadow: {
        'volt-glow': '0 0 30px -5px rgba(204, 241, 65, 0.35)',
        'red-glow': '0 0 30px -5px rgba(204, 241, 65, 0.35)',
        'card-elevated': '0 12px 40px -10px rgba(0, 0, 0, 0.9)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'border-spin': 'borderSpin 4s linear infinite'
      },
      keyframes: {
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
