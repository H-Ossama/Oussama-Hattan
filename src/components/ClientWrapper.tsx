'use client'

import { useState, useEffect, ReactNode, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useNavigation } from '@/contexts/NavigationContext'
import { PortfolioConfigContext, type Locale, type PortfolioConfig } from '@/lib/localization'
import { useEffect as useContentEffect, useState as useContentState } from 'react'

// Dynamically import LoadingScreen to reduce initial bundle size
const LoadingScreen = dynamic(() => import('./LoadingScreen'), {
  ssr: false
})

interface ClientWrapperProps {
  children: ReactNode
  locale?: Locale
  initialConfig?: PortfolioConfig
}

const ClientWrapper = ({ children, locale = 'en', initialConfig }: ClientWrapperProps) => {
  const { setIsLoading: setGlobalIsLoading } = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showInitialLoading, setShowInitialLoading] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark')
  const [config, setConfig] = useContentState<PortfolioConfig>(initialConfig as PortfolioConfig)

  useContentEffect(() => {
    let active = true
    fetch(`/api/content?locale=${locale}`, { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((remoteConfig) => { if (active && remoteConfig) setConfig(remoteConfig) })
      .catch(() => undefined)
    return () => { active = false }
  }, [locale])

  useEffect(() => {
    // Get the theme from localStorage or system preference - optimized version
    const getInitialTheme = (): 'dark' | 'light' => {
      try {
        const savedTheme = localStorage.getItem('portfolio-theme')
        if (savedTheme === 'dark' || savedTheme === 'light') {
          return savedTheme
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } catch {
        return 'dark'
      }
    }

    // Set the current theme for the loading screen
    setCurrentTheme(getInitialTheme())

    // Skip the loader during client-side navigation and browser back/forward.
    // Show it on the first visit and on a true browser refresh.
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const isBrowserRefresh = navigationEntry?.type === 'reload'
    const hasLoadedThisSession = sessionStorage.getItem('portfolio-session-ready') === 'true'
    // Show on first entry and deliberate browser refreshes, never on route transitions.
    const shouldShowLoader = isBrowserRefresh || !hasLoadedThisSession
    sessionStorage.setItem('portfolio-session-ready', 'true')

    if (!shouldShowLoader) {
      setShowInitialLoading(false)
      setIsLoading(false)
      setGlobalIsLoading(false)
      setIsInitialized(true)
    } else {
      setShowInitialLoading(true)
      setIsLoading(true)
      // Reduce initial loading delay significantly for faster first paint
      const timer = setTimeout(() => {
        setIsInitialized(true)
      }, 10) // Reduced from 100ms to 10ms

      return () => clearTimeout(timer)
    }
  }, [setGlobalIsLoading])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    setGlobalIsLoading(false)
  }, [setGlobalIsLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && isInitialized && showInitialLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} theme={currentTheme} />
        )}
      </AnimatePresence>

      {(!isLoading || !showInitialLoading) && (
        <PortfolioConfigContext.Provider value={{ config, locale }}>
          <div className="min-h-screen">{children}</div>
        </PortfolioConfigContext.Provider>
      )}
    </>
  )
}

export default ClientWrapper
