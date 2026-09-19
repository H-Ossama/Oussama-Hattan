'use client'

import { Github, Linkedin, Mail, Phone, Code2, Coffee, ShieldCheck } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/localization'
import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'

export default function Footer() {
  const { config } = usePortfolioConfig()
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', url: config.contact.github, icon: Github },
    { name: 'LinkedIn', url: config.contact.linkedin, icon: Linkedin },
    { name: 'Email', url: `mailto:${config.contact.email}`, icon: Mail },
    { name: 'Phone', url: `tel:${config.contact.phone}`, icon: Phone },
  ]

  return (
    <footer className={`relative border-t transition-colors duration-500 ${theme === 'dark'
      ? 'bg-dark-950 border-white/5 text-gray-400'
      : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
      <div className="container-custom px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">

          {/* Brand & Tagline */}
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {config.personal.name}
              </h2>
              <p className={`text-sm max-w-sm leading-relaxed ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                Scaleable backend architectures, secure APIs, and responsive web solutions. Building the digital future one line of code at a time.
              </p>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${theme === 'dark'
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-green-100 border-green-200 text-green-700'
              }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              SYSTEM STATUS: OPEN FOR WORK
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:items-end gap-6">
            <span className="text-xs font-mono uppercase tracking-widest opacity-50">Connect with me</span>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl border transition-all duration-300 group ${theme === 'dark'
                    ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-accent-cyan/50 hover:text-accent-cyan'
                    : 'bg-white border-gray-200 hover:border-blue-400 hover:text-blue-500 hover:shadow-lg'
                    }`}
                  aria-label={link.name}
                >
                  <link.icon size={20} className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono ${theme === 'dark' ? 'border-white/5 text-gray-600' : 'border-gray-200 text-gray-500'
          }`}>
          <div className="flex items-center gap-1.5">
            <span>© {currentYear}</span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-1">
              Developed By Hattan Oussama
            </span>
          </div>

          <div className="flex items-center gap-4 opacity-70">
            <span className="flex items-center gap-1.5">
              <Code2 size={12} /> Next.js 14
            </span>
            <span className="flex items-center gap-1.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-2 h-2 border border-current rounded-full border-t-transparent" />
              </motion.div>
              React
            </span>
            <span className="flex items-center gap-1.5">
              <Coffee size={12} /> Tailwind
            </span>
            <a
              href="/admin"
              aria-label="Open admin panel"
              title="Admin panel"
              className="ml-2 rounded-full border border-current/20 p-2 opacity-70 transition-all duration-300 hover:border-accent-cyan/70 hover:text-accent-cyan hover:opacity-100 hover:shadow-[0_0_18px_rgba(0,194,255,.3)]"
            >
              <ShieldCheck size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
