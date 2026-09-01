// Protějšek stránky v druhém jazyce - JEDEN zdroj pravdy pro hreflang,
// pro přepínač jazyka v hlavičce i pro blogovou část sitemap.
//
// PROČ TENHLE SOUBOR VZNIKL (2026-08-02, audit prokliků AE-38):
// Obojí si dřív počítalo protějšek prostou záměnou prefixu /cs/ ↔ /en/.
// U většiny stránek to sedí, protože EN používá stejné slugy jako CS.
// U BLOGU ale ne - články mají v každém jazyce vlastní slug, takže:
//   • hreflang mířil na 18 neexistujících URL,
//   • přepínač jazyka na článku vedl rovnou do 404.
// Stránky bez jazykového prefixu (/404, /design-system, /privacy-policy)
// navíc dostávaly hreflang na /cs/404 apod., které nikdy neexistovaly.
//
// PROČ SE DVOJICE ČLÁNKŮ UŽ NEPÍŠOU RUČNĚ (2026-08-31):
// Do teď tu byl seznam `BLOG_PAIRS`, do kterého musel někdo ke každému novému
// článku dopsat řádek. Kdo na něj zapomněl, tomu článek vyšel - ale bez
// hreflang, bez přepínače jazyka a hlavně MIMO SITEMAPU (staví se z týchž
// dvojic). Článek je venku a vyhledávač se o něm nedozví; nic přitom nespadne,
// takže se na to nepřijde. Publikovat článek musí jít bez sahání do kódu.
//
// Dvojice se proto čtou z článků samotných:
//   • stejný slug v obou jazycích → spáruje se samo, nikam se nic nepíše
//   • jiný slug → `twin:` ve frontmatteru; stačí v jednom ze dvou souborů
//     a je jedno ve kterém (viz docs/NAVOD-CLANKY.md)
// Protějšek se navíc uzná, jen když druhý soubor opravdu existuje a není
// `draft: true`. Do ručního seznamu šlo napsat cokoliv a hreflang pak mířil
// do prázdna - tohle už nejde.
//
// STRÁNEK mimo blog se to NETÝKÁ - ty nemají frontmatter, takže si drží
// ruční `PAGE_PAIRS` níž.
import { getCollection } from 'astro:content';

export interface BlogPair { cs: string; en: string }

/** "cs/muj-clanek" → "muj-clanek" (prefix je vždy dvoupísmenný jazyk + /) */
const slugOf = (id: string) => id.slice(3);

/**
 * Dvojice článků CS ↔ EN, odvozené z frontmatteru. Drafty se ignorují -
 * negenerují se do stránek, takže odkazovat na ně by znamenalo 404.
 */
export async function blogPairs(): Promise<BlogPair[]> {
  const entries = await getCollection('blog', (e) => !e.data.draft);

  const cs = new Set(entries.filter((e) => e.id.startsWith('cs/')).map((e) => slugOf(e.id)));
  const en = new Set(entries.filter((e) => e.id.startsWith('en/')).map((e) => slugOf(e.id)));

  const pairs: BlogPair[] = [];
  const hotovoCs = new Set<string>();
  const hotovoEn = new Set<string>();

  const spoj = (c: string, n: string) => {
    // Protějšek musí existovat; jeden článek smí být ve dvojici jen jednou,
    // ať se z překlepu ve `twin:` nestane přepsaná cizí dvojice.
    if (!cs.has(c) || !en.has(n)) return;
    if (hotovoCs.has(c) || hotovoEn.has(n)) return;
    pairs.push({ cs: c, en: n });
    hotovoCs.add(c);
    hotovoEn.add(n);
  };

  // 1) Explicitní `twin:` má přednost - je to vědomé rozhodnutí autora.
  for (const e of entries) {
    const twin = e.data.twin;
    if (!twin) continue;
    const me = slugOf(e.id);
    if (e.id.startsWith('cs/')) spoj(me, twin);
    else spoj(twin, me);
  }

  // 2) Zbytek: shodný slug v obou jazycích (ai-seo-2026 a spol.).
  for (const s of cs) spoj(s, s);

  return pairs.sort((a, b) => a.cs.localeCompare(b.cs));
}

