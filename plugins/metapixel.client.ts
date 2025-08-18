// plugins/metapixel.ts

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default defineNuxtPlugin(() => {
  const init = () => {
    if (process.client) {
      const config = useRuntimeConfig();
      const GTM_ID = config.public.GOOGLE_TAG_MANAGER;
      const META_PIXEL_ID = '1316125346097890'; // Define tu ID aquí

      // --- Inicialización de GTM (Si lo usas) ---
      // Asegúrate de que el script de GTM no exista ya
      if (GTM_ID && !document.querySelector(`script[src*="gtm.js?id=${GTM_ID}"]`)) {
        const scriptGTM = document.createElement('script');
        scriptGTM.async = true;
        scriptGTM.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(scriptGTM);

        const noscriptGTM = document.createElement('noscript');
        noscriptGTM.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        // No appendChild a body aquí, Nuxt puede limpiar el body. Mejor en head si es un noscript.
        // O considera usar useHead para esto también.
        document.body.appendChild(noscriptGTM); // Para el iframe, body está bien.
      }

      // --- Inicialización del Meta Pixel ---
      // Evita doble inicialización y doble inserción de script
      if (window.fbq || document.querySelector(`script[src*="fbevents.js"]`)) {
        console.log("Meta Pixel ya inicializado o script ya presente.");
        return;
      }

      const scriptMeta = document.createElement('script');
      scriptMeta.innerHTML = `
        !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(scriptMeta);

      // Agrega el noscript para el Meta Pixel
      const noscriptMeta = document.createElement('noscript');
      const imgMeta = document.createElement('img');
      imgMeta.height = 1;
      imgMeta.width = 1;
      imgMeta.style.display = 'none';
      imgMeta.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
      noscriptMeta.appendChild(imgMeta);
      document.head.appendChild(noscriptMeta);

      console.log("Meta Pixel inicializado correctamente.");
    }
  };

  const trackEvent = (event: string, params?: object) => {
    if (process.client && window.fbq) {
      window.fbq('track', event, params);
      // console.log(`Meta Pixel Event: ${event}`, params); // Descomenta para debug
    } else if (process.client) {
        console.warn("Meta Pixel no disponible para tracking. Asegúrate de que init() fue llamado.");
    }
  };

  return {
    provide: {
      metapixel: {
        init,
        trackEvent
      }
    }
  };
});