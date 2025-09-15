export default defineNuxtPlugin(() => {
    if (process.client) {
      // Insertamos el script de Google Ads si no existe
      if (!document.getElementById('gtag-script')) {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-811340497'
        script.id = 'gtag-script'
        document.head.appendChild(script)
  
        const inlineScript = document.createElement('script')
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-811340497');
        `
        document.head.appendChild(inlineScript)
      }
  
      // Inyectamos gtag en Nuxt
      return {
        provide: {
          gtag: (...args: any[]) => {
            // @ts-ignore
            window.gtag && window.gtag(...args)
          }
        }
      }
    }
})
  