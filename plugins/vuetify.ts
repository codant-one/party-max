import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { h } from 'vue'
import { Icon } from '@iconify/vue'
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
    icons: {
      defaultSet: 'mdi',
      aliases: {
        ...aliases,
        // Sobrescribe el alias 'component' para forzar el uso de Iconify
        component: (props) => {
          return h(Icon, {
            // Pasa el icono, la etiqueta y la clase al componente de Iconify
            icon: props.icon,
            tag: props.tag,
            class: props.class,
          })
        },
      },
      sets: {
        mdi, // Define el conjunto de iconos 'mdi' para que Vuetify lo conozca
      },
    },
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
      variations: false
    }
  })

  nuxtApp.vueApp.use(vuetify)
})