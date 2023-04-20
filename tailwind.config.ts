import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FBECE6',
          medium: '#E48E68',
          dark: '#A7461C',
          pure: '#D24204',
          pureDark: '#CA3F04',
        },
        highlight: {
          pure: '#D24204',
          light: '#FBECE6',
        },
        background: '#F3F5F8',
        helper: {
          pure: '#9B0F0F',
          light: '#FFE5E5',
        },
        success: {
          pure: '#166C01',
          light: '#E0F7Da',
        },
        neutral: {
          low: {
            pure: '#3F3F3F',
            light: '#9F9F9F',
            medium: '#656565',
            dark: '#4A4A4A',
          },
          high: {
            pure: '#FFFFFF',
            light: '#F5F5F5',
            medium: '#E0E0E0',
            dark: '#CCCCCC',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-raleway)', ...fontFamily.sans],
      },
      fontSize: {
        '3.5xl': ['2rem', '2.5rem'],
      },
      boxShadow: {
        default: '0px 8px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
