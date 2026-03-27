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
