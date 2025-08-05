declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default defineNuxtPlugin(() => {
  const init = () => {
    if (process.client) {

      const config = useRuntimeConfig()
      const GTM_ID = config.public.GOOGLE_TAG_MANAGER

      if (GTM_ID) {
        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
        document.head.appendChild(script)

        // Insertar noscript iframe manualmente si lo necesitas:
        const noscript = document.createElement('noscript')
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        document.body.appendChild(noscript)
      }

      // Evita doble inicialización
      if (window.fbq) return
    }
  }

  const trackEvent = (event: string, params?: object) => {
    if (process.client && window.fbq) {
      window.fbq('track', event, params)
      console.log(`Meta Pixel Event: ${event}`, params); 
    }
  }

  return {
    provide: {
      metapixel: {
        init,
        trackEvent
      }
    }
  }
}
)