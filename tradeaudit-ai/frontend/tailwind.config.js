import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        base: {
          DEFAULT: '#0A0F1C',
          light: '#111827',
          lighter: '#1F2937',
          border: '#374151',
          hover: '#1E293B',
        },
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          muted: 'rgba(59, 130, 246, 0.1)',
        },
        success: {
          DEFAULT: '#22C55E',
          muted: 'rgba(34, 197, 94, 0.1)',
        },
        warning: {
          DEFAULT: '#EAB308',
          muted: 'rgba(234, 179, 8, 0.1)',
        },
        danger: {
          DEFAULT: '#EF4444',
          muted: 'rgba(239, 68, 68, 0.1)',
        },
        text: {
          primary: '#F9FAFB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        chart: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
          green: '#22C55E',
          yellow: '#EAB308',
          orange: '#F97316',
          red: '#EF4444',
          purple: '#A855F7',
          pink: '#EC4899',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['2rem', { lineHeight: '2.5rem', fontWeight: '600', letterSpacing: '-0.025em' }],
        'heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '600', letterSpacing: '-0.025em' }],
        'subheading': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.25rem' }],
        'caption': ['0.75rem', { lineHeight: '1rem' }],
        'micro': ['0.6875rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        'card': '24px',
        'section': '32px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
        'badge': '6px',
        'pill': '9999px',
      },
      boxShadow: {
        'none': 'none',
        'card': 'none',
        'elevated': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'slide-out-right': 'slideOutRight 0.2s ease-in',
        'fade-in': 'fadeIn 0.15s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
};
