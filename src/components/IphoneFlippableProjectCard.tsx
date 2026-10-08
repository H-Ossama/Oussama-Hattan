'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, RotateCcw, Calendar, Layers, Code, CheckCircle, HelpCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import ProjectScreenshotsCarousel from './ProjectScreenshotsCarousel'
import HoverPlayVideo from './HoverPlayVideo'

interface ProjectDetailProps {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  image: string
  screenshots?: string[]
  primaryMediaType?: 'image' | 'video'
  videoUrl?: string
  featured: boolean
  period?: string
  role?: string
  problemsSolved?: string[]
  purpose?: string
}

export default function IphoneFlippableProjectCard({
  project,
  index,
}: {
  project: ProjectDetailProps
  index: number
}) {
  const { theme } = useTheme()
  const [isFlipped, setIsFlipped] = useState(false)

  const screenshots = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.image]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
      viewport={{ once: true, margin: '-50px' }}
      className="relative w-full"
    >
      <div className="relative w-full glass-card overflow-hidden hover:shadow-glow-lg">
        {isFlipped ? (
          // Back
          <div className="h-full relative">
            <div className="p-8 overflow-auto h-full pb-24">
              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {project.title}
                </h3>
                {project.period && (
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar
                      size={16}
                      className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                    />
                    <span className={theme === 'dark' ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>
                      {project.period}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {project.role && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-dark-700' : 'bg-gray-100'
                        }`}
                      >
                        <Layers
                          size={18}
                          className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                        />
                      </div>
                      <h4 className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>
                        My Role
                      </h4>
                    </div>
                    <p className={theme === 'dark' ? 'text-sm pl-9 text-gray-300' : 'text-sm pl-9 text-gray-600'}>
                      {project.role}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-700' : 'bg-gray-100'
                      }`}
                    >
                      <Code
                        size={18}
                        className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
                      />
                    </div>
                    <h4 className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>
                      Technologies
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-9">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs ${
                          theme === 'dark' ? 'bg-dark-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.problemsSolved && project.problemsSolved.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-dark-700' : 'bg-gray-100'
                        }`}
                      >
                        <CheckCircle
                          size={18}
                          className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}
                        />
                      </div>
                      <h4 className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>
                        Highlights
                      </h4>
                    </div>
                    <ul className={theme === 'dark' ? 'text-sm space-y-3 pl-9 text-gray-300' : 'text-sm space-y-3 pl-9 text-gray-600'}>
                      {project.problemsSolved.map((problem, i) => (
                        <li key={i} className="flex gap-2">
                          <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>•</span>
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.purpose && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-dark-700' : 'bg-gray-100'
                        }`}
                      >
                        <HelpCircle
                          size={18}
                          className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}
                        />
                      </div>
                      <h4 className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>
                        Purpose
                      </h4>
                    </div>
                    <p className={theme === 'dark' ? 'text-sm pl-9 text-gray-300' : 'text-sm pl-9 text-gray-600'}>
                      {project.purpose}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer (GitHub link on back side too) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-800/10 to-transparent pt-10">
              <div className="flex items-center justify-between border-t border-gray-700/20 dark:border-gray-700/20 border-gray-300/20 pt-3">
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className={`p-2 rounded-full transition-colors ${
                        theme === 'dark'
                          ? 'bg-dark-700 text-blue-400 hover:bg-dark-600'
                          : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                      }`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                      className={`p-2 rounded-full transition-colors ${
                        theme === 'dark'
                          ? 'bg-dark-700 text-blue-400 hover:bg-dark-600'
                          : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                      }`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-dark-700/70 text-blue-400 hover:bg-dark-600/80'
                      : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">Back</span>
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Front
          <div className="relative p-8 flex items-center justify-center">
            {/* iPhone frame only (no content below) */}
            <div className="mx-auto w-full max-w-[340px]">
              <div className="relative rounded-[2.75rem] bg-zinc-900/95 p-[10px] shadow-2xl border border-white/10">
                <div className="relative rounded-[2.35rem] bg-black overflow-hidden aspect-[9/19.5]">
                  {project.primaryMediaType === 'video' && project.videoUrl ? <HoverPlayVideo src={project.videoUrl} poster={project.image} label={`${project.title} preview`} className="bg-black" /> : <ProjectScreenshotsCarousel
                    screenshots={screenshots}
                    altBase={`${project.title} screenshot`}
                    fit="contain"
                    containPosition="top"
                    className="bg-black"
                  />}

                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-black/90 border border-white/10" />

                  {/* GitHub quick action (front side) */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="absolute top-3 right-3 z-30 rounded-full p-2 bg-black/55 backdrop-blur-sm border border-white/15 text-white hover:bg-black/70 transition"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                    </a>
                  )}

                  {/* Details flip (in-frame) */}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="absolute bottom-3 right-3 z-30 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 text-white hover:bg-black/70 transition"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <span className="text-sm font-medium">Details</span>
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
