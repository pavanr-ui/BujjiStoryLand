import { episodes } from './episodes'

// ------------------------------------------------------------
//  Video gallery
//  category: 'story' (full episodes) or 'short' (Shorts / Reels)
//  publishedAt: ISO date — used for the "Latest" sort.
// ------------------------------------------------------------
const shorts = [
  {
    id: 'short-01',
    title: 'Meet Bujji! 🐘',
    teluguTitle: 'బుజ్జిని కలవండి!',
    duration: '0:20',
    category: 'short',
    publishedAt: '2026-11-08',
    youtubeUrl: 'https://www.youtube.com/shorts/YOUR_VIDEO_ID',
    thumb: { time: 'day', cast: ['bujji'] },
  },
  {
    id: 'short-02',
    title: 'Chinni Says Hello',
    teluguTitle: 'చిన్ని హలో చెప్పింది',
    duration: '0:18',
    category: 'short',
    publishedAt: '2026-11-09',
    youtubeUrl: 'https://www.youtube.com/shorts/YOUR_VIDEO_ID',
    thumb: { time: 'sunset', cast: ['chinni'] },
  },
  {
    id: 'short-03',
    title: 'Mama Bird’s Morning Song',
    teluguTitle: 'అమ్మ పిట్ట ఉదయపు పాట',
    duration: '0:25',
    category: 'short',
    publishedAt: '2026-11-10',
    youtubeUrl: 'https://www.youtube.com/shorts/YOUR_VIDEO_ID',
    thumb: { time: 'day', cast: ['mother-bird', 'baby-bird'] },
  },
]

// Every episode also appears in the gallery under "Stories".
// Unreleased episodes have no date, so they sort after published videos.
const storyVideos = episodes.map((ep) => ({
  id: `video-${ep.id}`,
  title: ep.title,
  teluguTitle: ep.teluguTitle,
  duration: ep.duration,
  category: 'story',
  publishedAt: ep.status === 'new' ? '2026-11-11' : null,
  status: ep.status,
  youtubeUrl: ep.youtubeUrl,
  thumb: ep.thumb,
}))

export const videos = [...storyVideos, ...shorts]

export const videoFilters = [
  { id: 'latest', label: 'Latest' },
  { id: 'story', label: 'Stories' },
  { id: 'short', label: 'Shorts' },
]
