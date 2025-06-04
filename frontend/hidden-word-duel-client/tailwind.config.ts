import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-dark': '#4338CA',
        secondary: '#10B981',
        'secondary-dark': '#059669',
        accent: '#F59E0B',
        darkBg: '#111827', // This is the important definition for bg-darkBg
        lightText: '#F3F4F6',
        'gray-custom': {
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
        }
      },
      keyframes: {
        reveal: {
          '0%': { transform: 'rotateY(90deg) scale(0.8)', opacity: '0' },
          '70%': { transform: 'rotateY(-10deg) scale(1.1)', opacity: '1' },
          '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
        },
        tick: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0'},
            '100%': { transform: 'translateY(0px)', opacity: '1'},
        }
      },
      animation: {
        reveal: 'reveal 0.5s ease-out forwards',
        tick: 'tick 5000ms linear forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideInUp: 'slideInUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;