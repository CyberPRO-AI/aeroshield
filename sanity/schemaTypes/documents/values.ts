import { defineField, defineType } from 'sanity'

export const values = defineType({
  name: 'values',
  title: 'Values',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'e.g. "Values"',
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
      name: 'left',
      title: 'Left column values',
      type: 'array',
      description: 'Kept separate from "Right column" — the split layout around the center graphic is a fixed design, not editor-configurable.',
      of: [{ type: 'capabilityItem' }],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'right',
      title: 'Right column values',
      type: 'array',
      of: [{ type: 'capabilityItem' }],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'centerImage',
      title: 'Center image',
      type: 'image',
      description: 'Photo shown between the left and right value columns.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return { title: 'Values', subtitle: heading }
    },
  },
})
