import { defineField, defineType } from 'sanity'

// Reused by both the Domains section's teaser cards AND the Capabilities
// section's nested group items — same shape (icon + title + description),
// even though those two sections are kept as independent content per an
// explicit decision to accept some copy duplication between them.
export const capabilityItem = defineType({
  name: 'capabilityItem',
  title: 'Capability item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description:
        'SVG only. Rendered via <img>/CSS mask on the site — never inlined as raw markup — so an uploaded file\'s embedded scripts can never execute.',
      options: {
        accept: 'image/svg+xml',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
  },
})
