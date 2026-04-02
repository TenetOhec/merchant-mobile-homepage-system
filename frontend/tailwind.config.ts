import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PingFang SC"', '"SF Pro Display"', '"Helvetica Neue"', 'sans-serif']
      },
      colors: {
        appRed: '#e83f2e',
        appBg: '#f5f5f7',
        softLine: '#ececee',
        textMain: '#25262b',
        textSub: '#7b7e87'
      },
      boxShadow: {
        card: '0 16px 36px rgba(29, 35, 58, 0.08)',
        shell: '0 22px 60px rgba(21, 21, 21, 0.18)'
      },
      borderRadius: {
        shell: '38px'
      }
    }
  },
  plugins: []
} satisfies Config;
