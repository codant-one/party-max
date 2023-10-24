import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app')
