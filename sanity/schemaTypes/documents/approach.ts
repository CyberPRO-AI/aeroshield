import { defineField, defineType } from 'sanity'

export const approach = defineType({
  name: 'approach',
  title: 'Approach',
  type: 'document',
  fields: [
    defineField({
      name: 'navLabel',
      title: 'Nav label',
      type: 'string',
      description: 'Short label used in the header nav and footer link column, e.g. "Approach" (deliberately shorter than the eyebrow label below).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'e.g. "How we deliver"',
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
      name: 'steps',
      title: 'Steps',
      type: 'array',
      description: 'Step numbers (01-04) are derived from position, not stored.',
      of: [
        {
          type: 'object',
          name: 'approachStep',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title', media: 'photo' } },
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: 'globalReachEyebrow',
      title: 'Global reach eyebrow',
      type: 'string',
      description: 'e.g. "Global reach"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'targetValue', title: 'Target value', type: 'number', description: 'The number the count-up animation ends on, e.g. 20.', validation: (Rule) => Rule.required() }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g. "+" (can be empty)' }),
            defineField({ name: 'label', title: 'Label', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'targetValue' } },
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return { title: 'Approach', subtitle: heading }
    },
  },
})
