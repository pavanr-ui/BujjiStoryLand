// ------------------------------------------------------------
//  Characters
//  `image`: set to your official artwork (e.g. '/characters/bujji.png')
//  to replace the built-in SVG drawing everywhere on the site.
// ------------------------------------------------------------
export const characters = [
  {
    id: 'bujji',
    name: 'Bujji',
    teluguName: 'బుజ్జి',
    role: 'The Kind-Hearted Hero',
    species: 'Baby elephant',
    image: null,
    color: '#4A8FE7',
    glow: '#9cc6ff',
    gradient: 'from-[#2f6fc6] via-[#4a8fe7] to-[#8fc2ff]',
    tagline: 'Big ears, bigger heart.',
    description:
      'Bujji is a curious little blue elephant who never goes anywhere without his red backpack. He listens carefully with his big ears, and when someone needs help, he is always the first to say “Nenu unnanu!” — I’m here!',
    traits: ['Kind', 'Curious', 'Brave', 'Gentle'],
    favorite: 'Mangoes and long jungle walks',
    catchphrase: 'పదండి, సాయం చేద్దాం!',
    catchphraseEn: 'Come on, let’s help!',
  },
  {
    id: 'chinni',
    name: 'Chinni',
    teluguName: 'చిన్ని',
    role: 'The Quick-Thinking Friend',
    species: 'Squirrel',
    image: null,
    color: '#B8743F',
    glow: '#f3c08f',
    gradient: 'from-[#8a5228] via-[#b8743f] to-[#e8b07a]',
    tagline: 'Fast feet, faster ideas.',
    description:
      'Chinni is Bujji’s best friend — a cheerful brown squirrel with a fluffy tail and a head full of clever plans. She climbs the tallest trees to spot what Bujji can’t see from the ground.',
    traits: ['Clever', 'Cheerful', 'Quick', 'Caring'],
    favorite: 'Crunchy nuts and treetop views',
    catchphrase: 'నాకో ఐడియా వచ్చింది!',
    catchphraseEn: 'I’ve got an idea!',
  },
  {
    id: 'baby-bird',
    name: 'Baby Bird',
    teluguName: 'బుల్లి పిట్ట',
    role: 'The Little Adventurer',
    species: 'Baby bird',
    image: null,
    color: '#FFD43B',
    glow: '#fff1a8',
    gradient: 'from-[#f5b700] via-[#ffd43b] to-[#fff0a0]',
    tagline: 'Tiny wings, big dreams.',
    description:
      'A fluffy little yellow chick who wandered too far from the nest. Baby Bird is still learning to fly — and learning that friends can be found in the most surprising places.',
    traits: ['Sweet', 'Shy', 'Hopeful', 'Playful'],
    favorite: 'Morning songs and warm hugs',
    catchphrase: 'చీప్ చీప్! అమ్మా!',
    catchphraseEn: 'Cheep cheep! Mama!',
  },
  {
    id: 'mother-bird',
    name: 'Mother Bird',
    teluguName: 'అమ్మ పిట్ట',
    role: 'The Loving Mama',
    species: 'Bird',
    image: null,
    color: '#3D8EE0',
    glow: '#bfe0ff',
    gradient: 'from-[#2a6fb8] via-[#3d8ee0] to-[#d6ecff]',
    tagline: 'Wings wide open, always.',
    description:
      'A graceful blue-and-white bird who watches over the jungle from the tallest tree. She sings the sweetest songs and never stops searching for her little one.',
    traits: ['Loving', 'Wise', 'Graceful', 'Protective'],
    favorite: 'Sunrise songs from the treetops',
    catchphrase: 'నా చిన్నారి ఎక్కడ?',
    catchphraseEn: 'Where is my little one?',
  },
]

export const getCharacter = (id) => characters.find((c) => c.id === id)
