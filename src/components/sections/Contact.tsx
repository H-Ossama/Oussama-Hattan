'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, MessageSquare, ArrowRight } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/localization'
import { useTheme } from '@/contexts/ThemeContext'
import SuccessAnimation from '@/components/SuccessAnimation'

export default function Contact() {
  const { theme } = useTheme()
  const { config } = usePortfolioConfig()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1500)
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <SuccessAnimation isVisible={showSuccess} onClose={() => setShowSuccess(false)} senderName={formData.name} />

      <div className="container-custom px-6 relative z-10 flex flex-col md:flex-row gap-16 lg:gap-24">

        {/* Left Side: Info & Big Email */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-cyan font-mono text-sm">{'//'} 07</span>
              <span className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em]">Communication</span>
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Let's build something <span className="text-accent-purple">amazing</span> together.
            </h2>

            <a
              href={`mailto:${config.contact.email}`}
              className={`text-2xl md:text-4xl font-mono transition-colors duration-300 border-b-2 border-transparent hover:border-accent-cyan pb-2 inline-block ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {config.contact.email}
            </a>
          </motion.div>

          <div className="flex gap-6">
            {[
              { icon: Github, href: config.contact.github },
              { icon: Linkedin, href: config.contact.linkedin },
              { icon: MessageSquare, href: `https://wa.me/${config.contact.whatsapp}` }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl transition-all duration-300 border ${theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/5 hover:border-white/20'
                  : 'bg-black/5 hover:bg-black/10 text-gray-600 hover:text-gray-900 border-black/5 hover:border-black/10'
                  }`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Simple Form */}
        <div className="flex-1 w-full max-w-lg">
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-mono text-gray-500 mb-2">My name is</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className={`w-full bg-transparent border-b py-4 outline-none text-xl transition-colors font-medium ${theme === 'dark' ? 'border-gray-700 focus:border-accent-cyan placeholder-gray-700' : 'border-gray-300 focus:border-accent-cyan placeholder-gray-400'
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-500 mb-2">Reply to</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className={`w-full bg-transparent border-b py-4 outline-none text-xl transition-colors font-medium ${theme === 'dark' ? 'border-gray-700 focus:border-accent-cyan placeholder-gray-700' : 'border-gray-300 focus:border-accent-cyan placeholder-gray-400'
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-500 mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                className={`w-full bg-transparent border-b py-4 outline-none text-xl transition-colors font-medium resize-none ${theme === 'dark' ? 'border-gray-700 focus:border-accent-cyan placeholder-gray-700' : 'border-gray-300 focus:border-accent-cyan placeholder-gray-400'
                  }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-8 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 ${theme === 'dark' ? 'bg-white text-black hover:bg-accent-cyan' : 'bg-gray-900 text-white hover:bg-accent-cyan hover:text-black'
                }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight size={20} />
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  )
}
