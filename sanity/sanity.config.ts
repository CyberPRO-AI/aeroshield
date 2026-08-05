import type { ComponentType } from 'react'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  CogIcon,
  ComponentIcon,
  ControlsIcon,
  DiamondIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  RocketIcon,
  UsersIcon,
} from '@sanity/icons'
import { schemaTypes, SINGLETONS } from './schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

const SINGLETON_LABELS: Record<string, string> = {
  siteSettings: 'Site Settings',
  hero: 'Hero',
  whoWeAre: 'Who We Are',
  domains: 'Security Domains',
  capabilities: 'Capabilities',
  approach: 'Approach',
  values: 'Values',
  contact: 'Contact',
}

// One icon per section so the (flat, 8-item) nav list is easy to scan at a
// glance for editors who don't know the schema by name.
const SINGLETON_ICONS: Record<string, ComponentType> = {
  siteSettings: CogIcon,
  hero: RocketIcon,
  whoWeAre: UsersIcon,
  domains: EarthGlobeIcon,
  capabilities: ComponentIcon,
  approach: ControlsIcon,
  values: DiamondIcon,
  contact: EnvelopeIcon,
}

export default defineConfig({
  name: 'aeroshield',
  title: 'AeroShield CMS',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Site')
          .items(
            SINGLETONS.map((type) =>
              S.listItem()
                .title(SINGLETON_LABELS[type])
                .icon(SINGLETON_ICONS[type])
                .id(type)
                .child(S.document().schemaType(type).documentId(type))
            )
          ),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Every document in this schema is a fixed singleton seeded once by the
    // migration script — there is never a legitimate reason to create a
    // second one, duplicate one, or delete one. Without this, editors get a
    // generic "Duplicate"/"Delete" menu on every document that can silently
    // break the live site (delete the singleton the homepage queries by
    // fixed _id) or leave a confusing orphaned copy (duplicate: the copy
    // never renders anywhere, since the page always queries the fixed _id).
    actions: (prev, context) =>
      SINGLETONS.includes(context.schemaType)
        ? prev.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
    newDocumentOptions: (prev) => prev.filter((option) => !SINGLETONS.includes(option.templateId)),
  },
})
