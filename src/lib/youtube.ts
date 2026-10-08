export function getYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    let id: string | null = null

    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || null
    else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      const parts = url.pathname.split('/').filter(Boolean)
      if (url.pathname === '/watch') id = url.searchParams.get('v')
      else if (['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1] || null
    }

    return id && /^[\w-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

export function getYouTubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    controls: '0',
    enablejsapi: '1',
    loop: '1',
    mute: '1',
    playlist: id,
    playsinline: '1',
    rel: '0',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}
