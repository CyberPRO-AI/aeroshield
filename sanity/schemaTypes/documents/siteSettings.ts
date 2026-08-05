import { defineField, defineType } from 'sanity'

// Singleton: site-wide content shared across nav, footer, and contact — kept
// separate from page-section documents so there is exactly one place to edit
// the logo, email, etc. instead of duplicating them across sections.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Nav CTA label',
      type: 'string',
      description: 'e.g. "Request briefing" — the button in the header that scrolls to Contact.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'contactWebsite',
      title: 'Contact website (display text)',
      type: 'string',
      description: 'e.g. "www.aeroshieldsys.com"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactWebsiteUrl',
      title: 'Contact website (URL)',
      type: 'url',
      description: 'e.g. "https://www.aeroshieldsys.com"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gaMeasurementId',
      title: 'Google Analytics Measurement ID',
      type: 'string',
      description: 'e.g. "G-XXXXXXXXXX". Leave empty to disable analytics.',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'string',
      description: 'e.g. "Intelligence · Homeland Security · Defense"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer copyright text',
      type: 'string',
      description: 'e.g. "© AeroShield. All rights reserved."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Page title (for search engines & browser tab)',
      type: 'string',
      description: 'Shown in Google search results and the browser tab. Keep it under ~60 characters.',
      validation: (Rule) => Rule.required().max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Page description (for search engines)',
      type: 'text',
      rows: 3,
      description: 'Shown under the title in Google search results. Keep it under ~160 characters.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Shown when the site is shared on LinkedIn, X/Twitter, Slack, WhatsApp, etc. Use a wide image, ideally 1200×630px.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
