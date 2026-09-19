import { createClient } from '@supabase/supabase-js'

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozbtlxhmdkhajiixknzr.supabase.co'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qnBBwiYeF4ONFmAi8V93Kw_RDvBNlEQ'

  if (!url || !anonKey) {
    throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return createClient(url, anonKey)
}
