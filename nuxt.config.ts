// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'tw-font-switzer_regular'
      },
      titleTemplate: '%s PARTYMAX',
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
    refreshOnResize: true,
    defaultUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
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

  routeRules: {
    '/': { prerender: true },
    '/blogs': { prerender: true, static: true },
    '/blogs/*': { prerender: true, static: true },
    '/cart': { prerender: true, static: true },
    '/categories': { prerender: true, static: true },
    '/categories/*': { prerender: true, static: true },
    '/clients/*': { prerender: true, static: true },
    '/dashboard/*': { prerender: true, ssr: false },
    '/testing': { prerender: true, ssr: false },
    '/products': { prerender: true, static: true },
    '/products/*': { prerender: true, ssr: false, swr: 3600 },
    '/*': { prerender: true, static: true } 
  },

  nitro: {
    prerender: {
      concurrency: 250,
      interval: 1200,
      failOnError: false
    }
  },

  compatibilityDate: '2024-07-14'
})