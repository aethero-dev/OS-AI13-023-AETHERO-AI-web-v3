// Obsahové kolekce — články blogu žijí v repu, ne v CMS.
//
// PROČ (rozhodnutí DK 2026-08-02, AE-49): Storyblok držel jediné — blog.
// Na plánu Starter měl 1 sedadlo, takže se do něj kromě API stejně nikdo
// nedostal; obrázky visely na cizím CDN a token bylo nutné hlídat.
// Články jsou teď obyčejné .md soubory: verzované v gitu, editovatelné
// i z webového rozhraní GitHubu (Bára nepotřebuje nic lokálně) a po commitu
// je Cloudflare sám nasadí.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    perex: z.string(),
    /** Např. „7 min" — v hlavičce článku i ve výpisu. */
    readTime: z.string().default('5 min'),
    /** Datum vydání; řídí i pořadí ve výpisu (nejnovější nahoře). */
    date: z.date(),
    /** Úvodní obrázek, cesta v /public. */
    image: z.string().optional(),
    /** true = článek se nikam nevygeneruje. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
