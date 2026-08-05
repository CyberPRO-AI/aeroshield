import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').url()
}

type SanityImage = { asset?: { _ref: string }; alt?: string } | null | undefined

// Static-first, CMS-optional: every image-consuming query goes through this so
// components always have something real to render even if a document/field is
// still empty in a freshly-seeded dataset.
export function imgUrl(img: SanityImage, fallback: string): string {
  if (!img?.asset) return fallback
  return urlFor(img)
}
