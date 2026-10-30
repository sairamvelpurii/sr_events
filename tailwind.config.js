/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F4',
          100: '#F3EFE8',
          200: '#E8E2D7',
          300: '#DBD3C4',
        },
        charcoal: {
          900: '#1E1E1E',
          800: '#2A2928',
          700: '#3A3836',
          500: '#66615B',
          400: '#8A847D',
          300: '#B2ACA4',
        },
        gold: {
          light: '#D4BE88',
          DEFAULT: '#B89B5E',
          dark: '#96783F',
          muted: '#C4AE7A',
        },
        status: {
          available: '#2E7D32',
          booked: '#C62828',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(30, 30, 30, 0.05)',
        'card': '0 10px 30px -4px rgba(30, 30, 30, 0.08)',
        'floating': '0 20px 40px -6px rgba(30, 30, 30, 0.12)',
      }
    },
  },
  plugins: [],
}
