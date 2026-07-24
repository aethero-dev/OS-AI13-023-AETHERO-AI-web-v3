# QUESTIONS — věci k rozhodnutí

Claude Code sem zapisuje vše nad čím váhá, ale nechce blokovat práci.
David čte tento soubor když má čas a doplní odpovědi.
Claude Code odpovědi přebere a zapracuje — bez nutnosti konverzace.

Formát záznamu:
```
## [datum] — krátký popis
**Kontext:** kde přesně jsem narazil, co jsem implementoval jako výchozí
**Otázka:** co potřebuji rozhodnout
**Výchozí řešení:** co jsem udělal mezitím (co jde změnit)
**Odpověď Davida:** [ČEKÁ]
```

---

## Vstupní kontrola [2026-06-21]

✓ **GitHub:** Repo david-kuba/OS-AI13-023-AETHERO-AI-web-v3 existuje. Git inicializován, remote nastaven. Původně chybělo .git — opraveno.

✓ **Storyblok:** API token funguje. Vrátil stories se story "Home" (uuid: 9bf530d6...). Space je připraven.

⚠️ **Cloudflare hook:** Zablokován automatickým bezpečnostním klasifikátorem Claude Code. Neblokuje start (potřebujeme až od 1.2). David může zkontrolovat ručně: `source .env && curl -X POST "$CF_PAGES_BUILD_HOOK_URL"` — nebo přidat permission do settings. (Pozn. 2026-07-24: původní hook URL odsud odstraněna — unikla do git historie, hook rotován, viz CLAUDE-CODE-START.md §Přístupy.)

✓ **Web www.aethero.cz:** Přístupný. Navigace odpovídá spec: Úvod / Co umíme (7 podsekce) / Aplikace (eSyncer, AE Translator) / O nás / Kontakt.
- /esyncer ✓
- /ae-translator ✓ (pravděpodobně, obsah se načetl)
- /o-nas ✓
- /kontakt ✓
- /blog → 404 (buď nemá samostatnou stránku nebo slug je jiný)
- **POZOR:** /co-umime/potrebuji-brand → 404. Živý web má subpages na `/novy-shopify-e-shop` (bez prefixu /co-umime/), ne na `/co-umime/novy-shopify-e-shop`.

✓ **Dropbox /__1 AETHERO:** Přístupná. Klíčové složky:
AETHERO DESIGN SYSTEM alias, 00 BRAND AE, 01 FAKTURACE, 02 WEB, 03 AE PROJEKTY, 04 PRODUKTY, 05 DESIGN + UX, 06-AE DOKUMENTY, 07 DEV, 08-ŠKOLENÍ_KNOWLEDGEBASE, 09 MARKETING OUT, AE APLIKACE, AE TRANSLATOR, OG+MARKETING, Shopify brand assets, TYM foto alias, _OS-AI13-023-AETHETO-AI-web-v3 alias

✓ **Node.js:** v25.6.0 (splňuje 18+), npm 11.8.0

---

## 2026-06-21 — URL struktura sub-stránek CO UMÍME

**Kontext:** Živý web www.aethero.cz má sub-stránky CO UMÍME dostupné jako `/novy-shopify-e-shop` (flat URL, bez prefixu), ale CLAUDE-CODE-START.md definuje strukturu jako `/co-umime/novy-shopify-e-shop` (nested).

**Otázka:** Jakou URL strukturu chceš na novém webu?
- A) Nested: `/co-umime/novy-shopify-e-shop` (hierarchičtější, lepší pro SEO breadcrumbs)
- B) Flat: `/novy-shopify-e-shop` (stejné jako současný web, žádné redirect problémy)

**Výchozí řešení:** Implementuji podle CLAUDE-CODE-START.md — nested `/co-umime/[slug]`. Jde to jednoduše změnit.

**Odpověď Davida:** Nested — `/co-umime/[slug]` dle spec. Rozhodnuto 2026-06-21.

---

---

## 2026-06-21 — Logo soubor: ae-logo.svg vs ae-logo2-longfull-wh.svg

**Kontext:** Živý web www.aethero.cz načítá logo ze souboru `ae-logo2-longfull-wh.svg` (přirozená velikost 300×76px). V projektu máme `/public/ae-logo.svg` (246×62px). Vizuálně jsou podobné — oba mají text "æthero" v bílé.

**Otázka:** Je `ae-logo.svg` v projektu správný soubor, nebo máme použít jinou variantu?

**Výchozí řešení:** Používám `ae-logo.svg` co máme v `/public/`. Pokud chceš přesný soubor z živého webu, pošli mi `ae-logo2-longfull-wh.svg` a vyměním.

**Odpověď Davida:** [ČEKÁ]

---

## 2026-06-21 — Zkušenosti sekce: loga klientů

**Kontext:** Živý web má sekci "Zkušenosti" s bílými PNG/SVG logy klientů v řadě: Genkia, BU1, GROOMO, Havana Club, E.on, Jan Becher Pernod Ricard, Air Bank.

**Otázka:** Kde jsou soubory s logy klientů? Mají být SVG/PNG v `/public/logos/`? Nebo mám zatím nechat textové placeholdery?

