---
title: "Překlad platební metody v Shopify, když Translate & Adapt nepomáhá"
perex: "Praktický návod jak přeložit platební metody v Shopify mimo standardní nástroje — bez aplikací, přímo přes export a import CSV."
readTime: "3 min"
date: 2025-10-05
image: "/blog/platebni-brany-v-shopify-preklad-v2.webp"
---

## Situace

Potřebujete přeložit názvy platebních bran v Shopify (například "Cash on delivery") do češtiny, ale standardní aplikace Translate & Adapt platební metody nepokrývá nebo překlad nefunguje.

## Řešení krok za krokem

### 1. Export jazykových podkladů

- Otevřete administraci Shopify
- Přejděte do Settings → Languages
- Klikněte na Export
- Vyberte "Selected Content"
- Zaměřte se na "Payment gateways"
- Stáhněte CSV soubor

### 2. Překlad obsahu

Otevřete stažený CSV soubor a najděte sloupec "Translated content". Překlady vyplňte přímo zde.

**Tip:** Využijte AI modely jako ChatGPT nebo DeepL místo ručního překladu — ušetříte čas a výsledky bývají přesné.

### 3. Řešení pro macOS

Problém: CSV se může exportovat se středníky namísto čárek, což způsobí chyby při importu.

Řešení: Otevřete soubor v TextEdit, najděte a nahraďte všechny středníky čárkami a soubor uložte.

### 4. Import překladu

- Přejděte zpět do Settings → Languages
- Zvolte Import
- Nahrajte upravený soubor

## Doporučení

- Vždy zkontrolujte formátování CSV před importem
- Uchovávejte kopii původního exportu jako zálohu
- Po importu otestujte zobrazení platebních metod v checkout procesu
