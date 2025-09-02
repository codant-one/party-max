import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import VueGtm from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(VueGtm, {
    id: config.public.GOOGLE_TAG_MANAGER, // tu ID GTM
    defer: false,
    compatibility: false,
    debug: config.public.NODE_ENV !== 'production',
    loadScript: true,
  })

  if (process.client) {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.GOOGLE_ANALYTICS}`
    script.async = true
    document.head.appendChild(script)

    ;(window as any).dataLayer = (window as any).dataLayer || []
    function gtag(...args: any[]) {
      ;(window as any).dataLayer.push(args)
    }

    gtag('js', new Date())
    gtag('config', config.public.GOOGLE_ANALYTICS)

    const router = useRouter()
    router.afterEach((to) => {
      gtag('config', config.public.GOOGLE_ANALYTICS, { page_path: to.fullPath })
    })
  }
})
