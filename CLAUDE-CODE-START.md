# OS-AI13-023 — AETHERO WEB v3
# Startovací prompt pro Claude Code

---

## FÁZE 0 — Vstupní kontrola (spusť jako úplně první věc)

Než začneš cokoliv instalovat nebo psát kód, projdi tuto sekvenci.
Cílem je ověřit že máš vše co potřebuješ a odhalit blokkery dřív než nastanou.
Výsledek zapiš do QUESTIONS.md pod hlavičku `## Vstupní kontrola [datum]`.

### 0.1 — Zkontroluj přístupy

**GitHub:**
```bash
git remote -v
git status
```
Očekáváš: remote origin = github.com/david-kuba/OS-AI13-023-AETHERO-AI-web-v3
Pokud chybí nebo push selže → zastav, zapiš do QUESTIONS.md

**Storyblok:** (token načti z .env — nikdy ho nepiš do tohoto souboru)
```bash
source .env && curl -s "https://api.storyblok.com/v2/cdn/stories?token=${STORYBLOK_TOKEN}&version=draft" | head -c 300
```
Očekáváš: JSON s klíčem `"stories"` (i prázdný seznam je OK)
Pokud vrátí chybu 401/403 → zastav, zapiš do QUESTIONS.md

**Cloudflare Pages build hook:** (URL načti z .env)
```bash
source .env && curl -s -X POST "${CF_PAGES_BUILD_HOOK_URL}" | head -c 200
```
Očekáváš: JSON odpověď bez 401/403
Poznámka: build hook potřebujeme až v Milestone 1.1, neblokuj kvůli němu start

### 0.2 — Zkontroluj živý web

Otevři www.aethero.cz a projdi navigaci. Ověř přístupnost každé stránky:
- / — homepage
- /co-umime — a všechny podstránky (potrebuji-brand, novy-shopify-e-shop, prechod-na-shopify, expanze-do-zahranici, rozvoj-a-podpora, analyza-a-strategie, custom-vyvoj-a-aplikace)
- /esyncer a /ae-translator
- /o-nas, /kontakt
- alespoň jeden /blog/[slug]

Pokud jakákoliv stránka vrátí 404 → zapiš do QUESTIONS.md

### 0.3 — Projdi složku s podklady

```bash
ls "/Users/davidkuba/Library/CloudStorage/Dropbox/__1 AETHERO"
```

Toto je hlavní Dropbox složka s veškerými assety agentury — loga, fotky, brandové materiály, podklady.
Nemusíš procházet do hloubky, stačí vidět co je v root. Zapiš do QUESTIONS.md co tam našel (hlavní podsložky).
Pokud přístup selže → zapiš do QUESTIONS.md, David vyřeší přístupy.

### 0.5 — Zkontroluj Node.js prostředí

```bash
node --version   # musí být 18+
npm --version
```
Node < 18 → zastav, zapiš do QUESTIONS.md

### 0.6 — Zapiš výsledek do QUESTIONS.md a zobraz ho v chatu

Zapiš do QUESTIONS.md:
```
## Vstupní kontrola [datum]
✓ GitHub: [stav]
✓ Storyblok: [stav]
✓ Cloudflare hook: [stav]
✓ Web www.aethero.cz: [stav — všechny stránky OK nebo co chybí]
✓ Dropbox __1 AETHERO: [co je v root — hlavní podsložky]
✓ Node.js: [verze]

Otázky před startem:
- [cokoliv co potřebuješ ujasnit]
```

Pak **vytiskni celý aktuální obsah QUESTIONS.md přímo do chatu** — ne cestu k souboru, ale skutečný obsah.
Na konci přidej: `→ Doplň odpovědi nebo napiš GO pro start.`

Čekáš na Davidovu odpověď v tomto chatu.
Jakmile odpoví nebo napíše GO → pokračuj na Milestone 1.1.

## Pravidlo: QUESTIONS.md vždy zobrazuj v chatu

