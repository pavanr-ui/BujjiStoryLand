/**
 * Extract an 11-character YouTube video ID from a watch, share, shorts or embed URL.
 * Returns null for placeholders (e.g. "YOUR_VIDEO_ID") or anything unrecognised,
 * so the UI can show an honest "coming soon" state instead of fake playback.
 */
export function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})(?:[?&#/]|$)/,
    /youtube(?:-nocookie)?\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{11})(?:[&#]|$)/,
    /youtube(?:-nocookie)?\.com\/(?:shorts|embed|live)\/([A-Za-z0-9_-]{11})(?:[?&#/]|$)/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}

export function getEmbedUrl(url) {
  const id = getYouTubeId(url)
  if (!id) return null
  const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1', playsinline: '1' })
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`
}

export function getThumbnailUrl(url) {
  const id = getYouTubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}
