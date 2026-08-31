// Sitemapa jen pro EN větev, absolutně na aethero.agency. Zrcadlo
// sitemap-cs.xml.ts - viz tam pro vysvětlení přístupu.
import type { APIRoute } from 'astro';
import { blogPairs } from '../lib/i18n-paths';

export const prerender = true;

const DOMAIN = 'https://aethero.agency';
const pageModules = import.meta.glob('/src/pages/en/**/*.astro');

// URL BEZ jazykového prefixu (DK 2026-08-21) - jazyk určuje doména.
function toPath(filePath: string): string {
  let p = filePath.replace(/^\/src\/pages/, '').replace(/\.astro$/, '');
  p = p.replace(/^\/en/, '');            // strip jazykový prefix
  p = p.replace(/\/index$/, '') || '/';  // /index → adresář; prázdné → root
  return p.endsWith('/') ? p : `${p}/`;
}

export const GET: APIRoute = async () => {
  const staticPaths = Object.keys(pageModules)
    .filter((p) => !p.includes('['))
    .map(toPath);
  const blogPaths = (await blogPairs()).map((p) => `/blog/${p.en}/`);
  const paths = [...new Set([...staticPaths, ...blogPaths])].sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${DOMAIN}${p}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
