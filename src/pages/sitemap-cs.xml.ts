// Sitemapa jen pro CS větev, absolutně na aethero.cz.
// Nahrazuje @astrojs/sitemap (LAUNCH.md §2 bod 4) - ten uměl jen jeden
// sdílený sitemap-index přes obě jazykové větve na jedné doméně, což
// nesedí na "jedna doména = jeden jazyk" (rozhodnutí DK 2026-08-06).
//
// Zdroj stránek: (1) glob přes src/pages/cs/**/*.astro - statické stránky,
// vynechá dynamické šablony (obsahují "["); (2) BLOG_PAIRS pro články,
// protože blog má vlastní [slug].astro šablonu bez staticky generovaných
// souborů v pages/ (glob by je nenašel).
import type { APIRoute } from 'astro';
import { BLOG_PAIRS } from '../lib/i18n-paths';

export const prerender = true;

const DOMAIN = 'https://aethero.cz';
const pageModules = import.meta.glob('/src/pages/cs/**/*.astro');

function toPath(filePath: string): string {
  let p = filePath.replace(/^\/src\/pages/, '').replace(/\.astro$/, '');
  p = p.replace(/\/index$/, '') || '/cs';
  return p.endsWith('/') ? p : `${p}/`;
}

export const GET: APIRoute = () => {
  const staticPaths = Object.keys(pageModules)
    .filter((p) => !p.includes('['))
    .map(toPath);
  const blogPaths = BLOG_PAIRS.map((p) => `/cs/blog/${p.cs}/`);
  const paths = [...new Set([...staticPaths, ...blogPaths])].sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${DOMAIN}${p}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
