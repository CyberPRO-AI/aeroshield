import { createClient, type QueryParams } from 'next-sanity'

// Falls back to a placeholder project ID when unconfigured so this module can
// still be imported (e.g. by every page via the root layout) without
// throwing — the CONFIGURED guard in queries.ts is what actually prevents a
// real fetch from being attempted against it.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  stega: { enabled: false },
})

// @sanity/client only reads cache/next options from the per-call third argument,
// never from client-construction config — route every fetch through this helper.
const devOptions = process.env.NODE_ENV === 'development' ? { cache: 'no-store' as const } : {}

export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params, devOptions)
}
