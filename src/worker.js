/**
 * Host + jazykové routování mezi aethero.cz (CS) a aethero.agency (EN).
 * Nahrazuje starou CF Pages Functions logiku (functions/_middleware.js,
 * mrtvá od přechodu na Workers - viz past P8 v AI13008/knowledge/projects/
 * aethero-web-v3.md) - na Workers se `functions/` tiše ignoruje.
 *
 * Pravidla (LAUNCH.md §1):
 *   - "/" na aethero.cz     -> 302 /cs/
 *   - "/" na aethero.agency -> 302 /en/
 *   - aethero.cz/en/*       -> 301 https://aethero.agency/en/*
 *   - aethero.agency/cs/*   -> 301 https://aethero.cz/cs/*
 *   - vše ostatní (statické assety, /privacy-policy, /404, ...) prochází
 *     beze změny do env.ASSETS - shodné na obou doménách
 *
 * 302 na "/" schválně (převzato z public/_redirects, důvod tamtéž):
 * volba jazyka není trvalá vlastnost URL, 301 by ji zabetonoval v cache.
 *
 * Tohle pravidlo NAHRAZUJE starou blanketní `/  /cs/  302` v `_redirects`
 * (ta neuměla rozlišit doménu - jakmile začne odpovídat i .agency, poslala
 * by i její "/" špatně na /cs/). Viz _redirects, kde je pravidlo teď pryč.
 */

const CZ_HOST = 'aethero.cz';
const AGENCY_HOST = 'aethero.agency';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www.* -> apex 301. Kanonická podoba obou domén je bez www (canonical,
    // hreflang i sitemapy míří na apex) - www custom domain provoz jen
    // přijme a pošle dál, obsah na něm neběží. Bez route v wrangler.jsonc
    // by www neexistovalo vůbec (NXDOMAIN - nález DK 2026-08-21).
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    const host = url.hostname.replace(/^www\./, '');
    const path = url.pathname;

    if (path === '/') {
      const target = host === CZ_HOST ? '/cs/' : '/en/';
      return Response.redirect(new URL(target, url).toString(), 302);
    }

    if (host === CZ_HOST && path.startsWith('/en/')) {
      return Response.redirect(`https://${AGENCY_HOST}${path}${url.search}`, 301);
    }

    if (host === AGENCY_HOST && path.startsWith('/cs/')) {
      return Response.redirect(`https://${CZ_HOST}${path}${url.search}`, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
