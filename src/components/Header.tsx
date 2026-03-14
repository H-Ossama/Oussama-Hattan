'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import TestLanguageButton from './TestLanguageButton'
import { useNavigationLabels } from '@/lib/localization'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const labels = useNavigationLabels()

  // Navigation items with localized labels
  // Order matched to page sections: Hero -> Expertise -> Projects -> Experience -> Education -> About -> Contact
  const navigation = [
    { name: labels.home, href: '#home' },
    { name: labels.skills, href: '#expertise' },
    { name: labels.projects, href: '#projects' },
    { name: labels.education, href: '#education' },
    { name: 'Journey', href: '#experience' },
    { name: labels.about, href: '#about' },
    { name: labels.contact, href: '#contact' },
  ]

  useEffect(() => {
    let ticking = false
    let lastValue = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        ticking = false
        const nextValue = window.scrollY > 50
        if (nextValue !== lastValue) {
          lastValue = nextValue
          setIsScrolled(nextValue)
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Optimized scroll handling without forced reflow
  const scrollToSection = (href: string) => {
    // For regular page links (not hash links)
    if (!href.startsWith('#')) {
      // Get current locale from pathname
      const pathname = window.location.pathname;
      const segments = pathname.split('/');
      const currentLocale = (segments[1] === 'en' || segments[1] === 'fr' || segments[1] === 'de') ? segments[1] : 'en';

      // Navigate to the page with the current locale
      window.location.href = `/${currentLocale}${href}`;
      return;
    }

    // For hash links - defer scroll to next frame to avoid sync layout during state updates
    const elementId = href.substring(1);
    const element = document.getElementById(elementId);

    if (element) {
      window.requestAnimationFrame(() => {
        const targetTop = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: Math.max(0, targetTop - 80),
          behavior: 'smooth'
        })
      })
    }

    setIsMenuOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-dark-900/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg border-b border-white/5 supports-[backdrop-filter]:bg-dark-900/60'
        : 'bg-transparent'
        }`}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 px-6 sm:px-8">
          {/* Enhanced Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <Code2 size={20} className="icon-theme-primary group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-theme-primary group-hover:text-blue-400 transition-all duration-300">
                H_Oussama
              </span>
              <span className="text-xs text-theme-muted -mt-1 font-medium">
                Portfolio
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="group relative px-2 py-1 text-sm font-mono text-theme-secondary transition-colors duration-300 hover:text-accent-cyan"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-accent-purple/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 contrast-more:opacity-100">
                    {'//'}
                  </span>
                  <span>
                    <span className="text-xs text-theme-muted mr-2 opacity-50">0{index + 1}</span>
                    {item.name.toLowerCase()}
                  </span>
                </div>
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan group-hover:w-full transition-all duration-300"
                />
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* <SimpleLanguageSwitcher variant="compact" /> */}
            <TestLanguageButton />
            {/* Test Button */}
            <motion.button
              className="flex items-center justify-center w-10 h-10 glass-card rounded-lg text-theme-secondary hover:text-theme-primary hover:shadow-glow transition-all duration-300 bg-red-500/20 border-2 border-red-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Test button works!')}
            >
              <span className="text-sm font-bold">TEST</span>
            </motion.button>
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-3">
            {/* <SimpleLanguageSwitcher variant="mobile" /> */}
            <TestLanguageButton />
            {/* Test Button Mobile */}
            <motion.button
              className="flex items-center justify-center w-10 h-10 glass-card rounded-lg text-theme-secondary hover:text-theme-primary hover:shadow-glow transition-all duration-300 bg-red-500/20 border-2 border-red-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Mobile test button works!')}
            >
              <span className="text-xs font-bold">T</span>
            </motion.button>
            {/* <ThemeToggle /> */}
            {/* Enhanced Mobile Menu Button */}
            <motion.button
              className="relative w-10 h-10 glass-card rounded-lg flex items-center justify-center text-theme-secondary hover:text-theme-primary hover:shadow-glow transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation inspired by huly.io */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-x-0 top-18 h-screen bg-dark-950/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: 998 }}
            >
              <motion.div
                className="glass-card mx-4 mt-4 rounded-2xl overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Mobile Menu Header */}
                <div className="px-6 py-4 border-b border-gray-700/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 glass-card rounded-lg flex items-center justify-center">
                      <Sparkles size={16} className="text-gradient" />
                    </div>
                    <div>
                      <h3 className="text-theme-primary font-bold">Navigation</h3>
                      <p className="text-theme-muted text-xs">Explore my portfolio</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="px-4 py-4">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center justify-between w-full px-4 py-4 text-left text-theme-secondary hover:text-theme-primary hover:bg-white/5 rounded-xl transition-all duration-300 group"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      whileHover={{ x: 8 }}
                    >
                      <span className="font-medium text-lg">{item.name}</span>
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      </motion.div>
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="px-6 py-4 border-t border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-theme-primary text-sm font-medium">Ready to connect?</p>
                      <p className="text-theme-muted text-xs">Let's build something amazing</p>
                    </div>
                    <motion.button
                      onClick={() => scrollToSection('#contact')}
                      className="px-4 py-2 glass-card rounded-lg text-theme-primary text-sm font-medium hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
