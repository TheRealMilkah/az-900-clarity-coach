/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e2ef',
          200: '#b3c5df',
          300: '#7e98c2',
          400: '#4c6a9e',
          500: '#2f4a78',
          600: '#22365c',
          700: '#1a2a47',
          800: '#142036',
          900: '#0e1726',
        },
        azure: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcd9ff',
          300: '#8ec1ff',
          400: '#5a9fff',
          500: '#2f87f5',
          600: '#1a6fd9',
          700: '#1759b0',
          800: '#174a8f',
          900: '#173e75',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,23,38,0.04), 0 4px 16px rgba(14,23,38,0.06)',
        cardHover: '0 2px 4px rgba(14,23,38,0.06), 0 12px 32px rgba(14,23,38,0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
