import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    images: z.array(z.string()),
    technologies: z.array(z.string()),
    favorite: z.boolean(),
    website: z.string().url().optional(),
    summary: z.array(z.string()),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    period: z.object({
      start: z.string(),
      end: z.string(),
    }),
    company: z.string(),
    rol: z.string(),
    image: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = {
  projects,
  experience,
};
