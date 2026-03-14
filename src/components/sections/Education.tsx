'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award, ArrowUpRight, BookOpen } from 'lucide-react'
import { usePortfolioConfig, useNavigationLabels } from '@/lib/localization'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

interface Certificate {
  name: string
  image: string
}

interface EducationEntry {
  degree: string
  institution: string
  year: string
  grade?: string
  description: string
  certificates?: Certificate[]
  projectUrl?: string
  screenshots?: string[]
}

const EducationCard = ({ edu, index, locale, theme }: { edu: EducationEntry, index: number, locale: string, theme: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative p-8 rounded-2xl transition-all duration-500 flex flex-col h-full ${theme === 'dark'
        ? 'bg-white/5 border border-white/10 hover:bg-white/10'
        : 'bg-black/5 border border-black/5 hover:bg-black/10 shadow-sm'
        } hover:border-accent-cyan/30`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-dark-950 transition-all duration-300">
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-accent-cyan font-mono text-[10px]">{'//'}</span>
              <span className={`text-xs font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {edu.year}
              </span>
            </div>
            <h3 className={`text-xl font-bold leading-tight group-hover:text-accent-cyan transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {edu.degree}
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-6 flex-grow">
        <div className="flex items-center gap-2 mb-4 text-sm font-mono opacity-60">
          <MapPin size={14} />
          <span>{edu.institution}</span>
          {edu.grade && (
            <>
              <span className="mx-2">•</span>
              <span>GPA: {edu.grade}</span>
            </>
          )}
        </div>
        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {edu.description}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex flex-wrap gap-3">
          {/* Certificate Links */}
          {edu.certificates && edu.certificates.length > 0 && (
            <Link
              href={`/${locale}/certificates/${slugify(`${edu.institution}-${edu.degree}`)}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan hover:text-white transition-colors"
            >
              <span>View Certificates</span>
              <ArrowUpRight size={14} />
            </Link>
          )}
          {/* ALX online link fallback */}
          {edu.institution.includes('ALX') && (
            <a
              href="https://intranet.alxswe.com/certificates/rBExG37Lpm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan hover:text-white transition-colors"
            >
              <span>Verify Online</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const { config, locale } = usePortfolioConfig()
  const labels = useNavigationLabels()
  const { theme } = useTheme()

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container-custom px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-cyan font-mono text-sm">{'//'} 04</span>
              <span className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em]">Knowledge Foundation</span>
            </div>
            <h2 className={`text-6xl md:text-8xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Education<br /><span className="text-accent-cyan opacity-80">& Learning</span>
            </h2>
            <p className={`text-lg leading-relaxed max-w-md opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {config.sections?.education?.description || "My academic foundation and continuous learning journey in web development."}
            </p>
          </motion.div>

          {/* Decorative Element matching Hero/Projects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-2 border-dashed border-accent-cyan/30 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border border-white/10 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen size={48} className="text-accent-cyan opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {config.education.map((edu: EducationEntry, index: number) => (
            <EducationCard key={index} edu={edu} index={index} locale={locale} theme={theme} />
          ))}
        </div>

        {/* Certifications Section */}
        {config.certifications && config.certifications.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className={`h-px flex-grow ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
              <h3 className={`text-2xl font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Certifications
              </h3>
              <div className={`h-px flex-grow ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.certifications.map((cert: any, index: number) => (
                <motion.div
                  key={`cert-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group flex items-center justify-between p-6 rounded-xl transition-all ${theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-black/5 border border-black/5 hover:bg-black/10 shadow-sm'
                    } hover:border-accent-cyan/30`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-accent-cyan transition-colors`}>
                        {cert.name}
                      </h4>
                      <p className="text-xs font-mono text-gray-500 mt-1">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>

                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full border transition-all ${theme === 'dark'
                      ? 'border-white/10 text-gray-400 hover:text-white'
                      : 'border-black/10 text-gray-600 hover:text-gray-900'
                      } hover:bg-accent-cyan/20 hover:border-accent-cyan`}>
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
