import { defineCollection, z } from 'astro:content'

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    author: z.string().default('RulerKit Team'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    language: z.string(),
    locale: z.string(),
    canonical: z.string().optional(),
  }),
})

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    author: z.string().default('RulerKit Team'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    language: z.string(),
    locale: z.string(),
    canonical: z.string().optional(),
  }),
})

export const collections = {
  guides: guidesCollection,
  blog: blogCollection,
}
