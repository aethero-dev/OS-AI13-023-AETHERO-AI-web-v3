/**
 * obalka.mjs - generátor obálky článku (jeden obrázek pro všechna zobrazení)
 *
 * Master 1200×630 (OG formát). Na webu se zobrazuje ve třech oknech:
 *   · OG/Twitter: celý rám 1200×630
 *   · karty blogu (rozcestník, další články): 16:9 - ořez boků (~40 px)
 *   · hero článku: šířka × 600 px → na 1920 monitoru ořez ~3,2:1
 * BEZPEČNÁ ZÓNA = průnik všech oken: střed ~1120×375 (x 40-1160, y 127-503).
 * Ikona tématu a systémový znak (Shopify taška) mají pevné sloty uvnitř
 * zóny na společné ose - NIKDY se nepřekryjí a žádný ořez je neusekne.
 * Pozadí (navy + gradientní bloby) je full-bleed - ořez mu nevadí.
 *
 * Použití:
 *   node scripts/obalka.mjs --ikona cesta/ikona.svg --slug muj-clanek
 *   pbpaste | node scripts/obalka.mjs --slug muj-clanek        (SVG ze schránky)
 * Volby: --akcent "#16BECF" (barva ikony) · --out public/blog/...
 * Výstup: public/blog/obalka-<slug>-v1.png (pokud existuje, zvedne verzi -
 * CF Pages cachuje soubory rok, stejný název se NIKDY nepřepisuje).
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const slug = arg('slug');
if (!slug) { console.error('Chybí --slug'); process.exit(1); }
const akcent = arg('akcent', '#16BECF');
const cestaIkony = arg('ikona');

// ikona: soubor, nebo stdin (pbpaste | ...)
let ikonaSvg = '';
if (cestaIkony) ikonaSvg = readFileSync(cestaIkony, 'utf8');
else if (!process.stdin.isTTY) ikonaSvg = readFileSync(0, 'utf8');
if (!ikonaSvg.includes('<svg')) { console.error('Nedostal jsem SVG (soubor přes --ikona, nebo pbpaste | ...)'); process.exit(1); }

// vnitřek ikony + viewBox (ať můžu škálovat do slotu)
const vb = ikonaSvg.match(/viewBox="([\d.\s-]+)"/)?.[1]?.split(/\s+/).map(Number) ?? [0, 0, 24, 24];
const vnitrek = ikonaSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');

// Slot A: ikona tématu - střed-levá část bezpečné zóny (osa y = 315)
const IKONA_VEL = 230;
const ikX = 330 - IKONA_VEL / 2, ikY = 315 - IKONA_VEL / 2;
const sc = IKONA_VEL / Math.max(vb[2], vb[3]);

// Slot B: systémový znak Shopify taška - pravá část zóny, stejná osa
const bag = `
  <g transform="translate(790, 245)" stroke="${akcent}" stroke-width="7"
     fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
    <path d="M25 38h90l10 96a8 8 0 0 1-8 9H23a8 8 0 0 1-8-9l10-96Z"/>
    <path d="M48 52V33a22 22 0 0 1 44 0v19"/>
  </g>`;

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="20%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#552A9F" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#552A9F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="95%" cy="100%" r="70%">
      <stop offset="0%" stop-color="${akcent}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${akcent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#000326"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <!-- jemná linka spojující sloty (uvnitř bezpečné zóny) -->
  <line x1="500" y1="315" x2="740" y2="315" stroke="rgba(255,255,255,0.14)" stroke-width="2" stroke-dasharray="2 10"/>
  <!-- Slot A: ikona tématu -->
  <g transform="translate(${ikX}, ${ikY}) scale(${sc})" fill="none" stroke="#fff"
     stroke-width="${(vb[2] <= 32 ? 1.6 : 6)}" stroke-linecap="round" stroke-linejoin="round"
     color="#fff">${vnitrek}</g>
  <!-- Slot B: Shopify taška (systémový znak) -->
  ${bag}
</svg>`;

// verze souboru: nikdy nepřepisovat existující (CF immutable cache)
let v = 1;
let out = arg('out') || `public/blog/obalka-${slug}-v${v}.png`;
while (!arg('out') && existsSync(out)) { v += 1; out = `public/blog/obalka-${slug}-v${v}.png`; }

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Obálka:', out, '(1200×630, bezpečná zóna dodržena)');
