#!/usr/bin/env python3
"""
fix-nbsp.py — české jednoznakovky → pevná mezera (nbsp) v .astro textech.

⚠️ Spusť po KAŽDÉM přetextování / hromadné změně textů — a VŽDY na CELÝ web
(ne jen na změněné stránky). Jednoznakovka nesmí zůstat na konci řádku.

Použití:  python3 fix-nbsp.py [adresář]     (default: src)

Bezpečné: upravuje text mezi > a < (obsah elementů) A NAVÍC textová pole ve
frontmatteru (title/desc/subtitle/label/perex/q/heading/note). Nechává být
<style>, <script>, atributy, ikony a cesty. Idempotentní.

⚠️ Do 2026-08-04 skript frontmatter PŘESKAKOVAL. Na komponentových stránkách
(karty, feature bloky, postranní panely) je ale většina textu právě tam —
sedm stránek služeb na AE tak mělo 1–3 pevné mezery místo desítek. Proto
rozšíření na datová pole.

⚠️ V datech se používá SKUTEČNÝ ZNAK U+00A0, ne entita &nbsp;. Komponenta,
která pole vypíše jako text ({item.desc}), by entitu vytiskla doslova.
"""
import re, sys, glob, os

# neslabičné předložky k/s/v/z + jednopísmenné a/i/o/u (i velké)
SINGLE = "ksvzouaiKSVZOUAI"
NBSP = " "

_re_word = re.compile(r'(^|[\s(„])([%s])[ \t\r\n]+' % re.escape(SINGLE))

def add_nbsp(text):
    # mezera/zalomení za samostatnou jednoznakovkou → pevná mezera (sváže s dalším slovem)
    return _re_word.sub(lambda m: m.group(1) + m.group(2) + NBSP, text)

# Textová pole v datech. Schválně jmenovitě — vyhne se to `icon` (SVG cesty
# obsahují samostatná písmena a mezery, sweep by je rozbil) i cestám k obrázkům.
TEXT_POLE = ("title", "desc", "subtitle", "label", "perex", "heading",
             "note", "q", "text", "alt", "caption")
_re_pole = re.compile(
    r"\b(%s)\s*:\s*(['\"])((?:[^\\]|\\.)*?)\2" % "|".join(TEXT_POLE), re.S)

def frontmatter_nbsp(fm):
    def uprav(m):
        klic, uvoz, hodnota = m.group(1), m.group(2), m.group(3)
        # nesahat na to, co není věta: cesty, URL, SVG, jednoslovné hodnoty
        if hodnota.startswith(("/", "http", "<", "#")) or " " not in hodnota:
            return m.group(0)
        return "%s: %s%s%s" % (klic, uvoz, add_nbsp(hodnota), uvoz)
    return _re_pole.sub(uprav, fm)

def process(s):
    head = ""
    fm = re.match(r'^---\n[\s\S]*?\n---\n', s)      # frontmatter zvlášť
    if fm:
        head, s = frontmatter_nbsp(fm.group(0)), s[fm.end():]
    blocks = []                                     # schovat <style>/<script>
    def stash(m):
        blocks.append(m.group(0)); return "\x00%d\x00" % (len(blocks) - 1)
    s = re.sub(r'<style[\s\S]*?</style>|<script[\s\S]*?</script>', stash, s)
    s = re.sub(r'>([^<>]+)<', lambda m: ">" + add_nbsp(m.group(1)) + "<", s)  # jen text mezi > a <
    s = re.sub(r'\x00(\d+)\x00', lambda m: blocks[int(m.group(1))], s)        # bloky zpět
    return head + s

def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "src"
    files = glob.glob(os.path.join(root, "**", "*.astro"), recursive=True)
    # POUZE ČESKÝ OBSAH. Pravidlo o jednoznakovkách je české; v angličtině by
    # sweep svázal každé „a" („a rock-solid brand") a „I", což je typograficky
    # špatně. Zjištěno při plošném nasazení na AE 2026-08-04.
    # Soubory, které nejsou pod /cs/, ale obsahují anglický text. Dvojjazyčné
    # komponenty (patička má CS i EN řetězce v jednom souboru) sweep rozezná
    # jen podle cesty, což nestačí — proto jmenovitá výjimka. Zjištěno na AE
    # 2026-08-04: patičce se svázalo „a new Shopify store", privacy-policy
    # (anglická, bez /en/ v cestě) dostala nbsp v celém textu.
    ANGLICKE = ("components/layout/Footer.astro", "pages/privacy-policy.astro")
    def cesky(f):
        c = f.replace(os.sep, "/")
        return "/en/" not in c and not any(c.endswith(a) for a in ANGLICKE)
    pred = len(files)
    files = [f for f in files if cesky(f)]
    if pred != len(files):
        print("přeskočeno %d souborů s anglickým textem — pravidlo je české" % (pred - len(files)))
        print("  (dvojjazyčné komponenty ošetři ručně, sweep je podle cesty nerozezná)")
    changed = 0
    for f in files:
        s = open(f, encoding="utf-8").read()
        s2 = process(s)
        if s2 != s:
            open(f, "w", encoding="utf-8").write(s2); changed += 1
            print("nbsp:", f)
    print("hotovo — upraveno %d / %d souborů" % (changed, len(files)))

if __name__ == "__main__":
    main()
