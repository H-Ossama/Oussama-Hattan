'use client'

import { motion } from 'framer-motion'
import { Monitor, Server, Shield } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const expertiseData = [
    {
        icon: Monitor,
        title: 'Full Stack Development',
        description: 'Building responsive, high-performance web applications using modern technologies like React, Next.js, and TypeScript. Focusing on clean code and optimal user experience.',
        techs: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
        icon: Server,
        title: 'DevOps & Cloud',
        description: 'Deploying and managing scalable infrastructure. Experience with Linux systems, virtualization, and containerization for robust deployment pipelines.',
        techs: ['Docker', 'Linux', 'CI/CD', 'Git']
    },
    {
        icon: Shield,
        title: 'Network & Security',
        description: 'Designing secure network architectures and implementing security protocols. Strong background in network administration and cybersecurity best practices.',
        techs: ['Network Admin', 'Security', 'Protocols', 'Firewall']
    }
]

export default function Expertise() {
    const { theme } = useTheme()

    return (
        <section id="expertise" className="py-24 relative overflow-hidden">
            <div className="container-custom px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-accent-cyan font-mono text-sm">{'//'} 02</span>
                        <span className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em]">Specialization</span>
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        My Expertise
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {expertiseData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${theme === 'dark'
                                ? 'bg-white/5 border border-white/10'
                                : 'bg-black/5 border border-black/5 shadow-sm'
                                } hover:border-accent-purple/50`}
                        >
                            <div className={`mb-6 p-4 rounded-xl w-fit transition-colors duration-300 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                                } group-hover:bg-accent-purple/10`}>
                                <item.icon size={32} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    } group-hover:text-accent-purple transition-colors duration-300`} />
                            </div>

                            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {item.title}
                            </h3>

                            <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {item.techs.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`text-xs font-mono px-2 py-1 rounded border ${theme === 'dark'
                                            ? 'bg-white/5 text-gray-400 border-white/5'
                                            : 'bg-black/5 text-gray-600 border-black/5'
                                            }`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
