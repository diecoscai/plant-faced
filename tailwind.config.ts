import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --primary-color: #3D8D7A  (used for nav links, header accent, footer bg, product titles)
        primary: '#B85C38',
        // --secondary-color: warm off-white cream (decorative accents, highlights on dark bg)
        secondary: '#F2E4D4',
        // --light-gray: warm off-white page background
        'light-gray': '#FBF5EE',
      },
      fontFamily: {
        // Body font from styles.css — 'Segoe UI', system-ui, sans-serif
        sans: ["'Segoe UI'", 'system-ui', 'sans-serif'],
        // Hero section uses Urbanist (from hero.css)
        urbanist: ['Urbanist', 'serif'],
      },
      height: {
        // --header-height: 100px
        header: '100px',
      },
      spacing: {
        header: '100px',
      },
      transitionDuration: {
        // --transition-speed: 0.3s
        DEFAULT: '300ms',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
