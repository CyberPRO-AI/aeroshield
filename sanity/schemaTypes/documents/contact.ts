import { defineField, defineType } from 'sanity'

// Email/website are intentionally NOT re-typed here — they're read from
// siteSettings so there's exactly one place to edit them. The <form>'s field
// list/names/order stays hardcoded in the component (not CMS-editable) to
// protect Netlify Forms' build-time static-HTML detection; only copy is
// content here.
export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow label',
      type: 'string',
      description: 'e.g. "Get in touch"',
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
      name: 'successMessage',
      title: 'Success message',
      type: 'string',
      description: 'Shown after a successful form submission.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error message',
      type: 'string',
      description: 'Shown if the form submission fails. The contact email (from Site Settings) and a period are appended automatically — write this without the email, e.g. "Submission failed. Please retry, or write to"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return { title: 'Contact', subtitle: heading }
    },
  },
})
