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
})
