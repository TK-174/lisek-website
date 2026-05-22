import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F68B1F',
        secondary: '#F2EAD3',
        accent: '#FDB813',
        background: '#F2EAD3',
        surface: '#FFFFFF',
        ink: {
          primary: '#111827',
          secondary: '#4B5563',
        },
        line: '#E5E7EB',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-lg': ['64px', { lineHeight: '1.04', letterSpacing: '0', fontWeight: '500' }],
        'display-md': ['44px', { lineHeight: '1.08', letterSpacing: '0', fontWeight: '500' }],
        'display-sm': ['32px', { lineHeight: '1.15', letterSpacing: '0', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.55', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '600' }],
      },
      spacing: {
        section: '80px',
        card: '24px',
        gap: '16px',
      },
      borderRadius: {
        card: '16px',
        control: '8px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17, 24, 39, 0.04), 0 8px 24px rgba(17, 24, 39, 0.06)',
        lift: '0 4px 12px rgba(17, 24, 39, 0.08), 0 16px 40px rgba(17, 24, 39, 0.10)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
