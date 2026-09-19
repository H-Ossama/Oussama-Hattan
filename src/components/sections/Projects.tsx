'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, ArrowRight, Eye } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { usePortfolioConfig, useNavigationLabels } from '@/lib/localization'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
    image: string
    featured?: boolean
    period?: string
    [key: string]: any
  }
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card group overflow-hidden hover:shadow-glow-lg transition-all duration-500 hover:scale-105"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark'
            ? 'from-dark-900/80 via-dark-900/20 to-transparent'
            : 'from-gray-900/80 via-gray-900/20 to-transparent'
          }`}></div>

        {/* Project Links Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-theme p-4 rounded-full hover:shadow-glow transition-all duration-300 floating-element group"
              aria-label={`View ${project.title} on GitHub`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} className="icon-theme-primary group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-theme p-4 rounded-full hover:shadow-glow transition-all duration-300 floating-element-delayed group"
              aria-label={`View ${project.title} live demo`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={20} className="icon-theme-primary group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-8">
        <h3 className={`text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
          {project.title}
        </h3>

        <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 mb-6">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className={`px-4 py-2 glass-pill text-sm hover:shadow-glow transition-all duration-300 ${theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="flex gap-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-theme-muted hover:text-theme-primary transition-all duration-300 group/link"
            >
              <Github size={18} className="icon-theme-muted group-hover/link:text-blue-400 group-hover/link:rotate-12 group-hover/link:scale-110 transition-all duration-300" />
              <span className="text-sm font-medium">Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-theme-muted hover:text-theme-primary transition-all duration-300 group/link"
            >
              <ExternalLink size={18} className="icon-theme-muted group-hover/link:text-blue-400 group-hover/link:translate-x-1 group-hover/link:scale-110 transition-all duration-300" />
              <span className="text-sm font-medium">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { config } = usePortfolioConfig()
  const labels = useNavigationLabels()
  const { theme } = useTheme()

  return (
    <section id="projects" className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-gradient-purple-glow rounded-full opacity-10 floating-element"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-glow rounded-full opacity-15 floating-element-delayed"></div>
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-gradient-glow rounded-full opacity-10 floating-element"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            {config.sections?.projects?.featuredProjects?.split(' ')[0] || 'Featured'} <span className="text-gradient">{config.sections?.projects?.featuredProjects?.split(' ').slice(1).join(' ') || 'Projects'}</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
            {config.sections?.projects?.description || 'A showcase of my recent work, demonstrating various technologies and problem-solving approaches'}
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {config.projects.filter(project => project.featured).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* All Projects Section */}
        {config.projects.length > config.projects.filter(project => project.featured).length && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <h3 className="text-4xl font-bold text-theme-primary mb-12 text-center">
              {config.sections?.projects?.moreProjects?.split(' ')[0] || 'More'} <span className="text-gradient">{config.sections?.projects?.moreProjects?.split(' ').slice(1).join(' ') || 'Projects'}</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {config.projects
                .filter(project => !project.featured)
                .map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index + config.projects.filter(project => project.featured).length}
                  />
                ))}
            </div>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <div className="glass-card-theme max-w-2xl mx-auto p-12 hover:shadow-glow-lg transition-all duration-500">
            <div className="relative">
              {/* Glowing icon */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 glass-card-theme rounded-full flex items-center justify-center floating-element group">
                  <Github size={32} className="icon-theme-primary group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-theme-primary mb-6 pt-8">
                {config.sections?.projects?.wantToSeeMore || 'Want to see more?'}
              </h3>
              <p className="text-theme-secondary mb-8 leading-relaxed">
                {config.sections?.projects?.githubDescription || `Check out my GitHub profile for more projects, contributions, and code samples. 
                I'm constantly building and experimenting with new technologies.`}
              </p>
              <a
                href={config.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-3 group"
              >
                <Github size={20} />
                <span>{config.sections?.projects?.viewGithubProfile || 'View GitHub Profile'}</span>
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
