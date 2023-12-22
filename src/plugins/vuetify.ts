// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

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
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

// export default createVuetify(
//   // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// )
