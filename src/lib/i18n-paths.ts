// Protějšek stránky v druhém jazyce - JEDEN zdroj pravdy pro hreflang
// i pro přepínač jazyka v hlavičce.
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
// ÚDRŽBA: nový článek = přidat dvojici do BLOG_PAIRS. Když tam nebude,
// přepínač i hreflang se u něj radši nevykreslí (lepší nic než 404).

/** Dvojice článků CS ↔ EN. Slug se u některých liší, u některých ne. */
export const BLOG_PAIRS: Array<{ cs: string; en: string }> = [
  { cs: 'povinne-tlacitko-shopify', en: 'shopify-mandatory-button' },
  { cs: 'shopify-editions-zima-2026', en: 'shopify-editions-winter-2026' },
  { cs: 'preklad-platebni-metody-shopify', en: 'translating-payment-methods-shopify' },
  { cs: 'ai-seo-2026', en: 'ai-seo-2026' },
  { cs: 'shopify-vs-shoptet', en: 'shopify-vs-shoptet' },
];

const TWIN: Record<'cs' | 'en', Record<string, string>> = {
  // ze CS slugu na EN slug
  en: Object.fromEntries(BLOG_PAIRS.map(p => [p.cs, p.en])),
  // z EN slugu na CS slug
  cs: Object.fromEntries(BLOG_PAIRS.map(p => [p.en, p.cs])),
};

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
export function altPath(pathname: string, targetLang: 'cs' | 'en'): string | null {
  const m = pathname.match(/^\/(cs|en)(\/.*)?$/);
  if (!m) return null; // stránky mimo jazykové větve protějšek nemají

  const from = m[1] as 'cs' | 'en';
  const rest = m[2] || '/';
  if (from === targetLang) return pathname;

  const blog = rest.match(/^\/blog\/([^/]+)\/?$/);
  if (blog) {
    const twin = TWIN[targetLang][blog[1]];
    return twin ? `/${targetLang}/blog/${twin}/` : null;
  }

  // stránky s přeloženým slugem (co-umime ↔ what-we-do, kontakt ↔ contact, …)
  const restClean = rest.replace(/\/$/, '');
  const pageTwin = PAGE_TWIN[targetLang][restClean];
  if (pageTwin) return `/${targetLang}${pageTwin}/`;

  // fallback: stejný slug v obou jazycích (ae-translator, esyncer, gdpr, /)
  return `/${targetLang}${rest}`;
}
