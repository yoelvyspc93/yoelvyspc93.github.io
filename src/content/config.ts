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

const site = defineCollection({
  type: 'data',
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
      canonicalPath: z.string(),
      ogImage: z.string(),
      locale: z.string(),
      type: z.string(),
      twitterCard: z.string(),
      language: z.string(),
    }),
    person: z.object({
      name: z.string(),
      role: z.string(),
      email: z.string(),
      location: z.string(),
      image: z.string(),
      sameAs: z.array(z.string()),
    }),
    a11y: z.object({
      skipLink: z.string(),
    }),
    navigation: z.object({
      brand: z.string(),
      brandAriaLabel: z.string(),
      ariaLabel: z.string(),
      items: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      ),
      cta: z.object({
        label: z.string(),
        href: z.string(),
        ariaLabel: z.string(),
      }),
      menu: z.object({
        openLabel: z.string(),
        closeLabel: z.string(),
        dialogLabel: z.string(),
      }),
    }),
    hero: z.object({
      eyebrow: z.string(),
      name: z.string(),
      role: z.string(),
      description: z.string(),
      ctaPrimary: z.object({
        label: z.string(),
        href: z.string(),
        ariaLabel: z.string(),
      }),
      ctaSecondary: z.object({
        label: z.string(),
        href: z.string(),
        ariaLabel: z.string(),
      }),
    }),
    about: z.object({
      title: z.string(),
      body: z.array(z.string()),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      highlightsTitle: z.string(),
      highlights: z.array(z.string()),
    }),
    projects: z.object({
      title: z.string(),
      accent: z.string(),
      ariaLabel: z.string(),
      paginationLabel: z.string(),
      prevLabel: z.string(),
      nextLabel: z.string(),
      bulletLabel: z.string(),
    }),
    experience: z.object({
      title: z.string(),
      accent: z.string(),
      timelineLabel: z.string(),
    }),
    skills: z.object({
      title: z.string(),
      accent: z.string(),
      description: z.string(),
      list: z.array(z.string()),
      cardLabelPrefix: z.string(),
      cardLabelSuffix: z.string(),
    }),
    contact: z.object({
      title: z.string(),
      body: z.array(z.string()),
      socials: z.array(
        z.object({
          platform: z.string(),
          url: z.string(),
        }),
      ),
      form: z.object({
        ariaLabel: z.string(),
        emailLabel: z.string(),
        emailPlaceholder: z.string(),
        messageLabel: z.string(),
        messagePlaceholders: z.array(z.string()),
        submitLabel: z.string(),
        to: z.string(),
        subject: z.string(),
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
    footer: z.object({
      ariaLabel: z.string(),
      copyrightName: z.string(),
      rightsLabel: z.string(),
      links: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      ),
    }),
  }),
});


export const collections = {
  projects,
  experience,
  site,
};
