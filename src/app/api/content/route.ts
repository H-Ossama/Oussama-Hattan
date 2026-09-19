import { NextResponse } from 'next/server'
import { getEditablePortfolioConfig, type EditableLocale } from '@/lib/portfolio-content'

const locales = new Set<EditableLocale>(['en', 'fr', 'de'])

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') as EditableLocale
  const safeLocale = locales.has(locale) ? locale : 'en'
  const content = await getEditablePortfolioConfig(safeLocale)

  return NextResponse.json(content, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
