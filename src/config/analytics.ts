// Měřicí stack — jediné místo, kde se zapíná analytika.
//
// Dokud je ANALYTICS_ID prázdné:
//   • cookie lišta se NEVYKRESLÍ (web nenastavuje žádné cookies)
//   • žádný měřicí skript se nenačte
//
// Při spuštění stačí doplnit ID (GTM-XXXXXXX nebo G-XXXXXXXXXX) — tím se
// aktivuje lišta, gating i načítání skriptu. Nikde jinde se nic nemění.
//
// Souhlas: zdroj pravdy je u nás (rozhodnutí session 09, AI13009).
// localStorage klíč "ae_cookie_consent": "accept" | "reject".

// Přeneseno z aethero.cz (ověřeno v prohlížeči 2026-08-02) — kontejner GTM
// obsahuje GA4 property G-X6BCQ1B144. Záměrně stejné ID jako na starém webu,
// aby po výměně webu pod doménou nevznikl zlom v historii měření.
export const ANALYTICS_ID = 'GTM-T5GSK64';

export const CONSENT_KEY = 'ae_cookie_consent';

export const analyticsEnabled = ANALYTICS_ID.length > 0;
