import { defineNuxtPlugin } from '#app'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VBtn, VIcon, VList, VListItem, VRating } from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

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
    defaults: {
      global: {
        style: false
      }
    },
    components: {
      VApp,
      VAppBar,
      VBtn,
      VIcon,
      VList,
      VListItem,
      VRating
    },
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
    },
  })

  nuxtApp.vueApp.use(vuetify)
})