/**
 * Host = jazyk. ŽÁDNÝ prefix v URL (rozhodnutí DK 2026-08-21).
 *   aethero.cz/{cokoli}      -> servíruje CS obsah (interně /cs/{cokoli})
 *   aethero.agency/{cokoli}  -> servíruje EN obsah (interně /en/{cokoli})
 *
 * Build pořád staví /cs/* a /en/* (Astro i18n netknuté) - Worker prefix jen
 * SKRYJE: bezprefixovou cestu přepíše (rewrite, ne redirect) na /{lang}/... a
 * servíruje z assetů. Uživatel prefix nikdy nevidí.
 *
 * Přesměrování (301), aby stará prefixovaná URL nezůstala žít dvojmo:
 *   - vlastní prefix   (.cz/cs/x)     -> .cz/x
 *   - cizí prefix      (.cz/en/x)     -> https://aethero.agency/x   (a zrcadlově)
 *   - www.*            -> apex
 *
 * workers.dev preview NEMÁ .cz/.agency rozlišení - tam Worker servíruje /cs/ a
 * /en/ napřímo (fallback), aby šel build ověřit. Bezprefixové URL a rewrite se
 * testují až na ostrých doménách (nález: past P11 - assets před Workerem).
 */

const CZ_HOST = 'aethero.cz';
const AGENCY_HOST = 'aethero.agency';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www.* -> apex 301
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    const host = url.hostname;
    const path = url.pathname;

    // Jazyk podle DOMÉNY. Neznámý host (workers.dev preview) -> napřímo,
    // ať /cs/ a /en/ jde ověřit v preview buildu.
    let lang = null;
    if (host === CZ_HOST) lang = 'cs';
    else if (host === AGENCY_HOST) lang = 'en';
    if (lang === null) return env.ASSETS.fetch(request);

    const otherHost = lang === 'cs' ? AGENCY_HOST : CZ_HOST;
    const own = `/${lang}`;                        // /cs nebo /en
    const other = lang === 'cs' ? '/en' : '/cs';

    // Cizí jazykový prefix na téhle doméně -> 301 na druhou doménu, bez prefixu
    if (path === other || path.startsWith(other + '/')) {
      const rest = path.slice(other.length) || '/';
      return Response.redirect(`https://${otherHost}${rest}${url.search}`, 301);
    }

    // Vlastní starý prefix v URL -> 301 na bezprefixovou podobu
    if (path === own || path.startsWith(own + '/')) {
      const rest = path.slice(own.length) || '/';
      return Response.redirect(`https://${host}${rest}${url.search}`, 301);
    }

    // Bezprefixová cesta -> REWRITE na /{lang}{path} a servíruj z assetů.
    const assetUrl = new URL(url);
    assetUrl.pathname = path === '/' ? `/${lang}/` : `/${lang}${path}`;
    const res = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));

    // Sdílené stránky BEZ jazykového prefixu (privacy-policy) žijí v rootu,
    // ne pod /cs/ ani /en/ - prefixovaná cesta je nenajde. Fallback na root.
    if (res.status === 404 && path !== '/') {
      const rootRes = await env.ASSETS.fetch(request);
      if (rootRes.status !== 404) return rootRes;
    }
    return res;
  },
};
