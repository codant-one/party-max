import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'vue3-perfect-scrollbar/style.css';

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(PerfectScrollbarPlugin)
  .use(createPinia())
  .mount('#app')