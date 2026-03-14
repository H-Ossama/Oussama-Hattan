import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import ClientWrapper from '@/components/ClientWrapper'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScrollEnhancer from '@/components/SmoothScrollEnhancer'
import DevelopmentBanner from '@/components/DevelopmentBanner'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { generateHomePageStructuredData } from '@/lib/structured-data'
import { getPortfolioConfig } from '@/lib/localization-server'
import { Metadata } from 'next'
// Static imports for critical components to prevent loading errors
import RevealAnimation from '@/components/RevealAnimation'
import Expertise from '@/components/sections/Expertise'
import EnhancedProjects from '@/components/sections/EnhancedProjects'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'
import About from '@/components/sections/About'

// Import the AdvancedPerformanceOptimizer component
const AdvancedPerformanceOptimizer = dynamic(() => import('@/components/AdvancedPerformanceOptimizer'), {
  ssr: false
})

// Lazy load heavy background components
const ProgrammingSymbolsBackground = dynamic(() => import('@/components/ProgrammingSymbolsBackground'), {
  ssr: false,
  loading: () => null
})

const SmokeEffect = dynamic(() => import('@/components/SmokeEffect'), {
  ssr: false,
  loading: () => null
})



// Define supported locales
const locales = ['en', 'fr', 'de'] as const
type Locale = typeof locales[number]

interface LocalePageProps {
  params: {
    locale: string
  }
}

// Generate metadata for the page with SEO optimizations
export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const config = getPortfolioConfig(locale);

  return {
    title: `${config.personal.name} - ${config.personal.title} | Portfolio`,
    description: config.personal.bio,
    keywords: [
      'Oussama Hattan',
      'Web Developer',
      'Full-Stack Developer',
      'React Developer',
      'Moroccan Developer',
      'Frontend Engineer',
      'Portfolio',
      'Oussama',
      'Hattan'
    ],
    creator: config.personal.name,
    publisher: config.personal.name,
    authors: [{ name: config.personal.name }],
    openGraph: {
      title: `${config.personal.name} - ${config.personal.title}`,
      description: config.personal.bio,
      url: '/',
      siteName: `${config.personal.name} Portfolio`,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: config.personal.name,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.personal.name} - ${config.personal.title}`,
      description: config.personal.bio,
      images: ['/images/og-image.jpg'],
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }))
}

export default function LocalePage({ params }: LocalePageProps) {
  // Validate locale
  if (!locales.includes(params.locale as Locale)) {
    notFound()
  }

  const locale = params.locale as Locale;
  const structuredData = generateHomePageStructuredData(locale);

  return (
    <ClientWrapper>
      {/* Structured Data for Rich Results */}
      {structuredData.map((data, index) => (
        <Script
          key={`structured-data-${index}`}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}

      <PerformanceOptimizer />
      <AdvancedPerformanceOptimizer />
      <DevelopmentBanner />

      <div className="relative">
        <ProgrammingSymbolsBackground />
        <SmokeEffect />

        <ScrollProgress />

        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Expertise Section (New) */}
        <div className="lazy-section">
          <RevealAnimation direction="up" delay={0.1}>
            <Expertise />
          </RevealAnimation>
        </div>

        {/* 3. Projects Section (Redesigned) */}
        <div className="lazy-section">
          <RevealAnimation direction="up" delay={0.1}>
            <EnhancedProjects />
          </RevealAnimation>
        </div>

        {/* 4. Education Section (New) */}
        <div className="lazy-section">
          <RevealAnimation direction="up" delay={0.1}>
            <Education />
          </RevealAnimation>
        </div>

        {/* 5. Experience Section (New) - My Journey */}
        <div className="lazy-section">
          <RevealAnimation direction="up" delay={0.1}>
            <Experience />
          </RevealAnimation>
        </div>

        {/* 6. About (Optional, keeping as per plan) */}
        <div className="lazy-section">
          <RevealAnimation direction="up" delay={0.1}>
            <About />
          </RevealAnimation>
        </div>

        {/* 7. Contact (Redesigned) */}
        <div className="lazy-section">
          <RevealAnimation direction="up" delay={0.1}>
            <Contact />
          </RevealAnimation>
        </div>

        <Footer />
      </div>
    </ClientWrapper>
  )
}