/**
 * Dvojice STRÁNEK (mimo blog) CS ↔ EN, u kterých se slug LIŠÍ.
 * PROČ (2026-08-21): EN větev měla 100 % české slugy (`/en/co-umime`,
 * `/en/kontakt`…) - fuckup pro anglické SEO i důvěryhodnost. Po překladu
 * slugů by prostá záměna prefixu (fallback níž) mířila na neexistující URL,
 * stejná past jako u blogu (AE-38). Cesty bez trailing slash, bez jazykového
 * prefixu. Stránky se shodným slugem (ae-translator, esyncer, gdpr) tu NEjsou -
 * pokryje je fallback. ÚDRŽBA: přejmenuješ slug → přidej/uprav dvojici tady.
 */
export const PAGE_PAIRS: Array<{ cs: string; en: string }> = [
  { cs: '/co-umime', en: '/what-we-do' },
  { cs: '/co-umime/potrebuji-brand', en: '/what-we-do/i-need-a-brand' },
  { cs: '/co-umime/novy-shopify-e-shop', en: '/what-we-do/new-shopify-store' },
  { cs: '/co-umime/prechod-na-shopify', en: '/what-we-do/switch-to-shopify' },
  { cs: '/co-umime/expanze-do-zahranici', en: '/what-we-do/international-expansion' },
  { cs: '/co-umime/rozvoj-a-podpora', en: '/what-we-do/growth-and-support' },
  { cs: '/co-umime/analyza-a-strategie', en: '/what-we-do/analysis-and-strategy' },
  { cs: '/co-umime/custom-vyvoj-a-aplikace', en: '/what-we-do/custom-development-and-apps' },
  { cs: '/kontakt', en: '/contact' },
  { cs: '/o-nas', en: '/about-us' },
  { cs: '/migrace-shoptet-na-shopify', en: '/shoptet-to-shopify-migration' },
  { cs: '/pripadova-studie-email-marketing-fleppi-cz', en: '/case-study-email-marketing-fleppi' },
  { cs: '/groomo-cz-na-shopify', en: '/groomo-cz-to-shopify' },
];

const PAGE_TWIN: Record<'cs' | 'en', Record<string, string>> = {
  en: Object.fromEntries(PAGE_PAIRS.map(p => [p.cs, p.en])),
  cs: Object.fromEntries(PAGE_PAIRS.map(p => [p.en, p.cs])),
};

/**
 * Cesta téže stránky v druhém jazyce.
 * Vrací null, když protějšek neexistuje - volající pak odkaz nevykreslí.
 */
export async function altPath(pathname: string, targetLang: 'cs' | 'en'): Promise<string | null> {
  const m = pathname.match(/^\/(cs|en)(\/.*)?$/);
  if (!m) return null; // stránky mimo jazykové větve protějšek nemají

  const from = m[1] as 'cs' | 'en';
  const rest = m[2] || '/';
  if (from === targetLang) return pathname;

  const blog = rest.match(/^\/blog\/([^/]+)\/?$/);
  if (blog) {
    const pairs = await blogPairs();
    const dvojice = targetLang === 'en'
      ? pairs.find((p) => p.cs === blog[1])?.en
      : pairs.find((p) => p.en === blog[1])?.cs;
    return dvojice ? `/${targetLang}/blog/${dvojice}/` : null;
  }

  // stránky s přeloženým slugem (co-umime ↔ what-we-do, kontakt ↔ contact, …)
  const restClean = rest.replace(/\/$/, '');
  const pageTwin = PAGE_TWIN[targetLang][restClean];
  if (pageTwin) return `/${targetLang}${pageTwin}/`;

  // fallback: stejný slug v obou jazycích (ae-translator, esyncer, gdpr, /)
  return `/${targetLang}${rest}`;
}
