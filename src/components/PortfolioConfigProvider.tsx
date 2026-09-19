'use client'

import { useEffect, useState } from 'react'
import { PortfolioConfigContext, type Locale, type PortfolioConfig } from '@/lib/localization'

export default function PortfolioConfigProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [config, setConfig] = useState<PortfolioConfig | null>(null)

  useEffect(() => {
    let active = true
    fetch(`/api/content?locale=${locale}`, { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((remoteConfig) => { if (active && remoteConfig) setConfig(remoteConfig) })
      .catch(() => undefined)
    return () => { active = false }
  }, [locale])

  return (
    <PortfolioConfigContext.Provider value={config ? { config, locale } : null}>
      {children}
    </PortfolioConfigContext.Provider>
  )
}
