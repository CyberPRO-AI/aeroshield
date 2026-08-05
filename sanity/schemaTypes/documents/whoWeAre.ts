import { defineField, defineType } from 'sanity'

export const whoWeAre = defineType({
  name: 'whoWeAre',
  title: 'Who We Are',
  type: 'document',
  fields: [
    defineField({
      name: 'navLabel',
      title: 'Nav label',
      type: 'string',
      description: 'Short label used in the header nav and footer link column, e.g. "Who we are".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'e.g. "Who we are" (section number is derived automatically from page order).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'highlightQuote',
      title: 'Highlight quote',
      type: 'text',
      rows: 3,
      description: 'Rendered in the green-tinted callout box.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return { title: 'Who We Are', subtitle: heading }
    },
  },
})
