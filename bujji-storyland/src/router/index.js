import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { getLenis } from '@/composables/useSmoothScroll'
import { ScrollTrigger } from '@/animations/gsap'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Little Stories, Big Smiles!' } },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('@/views/CharactersView.vue'),
    meta: { title: 'Characters' },
  },
  {
    path: '/episodes',
    name: 'episodes',
    component: () => import('@/views/EpisodesView.vue'),
    meta: { title: 'Episodes & Videos' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About Us' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page not found' },
  },
]

const HEADER_OFFSET = 88

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Wait for the page transition to finish before scrolling.
    return new Promise((resolve) => {
      setTimeout(() => {
        const lenis = getLenis()
        if (savedPosition) {
          if (lenis) lenis.scrollTo(savedPosition.top, { immediate: true })
          resolve(savedPosition)
          return
        }
        if (to.hash) {
          const el = document.querySelector(to.hash)
          if (el && lenis) {
            lenis.scrollTo(el, { offset: -HEADER_OFFSET })
            resolve(false)
            return
          }
          resolve({ el: to.hash, top: HEADER_OFFSET, behavior: 'smooth' })
          return
        }
        if (lenis) lenis.scrollTo(0, { immediate: true })
        resolve({ top: 0 })
      }, to.path === from.path ? 0 : 480)
    })
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Bujji Storyland'} · Bujji Storyland`
  // Layout changes after navigation — recompute scroll-trigger positions.
  setTimeout(() => ScrollTrigger.refresh(), 700)
})

export default router
