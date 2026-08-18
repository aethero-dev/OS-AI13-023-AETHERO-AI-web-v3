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

  return `/${targetLang}${rest}`;
}
