import { defineField, defineType } from 'sanity'

export const domains = defineType({
  name: 'domains',
  title: 'Security Domains',
  type: 'document',
  fields: [
    defineField({
      name: 'navLabel',
      title: 'Nav label',
      type: 'string',
      description: 'Short label used in the header nav and footer link column, e.g. "Domains" (deliberately shorter than the eyebrow label below).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'e.g. "Security domains"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introText',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Domain cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'domainItem',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'image', options: { accept: 'image/svg+xml' }, validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({
              name: 'anchorHref',
              title: 'Links to (Capabilities group)',
              type: 'string',
              description: 'Which Capabilities group this card\'s "Explore capabilities" button jumps to.',
              options: {
                list: [
                  { title: 'Defense Solutions', value: '#defense-solutions' },
                  { title: 'Homeland Security', value: '#homeland-security' },
                  { title: 'Intelligence Solutions', value: '#intelligence-solutions' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'title', media: 'icon' } },
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return { title: 'Security Domains', subtitle: heading }
    },
  },
})