Kdykoli aktualizuješ QUESTIONS.md (přidáváš otázku, zapisuješ rozhodnutí) —
vytiskni aktualizovanou sekci přímo do chatu, ne jen odkaz na soubor.
David nechce otevírat soubory. Chce číst otázky přímo tady.

---

## Jak budeš pracovat na tomto projektu

Pracuješ autonomně v programovacím loopu. David tě spustí a pak se na tebe podívá jen občas. Tvůj úkol je iterovat dokud nebude hotovo — bez čekání na potvrzení u každého kroku.

**Výjimky kdy ZASTAVIT a čekat na Davida:**
- Selže autentizace / přístup ke službě (Storyblok, Cloudflare, GitHub)
- Technický blocker který nelze obejít ani dočasným řešením

Ve všech ostatních případech: rozhodni sám, implementuj, a pokračuj.

**Nejasnosti a váhání → QUESTIONS.md**
Kdykoliv váháš nad designem, identitou, obsahem nebo prioritou — nezastavuj se.
Implementuj nejrozumnější výchozí řešení (vždy 1:1 s www.aethero.cz jako základ)
a zapiš otázku do QUESTIONS.md v tomto formátu:

```
## [datum] — krátký popis
**Kontext:** kde přesně jsem narazil, co jsem implementoval jako výchozí
**Otázka:** co potřebuji rozhodnout
**Výchozí řešení:** co jsem udělal mezitím (jde to změnit)
**Odpověď Davida:** [ČEKÁ]
```

David QUESTIONS.md čte když má čas a doplní odpovědi.
Ty pak odpovědi přebereš a zapracuješ — bez konverzace.

**Loop funguje takto:**
1. Přečti NEXT.md — co je na řadě
2. Implementuj jeden úkol
3. Otestuj lokálně (`npm run dev`, zkontroluj v browseru)
4. Commitni s popisným message
5. Pushnì na GitHub (Cloudflare Pages auto-deployuje)
6. Označ úkol v NEXT.md jako hotový
7. Přejdi na další — zpět na bod 1

Nezastavuj se mezi úkoly. Pracuješ dokud není NEXT.md prázdný nebo dokud nenarazíš na blokující problém.

---

## Co stavíme

Webová prezentace agentury aethero. Migrace ze Solidpixels na nový stack.

Stack: Astro 4.x (SSG) + Storyblok (headless CMS) + Cloudflare Pages (hosting)
GitHub: github.com/david-kuba/OS-AI13-023-AETHERO-AI-web-v3
Live: aethero.agency

---

## Zdroje pravdy

**Vizuál, struktura, obsah:** www.aethero.cz
Před každou komponentou nebo stránkou jdi na živý web. Nekopíruj z hlavy.

**Obsah stránek o Shopify službách:** oficiální podklady Shopify (shopify.com, help.shopify.com, shopify.dev) — použij pro stránky /novy-shopify-e-shop, /prechod-na-shopify, /expanze-do-zahranici, /rozvoj-a-podpora, /esyncer, /ae-translator. Fakta o platformě musí být přesná a aktuální.

**Podklady, obrázky, assety:** Davidova hlavní Dropbox složka:
/Users/davidkuba/Library/CloudStorage/Dropbox/__1 AETHERO

Pokud hledáš logo, fotky, grafiku, brandové materiály nebo jakékoliv vstupní podklady — hledej tam. Složka je read-only, přístupy vyžádej přes Desktop Commander pokud selže.

**Design tokeny:** přesně hodnoty z sekce níže. Nic nevymýšlej.

---

## Přístupy a credentials

Lokální workspace:
/Users/davidkuba/Library/CloudStorage/Dropbox/__13 AI PROJECTS/OS-AI13-023-AETHERO-AI-web-v3

