// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
var posts = defineCollection({
  name: "posts",
  directory: "src/posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    description: z.string().max(160, "La description ne doit pas d\xE9passer 160 caract\xE8res"),
    summary: z.string(),
    author: z.string(),
    publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Le format de date doit \xEAtre YYYY-MM-DD"),
    updateDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Le format de date doit \xEAtre YYYY-MM-DD").optional(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()),
    category: z.string(),
    canonicalUrl: z.string().url().optional(),
    lang: z.string().length(2),
    timeToRead: z.number().int().positive(),
    isPublished: z.boolean(),
    featured: z.boolean().optional()
  })
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
