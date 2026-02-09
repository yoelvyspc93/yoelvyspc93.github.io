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

const home = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      name: z.string(),
      role: z.string(),
      description: z.string(),
      ctaPrimaryLabel: z.string(),
      ctaSecondaryLabel: z.string(),
    }),
    about: z.object({
      title: z.string(),
      body: z.array(z.string()),
      highlightsTitle: z.string(),
      highlights: z.array(z.string()),
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
        emailLabel: z.string(),
        emailPlaceholder: z.string(),
        messageLabel: z.string(),
        messagePlaceholders: z.array(z.string()),
        submitLabel: z.string(),
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
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonicalPath: z.string(),
    ogImage: z.string(),
    locale: z.string(),
    type: z.string(),
    twitterCard: z.string(),
    language: z.string(),
  }),
});

const navigation = defineCollection({
  type: 'data',
  schema: z.object({
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
});

const footer = defineCollection({
  type: 'data',
  schema: z.object({
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
});

const person = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    location: z.string(),
    image: z.string(),
    sameAs: z.array(z.string()),
  }),
});

const a11y = defineCollection({
  type: 'data',
  schema: z.object({
    skipLink: z.string(),
  }),
});

const sections = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      ctaPrimaryHref: z.string(),
      ctaPrimaryAriaLabel: z.string(),
      ctaSecondaryHref: z.string(),
      ctaSecondaryAriaLabel: z.string(),
    }),
    about: z.object({
      imageSrc: z.string(),
      imageAlt: z.string(),
    }),
    projects: z.object({
      ariaLabel: z.string(),
      paginationLabel: z.string(),
      prevLabel: z.string(),
      nextLabel: z.string(),
      bulletLabel: z.string(),
    }),
    experience: z.object({
      timelineLabel: z.string(),
    }),
    skills: z.object({
      cardLabelPrefix: z.string(),
      cardLabelSuffix: z.string(),
    }),
    contact: z.object({
      formAriaLabel: z.string(),
      socialsLabel: z.string(),
    }),
  }),
});

const contact = defineCollection({
  type: 'data',
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
  navigation,
  footer,
  person,
  a11y,
  sections,
  contact,
};
