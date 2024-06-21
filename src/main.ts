import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createHead())
  .use(createPinia())
  .mount('#app')
