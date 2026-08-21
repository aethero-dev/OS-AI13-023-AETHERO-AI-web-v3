// Karty článků na homepage - JEDEN zdroj pravdy s /blog i s články samotnými.
//
// PROČ TENHLE SOUBOR VZNIKL (2026-08-21):
// Homepage měla články zapsané natvrdo v poli `blogPosts` v obou index.astro.
// Bylo to odpojené od content collection, takže se to rozcházelo s realitou:
//   • `ago` byl obyčejný string, takže „před měsícem" viselo u článku
//     starého tři a půl měsíce a nikdy se neaktualizovalo,
//   • čas čtení se lišil od `readTime` v článku (6 vs 5 min, PR #9),
//   • karty ukazovaly /blog-0X.webp místo skutečných obrázků článků,
//   • nový článek se musel ručně dopsat do dvou dalších souborů.
//
// Teď se čte z kolekce. Když se článek změní, homepage se změní s ním.

import { getCollection } from 'astro:content';

const DEN = 86_400_000;

/**
 * Relativní stáří článku. Počítá se **při buildu** z data vydání, takže je to
 * správně k okamžiku nasazení - ne natvrdo napsaný text.
 *
 * Pozn.: mezi dvěma deployi text stárne. Deploy teď běží na každý merge do main
 * (Workers Builds), takže se to drží. Kdyby to mělo být absolutně přesné,
 * je alternativa ukazovat rovnou datum jako na /blog - to je ale designové
 * rozhodnutí, ne technické.
 */
export function agoLabel(date: Date, lang: 'cs' | 'en', now: Date = new Date()): string {
  const dny = Math.max(0, Math.floor((now.getTime() - date.getTime()) / DEN));
  const mesice = Math.floor(dny / 30.44);
  const roky = Math.floor(dny / 365.25);

  if (roky >= 1) {
    if (lang === 'cs') return roky === 1 ? 'před rokem' : `před ${roky} lety`;
    return roky === 1 ? '1 year ago' : `${roky} years ago`;
  }
  if (mesice >= 1) {
    if (lang === 'cs') return mesice === 1 ? 'před měsícem' : `před ${mesice} měsíci`;
    return mesice === 1 ? '1 month ago' : `${mesice} months ago`;
  }
  if (dny >= 1) {
    if (lang === 'cs') return dny === 1 ? 'včera' : `před ${dny} dny`;
    return dny === 1 ? 'yesterday' : `${dny} days ago`;
  }
  return lang === 'cs' ? 'dnes' : 'today';
}

/** Pět nejnovějších článků daného jazyka pro karusel na homepage. */
export async function homeBlogPosts(lang: 'cs' | 'en') {
  const prefix = `${lang}/`;

  return (await getCollection('blog', (e) => e.id.startsWith(prefix) && !e.data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 5)
    .map((e) => ({
      title: e.data.title,
      perex: e.data.perex,
      // Šablona dopisuje „ min.", ve frontmatteru je „7 min" - jinak by vzniklo „7 min min."
      time: e.data.readTime.replace(' min', ''),
      ago: agoLabel(e.data.date, lang),
      href: `/${lang}/blog/${e.id.slice(prefix.length)}`,
      img: e.data.image || '/blog-01.webp',
    }));
}
