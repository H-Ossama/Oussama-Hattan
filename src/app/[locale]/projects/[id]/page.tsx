'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioConfig } from '@/lib/localization'
import { ArrowLeft, ArrowUpRight, Github, Share2, Twitter, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NextProjectWidget from '@/components/NextProjectWidget'
import { useTheme } from '@/contexts/ThemeContext'

export default function ProjectPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id
    const locale = (params?.locale as string) || 'en'
    const { config } = usePortfolioConfig()
    const { theme } = useTheme()

    const allProjects = [
        ...(config.projects || []),
        ...(config.mobileProjects || [])
    ]

    // Find current project
    const project = allProjects.find((p: any) => String(p.id) === String(id)) as any

    // Find next project
    const projectIndex = allProjects.findIndex((p: any) => String(p.id) === String(id))
    const nextProject = allProjects[(projectIndex + 1) % allProjects.length] as any

    if (!project) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-dark-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <button
                        onClick={() => router.push(`/${locale}`)}
                        className="text-accent-cyan hover:underline flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={18} /> Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-950 text-white' : 'bg-gray-50 text-gray-900'} selection:bg-accent-cyan selection:text-dark-950 transition-colors duration-500`}>

            {/* Floating Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => router.push(`/${locale}#projects`)}
                className={`fixed top-24 left-6 md:top-10 md:left-10 z-[60] w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-lg transition-all duration-300 group ${theme === 'dark'
                        ? 'bg-dark-950/50 border-white/10 hover:bg-accent-cyan hover:text-dark-950'
                        : 'bg-white/80 border-gray-200 hover:bg-accent-cyan hover:text-white'
                    }`}
                aria-label="Back to Portfolio"
            >
                <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
            </motion.button>

            <NextProjectWidget project={nextProject} locale={locale} />

            <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
                {/* Project Hero Section */}
                <section className="max-w-7xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-bold mb-12 leading-tight max-w-5xl italic tracking-tighter">
                            {project.title}
                        </h1>

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-mono opacity-50 uppercase tracking-widest mb-24 transition-opacity hover:opacity-100">
                            <Link href={`/${locale}`} className="hover:text-accent-cyan transition-colors">Home</Link>
                            <span className="opacity-30">/</span>
                            <Link href={`/${locale}#projects`} className="hover:text-accent-cyan transition-colors">Portfolio</Link>
                            <span className="opacity-30">/</span>
                            <span className="text-accent-cyan">{project.title}</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <p className={`text-xl md:text-2xl leading-relaxed font-light italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {project.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col gap-8 lg:col-span-2 lg:pt-2"
                        >
                            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em] font-bold block">Strategy</span>
                                    <p className={`text-sm font-mono leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{project.strategy || 'Personal Project'}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em] font-bold block">Client</span>
                                    <p className={`text-sm font-mono leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{project.client || 'Open Source'}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em] font-bold block">Technology</span>
                                    <p className={`text-sm font-mono leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{project.technology || project.techStack?.join(', ')}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                {project.liveUrl ? (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group inline-flex items-center gap-2 font-bold text-lg hover:text-accent-cyan transition-all uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                                    >
                                        Open Project <ArrowUpRight size={20} className="text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </a>
                                ) : (
                                    <div />
                                )}

                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-accent-cyan transition-colors font-mono text-xs uppercase tracking-widest">
                                        <Github size={16} /> Source Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Project Gallery */}
                <section className="max-w-7xl mx-auto mb-48">
                    <div className={`
                        ${project.category?.toLowerCase().includes('mobile')
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                            : 'space-y-24'}
                    `}>
                        {(project.screenshots || [project.image]).map((img: string, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: project.category?.toLowerCase().includes('mobile') ? idx * 0.1 : 0 }}
                                className={`relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] ${project.category?.toLowerCase().includes('mobile')
                                        ? `aspect-[9/19] rounded-[2rem] border-[6px] ${theme === 'dark' ? 'border-dark-800 bg-dark-900' : 'border-gray-200 bg-gray-100'}`
                                        : `aspect-auto border ${theme === 'dark' ? 'border-white/5 bg-dark-900' : 'border-gray-200 bg-white'}`
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`${project.title} screenshot ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {project.category?.toLowerCase().includes('mobile') && (
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Next Project Navigation */}
                <section className={`max-w-7xl mx-auto pt-24 border-t relative ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="max-w-xl">
                            <span className="text-accent-cyan font-mono text-xs mb-6 block uppercase tracking-[0.3em] italic">Up Next</span>
                            <Link href={`/${locale}/projects/${nextProject.id}`} className="group block">
                                <h2 className="text-5xl md:text-8xl font-bold group-hover:text-accent-cyan transition-all duration-700 italic tracking-tighter leading-tight">
                                    {nextProject.title}
                                </h2>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Decorative background effects */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px]" />
            </div>
        </div>
    )
}
