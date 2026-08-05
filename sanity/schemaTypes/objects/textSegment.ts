import { defineField, defineType } from 'sanity'

// Reused wherever a heading needs part of its text in a different color —
// today that's only hero.heading ("...through {accent}intelligence & HLS{/accent}").
// Modeled as {text, modifier} segments (not Portable Text marks) to match the
// established pattern already used elsewhere in this org's Sanity schemas.
const MODIFIER_LIST = [
  { title: 'Default (inherits heading color)', value: 'default' },
  { title: 'Accent (Aeroshield green)', value: 'accent' },
]

export const textSegment = defineType({
  name: 'textSegment',
  title: 'Text segment',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modifier',
      title: 'Color',
      type: 'string',
      options: { list: MODIFIER_LIST },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { text: 'text', modifier: 'modifier' },
    prepare({ text, modifier }: { text?: string; modifier?: string }) {
      return { title: text, subtitle: modifier }
    },
  },
})
