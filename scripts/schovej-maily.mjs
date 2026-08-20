/**
 * schovej-maily.mjs - ochrana e-mailů před scrapery (post-build krok)
 *
 * Projde dist/**\/*.html a každou adresu @aethero.cz (v mailto: hrefu
 * i ve viditelném textu) přepíše na HTML entity znak po znaku.
 * Prohlížeč entity dekóduje nativně - mailto funguje, kopírování funguje,
 * bez JS, nulová změna UX. Scraper čtoucí surové HTML vidí jen &#100;&#97;…
 *
 * NESAHÁ na <script> bloky (JSON-LD by se entitami rozbil) - proto
 * e-maily do schemat nepatří (žádné tam dnes nejsou).
 *
 * Druhá, silnější vrstva je Cloudflare Scrape Shield → Email Address
 * Obfuscation (zapíná se v dashboardu per zóna, DK).
 *
 * Zapojeno v package.json: "build": "astro build && node scripts/schovej-maily.mjs"
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const zakoduj = (s) => [...s].map((ch) => `&#${ch.codePointAt(0)};`).join('');
const RE_MAIL = /[a-zA-Z0-9._%+-]+@aethero\.cz/g;

const soubory = globSync('dist/**/*.html');
let zmenenych = 0, adres = 0;

for (const f of soubory) {
  const puvodni = readFileSync(f, 'utf8');
  // schovat <script> bloky, ať se nedotkneme JSON-LD ani JS
  const bloky = [];
  let s = puvodni.replace(/<script[\s\S]*?<\/script>/g, (m) => {
    bloky.push(m);
    return `\x00${bloky.length - 1}\x00`;
  });
  s = s.replace(RE_MAIL, (m) => { adres += 1; return zakoduj(m); });
  s = s.replace(/\x00(\d+)\x00/g, (_, i) => bloky[Number(i)]);
  if (s !== puvodni) { writeFileSync(f, s); zmenenych += 1; }
}
console.log(`schovej-maily: ${adres} adres zakódováno v ${zmenenych} souborech`);
