import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    shortDescription: z.string(),
    imageUrl: z.string(),
    techStack: z.array(z.string()),
    isFavorite: z.boolean(),
    websiteUrl: z.string().url().optional(),
    effects: z.object({
      start: z.string(),
      end: z.string(),
      opacity: z.number(),
    }),
    detailedDescription: z.array(z.string()),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    period: z.string(),
    company: z.string(),
    rol: z.string(),
  }),
});


export const collections = {
  projects,
  experience,
};
