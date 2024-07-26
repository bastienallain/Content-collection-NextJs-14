import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'src/posts',
  include: '**/*.md',
  schema: (z) => ({
    title: z.string(),
    description: z
      .string()
      .max(160, 'La description ne doit pas dépasser 160 caractères'),
    summary: z.string(),
    author: z.string(),
    publishDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de date doit être YYYY-MM-DD'),
    updateDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Le format de date doit être YYYY-MM-DD')
      .optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    category: z.string(),
    canonicalUrl: z.string().url().optional(),
    lang: z.string().length(2),
    timeToRead: z.number().int().positive(),
    isPublished: z.boolean(),
    featured: z.boolean().optional(),
  }),
});

export default defineConfig({
  collections: [posts],
});
