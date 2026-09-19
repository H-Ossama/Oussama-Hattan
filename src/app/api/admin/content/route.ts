import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getEditablePortfolioConfig } from '@/lib/portfolio-content'

const validLocales = new Set(['en', 'fr', 'de'])

async function requireUser(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const supabase = createSupabaseServerClient(token)
  if (!supabase) return { supabase: null, user: null }
  const { data: { user } } = await supabase.auth.getUser(token)
  return { supabase, user }
}

export async function GET(request: Request) {
  const { user } = await requireUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const locale = new URL(request.url).searchParams.get('locale') || 'en'
  if (!validLocales.has(locale)) return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })

  return NextResponse.json(await getEditablePortfolioConfig(locale as 'en' | 'fr' | 'de'))
}

export async function PUT(request: Request) {
  const { supabase, user } = await requireUser(request)
  if (!supabase || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const locale = body?.locale
  const content = body?.content
  if (!validLocales.has(locale) || !content || typeof content !== 'object') {
    return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 })
  }

  const { error } = await supabase.from('portfolio_content').upsert({
    locale,
    content,
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