.env soubor (vytvoř ho, nikdy nepushuj na GitHub; hodnoty jsou POUZE v .env
a v password manageru — nikdy v MD souborech ani promptech, viz WEB-STANDARD §12):
```
STORYBLOK_TOKEN=          # Storyblok → Settings → Access Tokens (Preview)
STORYBLOK_SPACE_ID=       # Storyblok → Settings → Space
CF_PAGES_BUILD_HOOK_URL=  # CF Pages → Settings → Builds → Deploy hooks
```
Pozn. 2026-07-24: původní token i build hook z tohoto souboru unikly do git
historie → obojí ROTOVÁNO a revokováno (session AI13009/04). Aktuální hodnoty
jsou v .env.

---

## Struktura webu (přesně takto)

```
/ — ÚVOD (homepage)
/co-umime — CO UMÍME
  /potrebuji-brand
  /novy-shopify-e-shop
  /prechod-na-shopify
  /expanze-do-zahranici
  /rozvoj-a-podpora
  /analyza-a-strategie
  /custom-vyvoj-a-aplikace
/esyncer — aplikace eSyncer
/ae-translator — aplikace AE Translator
/o-nas
/kontakt
/[slug] — případové studie
/blog/[slug] — blog články
```

---

## Design tokeny (ADS v1.1 / Ydentyty)

```css
:root {
  --bg-elevated: #000326;       /* dominantní tmavá, page bg */
  --bg-secondary: #0C0C42;      /* alt tmavá, layered sekce */
  --bg-primary-alt: #030626;    /* hero / featured surfaces */
  --action: #0DD4CD;            /* CTA — výhradně akční prvky */
  --action-hover: #16BECF;      /* hover stav action */
  --text-primary: #FFFFFF;
  --text-secondary: #A081D1;    /* lavender, captions, meta */
  --accent-purple: #CB00D7;     /* highlights, badges, dekorativní */
  --brand-dark: #092066;        /* logo lockups, gradient stops */
  --neutral-100: #F8F9F9;
  --neutral-300: #D2D2D2;
  --neutral-500: #A0A3BD;       /* muted / placeholder */
  --neutral-700: #686868;       /* borders, dividers */
  --neutral-900: #171A1C;
  --semantic-error: #FF5252;
  --semantic-success: #4ECCA3;
  --semantic-warning: #FFA940;
  --semantic-info: #5DADE2;
  --accent-shopify: #96BF48;    /* POUZE v Shopify partner kontextu */

  /* Typografie */
  --font-primary: 'Kanit', system-ui, sans-serif;
  --font-secondary: 'Montserrat', system-ui, sans-serif;
  --text-h1: 56px;   /* weight 700 */
  --text-h2: 40px;   /* weight 600 */
  --text-h3: 24px;   /* weight 600 */
  --text-body: 16px; /* weight 400, line-height 1.6 */
  --text-label: 18px;/* weight 500 */
  --text-small: 14px;/* weight 400 */

  /* Spacing */
  --space-8: 8px;
  --space-16: 16px;
  --space-24: 24px;
  --space-40: 40px;
  --space-80: 80px;
  --space-120: 120px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.20);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.20);
  --shadow-xl: 0 24px 48px rgba(0,0,0,0.35), 0 12px 16px rgba(0,0,0,0.25);

  --container-max: 1280px;
  --transition-base: 0.2s ease;
}

@media (max-width: 768px) {
  :root {
    --space-80: 48px;
    --space-120: 64px;
  }
}
```

---

## Milestone 1.1 — Setup (udělej jako první)

Toto je blokující milestone — bez něj nelze nic jiného. Projdi kroky 1-11, pak teprve pokračuj na 1.2.

**Krok 0 — workspace**
```bash
cd "/Users/davidkuba/Library/CloudStorage/Dropbox/__13 AI PROJECTS/OS-AI13-023-AETHERO-AI-web-v3"
```

**Krok 1 — Astro init**
```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```
Ptá-li se na existující soubory: přepiš (Yes).

**Krok 2 — integrace**
```bash
npx astro add storyblok sitemap --yes
npm install @storyblok/astro
```

