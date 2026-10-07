import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServerClient(accessToken?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozbtlxhmdkhajiixknzr.supabase.co'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qnBBwiYeF4ONFmAi8V93Kw_RDvBNlEQ'

  if (!url || !anonKey) return null

  const cookieStore = cookies()

  return createServerClient(url, anonKey, {
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value, ...options }) } catch { /* Server Component */ }
      },
      remove(name: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value: '', ...options }) } catch { /* Server Component */ }
      },
    },
  })
}
