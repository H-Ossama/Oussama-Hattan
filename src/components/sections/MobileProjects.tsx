'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { usePortfolioConfig } from '@/lib/localization'
import IphoneFlippableProjectCard from '../IphoneFlippableProjectCard'

export default function MobileProjects() {
  const { config } = usePortfolioConfig()
  const { theme } = useTheme()

  const projects = ((config as any).mobileProjects || []).filter((project: any) => !project.hidden)

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section id="mobile-projects" className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-glow rounded-full opacity-10 floating-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-purple-glow rounded-full opacity-15 floating-element-delayed"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl lg:text-6xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {(config.sections as any)?.mobileProjects?.title || 'Mobile Projects'}{' '}
            <span className="text-gradient">{(config.sections as any)?.mobileProjects?.subtitle || '(AI-assisted)'}</span>
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {(config.sections as any)?.mobileProjects?.description ||
              'Mobile apps and Android/React Native projects built with AI assistance during development, focusing on real-world UX and offline-first reliability.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project: any, index: number) => (
            <IphoneFlippableProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
