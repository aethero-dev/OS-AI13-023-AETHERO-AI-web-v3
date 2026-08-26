# PLATÍ — OS-AI13-023 aethero web v3

> Načítá se automaticky na startu session (SessionStart hook).
> **Co je tady, je rozhodnuté. Neověřuj to ven, nehledej to v docs, neptej se na to znovu.**
> Nadřazená pravidla stacku: [`AI13009/00-PLATI.md`](../AI13009%20AE%20WEBDESIGN%20SYSTEM/00-PLATI.md)
> · karta webu: `AI13009/weby/aethero-web-v3.md`

---

## PLATÍ

| ID | Platí | Nehledej / nedělej | Od | Zdroj |
|---|---|---|---|---|
| **AE-01** | **Web běží na Cloudflare WORKERS** — první web portfolia. `wrangler.jsonc` v repu, deploy `npx wrangler deploy`. **Git integrace se nepoužívá.** | „Pages vs Workers"; zapojování git integrace | 2026-08-20 DK | `AI13009/weby/aethero-web-v3.md` · `wrangler.jsonc` v repu |
| **AE-02** | **Design systém běží ZVLÁŠŤ** jako Worker `aethero-web-v3-ds` (`wrangler.ds.jsonc`), za heslem. Do 2026-08-20 se stavěl do produkčního buildu a byl veřejně dostupný, jen skrytý ze sitemapy — to už neplatí. | vracení DS do produkčního buildu | 2026-08-20 | `AI13009/weby/aethero-web-v3.md` §kap. 2 |
| **AE-03** | ⚠️ `assets` binding **bez `run_worker_first` NENÍ ochrana** — Worker s heslem se u statických souborů vůbec nespustí. Nejdražší past přechodu. | spoléhání na heslo bez `run_worker_first` | 2026-08-20 | `AI13008/knowledge/projects/aethero-web-v3.md` P1–P7 |
| **AE-04** | **Pages projekt `os-ai13-023-aethero-ai-web-v3` zůstává stát jako cesta zpět** (`…pages.dev`). **NEMAZAT.** | mazání starého Pages projektu jako úklid | 2026-08-20 | `AI13009/weby/aethero-web-v3.md` |
| **AE-05** | Deploy hook `storyblok-publish-2` je po odchodu ze Storybloku **zbytečný** (AE-50) — ví se o něm. | ladění, proč hook nic nedělá | 2026-08 | `AI13009/weby/aethero-web-v3.md` |

---

## ⚠️ ODCHYLKY — víme o nich, neopravuj bez DK

| Co | Proti čemu | Proč se to neopravuje samo |
|---|---|---|
| **Repo leží v Dropboxu**, ne v `~/Developer/` | `AI13009/00-PLATI.md` W-07 | Přesun repa je zásah do živého webu i do gitu. ⛔ Složku v Dropboxu nepřejmenovat ani nepřesouvat bez slova DK. |
| Zbylá složka **`functions/_middleware.js`** — koncept Cloudflare **Pages** | `AI13009/00-PLATI.md` W-03 | Na Workers se neaplikuje. Před jakoukoli migrací nebo laděním číst `functions/`, ne jen `src/`. Smazat až vědomě. |

---

## Údržba

Rozhodnutí o webu patří primárně na kartu `AI13009/weby/aethero-web-v3.md` — tenhle soubor
na ně jen ukazuje. Pravidlo: DK-PRAVIDLA 2 §15 (PLATÍ — co se už neověřuje).
