import { defineCollection, z } from 'astro:content';

const bookReviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishYear: z.number().int(),
    entryDate: z.date(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    schedule: z.string().optional(),
    location: z.string().optional(),
    eventType: z.enum(['webinar', 'in-person', 'recurring-group']).default('webinar'),
    cost: z.string().optional(),
    facilitator: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    ctaLabel: z
      .enum(['Register Now', 'Learn More', 'Sign Up', 'Contact'])
      .default('Learn More'),
    showInNav: z.boolean().default(true),
    registrationType: z.enum(['contact', 'stripe']).default('contact'),
    contactNote: z.string().optional(),
    stripeOptions: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          stripeUrl: z.string().optional(),
        })
      )
      .optional(),
    showSlidingScale: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { events, books: bookReviews };
