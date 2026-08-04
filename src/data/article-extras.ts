// Doplňky k článkům: velké CTA pod perexem + blok Časté otázky (FAQ).
//
// PROČ TADY A NE V CMS: Storyblok byl 2026-08-02 odstraněn (AE-49, přesun
// AE-39 tím padl) — tenhle soubor je trvalý domov FAQ a CTA. Edituje ho
// DK/CC; Bára posílá otázky a odpovědi textem (viz docs/NAVOD-CLANKY.md).
//
// FAQ NENÍ OZDOBA: generuje FAQPage schema, což je nejsilnější formát pro
// citace v odpovědích AI vyhledávačů. Odpovědi proto musí být věcné a krátké
// a MUSÍ vycházet z textu článku — ne z ničeho jiného.
//
// Klíč = slug článku v daném jazyce (CS a EN se u části článků liší).

export interface ArticleCta {
  /** Nadpis CTA bloku (h2-mini dle B-07 v katalogu bloků AI13008) */
  title?: string;
  /** Doprovodná věta pod nadpisem */
  note?: string;
  /** Popisek tlačítka — sloveso akce (GOV.UK: „Kontaktovat", ne „Více") */
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  /** Odstavce odpovědi. Odkaz zapiš jako [text](/cesta/). */
  a: string[];
}

export interface ArticleExtras {
  cta?: ArticleCta;
  faqTitle?: string;
  faq?: FaqItem[];
}

