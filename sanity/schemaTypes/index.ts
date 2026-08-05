import { capabilityItem } from './objects/capabilityItem'
import { textSegment } from './objects/textSegment'
import { siteSettings } from './documents/siteSettings'
import { hero } from './documents/hero'
import { whoWeAre } from './documents/whoWeAre'
import { domains } from './documents/domains'
import { capabilities } from './documents/capabilities'
import { approach } from './documents/approach'
import { values } from './documents/values'
import { contact } from './documents/contact'

export const schemaTypes = [
  // Objects (reusable shapes)
  capabilityItem,
  textSegment,
  // Documents (singletons)
  siteSettings,
  hero,
  whoWeAre,
  domains,
  capabilities,
  approach,
  values,
  contact,
]

export const SINGLETONS = ['siteSettings', 'hero', 'whoWeAre', 'domains', 'capabilities', 'approach', 'values', 'contact']
