// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin(nuxtApp => {
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
        variables: {
            'code-color': '#d400ff',
            'overlay-scrim-background': '#4C4E64',
            'tooltip-background': '#4A5072',
            'overlay-scrim-opacity': 0.5,
            'hover-opacity': 0.04,
            'focus-opacity': 0.12,
            'selected-opacity': 0.06,
            'activated-opacity': 0.16,
            'pressed-opacity': 0.14,
            'dragged-opacity': 0.1,
            'disabled-opacity': 0.3,
            'border-color': '#2F2B3D',
            'border-opacity': 0.16,
            'high-emphasis-opacity': 0.78,
            'medium-emphasis-opacity': 0.68,
            'switch-opacity': 0.2,
            'switch-disabled-track-opacity': 0.3,
            'switch-disabled-thumb-opacity': 0.4,
            'switch-checked-disabled-opacity': 0.3,

            // Shadows
            'shadow-key-umbra-color': '#2F2B3D',
        }
    }

    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: 'myCustomLightTheme',
            themes: {
                myCustomLightTheme
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})