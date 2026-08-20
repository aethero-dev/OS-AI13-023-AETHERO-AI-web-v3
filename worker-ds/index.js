/**
 * Brána design systému. WEB-STANDARD kap. 2 + 16: DS je interní stránka,
 * ven nikdy nejde bez hesla.
 *
 * Basic auth schválně: prohlížeč si ji drží po dobu session a správci hesel
 * (1Password) ji umí vyplnit. Přihlašovací formulář by byl hezčí, ale je to
 * další kus kódu, který může selhat — a tohle je stránka pro nás, ne pro klienty.
 */

const REALM = 'Basic realm="Aethero design system", charset="UTF-8"';

/** Porovnání nezávislé na délce shody — ať heslo nejde uhádnout po znacích. */
function shoduje(a, b) {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  if (x.length !== y.length) return false;
  let rozdil = 0;
  for (let i = 0; i < x.length; i++) rozdil |= x[i] ^ y[i];
  return rozdil === 0;
}

export default {
  async fetch(request, env) {
    // Bez nastaveného hesla se dovnitř nepustí NIKDO. Opačné chování
    // (chybí heslo → pustit) je klasická díra, co vznikne při migraci
    // nebo když se zapomene `wrangler secret put`.
    if (!env.DS_HESLO) {
      return new Response("Design systém nemá nastavené heslo. Nastav DS_HESLO.", {
        status: 503,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    const hlavicka = request.headers.get("Authorization") || "";
    if (hlavicka.startsWith("Basic ")) {
      let dekodovano = "";
      try { dekodovano = atob(hlavicka.slice(6)); } catch { /* poškozená hlavička */ }
      const heslo = dekodovano.slice(dekodovano.indexOf(":") + 1);
      if (shoduje(heslo, env.DS_HESLO)) return env.ASSETS.fetch(request);
    }

    return new Response("Aethero design system — přístup jen s heslem.", {
      status: 401,
      headers: { "WWW-Authenticate": REALM, "content-type": "text/plain; charset=utf-8" },
    });
  },
};
