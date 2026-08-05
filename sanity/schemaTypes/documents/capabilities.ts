import { defineField, defineType } from 'sanity'

export const capabilities = defineType({
  name: 'capabilities',
  title: 'Capabilities',
  type: 'document',
  fields: [
    defineField({
      name: 'navLabel',
      title: 'Nav label',
      type: 'string',
      description: 'Short label used in the header nav and footer link column, e.g. "Capabilities".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'e.g. "Capabilities"',
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
      name: 'groups',
      title: 'Capability groups',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'capabilityGroup',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({
              name: 'anchorId',
              title: 'Security domain',
              type: 'string',
              description: 'Which security domain this group belongs to. Controls which Domain card links here.',
              options: {
                list: [
                  { title: 'Defense Solutions', value: 'defense-solutions' },
                  { title: 'Homeland Security', value: 'homeland-security' },
                  { title: 'Intelligence Solutions', value: 'intelligence-solutions' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'capabilityItem' }],
              validation: (Rule) => Rule.required().length(6),
            }),
          ],
          preview: { select: { title: 'label' } },
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return { title: 'Capabilities', subtitle: heading }
    },
  },
})
