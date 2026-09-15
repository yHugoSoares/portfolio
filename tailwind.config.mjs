/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        hairline: 'var(--color-hairline)',
        border: 'var(--color-hairline)',
        ink: 'var(--color-text)',
        muted: 'var(--color-muted)',
        faint: 'var(--color-faint)',
        primary: 'var(--color-accent)',
        accent: 'var(--color-accent)',
        sand: 'var(--color-sand)',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        wide: 'var(--max-wide)',
        text: 'var(--max-text)',
      },
    },
  },
  plugins: [],
};
