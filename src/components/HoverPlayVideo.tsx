'use client'

import { useRef, useState } from 'react'
import { getYouTubeEmbedUrl, getYouTubeVideoId } from '@/lib/youtube'

export default function HoverPlayVideo({ src, poster, className = '', label = 'Project video' }: { src: string; poster?: string; className?: string; label?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const youtubeId = getYouTubeVideoId(src)

  const play = () => {
    if (youtubeId) { setPlaying(true); return }
    const video = videoRef.current
    if (!video) return
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }
  const stop = () => {
    const video = videoRef.current
    if (video) { video.pause(); video.currentTime = 0 }
    setPlaying(false)
  }

  return <div className={`relative h-full w-full overflow-hidden ${className}`} onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop}>
    {youtubeId ? playing ? <iframe key={youtubeId} src={getYouTubeEmbedUrl(youtubeId)} title={label} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full border-0" /> : <img src={poster || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`} alt={label} className="h-full w-full object-cover" /> : <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className="h-full w-full object-cover" />}
    {!playing && <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur">🎬 Hover to play</span>}
  </div>
}
