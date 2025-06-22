export default defineNuxtPlugin((nuxtApp) => {
  window.addEventListener('error', (e) => {
    console.error('Client error:', e.message, e.error)
  })

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason)
  })

  nuxtApp.hook('app:error', (err) => {
    console.error('Nuxt SSR error:', err)
  })
})