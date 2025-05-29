/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        happy: {
          light: '#FFF8E1',
          DEFAULT: '#F9C846',
          dark: '#F59E0B',
        },
        sad: {
          light: '#E8F4FD',
          DEFAULT: '#4A90E2',
          dark: '#2563EB',
        },
        angry: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
        calm: {
          light: '#ECFDF5',
          DEFAULT: '#10B981',
          dark: '#047857',
        },
        tired: {
          light: '#F5F3FF',
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};