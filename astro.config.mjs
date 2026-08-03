import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

export default defineConfig({
  output: 'static',
  site: 'https://aethero.agency',
  integrations: [
    sitemap({
      // /design-system je interní stránka — z produkčního buildu se maže
      // (viz skript "build" v package.json), takže nesmí být ani v sitemapě.
      filter: (page) => !page.includes('/design-system'),
      i18n: {
        defaultLocale: 'cs',
        locales: { cs: 'cs-CZ', en: 'en-US' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
