/**
 * Brána design systému. WEB-STANDARD kap. 2 + 16: DS je interní stránka,
 * ven nikdy nejde bez hesla.
 *
 * Přihlašovací FORMULÁŘ, ne Basic auth: s nativním dialogem prohlížeče si
 * správci hesel neporadí spolehlivě, s formulářem ano. Vzor je ověřený —
 * `ae-blocks-katalog`, `farmatumovi/functions/_middleware.js` (Pages Functions);
 * tohle je jeho varianta pro Workers, kde se místo `next()` sahá na `env.ASSETS`.
 *
 * Poznatek z pilgerlandu, který se sem přenesl: vzorový middleware měl
 * `if (!pass) return next()` — bez nastaveného secretu tedy pouštěl dál
 * a mezi prvním deployem a `wrangler secret put` byla stránka veřejná.
 * Tady je proto 503, nikdy průchod.
 *
 * Titulek stránky je „AE web Design System" schválně: pod tímhle jménem si
 * položku uloží správce hesel (bere ho z <title>). Když se změní, rozejde se
 * to s tím, co má DK v 1Passwordu — měnit jen vědomě.
 *
 * POZOR: bez `"run_worker_first": true` v configu tahle brána NEPLATÍ —
 * Cloudflare naservíruje nalezený soubor dřív, než Worker vůbec spustí.
 */

const COOKIE = "ae_ds_auth";

// Půl roku. Delší platnost = pohodlnější, ale heslo se za tu dobu stihne
// dostat do chatů, screenshotů a poznámek; půlrok je kompromis (DK 2026-08-20).
const PLATNOST = 60 * 60 * 24 * 182;

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function prihlaseni(spatne = false) {
  return new Response(
    `<!doctype html><html lang="cs"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>AE web Design System</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<style>
:root{color-scheme:dark}
body{font-family:Montserrat,system-ui,sans-serif;display:grid;place-items:center;
min-height:100vh;margin:0;background:#0e0e12;color:#f4f4f6}
form{background:#17171d;padding:40px;border-radius:4px;border:1px solid #26262f;
display:grid;gap:14px;min-width:300px}
strong{font-size:15px;letter-spacing:.02em}
small{color:#8a8a99;font-size:13px;margin-top:-6px}
input{font:inherit;padding:12px 14px;border:1px solid #33333f;border-radius:3px;
background:#0e0e12;color:#f4f4f6}
input:focus-visible{outline:2px solid #6c63ff;outline-offset:1px}
button{font:inherit;font-weight:600;padding:13px;border:0;border-radius:3px;
background:#6c63ff;color:#fff;cursor:pointer}
button:hover{background:#5a51f0}
.err{color:#ff8b7d;font-size:14px;margin:0}
</style></head><body>
<form method="post">
<strong>AE web Design System</strong>
<small>Interní stránka. Přihlášení platí půl roku.</small>
${spatne ? '<p class="err">Nesprávné heslo, zkuste to znovu.</p>' : ""}
<input type="password" name="password" placeholder="Heslo" autofocus
       autocomplete="current-password" required>
<button type="submit">Zobrazit design systém</button>
</form></body></html>`,
    { status: 401, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

export default {
  async fetch(request, env) {
    const heslo = env.DS_HESLO;
    // Bez hesla nesmí dovnitř NIKDO. Opačné chování (chybí heslo → pustit)
    // je díra, co vznikne přesně mezi prvním deployem a nastavením secretu.
    if (!heslo) {
      return new Response("Design systém nemá nastavené heslo (DS_HESLO).", {
        status: 503,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // Ikony pouštíme i nepřihlášenému: přihlašovací stránka je sama potřebuje
    // (a s nimi i správce hesel, když si položku ukládá). Je to značkové logo,
    // ne obsah design systému — nic se tím neprozradí.
    const cesta = new URL(request.url).pathname;
    if (/^\/(favicon\.(svg|ico)|favicon-\d+x\d+\.png|apple-touch-icon\.png)$/.test(cesta)) {
      return env.ASSETS.fetch(request);
    }

    const otisk = await sha256(heslo);
    const cookies = request.headers.get("cookie") || "";
    if (new RegExp(`${COOKIE}=([a-f0-9]{64})`).exec(cookies)?.[1] === otisk) {
      return env.ASSETS.fetch(request);
    }

    if (request.method === "POST") {
      const form = await request.formData().catch(() => null);
      if (form?.get("password") === heslo) {
        // Po přihlášení redirect, ne rovnou obsah: obnovení stránky by jinak
        // znovu odesílalo formulář a prohlížeč by se ptal na potvrzení.
        return new Response(null, {
          status: 303,
          headers: {
            location: new URL(request.url).pathname,
            "set-cookie": `${COOKIE}=${otisk}; Path=/; Max-Age=${PLATNOST}; HttpOnly; Secure; SameSite=Lax`,
          },
        });
      }
      return prihlaseni(true);
    }

    return prihlaseni();
  },
};
