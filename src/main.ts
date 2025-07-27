import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import '@/assets/main.css'; 
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import metapixel from './plugins/metapixel'
import configGtag from './plugins/vuegtag'
import VueGtag from 'vue-gtag-next'
import 'vue3-perfect-scrollbar/style.css'

const head = createHead();

if(import.meta.env.VITE_ENV !== 'development') {//solo para produccion
  metapixel.init();
  router.afterEach((to) => {// Configura el seguimiento de cambios de página si usas vue-router
    metapixel.trackEvent('PageView');
     // Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: to.fullPath,
      });
    }
  });
}

createApp(App)
  .use(router)
  .use(VueGtag, configGtag)
  .use(vuetify)
  .use(head)
  .use(PerfectScrollbarPlugin)
  .use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    loaderOptions: {
      autoHideBadge: false
    },
  })
  .use(createPinia())
  .mount('#app')