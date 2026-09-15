import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://yhugosoares.github.io',
  base: '/portfolio',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
