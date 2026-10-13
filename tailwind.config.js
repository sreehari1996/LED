/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#071521',
          deepBlue: '#0D2942',
          electric: '#168BEB',
          cyan: '#35C1F4',
          white: '#FFFFFF',
          offwhite: '#F4F7FA',
          ink: '#17212B',
          slate: '#5B778D',
          border: '#DCE4EC',
          light: '#F4F7FA',
          accent: '#168BEB',
        }
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        scrolldown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        }
      },
      animation: {
        'slowZoom': 'slowZoom 20s ease-in-out infinite alternate',
        'scrolldown': 'scrolldown 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
