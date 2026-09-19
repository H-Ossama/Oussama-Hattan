'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface ThemeSwitchLoadingProps {
  isVisible: boolean
  targetTheme: 'dark' | 'light'
}

const ThemeSwitchLoading = ({ isVisible, targetTheme }: ThemeSwitchLoadingProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          {/* Background overlay with theme transition */}
          <motion.div
            className={`absolute inset-0 ${targetTheme === 'dark'
                ? 'bg-dark-950'
                : 'bg-gray-50'
              }`}
            initial={{
              clipPath: 'circle(0% at 50% 50%)'
            }}
            animate={{
              clipPath: 'circle(150% at 50% 50%)'
            }}
            exit={{
              clipPath: 'circle(0% at 50% 50%)'
            }}
            transition={{
              duration: 0.36,
              ease: [0.22, 1, 0.36, 1]
            }}
          />

          {/* Center animation */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Tech Ring */}
            <div className="relative mb-8">
              <motion.div
                className={`w-24 h-24 rounded-full border-2 border-dashed ${targetTheme === 'dark' ? 'border-accent-cyan/30' : 'border-blue-500/30'}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full border-2 border-t-transparent border-l-transparent ${targetTheme === 'dark' ? 'border-accent-cyan' : 'border-blue-600'}`}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                {targetTheme === 'dark' ? (
                  <Moon size={32} className="text-accent-cyan fill-accent-cyan/20" />
                ) : (
                  <Sun size={32} className="text-blue-600 fill-blue-600/20" />
                )}
              </div>
            </div>

            {/* Loading text */}
            <div className="text-center space-y-2">
              <div className={`text-sm font-mono uppercase tracking-[0.3em] ${targetTheme === 'dark' ? 'text-accent-cyan' : 'text-blue-600'
                }`}>
                System Theme
              </div>
              <h3 className={`text-3xl font-bold ${targetTheme === 'dark' ? 'text-white' : 'text-dark-900'
                }`}>
                {targetTheme === 'dark' ? 'DARK_MODE' : 'LIGHT_MODE'}
              </h3>
              <div className="flex items-center justify-center gap-1 h-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 h-full ${targetTheme === 'dark' ? 'bg-white/20' : 'bg-dark-900/20'}`}
                    animate={{
                      backgroundColor: targetTheme === 'dark' ? ['rgba(255,255,255,0.2)', '#66d9ed', 'rgba(255,255,255,0.2)'] : ['rgba(0,0,0,0.2)', '#2563eb', 'rgba(0,0,0,0.2)']
                    }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ThemeSwitchLoading
