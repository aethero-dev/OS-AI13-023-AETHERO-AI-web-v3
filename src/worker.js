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

/* CSP v REPORT-ONLY módu (DK GO 2026-08-21): nic neblokuje, jen hlásí na
   /api/csp-report (console.log -> `wrangler tail` / Workers Logs). Po měsíci
   sběru se rozhodne o ostré Content-Security-Policy. Povolené externí zdroje
   dle reálného stavu webu: GTM + GA4 + konvertor worker. Fonty self-host. */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://shoptet2shopify.aethero.workers.dev",
  "frame-src https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'report-uri /api/csp-report',
].join('; ');

function sCsp(res) {
  const ct = res.headers.get('Content-Type') || '';
  if (!ct.includes('text/html')) return res;
  const h = new Headers(res.headers);
  h.set('Content-Security-Policy-Report-Only', CSP_REPORT_ONLY);
  return new Response(res.body, { status: res.status, headers: h });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Sběr CSP hlášení (report-only) - jen zalogovat a potvrdit.
    if (url.pathname === '/api/csp-report' && request.method === 'POST') {
      try {
        const body = await request.text();
        console.log('CSP-REPORT', body.slice(0, 2000));
      } catch { /* nevadí */ }
      return new Response(null, { status: 204 });
    }

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
    if (lang === null) return sCsp(await env.ASSETS.fetch(request));

    const otherHost = lang === 'cs' ? AGENCY_HOST : CZ_HOST;
    const own = `/${lang}`;                        // /cs nebo /en
    const other = lang === 'cs' ? '/en' : '/cs';

    // Cizí jazykový prefix na téhle doméně -> 301 na druhou doménu, bez prefixu
    if (path === other || path.startsWith(other + '/')) {
      let rest = path.slice(other.length) || '/';
      // rovnou s lomítkem, jinak cíl přidá další 301 (audit 2026-08-22)
      if (!rest.endsWith('/') && !/\.[a-z0-9]+$/i.test(rest)) rest += '/';
      return Response.redirect(`https://${otherHost}${rest}${url.search}`, 301);
    }

    // Vlastní starý prefix v URL -> 301 na bezprefixovou podobu
    if (path === own || path.startsWith(own + '/')) {
      let rest = path.slice(own.length) || '/';
      if (!rest.endsWith('/') && !/\.[a-z0-9]+$/i.test(rest)) rest += '/';
      return Response.redirect(`https://${host}${rest}${url.search}`, 301);
    }

    // Bezprefixová cesta -> REWRITE na /{lang}{path} a servíruj z assetů.
    const assetUrl = new URL(url);
    assetUrl.pathname = path === '/' ? `/${lang}/` : `/${lang}${path}`;
    const res = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));

    // Assets umí vrátit 3xx (auto-trailing-slash: /cs/co-umime -> /cs/co-umime/)
    // s VNITŘNÍ prefixovanou Location - tu musíme strippnout, jinak prefix
    // prosákne ven do URL (nález DK 2026-08-21: .cz/co-umime -> .cz/cs/co-umime/).
    if ([301, 302, 307, 308].includes(res.status)) {
      const loc = res.headers.get('Location');
      if (loc && /^\/(cs|en)(\/|$)/.test(loc)) {
        const h = new Headers(res.headers);
        h.set('Location', loc.replace(/^\/(cs|en)/, '') || '/');
        return new Response(res.body, { status: res.status, headers: h });
      }
    }

    // Sdílené stránky BEZ jazykového prefixu (privacy-policy) žijí v rootu,
    // ne pod /cs/ ani /en/ - prefixovaná cesta je nenajde. Fallback na root.
    if (res.status === 404 && path !== '/') {
      const rootRes = await env.ASSETS.fetch(request);
      if (rootRes.status !== 404) return sCsp(rootRes);
    }
    return sCsp(res);
  },
};
