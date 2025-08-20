declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default defineNuxtPlugin(() => {
  const init = () => {
    if (process.client) {
      if (window.fbq) {
        return;
      }

      const META_PIXEL_ID = '1316125346097890';
      const script = document.createElement('script');
      
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      
      document.head.appendChild(script);
    }
  }

  const trackEvent = (event: string, params?: object) => {
    if (process.client && window.fbq) {
      window.fbq('track', event, params);
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
})