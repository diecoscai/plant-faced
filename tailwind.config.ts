import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --primary-color: #3D8D7A  (used for nav links, header accent, footer bg, product titles)
        primary: '#3D8D7A',
        // --secondary-color: #B3D8A8  (used for buttons, active states, price text, cart feedback)
        secondary: '#B3D8A8',
        // --light-gray: #FBFFE4  (background tint)
        'light-gray': '#FBFFE4',
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
