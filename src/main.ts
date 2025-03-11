import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import metapixel from './plugins/metapixel'
import configGtag from './plugins/vuegtag'
import VueGtag from 'vue-gtag-next'
import 'vue3-perfect-scrollbar/style.css'

metapixel.init();
router.afterEach(() => {// Configura el seguimiento de cambios de página si usas vue-router
  metapixel.trackEvent('PageView');
});

createApp(App)
  .use(router)
  .use(VueGtag, configGtag)
  .use(vuetify)
  .use(PerfectScrollbarPlugin)
  .use(createPinia())
  .mount('#app')