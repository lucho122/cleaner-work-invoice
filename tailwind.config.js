/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-card': '#2d2d2d',
        'dark-input': '#3a3a3a',
        'primary-blue': '#3b82f6',
        'primary-pink': '#ec4899',
        'success-green': '#10b981',
        'danger-red': '#ef4444',
        'text-white': '#ffffff',
        'text-gray': '#9ca3af',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 