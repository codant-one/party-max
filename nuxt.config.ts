// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'tw-font-switzer_regular'
      },
      titleTemplate: '%s - PARTYMAX',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    },
  },

  modules: [
    '@pinia/nuxt',
    '@davestewart/nuxt-scrollbar',
    '@nuxtjs/device',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  device: {
    refreshOnResize: true
  },

  build: {
    transpile: ['vuetify']
  },

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/webfontloader.client.ts',
    '~/plugins/date-fns.client.ts',
    '~/plugins/vuetify.ts'
  ],

  css: [
    '~/assets/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      APP_VERBOSE: process.env.NUXT_APP_VERBOSE,
      APP_DOMAIN_API_URL: process.env.NUXT_APP_DOMAIN_API_URL,
      APP_DOMAIN_ADMIN_URL: process.env.NUXT_APP_DOMAIN_ADMIN_URL,
      MY_DOMAIN: process.env.NUXT_MY_DOMAIN
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
    resolve: {
      alias: {
        '@':  path.resolve(__dirname),
        '@axios':  path.resolve(__dirname, 'plugins/axios'),
        '@assets':  path.resolve(__dirname, 'assets'),
        '@validators':  path.resolve(__dirname, 'utils/validators'),
        '@formatters':  path.resolve(__dirname, 'utils/formatters')
      }
    },
    plugins: [
      pluginSvgVue()
    ]
  },

  compatibilityDate: '2024-07-14'
})