**Výchozí řešení:** Sekce je v kódu s textovými placeholdery (`<span class="zk-logo-text">Genkia</span>` atd.) — vypadá přijatelně, ale bez obrázků.

**Odpověď Davida:** [ČEKÁ]

---

## 2026-06-21 — Design system stránka

**Kontext:** Vytvořil jsem `/design-system` stránku (localhost:4321/design-system#web-v31) analogicky jako u foxy beauty. Neznal jsem přesnou strukturu foxy beauty verze — vytvořil jsem ji od začátku s: Logo, Barvy, Typografie, Spacing, Komponenty.

**Otázka:** Chceš přidat nebo změnit obsah design system stránky? Případně ji také zveřejnit pod `/cs/design-system` nebo nechat bez jazykového prefixu?

**Výchozí řešení:** Stránka je dostupná na `/design-system` (bez jazykového prefixu) — vývojářský nástroj, ne veřejná stránka.

**Odpověď Davida:** [ČEKÁ]

---

## 2026-06-21 — Tým fotky: složka "TYM foto alias" neexistuje

**Kontext:** NEXT.md říká fotky jsou na `/Users/davidkuba/Library/CloudStorage/Dropbox/__1 AETHERO/TYM foto alias/`. Složka neexistuje (pravděpodobně alias/shortcut v Dropboxu, který nemá lokální kopii).

**Otázka:** Kde jsou reálné fotky týmu (David, Bára, Tom)? Případně je přidat ručně do `/public/team/`.

**Výchozí řešení:** /cs/o-nas má placeholder initials (D, B, T). Placeholdery fungují, nepozastavuje to nic jiného.

**Odpověď Davida:** [ČEKÁ]

---

## 2026-06-21 — Storyblok: prázdný space, chybí content types

**Kontext:** Space `293337461480339` má jen default "Home" story. Žádné blog posts ani case studies. Kód je připraven, čeká na obsah.

**Co David musí udělat v Storyblok dashboardu** (app.storyblok.com):

1. **Vytvořit content type "blog_post"** s těmito fieldy:
   - `title` (Text)
   - `perex` (Textarea)
   - `content` (Richtext)
   - `read_time` (Text, např. "7 min")
   - `category` (Text)

2. **Vytvořit content type "case_study"** s fieldy:
   - `title` (Text)
   - `perex` (Textarea)
   - `content` (Richtext)
   - `client` (Text)
   - `cover_image` (Asset)

3. **Nastavit složky:** `blog/` a `reference/` pro organizaci stories

4. **Přidat stories** — pak se automaticky nabuildují jako stránky

**Výchozí řešení:** CS blog stránky jsou statické (5 placeholder článků). Po přidání Storyblok obsahu stačí odkomentovat Storyblok fetch v [slug].astro.

**Odpověď Davida:** [ČEKÁ]

---

## FÁZE 1 SUMMARY — 2026-06-21

### Stav: ✅ KOMPLETNÍ (8 milestones)

**Build:** 23 stránek, čistý build, 0 chyb.

**Co je hotové:**
- M1.1: Astro 6 + @storyblok/astro v10 + CF Pages setup, design tokeny ADS v1.1
- M1.2: Header (fixed/transparent, dropdown, hamburger) + Footer + PageLayout, i18n routing
- M1.3: CS Homepage — 9 sekcí (Hero, Service Selector, Value Prop, Features, Stats Bar, Services Grid, Reference, Blog Preview, Footer CTA)
- M1.4: 8 stránek CO UMÍME (/cs/co-umime/ + 7 podstránek) — obsah z live webu
- M1.5: /cs/esyncer + /cs/ae-translator — kompletní obsah
- M1.6: /cs/o-nas + /cs/kontakt + blog/[slug] + case study [slug] — statické placeholdery
- M1.7: SEO — Organization + WebPage JSON-LD na každé stránce, Article na blog, hreflang cs/en/x-default, canonical, OG/Twitter meta, sitemap, robots.txt, llms.txt
- M1.8: EN i18n — /en/ homepage + /en/co-umime/ + /en/kontakt/ — Header/Footer lang-aware

**Commits (všechny lokální, nepushnuté):** 8 commitů na main branch

**Otevřené body (David rozhodne):**
1. **Push na main** — 8 commitů čeká. Potřebuji "autorizuji push na main" od Davida.
2. **Cloudflare Pages deploy** — CF hook zablokován klasifikátorem. Buď David ručně testuje hook, nebo přidá permission do Claude settings.
3. **Fotky týmu** — /cs/o-nas má placeholder initials (D/B/T). Reálné fotky jsou na: `/Users/davidkuba/Library/CloudStorage/Dropbox/__1 AETHERO/TYM foto alias/`
4. **Lighthouse audit** — nelze spustit z CLI (bez prohlížeče). Otestovat po deployi na CF Pages.
5. **Accept-Language redirect** — statický / → /cs/ funguje. EN detekce by potřebovala CF Worker (`functions/_middleware.js`) — připravit v Fázi 2?
6. **Blog + case studies** — statické placeholdery. Storyblok napojení v Milestone 2.x.
7. **En podstránky CO UMÍME** — /en/co-umime/ existuje, ale jednotlivé subpage (/en/co-umime/novy-shopify-e-shop aj.) vrací 404 (existují jen v CS). Fáze 2?
