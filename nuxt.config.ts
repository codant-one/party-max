// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'tw-font-switzer_regular'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      meta: [
        { property: 'fb:app_id', content: process.env.NUXT_PUBLIC_FACEBOOK_APP_ID }
      ],
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
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@davestewart/nuxt-scrollbar',
    '@nuxtjs/device',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        if (config.plugins) {
          config.plugins.push(vuetify());
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
    '~/plugins/metapixel.client.ts',
    '~/plugins/recaptcha.client.ts',
    '~/plugins/vuegtag.client.ts',
    '~/plugins/vuetify.ts',
    '~/plugins/webfontloader.client.ts',
    '~/plugins/date-fns.client.ts',
    '~/plugins/vue-config.ts'
  ],

  css: [
    '~/assets/main.css',
    'vuetify/lib/styles/main.sass'
  ],

  runtimeConfig: {
    public: {
      APP_VERBOSE: process.env.NUXT_APP_VERBOSE,
      APP_DOMAIN_API_URL: process.env.NUXT_APP_DOMAIN_API_URL,
      APP_DOMAIN_ADMIN_URL: process.env.NUXT_APP_DOMAIN_ADMIN_URL,
      MY_DOMAIN: process.env.NUXT_MY_DOMAIN,
      GOOGLE_MANAGER: process.env.NUXT_GOOGLE_MANAGER,
      GOOGLE_TAG_MANAGER: process.env.NUXT_GOOGLE_TAG_MANAGER,
      FACEBOOK_APP_ID: process.env.NUXT_PUBLIC_FACEBOOK_APP_ID,
      TWITTER_ACCOUNT: process.env.NUXT_TWITTER_ACCOUNT,
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_RECAPTCHA_SITE_KEY: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      RECAPTCHA_SECRET_KEY: process.env.NUXT_RECAPTCHA_SECRET_KEY
    },
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    resolve: {
      alias: {
        '@':  path.resolve(__dirname),
        '@axios':  path.resolve(__dirname, 'plugins/axios'),
        '@metapixel':  path.resolve(__dirname, 'plugins/metapixel.client'),
        '@assets':  path.resolve(__dirname, 'assets'),
        '@validators':  path.resolve(__dirname, 'utils/validators'),
        '@formatters':  path.resolve(__dirname, 'utils/formatters'),
        'form-data': path.resolve(__dirname, 'utils/empty-module'),
      }
    },
    plugins: [
      pluginSvgVue()
    ],
    build: {
      rollupOptions: {
        plugins: [
          visualizer({
            open: true, // Abre automáticamente el reporte en tu navegador después de compilar
            filename: 'stats.html', // Nombre del archivo de reporte
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
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
    '/products': { ssr: true },
    '/products/*': { ssr: true, swr: 3600 },
    '/services': { ssr: true },
    '/services/*': { ssr: true, swr: 3600 },
  },

  compatibilityDate: '2024-07-14'
})