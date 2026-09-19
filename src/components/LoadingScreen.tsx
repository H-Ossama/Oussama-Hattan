'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingScreen = ({ onComplete, theme = 'dark' }: { onComplete: () => void; theme?: 'dark' | 'light' }) => {
  const [progress, setProgress] = useState(0)
  const isDark = theme === 'dark'

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 200)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className={`loading-screen fixed inset-0 z-[100] flex items-center justify-center ${isDark ? 'bg-dark-950' : 'bg-gray-50'
        }`}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="loading-screen__panel relative w-full max-w-sm px-6">
        {/* Main Counter */}
        <div className="flex justify-between items-end mb-2 font-mono">
          <div className="flex flex-col">
            <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>System Status</span>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-dark-900'}`}>
              OUSSAMA_HATTAN
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >...</motion.span>
            </span>
          </div>
          <div className={`loading-screen__percent text-4xl font-bold ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`}>
            {progress}%
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className={`loading-screen__bar h-1.5 w-full overflow-hidden rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full bg-accent-cyan shadow-[0_0_10px_rgba(102,217,237,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Decorative Terminal Lines */}
        <div className={`mt-4 space-y-1 font-mono text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          <div className="flex justify-between">
            <span>&gt; LOADING_ASSETS...</span>
            <span>{progress > 30 ? 'DONE' : 'PENDING'}</span>
          </div>
          <div className="flex justify-between">
            <span>&gt; ESTABLISHING_SECURE_CONNECTION...</span>
            <span>{progress > 60 ? 'DONE' : 'PENDING'}</span>
          </div>
          <div className="flex justify-between">
            <span>&gt; RENDERING_INTERFACE...</span>
            <span>{progress > 85 ? 'DONE' : 'PENDING'}</span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default LoadingScreen
