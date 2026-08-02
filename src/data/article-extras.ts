// Doplňky k článkům, které zatím nejdou uložit do Storybloku.
//
// PROČ TADY A NE V CMS: management token projektu je jen pro čtení
// (`Insufficient scope: stories:write`, ověřeno 2026-08-02). Až vznikne token
// se zápisem, tyhle texty se přesunou do polí článku ve Storybloku a soubor
// zanikne. Do té doby je tohle jediné místo, kde se edituje.
//
// Klíč = slug článku (bez jazykového prefixu).

export interface ArticleCta {
  label: string;
  href: string;
  note?: string;
}

export interface FaqItem {
  q: string;
  a: string[];
}

export interface ArticleExtras {
  cta?: ArticleCta;
  faqTitle?: string;
  faq?: FaqItem[];
}

export const articleExtras: Record<string, ArticleExtras> = {
  'shopify-vs-shoptet': {
    cta: {
      label: 'Chci si přechod na Shopify vyzkoušet',
      href: '/cs/migrace-shoptet-na-shopify/',
      note: 'Převeďte si produkty ze Shoptetu do Shopify zdarma a hned — přímo v prohlížeči.',
    },
    faqTitle: 'Časté otázky k výběru mezi Shopify a Shoptetem',
    faq: [
      {
        q: 'Jaký je rozdíl mezi Shoptetem a Shopify?',
        a: [
          'Shoptet je česká platforma stavěná pro tuzemský trh. Má v základu české platby, dopravce i propojení na místní srovnávače.',
          'Shopify je globální systém s více než 10 000 aplikacemi a podporou prodeje do celého světa. Lokalizaci pro ČR řešíte doplňky, zato neexistuje strop, kam může e-shop vyrůst.',
        ],
      },
      {
        q: 'Která platforma je lepší pro český e-shop?',
        a: [
          'Záleží, kam míříte. Pokud prodáváte jen v ČR a SR a chcete co nejrychlejší start, Shoptet vám bude stačit.',
          'Pokud plánujete expanzi do zahraničí, velký katalog nebo napojení na vlastní systémy, vyplatí se Shopify. Modelové příklady najdete výše v článku.',
        ],
      },
      {
        q: 'Kolik stojí e-shop na Shopify v porovnání se Shoptetem?',
        a: [
          'Základní tarif Shopify začíná zhruba na 600 Kč měsíčně, Shoptet na 340 Kč a do 10 produktů je zdarma.',
          'Rozhodují ale celkové náklady. U obou platforem počítejte s cenou aplikací a úprav, které rozdíl v základním tarifu snadno otočí.',
        ],
      },
      {
        q: 'Dá se přejít ze Shoptetu na Shopify?',
        a: [
          'Ano, jde o běžnou migraci. Produkty, zákazníky i objednávky lze přenést, u SEO je klíčové správně nastavit přesměrování starých adres.',
          'Pro snadnou migraci produktů jsme pro vás připravili jednoduchý nástroj zdarma na stránce [Migrace ze Shoptetu na Shopify](/cs/migrace-shoptet-na-shopify/).',
        ],
      },
      {
        q: 'Zvládne Shopify češtinu a české platby?',
        a: [
          'Zvládne, jen to není v základu. Čeština se řeší překladem šablony, platby přes brány jako Comgate nebo GoPay a dopravci přes aplikace.',
          'Nastavení je jednorázová práce. Pokud se do ní nechcete pouštět sami, [ozvěte se nám](/cs/kontakt/).',
        ],
      },
    ],
  },
};
