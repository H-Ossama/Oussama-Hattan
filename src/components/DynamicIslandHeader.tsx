'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2, Github, Linkedin, Mail, MessageCircle, ArrowRight, Instagram } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { useNavigation } from '@/contexts/NavigationContext'

import { useRouter, usePathname } from 'next/navigation'

const navigation = [
  { name: 'home', href: '#home', num: '01' },
  { name: 'expertise', href: '#expertise', num: '02' },
  { name: 'work', href: '#projects', num: '03' },
  { name: 'education', href: '#education', num: '04' },
  { name: 'experience', href: '#experience', num: '05' },
  { name: 'about', href: '#about', num: '06' },
  { name: 'contact', href: '#contact', num: '07' },
]

export default function DynamicIslandHeader() {
  const { isMenuOpen, setIsMenuOpen, isLoading } = useNavigation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Use both window.scrollY and document.documentElement.scrollTop for better compatibility
      const scrollPos = window.scrollY || document.documentElement.scrollTop || window.pageYOffset;
      setIsScrolled(scrollPos > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  if (isLoading) return null

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const isHomePage = pathname === '/' || (pathname.split('/').length === 2 && ['en', 'fr', 'de'].includes(pathname.split('/')[1]));

      if (!isHomePage) {
        const locale = pathname.split('/')[1] || 'en';
        // Check if locale is valid, if not default to en
        const validLocale = ['en', 'fr', 'de'].includes(locale) ? locale : 'en';
        router.push(`/${validLocale}${href}`)
        return
      }

      const elementId = href.slice(1)
      setIsMenuOpen(false)
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    // Handle external or internal routes
    window.location.href = href
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-[9999] p-4 flex justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`flex items-center justify-between px-6 h-14 rounded-full border transition-colors duration-300 pointer-events-auto ${isScrolled && !isMenuOpen
            ? theme === 'dark'
              ? 'bg-black/40 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-2xl w-auto min-w-[280px]'
              : 'bg-white/40 border-black/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-2xl w-auto min-w-[280px]'
            : theme === 'dark'
              ? 'bg-black/20 border-white/5 backdrop-blur-md w-full'
              : 'bg-white/20 border-black/5 backdrop-blur-md w-full'
            }`}
        >
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('#home')}>
            <span className={`font-mono text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              H_Oussama<span className="text-accent-cyan">._</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 group z-[9999] ${isMenuOpen
                ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-900')
                : (isScrolled ? (theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-dark-900/5') : '')
                } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
              <span className="relative w-5 h-5 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="text-accent-cyan" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1 items-end"
                    >
                      <div className="w-5 h-0.5 bg-current rounded-full group-hover:bg-accent-cyan transition-colors" />
                      <div className="w-3 h-0.5 bg-current rounded-full group-hover:bg-accent-cyan transition-colors" />
                      <div className="w-4 h-0.5 bg-current rounded-full group-hover:bg-accent-cyan transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-[9998] pointer-events-auto ${theme === 'dark' ? 'bg-dark-950/98' : 'bg-white/98'
                } backdrop-blur-2xl flex flex-col`}
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 100, 0],
                    y: [0, 50, 0]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/20 blur-[120px]"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                    x: [0, -100, 0],
                    y: [0, -50, 0]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent-purple/20 blur-[120px]"
                />
              </div>

              <div className="relative flex-1 flex flex-col justify-between p-8 pt-24 pb-12 overflow-y-auto">
                <div className="flex flex-col gap-8 max-w-sm">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-cyan"
                  >
                    Navigation
                  </motion.p>

                  <nav className="flex flex-col gap-2">
                    {navigation.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection(item.href)}
                        className="flex items-baseline gap-6 text-left group w-full relative"
                      >
                        <span className="font-mono text-sm text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity">
                          {item.num}
                        </span>
                        <span className="text-4xl xs:text-5xl font-bold uppercase tracking-tighter group-hover:text-accent-cyan transition-all duration-300 group-hover:translate-x-4">
                          {item.name}
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-accent-cyan/10 blur-xl opacity-0 group-active:opacity-100 transition-opacity rounded-full -z-10"
                          initial={false}
                        />
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                          <ArrowRight size={32} className="text-accent-cyan" />
                        </span>
                      </motion.button>
                    ))}
                  </nav>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="h-px w-full bg-current opacity-10" />

                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40"
                      >
                        Socials
                      </motion.p>
                      <div className="flex gap-4">
                        {[
                          { icon: Github, href: "https://github.com/H-Ossama" },
                          { icon: Linkedin, href: "https://linkedin.com/in/h-oussama" },
                          { icon: MessageCircle, href: "https://wa.me/212658559662" }
                        ].map((social, i) => (
                          <motion.a
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + i * 0.1 }}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-current/10 hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300"
                          >
                            <social.icon size={18} />
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40"
                      >
                        Contact
                      </motion.p>
                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        href="mailto:ossamahattan@gmail.com"
                        className="text-sm font-medium hover:text-accent-cyan transition-colors"
                      >
                        ossamahattan@gmail.com
                      </motion.a>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex justify-between items-end border-t border-current/5 pt-6"
                  >
                    <p className="font-mono text-[9px] opacity-30 uppercase tracking-widest">
                      © 2026 H_Oussama
                    </p>
                    <div className="flex items-center gap-2 font-mono text-[9px] opacity-30 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Available for projects
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-[9999]">
        <motion.div
          layout
          className={`px-8 py-4 rounded-full border transition-all duration-500 ${isScrolled
            ? theme === 'dark'
              ? 'bg-black/40 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-2xl'
              : 'bg-white/40 border-black/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-2xl'
            : theme === 'dark'
              ? 'bg-black/20 border-white/5 backdrop-blur-md shadow-lg'
              : 'bg-white/20 border-black/5 backdrop-blur-md shadow-md'
            }`}
        >
          <div className="flex items-center gap-12">
            <AnimatePresence mode="wait">
              {!isScrolled && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, width: 0, scale: 0.8 }}
                  animate={{ opacity: 1, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center gap-2 cursor-pointer group origin-left overflow-hidden whitespace-nowrap"
                  onClick={() => scrollToSection('#home')}
                >
                  <span className={`font-mono text-base lg:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    H_Oussama<span className="text-accent-cyan">._</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <nav className="flex items-center gap-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative group py-1"
                >
                  <span className="flex items-center gap-1">
                    <span className="text-accent-cyan font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">{'//'}</span>
                    <span className={`font-mono text-[10px] mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.num}</span>
                    <span className={`text-xs uppercase tracking-widest font-bold transition-colors ${theme === 'dark' ? 'text-white group-hover:text-accent-cyan' : 'text-gray-900 group-hover:text-accent-cyan'
                      }`}>{item.name}</span>
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      </header>
    </>
  )
}
