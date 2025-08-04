/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        // Nueva paleta vibrante
        'dark-bg': '#0f0f23',
        'dark-card': '#1a1a2e',
        'dark-input': '#16213e',
        'primary-blue': '#4f46e5',
        'primary-purple': '#7c3aed',
        'primary-pink': '#ec4899',
        'primary-orange': '#f97316',
        'success-green': '#10b981',
        'success-emerald': '#059669',
        'danger-red': '#ef4444',
        'danger-rose': '#e11d48',
        'warning-yellow': '#f59e0b',
        'warning-amber': '#d97706',
        'text-white': '#ffffff',
        'text-gray': '#9ca3af',
        'text-light': '#e5e7eb',
        // Nuevos colores para gradientes
        'gradient-blue': '#4f46e5',
        'gradient-indigo': '#6366f1',
        'gradient-purple': '#7c3aed',
        'gradient-violet': '#8b5cf6',
        'gradient-pink': '#ec4899',
        'gradient-rose': '#f43f5e',
        'gradient-orange': '#f97316',
        'gradient-amber': '#f59e0b',
        'gradient-emerald': '#10b981',
        'gradient-teal': '#14b8a6',
        'gradient-cyan': '#06b6d4',
        'glass-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      // Gradientes personalizados más vibrantes
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 25%, #ec4899 50%, #f97316 75%, #10b981 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f43f5e 0%, #f97316 50%, #f59e0b 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #10b981 100%)',
      },
      // Sombras personalizadas más vibrantes
      boxShadow: {
        'glow-blue': '0 0 20px rgba(79, 70, 229, 0.4)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.4)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.4)',
        'glow-yellow': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.4)',
        'button-hover': '0 4px 15px rgba(79, 70, 229, 0.4)',
        'rainbow-glow': '0 0 30px rgba(79, 70, 229, 0.3), 0 0 60px rgba(124, 58, 237, 0.2), 0 0 90px rgba(236, 72, 153, 0.1)',
      },
      // Animaciones personalizadas mejoradas
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'rainbow': 'rainbow 3s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
        'zoom-out': 'zoomOut 0.2s ease-out',
        'rotate-in': 'rotateIn 0.3s ease-out',
        'flip-in': 'flipIn 0.4s ease-out',
        'stagger': 'stagger 0.1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(79, 70, 229, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceGentle: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-180deg)', opacity: '0' },
          '100%': { transform: 'rotate(0deg)', opacity: '1' },
        },
        flipIn: {
          '0%': { transform: 'perspective(400px) rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'perspective(400px) rotateY(0deg)', opacity: '1' },
        },
        stagger: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 