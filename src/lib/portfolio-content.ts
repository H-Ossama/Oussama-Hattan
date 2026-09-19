import { createClient } from '@supabase/supabase-js'
import { getPortfolioConfig as getStaticPortfolioConfig, type Locale } from '@/lib/localization-server'
import type { PortfolioConfig } from '@/lib/localization'

export type EditableLocale = Locale

export function isContentDatabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export async function getEditablePortfolioConfig(locale: EditableLocale = 'en'): Promise<PortfolioConfig> {
  const fallback = getStaticPortfolioConfig(locale)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
