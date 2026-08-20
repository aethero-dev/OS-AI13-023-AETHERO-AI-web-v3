#!/usr/bin/env node
/**
 * build-ds.mjs — z hotového `dist/` vyrobí samostatný balík design systému.
 *
 * Proč vůbec: WEB-STANDARD kap. 2 říká, že DS je **samostatný projekt**, nikdy
 * routa na klientském webu. Tenhle web to porušoval — `/design-system` se stavěl
 * do produkčního buildu a jen se filtroval ze sitemapy, takže ho nebylo vidět,
 * ale veřejně dostupný byl. Dnes ho kryje staging `Disallow: /`; po spuštění by
 * nekryl nic. (Zjištěno 2026-08-20 při přechodu na Workers.)
 *
 * Co dělá: vezme `dist/design-system/index.html`, položí ho do kořene nového
 * balíku a přibalí JEN ty soubory, na které stránka odkazuje. Ostatní stránky
 * webu se nekopírují — jinak by DS deploy byl druhá veřejná kopie celého webu.
 *
 * Spuštění: npm run build && node scripts/build-ds.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const DIST = "dist";
const OUT = "dist-ds";
const ZDROJ = join(DIST, "design-system", "index.html");

if (!existsSync(ZDROJ)) {
  console.error(`✗ ${ZDROJ} neexistuje — nejdřív "npm run build".`);
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let html = readFileSync(ZDROJ, "utf8");

// Odkazy na soubory, které stránka potřebuje. Bere se href i src; datové URI
// a externí odkazy se přeskakují.
const odkazy = new Set();
for (const m of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
  const cesta = decodeURIComponent(m[1].split("?")[0].split("#")[0]);
  if (cesta.endsWith("/")) continue;          // odkazy na stránky, ne na soubory
  odkazy.add(cesta);
}
// Fonty a obrázky bývají i v CSS — projdeme i připojené styly.
for (const css of [...odkazy].filter((c) => c.endsWith(".css"))) {
  const p = join(DIST, css);
  if (!existsSync(p)) continue;
  for (const m of readFileSync(p, "utf8").matchAll(/url\(["']?(\/[^"')]+)/g)) {
    odkazy.add(decodeURIComponent(m[1]));
  }
}

let zkopírováno = 0;
const chybí = [];
for (const cesta of odkazy) {
  const zdroj = join(DIST, cesta);
  if (!existsSync(zdroj)) { chybí.push(cesta); continue; }
  const cíl = join(OUT, cesta);
  mkdirSync(dirname(cíl), { recursive: true });
  copyFileSync(zdroj, cíl);
  zkopírováno++;
}

// DS je interní stránka: nikdy do indexu, nikdy do AI korpusu.
// Ochrana heslem je vrstva navíc (Worker), tohle je pojistka, kdyby padla.
if (!/name="robots"/i.test(html)) {
  html = html.replace(/<head>/i, '<head><meta name="robots" content="noindex, nofollow">');
}
writeFileSync(join(OUT, "index.html"), html);
writeFileSync(join(OUT, "robots.txt"), "User-agent: *\nDisallow: /\n");

console.log(`✓ ${OUT}/ — index.html + ${zkopírováno} souborů`);
if (chybí.length) {
  console.log(`⚠ ${chybí.length} odkazů bez souboru (nejspíš neexistují ani na webu):`);
  for (const c of chybí) console.log(`    ${c}`);
}
