---
title: "Translating Payment Methods in Shopify When Translate & Adapt Doesn't Help"
perex: "A practical guide to translating payment method names in Shopify outside of standard tools — no apps needed, using CSV export and import."
readTime: "3 min"
date: 2025-10-05
image: "/blog/platebni-brany-v-shopify-preklad-v2.webp"
---

## The situation

You need to translate payment gateway names in Shopify (e.g., "Cash on delivery") into your local language, but the standard Translate & Adapt app doesn't cover payment methods or the translation isn't working.

## Step-by-step solution

### 1. Export language files

- Open your Shopify admin
- Go to Settings -> Languages
- Click Export
- Select 'Selected Content'
- Focus on 'Payment gateways'
- Download the CSV file

### 2. Translate the content

Open the downloaded CSV file and find the 'Translated content' column. Fill in your translations directly here.

**Tip:** Use AI models like ChatGPT or DeepL instead of translating manually — it saves time and the results are accurate.

### 3. Fix for macOS users

Problem: The CSV may be exported with semicolons instead of commas, which causes import errors.

Solution: Open the file in TextEdit, find and replace all semicolons with commas, and save the file.

### 4. Import the translation

- Go back to Settings -> Languages
- Select Import
- Upload the modified file

## Recommendations

- Always check CSV formatting before importing
- Keep a copy of the original export as a backup
- After importing, test how payment methods display in the checkout process
