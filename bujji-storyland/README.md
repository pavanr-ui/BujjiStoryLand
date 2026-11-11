# Bujji Storyland — Website

A premium animated website for **Bujji Storyland**, a Telugu kids animation brand.

**Stack:** Vue 3 · Vite · JavaScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll · Three.js (desktop only) · Lucide icons · Vue Router

---

## 1. Install

You need **Node.js 18.18 or newer** (Node 20 or 22 recommended).

```bash
cd bujji-storyland
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## 3. Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 4. Deploy to Cloudflare Pages

### Option A — Git (recommended, auto-deploys on every push)

1. Push this folder to a GitHub or GitLab repository.
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repository and use these settings:
   - **Framework preset:** Vue (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22`
4. Click **Save and Deploy**.

### Option B — Upload from your computer (Wrangler CLI)

```bash
npm run build
npx wrangler pages deploy dist --project-name bujji-storyland
```

The first run asks you to log in to Cloudflare in the browser.

### Custom domain

In your Pages project open **Custom domains → Set up a domain** and follow the DNS steps.

> Page refreshes on routes like `/episodes` work because `public/_redirects` sends every path to `index.html` (single-page-app fallback).

---

## 5. Things to customise

| What | Where |
|---|---|
| YouTube / Instagram / email links | `src/data/site.js` |
| Episodes (titles, durations, YouTube links) | `src/data/episodes.js` |
| Gallery videos and Shorts | `src/data/videos.js` |
| Story Experience scenes | `src/data/story.js` |
| Character names, descriptions, colours | `src/data/characters.js` |
| Colours and fonts | `@theme` block in `src/styles/main.css` |

### Add real videos

Replace `YOUR_VIDEO_ID` URLs with real links. These formats all work:

```
https://www.youtube.com/watch?v=abc123XYZ_-
https://youtu.be/abc123XYZ_-
https://www.youtube.com/shorts/abc123XYZ_-
```

Once a real link is set, that card shows the official YouTube thumbnail and the player embeds the real video
(privacy-friendly `youtube-nocookie.com`). Until then the player shows an honest **“Coming soon”** panel — there is no fake playback.

### Use your official character artwork

The site ships with original animated SVG drawings of Bujji (blue baby elephant, red backpack), Chinni (brown squirrel),
Baby Bird (yellow) and Mother Bird (blue & white). To use your real renders:

1. Save transparent PNG/WebP files in `public/characters/` (e.g. `bujji.png`).
2. In `src/data/characters.js` set `image: '/characters/bujji.png'` for that character.

Every section — hero, cards, popups, story scenes, subscribe — switches to your artwork automatically.

---

## 6. Project structure

```
src/
├─ main.js                     app entry (router + GSAP registration)
├─ App.vue                     loader, header, page transitions, global modals
├─ router/index.js             routes + hash / smooth scrolling
├─ views/                      HomeView, CharactersView, EpisodesView, AboutView, NotFoundView
├─ components/
│  ├─ layout/                  SiteHeader (+ mobile menu), SiteFooter, PageLoader, PageHero, BrandLogo
│  ├─ sections/                HeroSection, CharacterWorld, FeaturedEpisodes, StoryExperience,
│  │                           VideoGallery, MagicalJungle, AboutSection, SubscribeSection
│  ├─ characters/              BujjiArt, ChinniArt, BabyBirdArt, MotherBirdArt, CharacterArt (switch)
│  ├─ scenery/                 JungleBackdrop, FloatingParticles, ButterflySwarm, JungleScene3D, EpisodeThumb
│  └─ ui/                      MagicButton, TiltCard, SectionHeading, SplitText, BaseModal,
│                              CharacterModal, VideoModal
├─ composables/                useSmoothScroll, useMouseParallax, useModals, useIsMobile, useReducedMotion
├─ animations/gsap.js          GSAP setup + reusable reveal helpers
├─ data/                       all editable content
├─ utils/youtube.js            YouTube URL → ID / embed / thumbnail
└─ styles/main.css             Tailwind theme, keyframes, reduced-motion rules
```

## 7. Performance & accessibility notes

- **Three.js** is code-split and only downloaded on desktop, when the Magical Jungle section approaches the viewport.
  Phones and tablets get a lightweight CSS/SVG version.
- Canvas particles and the 3D scene **pause when offscreen** or when the tab is hidden.
- **prefers-reduced-motion** is respected everywhere: no smooth-scroll hijacking, no pinning, no parallax;
  the Story Experience becomes a simple chapter stepper.
- Keyboard: skip link, visible focus rings, Escape closes popups, focus is trapped inside modals,
  arrow keys move the episode carousel.
- Routes other than Home are lazy-loaded.
