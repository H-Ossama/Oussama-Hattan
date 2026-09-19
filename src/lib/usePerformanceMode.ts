'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to detect device performance capabilities and determine
 * appropriate performance mode for animations and effects
 * 
 * This helps with optimizing the site experience on different devices
 * - 'high': Desktop or high-end devices that can handle full animations
 * - 'medium': Mid-range devices with some limitations
 * - 'low': Low-end devices or mobile phones that need reduced animations
 */
export function usePerformanceMode() {
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high')
  
  useEffect(() => {
    // Check if this is running on the client
    if (typeof window === 'undefined') return
    
    // Function to detect performance capability
    const detectPerformance = () => {
      // 1. Check if this is a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      
      // 2. Check screen size - smaller screens likely need more optimization
      const isSmallScreen = window.innerWidth <= 768
      
      // 3. Check for low memory indicator (available in some browsers)
      const hasLowMemory = 'deviceMemory' in navigator && 
        // @ts-ignore - deviceMemory is not in the standard navigator type
        navigator.deviceMemory < 4
      
      // 4. Use navigator connection type if available
      const hasSlowConnection = 'connection' in navigator && 
        // @ts-ignore - connection is not in the standard navigator type
        (navigator.connection?.saveData || 
         // @ts-ignore
         navigator.connection?.effectiveType === 'slow-2g' || 
         // @ts-ignore
         navigator.connection?.effectiveType === '2g' ||
         // @ts-ignore
         navigator.connection?.effectiveType === '3g')
      
      // 5. Check if the device has a coarse pointer (touch) rather than fine (mouse)
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      
      // Determine performance mode based on collected data
      if (
        (isMobile && isSmallScreen) || 
        hasLowMemory || 
        hasSlowConnection ||
        (isMobile && hasCoarsePointer)
      ) {
        return 'low'
      } else if (isMobile || isSmallScreen || hasCoarsePointer) {
        return 'medium'
      } else {
        return 'high'
      }
    }
    
    // Set performance mode
    setPerformanceMode(detectPerformance())
    
    // Update on resize (in case of orientation change or window resize)
    const handleResize = () => {
      setPerformanceMode(detectPerformance())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return performanceMode
}

// Helper function to conditionally disable/reduce animations based on performance mode
export function getAnimationConfig(performanceMode: 'high' | 'medium' | 'low') {
  return {
    // Whether to enable complex background effects
    enableBackgroundEffects: performanceMode !== 'low',
    
    // How many animation particles to show
    particleCount: performanceMode === 'high' ? 6 : performanceMode === 'medium' ? 4 : 2,
    
    // Whether to enable section reveal animations
    enableSectionAnimations: performanceMode !== 'low',
    
    // Whether to enable parallax effects
    enableParallax: performanceMode === 'high',
    
    // Animation duration multiplier (to make animations faster on low-end devices)
    durationMultiplier: performanceMode === 'high' ? 1 : performanceMode === 'medium' ? 0.7 : 0.5,
    
    // Whether to enable complex scrolling effects
    enableSmoothScroll: performanceMode === 'high',
    
    // Whether to enable motion effects for floating elements
    enableMotionEffects: performanceMode !== 'low',
    
    // Whether to show smoke/fog effects
    enableSmokeEffects: false,
    
    // Whether to enable blur effects (can be very performance-heavy on mobile)
    enableBlurEffects: performanceMode === 'high',
    
    // Number of concurrent animations allowed
    maxConcurrentAnimations: performanceMode === 'high' ? Infinity : performanceMode === 'medium' ? 5 : 2
  }
}
