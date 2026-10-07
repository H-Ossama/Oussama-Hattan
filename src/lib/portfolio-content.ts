import { createClient } from '@supabase/supabase-js'
import { getPortfolioConfig as getStaticPortfolioConfig, type Locale } from '@/lib/localization-server'
import type { PortfolioConfig } from '@/lib/localization'

export type EditableLocale = Locale

export function isContentDatabaseConfigured() {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozbtlxhmdkhajiixknzr.supabase.co') &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qnBBwiYeF4ONFmAi8V93Kw_RDvBNlEQ'),
  )
}

export async function getEditablePortfolioConfig(locale: EditableLocale = 'en'): Promise<PortfolioConfig> {
  const fallback = getStaticPortfolioConfig(locale)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozbtlxhmdkhajiixknzr.supabase.co'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qnBBwiYeF4ONFmAi8V93Kw_RDvBNlEQ'

  if (!url || !anonKey) return fallback as PortfolioConfig

  const supabase = createClient(url, anonKey, { auth: { persistSession: false } })
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('content')
    .eq('locale', locale)
    .maybeSingle()

  if (error || !data?.content) return fallback as PortfolioConfig
  return data.content as PortfolioConfig
}
