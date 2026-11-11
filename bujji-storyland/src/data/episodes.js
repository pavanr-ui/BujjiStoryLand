// ------------------------------------------------------------
//  Episodes
//  youtubeUrl: paste the real link when the episode is published.
//  While it contains YOUR_VIDEO_ID the player shows "coming soon".
//  Episodes 2–5 are working titles — rename or remove them freely.
// ------------------------------------------------------------
export const episodes = [
  {
    id: 'ep-01',
    number: 1,
    title: 'Bujji and the Lost Baby Bird',
    teluguTitle: 'బుజ్జి – తప్పిపోయిన బుల్లి పిట్ట',
    duration: '0:58',
    format: 'Short',
    status: 'new',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    summary:
      'Bujji hears a tiny cry in the jungle and finds a little yellow bird far from home. With Chinni’s help, can they bring her back to Mama?',
    moral: 'Helping others makes us happy!',
    thumb: { time: 'day', cast: ['bujji', 'baby-bird', 'chinni'] },
  },
  {
    id: 'ep-02',
    number: 2,
    title: 'Chinni’s Big Nut Hunt',
    teluguTitle: 'చిన్ని గింజల వేట',
    duration: 'Coming soon',
    format: 'Short',
    status: 'coming-soon',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    summary: 'Chinni hides her nuts for the rainy season — then forgets where! Bujji’s big ears save the day.',
    moral: 'Friends make every problem smaller.',
    thumb: { time: 'sunset', cast: ['chinni', 'bujji'] },
  },
  {
    id: 'ep-03',
    number: 3,
    title: 'Bujji Learns to Share',
    teluguTitle: 'బుజ్జి పంచుకోవడం నేర్చుకున్నాడు',
    duration: 'Coming soon',
    format: 'Story',
    status: 'coming-soon',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    summary: 'One juicy mango, three hungry friends. What will Bujji do?',
    moral: 'Sharing makes happiness grow.',
    thumb: { time: 'day', cast: ['bujji', 'chinni', 'baby-bird'] },
  },
  {
    id: 'ep-04',
    number: 4,
    title: 'The Rainy Day Rescue',
    teluguTitle: 'వాన రోజు సాహసం',
    duration: 'Coming soon',
    format: 'Story',
    status: 'coming-soon',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    summary: 'A sudden monsoon shower floods the nest. Bujji’s backpack holds a surprise.',
    moral: 'Being ready helps us help others.',
    thumb: { time: 'rain', cast: ['bujji', 'mother-bird'] },
  },
  {
    id: 'ep-05',
    number: 5,
    title: 'Bujji Counts the Stars',
    teluguTitle: 'బుజ్జి నక్షత్రాలు లెక్కపెట్టాడు',
    duration: 'Coming soon',
    format: 'Story',
    status: 'coming-soon',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    summary: 'A cosy bedtime adventure where Bujji and friends learn numbers under the night sky.',
    moral: 'Learning is more fun together.',
    thumb: { time: 'night', cast: ['bujji', 'chinni'] },
  },
]
