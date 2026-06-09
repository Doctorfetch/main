/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0A0A0F',
          800: '#0F0F17',
          700: '#15151F',
          600: '#1C1C29',
          500: '#262635',
        },
        lime: { DEFAULT: '#C6FF3D', soft: '#D9FF7A' },
        grape: { DEFAULT: '#7C5CFF', soft: '#A78BFA' },
        coral: { DEFAULT: '#FF6B6B' },
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter var"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        blink: {
          '0%,80%,100%': { opacity: '0.2' },
          '40%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grow: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pop: 'pop 0.35s ease-out both',
        blink: 'blink 1.4s infinite both',
        marquee: 'marquee 28s linear infinite',
        grow: 'grow 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
