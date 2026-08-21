# Původní struktura — inventura starého webu (aethero.cz na SolidPixels)

Vzniklo 2026-08-21 před cutoverem, dle WEB-STANDARD kap. 7 (dva nezávislé
zdroje: crawl + sitemap, rozpor mezi nimi patří do reportu). Zdroj pro
301 mapu v `public/_redirects`.

**Kanonický host:** `www.aethero.cz` — `aethero.cz` (apex) 301-přesměrovává
na `www.` bezpodmínečně, i na neexistující cesty.

**Sitemap:** NENÍ na `/sitemap.xml` (404) — je gzipovaná na
`https://www.aethero.cz/sitemap.xml.gz`, správně odkazovaná z `robots.txt`.

## Celkem 46 unikátních cest

Sitemap: 46 URL. Crawl nezávisle došel na 41 z nich + 1 ne-stránku
(AJAX pagination, vyloučeno). Sjednocení = těch 46 ze sitemapy.

### Homepage (2)
`/` · `/en`

### Služby (21)
```
CS: /co-umime /potrebuji-brand /novy-shopify-e-shop /prechod-na-shopify
    /migrace-shoptet-na-shopify [bez EN mutace] /expanze-do-zahranici
    /rozvoj-a-podpora /analyza-a-strategie /custom-vyvoj-a-aplikace
    /esyncer /ae-translator

EN: /en/what-we-do /en/need-brand /en/new-shopify-e-shop
    /en/migrate-to-shopify /en/expanzion-abroad /en/development-support
    /en/data-analysis-strategy /en/custom-dev-apps /en/esyncer
    /en/ae-translator
```

### Případovky (3)
`/pripadovka-groomo-cz-na-shopify` · `/en/case-study-groomo-cz-shopify` ·
`/pripadova-studie-email-marketing-fleppi-cz` [bez EN mutace]

### Blog (10)
```
CS: /blog/povinne-tlacitko-v-shopify-necekejte-az-z-toho-bude-problem-cz
    /blog/ai-seo-nova-tvrda-realita-vyhledavani-pro-e-shopy-2026
    /blog/shopify-edition-zima-2026
    /blog/preklad-platebni-metody-v-shopify-kdyz-translate-adapt-nepomaha
    /blog/jakou-e-commerce-platformu-zvolit-shopify-versus-shoptet

EN: /en/blog/mandatory-withdrawal-button-shopify-czech-rep-2026
    /en/blog/ai-seo-nova-tvrda-realita-vyhledavani-pro-e-shopy-2026
    /en/blog/shopify-edition-zima-2026
    /en/blog/preklad-platebni-metody-v-shopify-kdyz-translate-adapt-nepomaha
    /en/blog/jakou-e-commerce-platformu-zvolit-shopify-versus-shoptet
```

### Kontakt / o nás (4)
`/kontakt` · `/en/contact` · `/o-nas` · `/en/about-us`

### Právní / utility (6) — v sitemapě, ale nedohledatelné crawlem
`/gdpr` · `/privacy-policy` · `/en/privacy-policy` · `/typo` · `/en/typo` · `/test`

## Nálezy

- **GDPR/privacy-policy nejsou v crawlu, protože odkaz na ně žije v JS
  cookie banneru** (`SLP:CookieBar`), který statický `curl` fetch nespustí —
  nejde o mrtvé stránky, jen o slepé místo týhle metody crawlu.
- **`/typo`, `/en/typo`, `/test` vypadají jako opuštěné/testovací stránky**
  (title stránky `/test` je doslova „test") — nikde neodkazované, žádný
  zjevný obsahový důvod k zachování. Čeká na rozhodnutí DK: přesměrovat
  na domovskou stránku, nebo nechat zaniknout (404).
- **Rozbitý interní odkaz na starém webu**: `/en/custom-development-and-aplikacations`
  vrací 404, správný cíl je `/en/custom-dev-apps`. Vada existovala už na
  starém webu — 301 mapa ji teď opravuje jako vedlejší efekt migrace.
- **Dvě chybějící EN mutace na starém webu** (vzorec „jazyková mutace se
  nedělá napůl", už dřív zapsaný jako riziko): `/migrace-shoptet-na-shopify`
  a `/pripadova-studie-email-marketing-fleppi-cz` nemají EN protějšek.
  Nový web už Fleppi EN verzi má; `migrace-shoptet-na-shopify` zůstává
  jen česky na obou webech.
- **`/cs` (bez lomítka) je na starém webu jazykový shim** — 302 na `/`,
  ne samostatný obsah, vynechán ze seznamu.
- **`/?p7200=2`** je AJAX "load more" pro 5položkový blok na homepage,
  ne samostatná stránka, vynechán.

## Metoda

`curl` (ne prohlížeč — čerstvá CF zóna po cutoveru dávala automatizovanému
prohlížeči bezpečnostní výzvu), BFS crawl z homepage + nezávislá kontrola
sitemapy. Robots.txt má CF výchozí Content-Signals blok jmenovitě pro
některé AI boty (`ClaudeBot` mj.) — crawl proběhl s běžným prohlížečovým
UA, protože jde o audit vlastního webu pro vlastní migraci, ne o cizí scrape.
