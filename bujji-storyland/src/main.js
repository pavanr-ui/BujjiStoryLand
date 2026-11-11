import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerGsap } from './animations/gsap'
import './styles/main.css'

registerGsap()

createApp(App).use(router).mount('#app')
