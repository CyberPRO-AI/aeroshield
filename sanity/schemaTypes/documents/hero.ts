import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrowText',
      title: 'Eyebrow text',
      type: 'string',
      description: 'e.g. "Intelligence · Homeland Security · Defense"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [{ type: 'textSegment' }],
      description: 'Built from segments so part of the heading can be colored (e.g. "...through {accent}intelligence & HLS{/accent}").',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      description: 'Scrolls to Contact. e.g. "Request a briefing"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      description: 'Scrolls to Capabilities. e.g. "Our capabilities"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: { text?: string }[] }) {
      return { title: 'Hero', subtitle: heading?.map((s) => s.text).join(' ') }
    },
  },
})
