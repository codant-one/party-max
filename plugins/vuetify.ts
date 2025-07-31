import '@mdi/font/css/materialdesignicons.css'

import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives'; 

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#FF0090',
    'primary-darken-1': '#3700B3',
    secondary: '#6FDDEF',
    'secondary-darken-1': '#018786',
    error: '#FFC549',
    info: '#28C76F',
    success: '#FF0090',
    warning: '#28C76F',
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
      variations: false
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    }
  })

  nuxtApp.vueApp.use(vuetify)
})