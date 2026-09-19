import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const supabase = createSupabaseServerClient(token)
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 })

  const { data: { user } } = await supabase.auth.getUser(token)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file')
  const kind = formData.get('kind') === 'resume' ? 'resumes' : 'projects'
  const locale = String(formData.get('locale') || 'en')
  if (!['en', 'fr', 'de'].includes(locale)) return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  if (!(file instanceof File)) return NextResponse.json({ error: 'A file is required' }, { status: 400 })
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Maximum file size is 10MB' }, { status: 413 })

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, '-')
  const path = `${kind}/${locale}/${Date.now()}-${safeName}`
  const { error } = await supabase.storage.from('portfolio-assets').upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
