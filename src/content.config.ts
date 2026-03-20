import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const singleEntryParser = (entryId: string) => (text: string) => ({
  [entryId]: JSON.parse(text) as Record<string, unknown>,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    id: z.number(),
    title: z.string().min(3),
    overview: z.string().min(80),
    images: z.array(z.string()).min(1),
    technologies: z.array(z.string()).min(1),
    favorite: z.boolean(),
    website: z.url().optional(),
    author: z.string().min(2),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    summary: z.array(z.string().min(120)).min(1),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    period: z.object({
      start: z.string(),
      end: z.string(),
    }),
    company: z.string().min(2),
    rol: z.string().min(3),
    author: z.string().min(2),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    image: z.array(z.string()),
    order: z.number(),
  }),
});

const home = defineCollection({
  loader: file('./src/content/home.json', {
    parser: singleEntryParser('home'),
  }),
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      name: z.string(),
      role: z.string(),
      description: z.string(),
    }),
    about: z.object({
      title: z.string(),
      body: z.array(z.string()),
    }),
    projects: z.object({
      title: z.string(),
      accent: z.string(),
    }),
    experience: z.object({
      title: z.string(),
      accent: z.string(),
    }),
    skills: z.object({
      title: z.string(),
      accent: z.string(),
      description: z.string(),
      list: z.array(z.string()),
    }),
    contact: z.object({
      title: z.string(),
      body: z.array(z.string()),
      form: z.object({
        errors: z.object({
          emailRequired: z.string(),
          emailInvalid: z.string(),
          messageRequired: z.string(),
        }),
      }),
    }),
    faq: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      ),
    }),
  }),
});

const seo = defineCollection({
  loader: file('./src/content/seo.json', {
    parser: singleEntryParser('seo'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonical: z.string().optional(),
    ogImage: z.string(),
    ogImageAlt: z.string(),
    locale: z.string(),
    type: z.string(),
    twitterCard: z.string(),
    language: z.string(),
    updatedAt: z.string(),
  }),
});

const layout = defineCollection({
  loader: file('./src/content/layout.json', {
    parser: singleEntryParser('layout'),
  }),
  schema: z.object({
    brand: z.string(),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
    cta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    copyrightName: z.string(),
    rightsLabel: z.string(),
  }),
});

const person = defineCollection({
  loader: file('./src/content/person.json', {
    parser: singleEntryParser('person'),
  }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    location: z.string(),
    image: z.string(),
    sameAs: z.array(z.string()),
  }),
});

const contact = defineCollection({
  loader: file('./src/content/contact.json', {
    parser: singleEntryParser('contact'),
  }),
  schema: z.object({
    socials: z.array(
      z.object({
        platform: z.string(),
        url: z.string(),
      }),
    ),
    form: z.object({
      to: z.string(),
      subject: z.string(),
    }),
  }),
});

export const collections = {
  projects,
  experience,
  home,
  seo,
  layout,
  person,
  contact,
};
