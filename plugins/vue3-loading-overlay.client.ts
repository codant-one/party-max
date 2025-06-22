import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (process.server) return

  import('vue3-loading-overlay/dist/vue3-loading-overlay.css')
})
