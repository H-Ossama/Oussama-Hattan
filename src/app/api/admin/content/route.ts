import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getEditablePortfolioConfig } from '@/lib/portfolio-content'

const validLocales = new Set(['en', 'fr', 'de'])

async function requireUser(request: Request) {
  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!token || !url || !anonKey) return { supabase: null, user: null }

  const supabase = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error) console.error('Admin token validation failed:', error.message)
  return { supabase, user: error ? null : user }
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
