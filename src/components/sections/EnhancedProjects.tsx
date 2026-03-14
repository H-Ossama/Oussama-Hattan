'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/localization'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Project {
  id: string | number
  title: string
  description: string
  image: string
  technologies?: string[]
  techStack?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category?: string
}

const ProjectCard = ({ project, index, locale, theme }: { project: Project, index: number, locale: string, theme: string }) => {
  const isMobile = project.category?.toLowerCase().includes('mobile') || project.category === 'Mobile Security'

  // Featured large cards: CinemaHalal (2), Job Finder (3), Immigration Pathways (5)
  const isLargeWeb = !isMobile && (
    [2, 3, 5].includes(Number(project.id)) ||
    ['CinemaHalal', 'Job Finder', 'Immigration Pathways'].some(t => project.title.includes(t))
  )

  const spanClasses = isMobile
    ? 'row-span-2'
    : isLargeWeb
      ? 'md:col-span-2 md:row-span-2'
      : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative ${spanClasses}`}
    >
      <Link href={`/${locale}/projects/${project.id}`} className="block h-full">
        {isMobile ? (
          // Mobile Phone Mockup - Tilted Design
          <div className="relative w-full max-w-[260px] mx-auto">
            <div className="relative aspect-[9/19] bg-gray-900 rounded-[0.75rem] shadow-2xl p-2 transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-800">
              <div className="relative w-full h-full rounded-[0.5rem] overflow-hidden bg-dark-950 border border-gray-700">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20 border border-gray-800" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : (
          // Laptop Mockup for Web Projects
          <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
            {/* Laptop Screen */}
            <div className="relative aspect-[16/10] bg-gray-900 rounded-t-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-3 gap-1.5 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="pt-6 h-full">
                {project.image.endsWith('.svg') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={isLargeWeb ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            </div>
            {/* Laptop Base */}
            <div className="h-3 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
              <div className="text-center text-white">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-cyan flex items-center justify-center">
                  <ArrowUpRight size={24} />
                </div>
                <p className="text-sm font-medium">View Project</p>
              </div>
            </div>
          </div>
        )}

        {/* Project Info Below Card */}
        <div className="mt-4 text-center">
          <h3 className={`text-lg font-bold mb-1 group-hover:text-accent-cyan transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm font-mono">
            {project.category || 'Development'}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// Curved Arrow SVG Component
const CurvedArrow = () => (
  <svg
    className="absolute -left-20 top-1/3 w-24 h-24 text-accent-cyan opacity-80"
    viewBox="0 0 100 100"
    fill="none"
  >
    <path
      d="M 10 50 Q 30 20, 60 30 T 90 60"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <polygon
      points="85,55 95,60 88,68"
      fill="currentColor"
    />
  </svg>
)

export default function EnhancedProjects() {
  const { config } = usePortfolioConfig()
  const { theme } = useTheme()
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const [filter, setFilter] = useState('All')

  const allProjects = (config.projects || []) as Project[]
  const categories = [
    { name: 'All', count: allProjects.length },
    { name: 'Web Development', count: allProjects.filter(p => p.category === 'Web Development').length },
    { name: 'Mobile Development', count: allProjects.filter(p => p.category?.includes('Mobile')).length },
  ]

  const filteredProjects = allProjects.filter(p => filter === 'All' || p.category === filter || (filter === 'Mobile Development' && p.category?.includes('Mobile')))
  const featuredProject = allProjects.find(p => p.featured) || allProjects[0]
  const displayProjects = filteredProjects.filter(p => p.id !== featuredProject?.id)

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container-custom px-6 relative z-10">

        {/* Section Header - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Title & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-cyan font-mono text-sm">{'//'} 03</span>
              <span className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className={`text-7xl md:text-9xl font-bold mb-10 leading-[0.9] ${theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              My<br />Work
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-mono text-sm leading-relaxed max-w-sm`}>
              Deployed scalable travel, event and telemedicine web and hybrid mobile apps using React SPA and PWA.<br /><br />
              Collaborated in 140+ projects with 50+ clients all around the world. I am also interested in data analytics and visualization.
            </p>
          </motion.div>

          {/* Right Column - Featured Project with Phone Mockup */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col items-center"
            >
              {/* Curved Arrow */}
              <CurvedArrow />

              {/* Phone Mockup - Tilted */}
              <div className="relative w-72">
                <div className="relative aspect-[9/19] bg-gray-900 rounded-[1rem] shadow-2xl p-2 transform rotate-6 hover:rotate-0 transition-transform duration-500 border border-gray-800">
                  <div className="relative w-full h-full rounded-[0.75rem] overflow-hidden bg-dark-950 border border-gray-700">
                    {/* Samsung S24 Ultra Punch Hole */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20 border border-gray-800" />
                    {featuredProject.image.endsWith('.svg') ? (
                      <img
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Featured Project Info */}
              <div className="mt-8 text-center">
                <p className="text-accent-cyan font-mono text-sm mb-2 tracking-wider">Featured Project</p>
                <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{featuredProject.title}</h3>
                <Link
                  href={`/${locale}/projects/${featuredProject.id}`}
                  className="inline-flex items-center gap-2 bg-accent-cyan hover:bg-accent-cyan/80 text-dark-950 font-bold py-3 px-8 rounded-lg transition-colors group"
                >
                  <span>View Project</span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-wrap items-center gap-3"
        >
          <span className="text-gray-500 font-mono text-sm mr-2">Filter by</span>
          <div className="flex flex-wrap items-center gap-1">
            {categories.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setFilter(cat.name)}
                className={`font-mono text-sm transition-all duration-300 px-1 ${filter === cat.name
                  ? 'text-accent-cyan'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                <span>{cat.name}</span>
                <sup className="text-[10px] ml-0.5 opacity-60">{cat.count}</sup>
                {idx < categories.length - 1 && (
                  <span className="ml-3 text-gray-600">/</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 grid-flow-dense">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} locale={locale} theme={theme} />
          ))}
        </div>

      </div>
    </section>
  )
}
