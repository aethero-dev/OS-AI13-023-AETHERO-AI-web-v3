import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

// @astrojs/sitemap odstraněn (2026-08-21, LAUNCH.md §2 bod 4) - uměl jen
// jeden sitemap-index přes obě jazykové větve na JEDNÉ doméně. Nahrazeno
// src/pages/sitemap-cs.xml.ts + sitemap-en.xml.ts, každá vlastní doména
// jen svůj jazyk (rozhodnutí DK 2026-08-06: .cz = CS, .agency = EN).
export default defineConfig({
  output: 'static',
  site: 'https://aethero.agency',
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  // Dev toolbar (plovoucí ikonka vlevo dole v `astro dev`) nepoužíváme -
  // projektová volba, platí pro každého, kdo repo spustí (ne jen lokální
  // preference přes `astro preferences disable devToolbar`).
  devToolbar: { enabled: false },
});
