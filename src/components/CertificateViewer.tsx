'use client'

import { useState, type TouchEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ExternalLink, Minimize2, Maximize2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Certificate {
  name: string
  image: string
}

interface CertificateViewerProps {
  certificates: Certificate[]
  institutionName: string
  degree?: string
  period?: string
  description?: string
  locale: string
}

const swipeThreshold = 45

export default function CertificateViewer({
  certificates,
  institutionName,
  degree,
  period,
  description,
  locale,
}: CertificateViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  if (!certificates.length) {
    return null
  }

  const currentCertificate = certificates[currentIndex]

  const goToIndex = (index: number) => {
    const boundedIndex = (index + certificates.length) % certificates.length
    setCurrentIndex(boundedIndex)
  }

  const handleNext = () => goToIndex(currentIndex + 1)
  const handlePrevious = () => goToIndex(currentIndex - 1)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = currentCertificate.image
    const safeInstitution = institutionName.replace(/[^a-z0-9]+/gi, '_')
    const safeName = currentCertificate.name.replace(/[^a-z0-9]+/gi, '_')
    link.download = `${safeInstitution}_${safeName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const delta = touchStartX - touchEndX

    if (Math.abs(delta) >= swipeThreshold) {
      if (delta > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }

    setTouchStartX(null)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-950 text-white' : 'bg-gray-50 text-dark-900'} selection:bg-accent-cyan selection:text-dark-950 relative`}>

      {/* Global Navbar is used from Layout */}

      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => router.push(`/${locale}#education`)}
        className="fixed top-24 left-6 md:top-10 md:left-10 z-[60] w-12 h-12 rounded-full bg-dark-950/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-accent-cyan hover:text-dark-950 hover:scale-110 shadow-lg transition-all duration-300 group"
        aria-label="Back to Education"
      >
        <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
      </motion.button>

      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-4 pb-12 pt-32 sm:px-6 lg:px-10">

        <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start">

          {/* Left Column: Info */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-accent-cyan/50"></span>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan">
                  Institution
                </p>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-dark-900'}`}>
                {institutionName}
              </h1>
            </div>

            <div className="space-y-6">
              {(degree || period) && (
                <div className="flex flex-wrap gap-3">
                  {degree && (
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'
                      }`}>
                      {degree}
                    </span>
                  )}
                  {period && (
                    <span className={`px-4 py-1.5 rounded-full text-xs font-mono border ${theme === 'dark' ? 'bg-transparent border-white/10 text-gray-400' : 'bg-transparent border-gray-200 text-gray-500'
                      }`}>
                      {period}
                    </span>
                  )}
                </div>
              )}

              {description && (
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-accent-cyan text-dark-950 px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(102,217,237,0.2)] hover:shadow-[0_0_30px_rgba(102,217,237,0.4)]"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <a
                href={currentCertificate.image}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${theme === 'dark'
                  ? 'border-white/10 text-white hover:bg-white/5 hover:border-accent-cyan/50'
                  : 'border-gray-200 text-dark-900 hover:bg-gray-50 hover:border-accent-cyan'
                  }`}
              >
                <ExternalLink className="h-4 w-4" />
                Open Original
              </a>
            </div>
          </div>

          {/* Right Column: Viewer */}
          <div className="relative space-y-6">
            {/* Main Viewer */}
            <div className={`relative rounded-3xl overflow-hidden border transition-all duration-500 group ${theme === 'dark' ? 'bg-dark-900 border-white/10 shadow-2xl' : 'bg-gray-100 border-gray-200 shadow-xl'
              }`}>

              {/* Controls overlay */}
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-accent-cyan hover:text-dark-950 transition-colors"
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 flex justify-between px-4 pointer-events-none">
                {certificates.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="pointer-events-auto p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-accent-cyan hover:text-dark-950 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="pointer-events-auto p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-accent-cyan hover:text-dark-950 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div
                className={`relative w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90 h-screen' : 'aspect-[4/3] md:aspect-[16/10]'}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <Minimize2 size={24} />
                  </button>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCertificate.image}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                  >
                    <Image
                      src={currentCertificate.image}
                      alt={`${institutionName} - ${currentCertificate.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className={`object-contain drop-shadow-2xl ${isFullscreen ? '' : 'rounded-lg'}`}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Thumbnails */}
            {certificates.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide">
                {certificates.map((cert, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToIndex(idx)}
                    className={`relative flex-none w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentCertificate.image === cert.image
                      ? 'border-accent-cyan scale-105 shadow-[0_0_15px_rgba(102,217,237,0.3)]'
                      : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/20'
                      }`}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="text-center md:text-left">
              <p className="text-sm font-mono opacity-50 mb-1">CURRENT CERTIFICATE</p>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {currentCertificate.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
