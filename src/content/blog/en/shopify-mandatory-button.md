---
title: "Mandatory Button in Shopify: Don't Wait for a Problem"
perex: "How to correctly set up the mandatory withdrawal button in Shopify and avoid compliance issues. Legislation requires implementation by June 19, 2026."
readTime: "7 min"
date: 2026-05-01
image: "/blog/povinne-tlacitko-odstoupit-od-smlouvy2x.webp"
---

From June 2026, the mandatory withdrawal button is set to apply to Czech e-shops. Here's a practical guide to preparing for it in Shopify - without an unnecessary extra app.

## E-shops can tune the buying process down to the last detail

The colour of the cart button. The shipping copy. The order of payment methods. The discount popup. Every click gets measured, because every click can mean revenue.

Then a customer wants to withdraw from the contract - and suddenly the "shopping archaeology" begins. Where did they write it? FAQ. Terms and conditions. A PDF form. An email to support. Waiting.

The new obligation exposes that gap nicely. The mandatory withdrawal button isn't meant to be one more legal item on the website - it's meant to give the customer a **clear online route** to submitting a withdrawal. According to [Právní prostor](https://www.pravniprostor.cz/clanky/obcanske-pravo/nova-tlacitkova-povinnost-pro-e-shopy), the obligation must be implemented by **19 June 2026** at the latest. At the time of writing the amendment is still in the legislative process, so it's worth verifying the exact wording with a lawyer before you publish and implement.

For Shopify store owners, though, something else matters: you can sort out the technical groundwork right now.

### This isn't about a button. It's about the whole process

The biggest mistake is thinking the mandatory button means "we'll add a link somewhere". When a customer clicks **Withdraw from contract**, several things have to happen at once:

- they find the right order,
- they select the items,
- they submit the request,
- they get a confirmation,
- and the merchant knows what to do next.

The button is only the entry point. If there's no comprehensible process behind it, you haven't solved the problem - you've just given it nicer packaging. That's exactly why we wouldn't start a Shopify store with an external app. Let's first look at what Shopify does natively.

## What Shopify does natively

Shopify has a feature called **Self-serve returns**. It lets the customer submit a return request directly through their customer account or the order status page. The customer logs in, picks the order, the items and a reason for the return; the merchant then sees the request in the admin.

So are we done? No. Self-serve returns don't automatically give you a legally complete solution for the Czech button obligation. But they are a very good technical foundation.

**Step one:** you'll find the setting in the Shopify admin under **Settings → Customer accounts**, where you enable [Self-serve returns](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns/setup).

> Watch out for older customer accounts. Shopify states that self-serve returns don't work with legacy customer accounts. If you're using them, you'll need to move to the new Customer accounts, or solve the process another way.

**Step two:** [Return rules](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/return-rules) under **Settings → Policies → Return rules**. This is where you set how long the customer has to submit a request. Shopify offers fourteen, thirty or ninety days, or a custom value. It pays to slow down here: the window in Shopify has to match your terms and conditions and what genuinely applies to your goods.

### Where should the button go?

The mandatory button must not be hidden where nobody looks - don't leave it only in the terms and conditions.

In practice it makes sense to create a dedicated page along the lines of "Returns and withdrawal from contract" and put a clear **Withdraw from contract** button on it. The button can then lead to the customer accounts URL, where the customer starts the self-serve process. We'd recommend adding the same link to the footer and, where relevant, the help centre.

The minimum you need to test:

- the button is visible on mobile,
- the customer definitely understands it's about withdrawing from the contract,
- the process works for a test order,
- a confirmation email arrives,
- the team knows where to find the request in the admin.

This isn't legal cosmetics. It creates a good customer experience in the less pleasant part of shopping.

## Confirmation matters more than it looks

According to legal experts, the process has to account for confirming the withdrawal.

In Shopify it makes sense to go through the notifications under **Settings → Notifications → Returns**. After submitting, the customer should know you've received the request, what it covers and what happens next. If the email is to work as a legally relevant confirmation, a lawyer should check the wording. This is often where the difference between "we have a button" and "we have a working process" is decided.

### When Shopify's native options may not be enough

Self-serve returns are a good start for a regular store selling physical goods. That doesn't mean they cover everything. Watch out in particular for:

- digital products,
- services and subscriptions,
- personalised goods,
- ranges where exemptions from withdrawal apply.

You also need to verify how the process behaves with unfulfilled, partially fulfilled or unusual orders. The mandatory button in Shopify therefore isn't a question of "switch on one feature and move on". It's a combination of settings, copy, UX and internal operations.

## What to do now

Don't leave it to the last minute.

1. Enable Self-serve returns in test mode.
2. Configure Return rules.
3. Create a withdrawal page.
4. Add a clear button.
5. Walk the whole process through the customer's eyes.
6. And only at the very end, work out whether you need a custom theme change, a legal review or an extra app.

Shopify gives us the foundation. But the responsibility for making sure the customer genuinely finds a comprehensible route to withdrawing from the contract stays with us.

## Sources

- [Právní prostor - The new "button" obligation for e-shops (in Czech)](https://www.pravniprostor.cz/clanky/obcanske-pravo/nova-tlacitkova-povinnost-pro-e-shopy)
- [Shopify Help Center - Self-serve returns](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns/setup)
- [Shopify Help Center - Return rules](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/return-rules)
