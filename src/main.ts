import { createApp } from 'vue'
import App from './App.vue'
import { setUnauthorizedHandler } from '@/core/api'
import { ROUTE_NAMES } from '@/core/constants'
import router from '@/core/router'
import { useSession } from '@/core/session/useSession'
import '@/core/styles/main.css'

// Si la API responde 401, se cierra la sesión y se regresa al login.
setUnauthorizedHandler(() => {
  useSession().endSession()
  router.push({ name: ROUTE_NAMES.LOGIN })
})

createApp(App).use(router).mount('#app')
