import { reactive, readonly } from 'vue'
import { lockScroll } from './useSmoothScroll'

/**
 * Tiny global modal store so any card anywhere can open the shared
 * video player or character popup rendered once in App.vue.
 */
const state = reactive({
  video: null, // video/episode object
  character: null, // character object
})

function sync() {
  lockScroll(Boolean(state.video || state.character))
}

export function useModals() {
  return {
    modals: readonly(state),
    openVideo(item) {
      state.character = null
      state.video = item
      sync()
    },
    openCharacter(character) {
      state.video = null
      state.character = character
      sync()
    },
    closeAll() {
      state.video = null
      state.character = null
      sync()
    },
  }
}
