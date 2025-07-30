import { useRuntimeConfig } from '#app'
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
    const SITE_KEY = config.public.PUBLIC_RECAPTCHA_SITE_KEY

    if (!SITE_KEY) {
        console.warn('⚠️ reCAPTCHA site key undefined')
        return
    }

    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: SITE_KEY,
        loaderOptions: {
            autoHideBadge: false
        },
    })
})