const cs: Record<string, ArticleExtras> = {
  'shopify-vs-shoptet': {
    cta: {
      title: 'Převeďte si produkty ze Shoptetu do Shopify',
      note: 'Zdarma a hned — přímo ve vašem prohlížeči.',
      label: 'Chci si přechod na Shopify vyzkoušet',
      href: '/cs/migrace-shoptet-na-shopify/',
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

  'povinne-tlacitko-shopify': {
    faqTitle: 'Časté otázky k odstoupení od smlouvy',
    faq: [
      {
        q: 'Do kdy to musí být hotové?',
        a: [
          'Implementace má být hotová do 19. června 2026. Legislativa je ale stále v procesu — konkrétní podobu povinnosti si proto před spuštěním ověřte s právníkem.',
        ],
      },
      {
        q: 'Stačí na to Shopify nativně?',
        a: [
          'Shopify nabízí Self-serve returns, které zákazníkovi umožní požádat o vrácení přes jeho účet nebo stránku stavu objednávky.',
          'Samy o sobě ale automaticky nesplňují české zákonné požadavky — jsou solidní technický základ, ne kompletní řešení.',
        ],
      },
      {
        q: 'Jde opravdu jen o tlačítko?',
        a: [
          'Ne. Po kliknutí musí zákazník najít správnou objednávku, vybrat zboží, odeslat žádost a dostat potvrzení — a obchodník musí vědět, co dál.',
          'Tlačítko je jen vstupní bod. Bez procesu za ním jde o kosmetiku.',
        ],
      },
      {
        q: 'Máme sáhnout rovnou po externí aplikaci?',
        a: [
          'Není to ideální první krok. Doporučujeme nejdřív prozkoumat nativní možnosti Shopify a teprve pak řešit, co jim chybí.',
        ],
      },
    ],
  },

  'ai-seo-2026': {
    faqTitle: 'Časté otázky k AI SEO',
    faq: [
      {
        q: 'Co je GEO a jak se liší od klasického SEO?',
        a: [
          'Tradiční SEO řeší pozice, kliky a návštěvnost. GEO (Generative Engine Optimization) řeší, jestli AI váš obsah použije, jestli vás uvede jako zdroj a v jakém kontextu vaši značku zmíní.',
        ],
      },
      {
        q: 'Znamená zero-click konec SEO?',
        a: [
          'Ne. Znamená to, že se část hodnoty přesouvá z návštěvnosti do viditelnosti značky.',
          'AI vybírá jen omezený počet zdrojů — kdo mezi nimi není, prakticky neexistuje. SEO se tím mění z taktického kanálu na strategickou disciplínu.',
        ],
      },
      {
        q: 'Jaká strukturovaná data nasadit jako první?',
        a: [
          'V praxi se nejčastěji uplatňují Product (ceny, dostupnost, hodnocení), FAQPage (otázky a odpovědi), Article (autor, datum, kontext, zdroje) a HowTo (postupy).',
          'Většina stránek citovaných AI používá nějakou formu strukturovaných dat.',
        ],
      },
      {
        q: 'Jak má vypadat obsah, aby ho AI použila?',
        a: [
          'Odpovídat hned v úvodu (prvních 40–80 slov), používat přehledné nadpisy a seznamy, oddělovat fakta od marketingových tvrzení a dávat smysl i vytržený z kontextu stránky.',
        ],
      },
    ],
  },

  'shopify-editions-zima-2026': {
    faqTitle: 'Časté otázky k Shopify Editions Winter ’26',
    faq: [
      {
        q: 'Co je Shopify Editions?',
        a: [
          'Pravidelný přehled novinek platformy. Edice Winter ’26 nese název „The Renaissance Edition" a přináší přes 150 novinek ve 12 oblastech.',
        ],
      },
      {
        q: 'Co je Sidekick Pulse?',
        a: [
          'Největší novinka edice. Sidekick přechází od reagování na příkazy k anticipaci potřeb — analyzuje data vašeho obchodu, trendy a e-commerce insights a navrhuje konkrétní vylepšení včetně automatizací, slev a e-mailových textů.',
        ],
      },
      {
        q: 'Co znamená agentní obchod?',
        a: [
          'Produkty lze nově prodávat přímo přes AI konverzační platformy jako ChatGPT, Microsoft Copilot nebo Perplexity. Vznikají tím prodejní kanály mimo tradiční web.',
        ],
      },
      {
        q: 'Co je nového pro B2B?',
        a: [
          'Podpora až 2 048 variant produktu, zjednodušené zakládání firemních účtů, správa úvěrů na úrovni společnosti a vylepšené ovládání cen a kolekcí.',
        ],
      },
    ],
  },

  'preklad-platebni-metody-shopify': {
    faqTitle: 'Časté otázky k překladu platebních metod',
    faq: [
      {
        q: 'Proč Translate & Adapt platební metody nepřeloží?',
        a: [
          'Standardní aplikace platební metody nepokrývá, nebo překlad nefunguje. Proto se řeší ručně přes export a import jazykových podkladů.',
        ],
      },
      {
        q: 'Jak na to ve zkratce?',
        a: [
          'Settings → Languages → Export → „Selected Content" → Payment gateways. Ve staženém CSV vyplňte sloupec „Translated content" a soubor nahrajte zpět přes Import.',
        ],
      },
      {
        q: 'Import hlásí chybu, používám Mac. Co s tím?',
        a: [
          'CSV se na macOS může exportovat se středníky místo čárek, což import rozbije. Otevřete soubor v TextEdit, nahraďte všechny středníky čárkami a uložte.',
        ],
      },
      {
        q: 'Můžu překlad nechat na AI?',
        a: [
          'Ano. Místo ručního překladu se osvědčily modely jako ChatGPT nebo DeepL — ušetří čas a výsledky bývají přesné. Po importu vždy zkontrolujte zobrazení v checkoutu.',
        ],
      },
    ],
  },
};

const en: Record<string, ArticleExtras> = {
  'shopify-vs-shoptet': {
    cta: {
      title: 'Convert your Shoptet products to Shopify',
      note: 'Free and instant — right in your browser.',
      label: 'I want to try the move to Shopify',
      href: '/en/migrace-shoptet-na-shopify/',
    },
    faqTitle: 'Shopify vs Shoptet — frequently asked questions',
    faq: [
      {
        q: 'What is the difference between Shoptet and Shopify?',
        a: [
          'Shoptet is a Czech platform built for the local market. Czech payments, carriers and local price-comparison feeds are there by default.',
          'Shopify is a global system with more than 10,000 apps and support for selling worldwide. Czech localisation is handled through add-ons, but there is no ceiling on how far the store can grow.',
        ],
      },
      {
        q: 'Which platform is better for a Czech store?',
        a: [
          'It depends where you are heading. If you only sell in Czechia and Slovakia and want the fastest possible start, Shoptet will do.',
          'If you plan to expand abroad, run a large catalogue or connect your own systems, Shopify pays off.',
        ],
      },
      {
        q: 'How much does Shopify cost compared to Shoptet?',
        a: [
          'The entry Shopify plan starts at roughly 600 CZK per month, Shoptet at 340 CZK, and Shoptet is free up to 10 products.',
          'What decides is the total cost. On both platforms count on apps and customisation, which easily reverse the difference in the base plan.',
        ],
      },
      {
        q: 'Can I migrate from Shoptet to Shopify?',
        a: [
          'Yes, it is a standard migration. Products, customers and orders can all be moved; for SEO the key part is setting up redirects from the old URLs.',
          'For an easy product migration we have prepared a free tool on the [Shoptet to Shopify migration](/en/migrace-shoptet-na-shopify/) page.',
        ],
      },
      {
        q: 'Does Shopify handle Czech language and Czech payments?',
        a: [
          'It does, just not out of the box. Czech is handled by translating the theme, payments through gateways such as Comgate or GoPay, and carriers through apps.',
          'It is one-off setup work. If you would rather not do it yourself, [get in touch](/en/kontakt/).',
        ],
      },
    ],
  },

  'shopify-mandatory-button': {
    faqTitle: 'Withdrawal from contract — frequently asked questions',
    faq: [
      {
        q: 'What is the deadline?',
        a: [
          'The implementation should be in place by 19 June 2026. The legislation is still in progress, so verify the exact wording of the obligation with a lawyer before you go live.',
        ],
      },
      {
        q: 'Is native Shopify enough?',
        a: [
          'Shopify offers Self-serve returns, which let customers request a return through their account or the order status page.',
          'On their own they do not automatically satisfy Czech legal requirements — they are a solid technical base, not a complete solution.',
        ],
      },
      {
        q: 'Is it really just about a button?',
        a: [
          'No. After the click the customer has to find the right order, select the goods, submit the request and receive confirmation — and the merchant has to know what happens next.',
          'The button is only an entry point. Without a process behind it, it is cosmetics.',
        ],
      },
      {
        q: 'Should we reach for an external app straight away?',
        a: [
          'Not as the first step. Explore the native Shopify options first and only then decide what is missing.',
        ],
      },
    ],
  },

  'ai-seo-2026': {
    faqTitle: 'AI SEO — frequently asked questions',
    faq: [
      {
        q: 'What is GEO and how does it differ from classic SEO?',
        a: [
          'Traditional SEO deals with rankings, clicks and traffic. GEO (Generative Engine Optimization) deals with whether AI uses your content, whether it cites you as a source and in what context it mentions your brand.',
        ],
      },
      {
        q: 'Does zero-click mean the end of SEO?',
        a: [
          'No. It means part of the value shifts from traffic to brand visibility.',
          'AI picks only a limited number of sources — whoever is not among them effectively does not exist. SEO turns from a tactical channel into a strategic discipline.',
        ],
      },
      {
        q: 'Which structured data should I add first?',
        a: [
          'In practice the most useful are Product (price, availability, ratings), FAQPage (questions and answers), Article (author, date, context, sources) and HowTo (procedures).',
          'Most pages cited by AI use some form of structured data.',
        ],
      },
      {
        q: 'What should content look like so AI uses it?',
        a: [
          'Answer right at the start (the first 40–80 words), use clear headings and lists, separate facts from marketing claims, and make sure it still makes sense taken out of the page context.',
        ],
      },
    ],
  },

  'shopify-editions-winter-2026': {
    faqTitle: 'Shopify Editions Winter ’26 — frequently asked questions',
    faq: [
      {
        q: 'What is Shopify Editions?',
        a: [
          'A regular round-up of platform news. The Winter ’26 edition is called “The Renaissance Edition” and brings over 150 updates across 12 areas.',
        ],
      },
      {
        q: 'What is Sidekick Pulse?',
        a: [
          'The biggest news of the edition. Sidekick moves from reacting to commands towards anticipating needs — it analyses your store data, trends and e-commerce insights and proposes concrete improvements including automations, discounts and email copy.',
        ],
      },
      {
        q: 'What does agentic commerce mean?',
        a: [
          'Products can now be sold directly through AI conversational platforms such as ChatGPT, Microsoft Copilot or Perplexity, creating sales channels outside the traditional web.',
        ],
      },
      {
        q: 'What is new for B2B?',
        a: [
          'Support for up to 2,048 product variants, simplified company account creation, company-level credit management and improved control over prices and collections.',
        ],
      },
    ],
  },

  'translating-payment-methods-shopify': {
    faqTitle: 'Translating payment methods — frequently asked questions',
    faq: [
      {
        q: 'Why does Translate & Adapt not translate payment methods?',
        a: [
          'The standard app does not cover payment methods, or the translation does not take effect. That is why it is done manually through exporting and importing the language file.',
        ],
      },
      {
        q: 'What is the short version of the procedure?',
        a: [
          'Settings → Languages → Export → “Selected Content” → Payment gateways. Fill in the “Translated content” column in the downloaded CSV and upload the file back through Import.',
        ],
      },
      {
        q: 'The import fails and I am on a Mac. What now?',
        a: [
          'On macOS the CSV may be exported with semicolons instead of commas, which breaks the import. Open the file in TextEdit, replace all semicolons with commas and save.',
        ],
      },
      {
        q: 'Can I let AI do the translation?',
        a: [
          'Yes. Instead of translating by hand, models such as ChatGPT or DeepL work well — they save time and the results are usually accurate. Always check the checkout display after importing.',
        ],
      },
    ],
  },
};

export const articleExtras: Record<string, Record<string, ArticleExtras>> = { cs, en };
