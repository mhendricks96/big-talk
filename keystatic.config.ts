import { config, collection, fields } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'production'
      ? {
          kind: 'github',
          repo: { owner: 'mhendricks96', name: 'big-talk' },
        }
      : { kind: 'local' },

  ui: {
    brand: { name: 'Big Talk Admin' },
  },

  collections: {
    books: collection({
      label: 'Books',
      slugField: 'title',
      path: 'src/content/books/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            description: 'The URL slug, auto-generated from the title. Edit if needed.',
          },
        }),

        author: fields.text({
          label: 'Author',
          description: 'Format: "Last, First" — e.g. "Westover, Tara". For multiple authors use "; " as separator.',
        }),

        publishYear: fields.integer({
          label: 'Publish Year',
          validation: { min: 1000, max: 2100 },
        }),

        entryDate: fields.date({
          label: 'Entry Date',
          description: 'The date this review was added.',
          defaultValue: { kind: 'today' },
        }),

        cover: fields.image({
          label: 'Cover Image',
          directory: 'src/content/books/images',
          publicPath: './images/',
        }),

        coverAlt: fields.text({
          label: 'Cover Alt Text',
          description: 'Describe the cover for screen readers. Usually "{Book Title} book cover".',
        }),

        type: fields.select({
          label: 'Type',
          description: 'Fiction or Non-Fiction.',
          options: [
            { label: 'Fiction', value: 'Fiction' },
            { label: 'Non-Fiction', value: 'Non-Fiction' },
          ],
          defaultValue: 'Non-Fiction',
        }),

        authorIdentity: fields.multiselect({
          label: 'Author Identity',
          description: "The author's identity, used for filtering. Leave blank if not applicable.",
          options: [
            { label: 'Non-American', value: 'Non-American' },
            { label: 'Black Author', value: 'Black Author' },
            { label: 'Woman Author', value: 'Woman Author' },
            { label: 'Queer', value: 'Queer' },
            { label: 'AAPI', value: 'AAPI' },
            { label: 'Indigenous', value: 'Indigenous' },
          ],
        }),

        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            description:
              'Freeform topic/theme tags (everything other than Type and Author Identity). You can create new tags or reuse existing ones. Current tags in use include: Memoir, Self Help, Social Justice, For Therapists, Race, History, Chronic Illness & Disability, Queer Stories, Relationships, ADHD, Feminism, Activism, Theory, Family Therapy, Fantasy, Sci-Fi, Horror, Politics, Ableism, Religious Trauma, Parent Trauma, Sibling Abuse, Anthology, Essays, Sociology, Language, Religion, Transformative Justice, Obsession, OCD, Sobriety, Emotional Avoidance, DEI, Environment, PNW History, White Supremacy, Strategies for Neurodivergents, Teens, Relational Repair, Couples and Families, Fairy Tale Retelling, Adventure, Witches, Post-Apocalypse, Dystopian, Speculative Fiction, Romance, Female Main Characters, Health & Medicine, Disability Justice.',
            itemLabel: (props) => props.value || 'Tag',
          }
        ),

        draft: fields.checkbox({
          label: 'Save as draft (will not appear on the site)',
          defaultValue: false,
        }),

        content: fields.mdx({
          label: 'Review',
          description: 'Your review of the book.',
        }),
      },
    }),

    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Event Title' } }),

        subtitle: fields.text({
          label: 'Subtitle',
          description: 'Short descriptive line shown under the title',
        }),

        date: fields.text({
          label: 'Date',
          description: 'e.g. "April 21st, 2025" — leave blank for recurring events',
        }),

        time: fields.text({
          label: 'Time',
          description: 'e.g. "12:00-1:00pm PCT"',
        }),

        schedule: fields.text({
          label: 'Schedule',
          description: 'For recurring events only, e.g. "Weekly on Thursdays". Leave blank for one-time events.',
        }),

        location: fields.text({
          label: 'Location',
          description: 'e.g. "Zoom Webinar" or "Beaverton, OR"',
        }),

        eventType: fields.select({
          label: 'Event Type',
          options: [
            { label: 'Webinar', value: 'webinar' },
            { label: 'In-Person', value: 'in-person' },
            { label: 'Recurring Group', value: 'recurring-group' },
          ],
          defaultValue: 'webinar',
        }),

        cost: fields.text({
          label: 'Cost',
          description: 'e.g. "$20 Suggested Fee, sliding scale available"',
        }),

        facilitator: fields.text({
          label: 'Facilitated By',
          description: 'e.g. "Alexandra Walker"',
        }),

        image: fields.image({
          label: 'Event Flyer / Image',
          directory: 'public/images/events',
          publicPath: '/images/events/',
        }),

        imageAlt: fields.text({
          label: 'Image Alt Text',
          description: 'Describe the image for screen readers',
        }),

        ctaLabel: fields.select({
          label: 'Button Text',
          options: [
            { label: 'Register Now', value: 'Register Now' },
            { label: 'Learn More', value: 'Learn More' },
            { label: 'Sign Up', value: 'Sign Up' },
            { label: 'Contact', value: 'Contact' },
          ],
          defaultValue: 'Learn More',
        }),

        showInNav: fields.checkbox({
          label: 'Show in navigation dropdown',
          defaultValue: true,
        }),

        registrationType: fields.select({
          label: 'Registration Type',
          description: 'Stripe = sliding scale payment form. Contact = contact button only.',
          options: [
            { label: 'Contact Button', value: 'contact' },
            { label: 'Stripe Payment Form', value: 'stripe' },
          ],
          defaultValue: 'contact',
        }),

        contactNote: fields.text({
          label: 'Contact Note',
          description: 'Optional note shown above the contact button, e.g. "Please email awalker@... to register"',
        }),

        stripeOptions: fields.array(
          fields.object({
            label: fields.text({ label: 'Option Label', description: 'e.g. "$20 Bigger talk"' }),
            value: fields.text({ label: 'Value', description: 'e.g. "20"' }),
            stripeUrl: fields.url({ label: 'Stripe Payment URL', description: 'Leave blank for the $0 free option' }),
          }),
          {
            label: 'Stripe Pricing Options',
            description: 'Only needed for Stripe payment events',
            itemLabel: (props) => props.fields.label.value || 'Option',
          }
        ),

        showSlidingScale: fields.checkbox({
          label: 'Show sliding scale guidelines section',
          defaultValue: false,
        }),

        draft: fields.checkbox({
          label: 'Save as draft (will not appear on the site)',
          defaultValue: false,
        }),

        description: fields.markdoc({
          label: 'Description',
          description: 'Full event description, details, and any additional notes',
        }),
      },
    }),
  },
});
