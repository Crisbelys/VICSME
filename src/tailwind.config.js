/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
    "./components//*.{js,ts,jsx,tsx}",
    "./pages//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartPopLeft: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          '50%': { transform: 'translate(-70%, -70%) scale(1.2)', opacity: 0.8 },
          '100%': { transform: 'translate(-100%, -100%) scale(1.5)', opacity: 0 },
        },
        heartPopRight: {
          '0%': { transform: 'translate(50%, -50%) scale(1)', opacity: 1 },
          '50%': { transform: 'translate(70%, -70%) scale(1.2)', opacity: 0.8 },
          '100%': { transform: 'translate(100%, -100%) scale(1.5)', opacity: 0 },
        }
      },
      animation: {
        'heart-pop-left': 'heartPopLeft 0.6s ease-out forwards',
        'heart-pop-right': 'heartPopRight 0.6s ease-out forwards',
      },
      animationDelay: {
        100: '100ms',
        200: '200ms',
      }
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
  ],
}

// DONE