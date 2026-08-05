import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Simpler than a multi-page site's revalidate route: every section lives on
// the single homepage, so any publish just needs to revalidate '/'. Configure
// this as a Sanity webhook (Studio → API → Webhooks) pointing at this route's
// deployed URL with ?secret=<SANITY_REVALIDATE_SECRET> once the site is live —
// out of scope while everything is still local.
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}
