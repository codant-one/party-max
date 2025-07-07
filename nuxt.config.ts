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
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  hooks: {
    'build:before'() {
      console.log('🚀 Iniciando compilación de Nuxt...')
    },
    'vite:extendConfig'() {
      console.log('📦 cargando...')
    },
    'ready'() {
      console.log('✅ Nuxt listo.')
    }
  },

  modules: [
    '@pinia/nuxt',
    '@davestewart/nuxt-scrollbar',
    '@nuxtjs/device',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (config.plugins) {
          config.plugins.push(vuetify({ autoImport: true }));
        }
      });
    },
  ],

  device: {
    defaultUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  },

  build: {
    transpile: ['vuetify']
  },

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/metapixel.ts',
    '~/plugins/vuegtag.ts',
    '~/plugins/vuetify.ts',
    '~/plugins/webfontloader.client.ts',
    '~/plugins/date-fns.client.ts',
    '~/plugins/vue-config.ts'
  ],

  css: [
    '~/assets/main.css',
    '~/tailwind/tailwind.css'
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
      MY_DOMAIN: process.env.NUXT_MY_DOMAIN,
      GOOGLE_MANAGER: process.env.NUXT_GOOGLE_MANAGER,
      GOOGLE_TAG_MANAGER: process.env.NUXT_GOOGLE_TAG_MANAGER,
      TWITTER_ACCOUNT: process.env.NUXT_TWITTER_ACCOUNT,
      NODE_ENV: process.env.NODE_ENV
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
        '@metapixel':  path.resolve(__dirname, 'plugins/metapixel'),
        '@assets':  path.resolve(__dirname, 'assets'),
        '@validators':  path.resolve(__dirname, 'utils/validators'),
        '@formatters':  path.resolve(__dirname, 'utils/formatters'),
        'form-data': path.resolve(__dirname, 'utils/empty-module'),
      }
    },
    plugins: [
      pluginSvgVue()
    ]
  },

  routeRules: {
    '/': { prerender: true },
    '/.well-known/**': { ssr: false },
    '/blogs': { ssr: true, swr: 3600 },
    '/blogs/*': { ssr: true, swr: 3600 },
    '/cart': { ssr: true },
    '/categories/*': { ssr: true, swr: 3600 },
    '/clients/*': { ssr: false },
    '/dashboard/*': { ssr: false },
    '/products': { static: true },
    '/products/*': { ssr: true, swr: 3600 },
    '/services': { static: true },
    '/services/*': { ssr: true, swr: 3600 }
  },

  compatibilityDate: '2024-07-14'
})