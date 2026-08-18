---
title: "Povinné tlačítko v Shopify: nečekejte, až z toho bude problém"
perex: "Jak správně nastavit povinné tlačítko v Shopify a vyhnout se problémům s compliance. Legislativa vyžaduje implementaci do 19. června 2026."
readTime: "7 min"
date: 2026-05-01
image: "/blog/povinne-tlacitko-odstoupit-od-smlouvy2x.webp"
---

Povinné tlačítko pro odstoupení od smlouvy se má od června 2026 týkat e-shopů. Tady je praktický návod, jak se na něj v Shopify připravit bez zbytečné aplikace navíc.

## E-shopy umí ladit nákupní proces do detailu

Barva tlačítka v košíku. Text u dopravy. Pořadí platebních metod. Popup na slevu. Každý klik se měří, protože každý klik může znamenat tržbu.

Pak ale zákazník chce odstoupit od smlouvy - a najednou začíná „nákupní archeologie". Kam co napsali? FAQ. Obchodní podmínky. PDF formulář. E-mail na podporu. Čekání.

Nová povinnost pro e-shopy tenhle rozdíl dobře ukáže. Povinné tlačítko pro odstoupení od smlouvy nemá být jen další právní položka na webu - má zákazníkovi dát **jasnou online cestu**, jak odstoupení podat. Podle [Právního prostoru](https://www.pravniprostor.cz/clanky/obcanske-pravo/nova-tlacitkova-povinnost-pro-e-shopy) má být povinnost implementována nejpozději do **19. června 2026**. Novela je v době psaní pořád v legislativním procesu, takže konkrétní znění je dobré před publikací a implementací ještě ověřit s právníkem.

Pro majitele e-shopů v Shopify je ale důležité něco jiného: technický základ můžete řešit už teď.

### Nejde tu o tlačítko. Jde o celý proces

Největší omyl je myslet si, že povinné tlačítko znamená „někam přidáme odkaz". Když zákazník klikne na **Odstoupit od smlouvy**, musí se stát několik věcí najednou:

- najde správnou objednávku,
- vybere položky,
- odešle žádost,
- dostane potvrzení,
- a obchodník ví, co má dál dělat.

Tlačítko je jen vstupní bod. Pokud za ním není srozumitelný proces, problém jste nevyřešili - jen jste mu dali hezčí obal. To je přesně důvod, proč bychom u Shopify e-shopu nezačínali externí aplikací. Pojďme se nejdřív podívat, co umí Shopify samo.

## Co umí Shopify nativně

Shopify má funkci **Self-serve returns**. Ta umožní zákazníkovi podat žádost o vrácení přímo přes zákaznický účet nebo stavovou stránku objednávky. Zákazník se přihlásí, vybere objednávku, položky a důvod vrácení; obchodník žádost následně vidí v administraci.

Máme tedy hotovo? Ne. Self-serve returns neznamenají, že automaticky získáváte právně hotové řešení pro českou tlačítkovou povinnost. Je to ale velmi dobrý technický základ.

**První krok:** nastavení najdete v Shopify adminu v části **Settings → Customer accounts**, kde zapnete [Self-serve returns](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns/setup).

> Pozor na starší zákaznické účty. Shopify uvádí, že self-serve returns nefungují s legacy customer accounts. Pokud je používáte, bude potřeba přejít na nové Customer accounts, nebo proces vyřešit jinak.

**Druhý krok:** [Return rules](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/return-rules) v **Settings → Policies → Return rules**. Tam nastavíte, jak dlouho může zákazník žádost podat. Shopify nabízí například čtrnáct, třicet nebo devadesát dní, případně vlastní hodnotu. Tady se vyplatí zpomalit: lhůta v Shopify musí sedět s obchodními podmínkami a s tím, co opravdu platí pro vaše zboží.

### Kam tlačítko dát?

Povinné tlačítko nesmí být schované tam, kam se nikdo nedívá - nenechávejte ho jen v obchodních podmínkách.

Prakticky dává smysl vytvořit samostatnou stránku typu „Vrácení a odstoupení od smlouvy" a na ni dát jasné tlačítko **Odstoupit od smlouvy**. Tlačítko pak může vést na customer accounts URL, kde zákazník spustí self-serve proces. Stejný odkaz bychom doporučili přidat i do patičky a případně do help centra.

Minimum, které je potřeba otestovat:

- je tlačítko viditelné na mobilu,
- zákazník určitě pochopí, že jde o odstoupení od smlouvy,
- proces funguje pro testovací objednávku,
- přijde potvrzovací e-mail,
- tým ví, kde žádost v administraci najde.

Tohle není právní kosmetika. Vzniká tak dobrá zákaznická zkušenost v té méně příjemné části nákupu.

## Potvrzení je důležitější, než vypadá

Podle právních expertů má proces počítat s potvrzením odstoupení.

V Shopify dává smysl projít hlavně notifikace v **Settings → Notifications → Returns**. Zákazník by měl po odeslání vědět, že jste žádost přijali, čeho se týká a co bude následovat. Pokud má e-mail fungovat jako právně relevantní potvrzení, text by měl zkontrolovat právník. Tady se často láme rozdíl mezi „máme tlačítko" a „máme funkční proces".

### Kdy nativní Shopify možnosti nemusí stačit

Self-serve returns jsou dobrý start pro běžný e-shop s fyzickým zbožím. Neznamená to ale, že pokryjí všechno. Pozor si dejte hlavně na:

- digitální produkty,
- služby a předplatné,
- personalizované zboží,
- sortiment, kde existují výjimky z odstoupení.

Stejně tak je potřeba ověřit, jak proces funguje u nevyřízených, částečně vyřízených nebo specifických objednávek. Povinné tlačítko v Shopify tedy není otázka „zapnout jednu funkci a jít dál". Je to kombinace nastavení, textů, UX a interního provozu.

## Co udělat teď?

Nečekejte na poslední chvíli.

1. Zapněte Self-serve returns v testovacím režimu.
2. Nastavte Return rules.
3. Vytvořte stránku pro odstoupení.
4. Přidejte jasné tlačítko.
5. Projděte celý proces očima zákazníka.
6. A až úplně nakonec řešte, jestli potřebujete vlastní úpravu šablony, právní revizi nebo aplikaci navíc.

Shopify nám dá základ. Ale odpovědnost za to, že zákazník opravdu najde srozumitelnou cestu k odstoupení od smlouvy, zůstává na nás.

## Zdroje

- [Právní prostor - Nová „tlačítková" povinnost pro e-shopy](https://www.pravniprostor.cz/clanky/obcanske-pravo/nova-tlacitkova-povinnost-pro-e-shopy)
- [Shopify Help Center - Self-serve returns](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns/setup)
- [Shopify Help Center - Return rules](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/return-rules)