**Krok 3 — astro.config.mjs**
```js
import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

export default defineConfig({
  output: 'static',
  site: 'https://aethero.agency',
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {},
      apiOptions: { region: 'eu' },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'cs',
        locales: { cs: 'cs-CZ', en: 'en-US' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
```

**Krok 4 — src/styles/tokens.css**
Zkopíruj přesně hodnoty z sekce Design tokeny výše.

**Krok 5 — src/styles/global.css**
```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;700&family=Montserrat:wght@400;500;600&display=swap');
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--bg-elevated);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--text-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-primary);
  line-height: 1.2;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; }
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-24);
}
```

**Krok 6 — src/layouts/BaseLayout.astro**
```astro
---
export interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  lang?: string;
}
const {
  title,
  description = 'Česká digitální agentura. Design, strategie a technologie pro e-commerce.',
  ogImage = '/og-default.jpg',
  lang = 'cs',
} = Astro.props;
const siteUrl = 'https://aethero.agency';
const pathWithoutLang = Astro.url.pathname.replace(/^\/(cs|en)/, '') || '/';
---
<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | aethero</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={Astro.url.href} />
  <link rel="alternate" hreflang="cs" href={`${siteUrl}/cs${pathWithoutLang}`} />
  <link rel="alternate" hreflang="en" href={`${siteUrl}/en${pathWithoutLang}`} />
  <link rel="alternate" hreflang="x-default" href={`${siteUrl}/en${pathWithoutLang}`} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={Astro.url.href} />
  <meta property="og:title" content={`${title} | aethero`} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`${siteUrl}${ogImage}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AETHERO s.r.o.",
    "alternateName": "aethero",
    "url": siteUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+420776067663",
      "email": "info@aethero.cz",
      "areaServed": ["CZ","SK","PL","AT","DE"],
      "availableLanguage": ["Czech","English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Budovcova 700/14",
      "addressLocality": "České Budějovice",
      "postalCode": "370 01",
      "addressCountry": "CZ"
    },
    "sameAs": ["https://aethero.cz"]
  })} />
  <style is:global>@import '/src/styles/global.css';</style>
</head>
<body>
  <slot />
</body>
</html>
```

**Krok 7 — public/robots.txt**
```
User-agent: *
Allow: /
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
Sitemap: https://aethero.agency/sitemap-index.xml
```

**Krok 8 — public/llms.txt**
```
# AETHERO s.r.o.

AETHERO s.r.o. je česká digitální agentura se sídlem v Českých Budějovicích.
Zakladatelé: David Kuba (CEO, design, business development), Bára (vývoj, UX/UI, project management), Tom (grafika, motion, 3D).

Služby: brand identity, e-commerce strategie, custom vývoj, mezinárodní expanze (CEE), AI automatizace, XML feed synchronizace (eSyncer), AI překlad obsahu (AE Translator), datová analýza e-shopů.

Web: https://aethero.agency (EN), https://aethero.cz (CZ)
Email: info@aethero.cz | Tel: +420 776 067 663
IČO: 05288762 | Adresa: Budovcova 700/14, 370 01 České Budějovice, CZ
```

**Krok 9 — .env.example**
```
STORYBLOK_TOKEN=
STORYBLOK_SPACE_ID=
CF_PAGES_BUILD_HOOK_URL=
```

**Krok 10 — ověř .gitignore**
.env musí být v .gitignore.

**Krok 11 — commit**
```bash
git add -A
git commit -m "chore: Milestone 1.1 — Astro + Storyblok + CF Pages setup"
git push origin main
```

Ověř: `npm run dev` běží čistě. Pak pokračuj na Milestone 1.2.

---

## Co dělat po 1.1

Postup milestones je v NEXT.md v repozitáři.
Chat Claude (project co-manager) připravuje instrukce pro další milestony průběžně.
Když dokončíš milestone, zkontroluj NEXT.md — instrukce tam budou.
