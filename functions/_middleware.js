/**
 * CF Pages middleware — dvě věci najednou:
 *   1) /design-system je za heslem (interní stránka, nemá být veřejná — AE-19)
 *   2) Accept-Language redirect na holém "/"
 *
 * Heslo se čte z proměnné prostředí DS_PASSWORD (Cloudflare Pages → Settings →
 * Environment variables, typ Secret). Když proměnná chybí, stránka se
 * NEOTEVŘE — ať se omylem nezveřejní tím, že někdo zapomene secret nastavit.
 *
 * Přihlášení je HTML formulář (ne Basic Auth), aby ho uměl vyplnit 1Password.
 * Po odeslání se nastaví cookie na 1 rok, takže se heslo zadává jednou.
 */

const COOKIE = 'ae_ds_auth';

function loginPage(message = '') {
  return new Response(
    `<!doctype html><html lang="cs"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Design System — přihlášení</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#000326;
       color:#e8eaf2;font:16px/1.5 -apple-system,'Segoe UI',sans-serif}
  form{background:#0C0C42;padding:32px;border-radius:12px;width:min(360px,90vw);
       box-shadow:0 18px 50px rgba(0,0,0,.45)}
  h1{margin:0 0 6px;font-size:20px}
  p{margin:0 0 20px;font-size:14px;color:#9aa1b9}
  label{display:block;font-size:13px;margin-bottom:6px;color:#9aa1b9}
  input{width:100%;padding:12px 14px;border-radius:8px;border:1px solid #333a55;
        background:#000326;color:#e8eaf2;font:inherit;margin-bottom:16px}
  input:focus{outline:none;border-color:#0DD4CD}
  button{width:100%;padding:12px;border:0;border-radius:8px;background:#0DD4CD;
         color:#00121a;font:inherit;font-weight:700;cursor:pointer}
  .err{color:#ff8080;font-size:13px;margin-bottom:12px}
</style></head><body>
<form method="POST" autocomplete="on">
  <h1>Design System</h1>
  <p>Interní stránka aethero.</p>
  ${message ? `<div class="err">${message}</div>` : ''}
  <input type="hidden" name="username" value="aethero" autocomplete="username">
  <label for="p">Heslo</label>
  <input id="p" type="password" name="password" autocomplete="current-password" required autofocus>
  <button type="submit">Vstoupit</button>
</form></body></html>`,
    { status: 401, headers: { 'content-type': 'text/html; charset=utf-8' } },
  );
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // ── 1) ochrana design systému ─────────────────────────────────────────
  if (url.pathname.startsWith('/design-system')) {
    const secret = env.DS_PASSWORD;
    if (!secret) {
      return new Response(
        'Design System je zamčený: v Cloudflare Pages chybí proměnná DS_PASSWORD.',
        { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } },
      );
    }

    const cookie = request.headers.get('Cookie') || '';
    if (cookie.includes(`${COOKIE}=ok`)) return next();

    if (request.method === 'POST') {
      const form = await request.formData();
      if (form.get('password') === secret) {
        const res = await next();
        const out = new Response(res.body, res);
        out.headers.append(
          'Set-Cookie',
          `${COOKIE}=ok; Path=/design-system; Max-Age=31536000; Secure; HttpOnly; SameSite=Lax`,
        );
        return out;
      }
      return loginPage('Špatné heslo.');
    }

    return loginPage();
  }

  // ── 2) jazykové přesměrování na holém "/" ─────────────────────────────
  if (url.pathname !== '/') return next();

  const acceptLang = request.headers.get('Accept-Language') || '';
  const preferEn = /^en\b/i.test(acceptLang);
  return Response.redirect(new URL(preferEn ? '/en/' : '/cs/', request.url).toString(), 302);
}
