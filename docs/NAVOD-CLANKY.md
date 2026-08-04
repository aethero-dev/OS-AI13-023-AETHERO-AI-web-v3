# Jak psát a upravovat články na webu — návod pro Báru

Články žijí přímo v tomhle repozitáři jako obyčejné textové soubory.
Žádný Storyblok, žádné CMS — všechno se dělá **ve webovém rozhraní
GitHubu v prohlížeči**, nic se neinstaluje. Po uložení se web do dvou
minut sám přestaví a změna je venku.

> Potřebuješ jen přihlášení do GitHubu s přístupem k repozitáři
> `aethero-dev/OS-AI13-023-AETHERO-AI-web-v3`. O zbytek se stará
> Cloudflare sám.

---

## Kde co je

| Co | Kde |
|---|---|
| České články | `src/content/blog/cs/` — jeden soubor `.md` = jeden článek |
| Anglické články | `src/content/blog/en/` — **každý článek musí mít i EN verzi** |
| Obrázky článků | `public/blog/` |
| Tento návod | `docs/NAVOD-CLANKY.md` |

Název souboru = adresa článku. `ai-seo-2026.md` → `aethero.agency/cs/blog/ai-seo-2026/`.
Malá písmena, bez diakritiky, slova oddělená pomlčkou. CS a EN soubor se
může jmenovat různě (každý jazyk má vlastní slug).

---

## Úprava existujícího článku

1. Otevři soubor článku na GitHubu (`src/content/blog/cs/…`).
2. Vpravo nahoře klikni na **tužku** (Edit this file).
3. Uprav text.
4. Zelené tlačítko **Commit changes** → do popisu napiš jednou větou,
   co jsi změnila (např. „oprava cen v tabulce") → **Commit**.
5. Za 1–2 minuty je změna na webu. Nezapomeň na **EN verzi** téhož článku.

## Nový článek

1. Ve složce `src/content/blog/cs/` klikni **Add file → Create new file**.
2. Pojmenuj ho podle budoucí adresy, např. `jak-na-vanocni-kampan.md`.
3. Soubor musí začínat **hlavičkou mezi `---`** (frontmatter):

```markdown
---
title: "Jak na vánoční kampaň na Shopify"
perex: "Jedna–dvě věty, které článek shrnou. Ukazují se pod nadpisem a ve výpisu blogu."
readTime: "6 min"
date: 2026-11-01
image: "/blog/vanocni-kampan.webp"
draft: true
---

## První nadpis kapitoly

Text článku…
```

| Pole | K čemu je |
|---|---|
| `title` | Nadpis článku (H1) |
| `perex` | Shrnutí pod nadpisem a ve výpisu blogu |
| `readTime` | Doba čtení, např. „6 min" — odhadni ~1 min na 200 slov |
| `date` | Datum vydání ve formátu `2026-11-01`; řídí pořadí ve výpisu |
| `image` | Úvodní obrázek — cesta k souboru v `public/blog/` (nepovinné) |
| `draft` | **`true` = článek není na webu.** Rozepsané nech na `true`, před vydáním smaž celý řádek nebo přepni na `false` |

4. Napiš tělo v Markdownu (tahák níž), **Commit changes**.
5. Založ **EN verzi** v `src/content/blog/en/` (může mít anglický slug).

## Obrázky

1. Do složky `public/blog/` → **Add file → Upload files** → přetáhni soubor.
2. Ideálně `.webp` nebo `.jpg`, šířka ~1200 px, název bez diakritiky
   (`vanocni-kampan.webp`).
3. V článku ho vložíš řádkem: `![Popis obrázku](/blog/vanocni-kampan.webp)`
   — popis v závorce je pro nevidomé a vyhledávače, pište ho vždy.
4. Úvodní obrázek (obálku) jen zapiš do `image:` v hlavičce.

## Markdown tahák

```markdown
## Nadpis kapitoly          (## = kapitola, ### = podkapitola; # nepoužívej — H1 je title)
**tučný text**
*kurzíva*
[text odkazu](https://adresa.cz)
![popis obrázku](/blog/soubor.webp)

- odrážka
1. číslovaný seznam

| Sloupec | Sloupec |
|---|---|
| buňka | buňka |
```

## Jak poznáš, že je to venku

Po commitu se web sám přestaví (~1–2 min). Když se změna neukazuje:
zkus obnovit stránku (Cmd+Shift+R). Kdyby ani po pěti minutách ne,
napiš Davidovi — build mohl spadnout (uvidí to v Cloudflare).

---

## Co NEřešíš ty (zůstává na Davidovi / Claudovi)

- **FAQ a CTA blok pod článkem** — žijí v kódu (`src/data/article-extras.ts`).
  Otázky a odpovědi klidně napiš do článku nebo pošli, zapojení uděláme my.
- **Pevné mezery** (jednoznakovky k, s, v, z, a, i, o, u na koncích řádků) —
  doplňuje je náš skript při údržbě, neřeš.
- **Audio verze článku** — až bude předčítání (AE-54), přibude sem krok.

*Nahrazuje starý návod se Storyblokem (ten už neplatí — Storyblok byl
2026-08-02 odstraněn, rozhodnutí AE-49). Vzniklo 2026-08-04 (AE-51).*
