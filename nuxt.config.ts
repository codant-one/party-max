// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { loadCategories } from './utils/loadCategories'
import { loadBlogs } from './utils/loadBlogs'
import { loadProducts } from './utils/loadProducts'

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
      MY_DOMAIN: process.env.NUXT_MY_DOMAIN,
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
        '@assets':  path.resolve(__dirname, 'assets'),
        '@validators':  path.resolve(__dirname, 'utils/validators'),
        '@formatters':  path.resolve(__dirname, 'utils/formatters')
      }
    },
    plugins: [
      pluginSvgVue()
    ]
  },

  // routeRules: {
  //   '/': { prerender: true },
  //   '/blogs': { static: true },
  //   '/cart': { static: true },
  //   '/categories': { static: true },
  //   '/categories/*': { static: true },
  //   '/clients/*': { static: true },
  //   '/dashboard/*': { ssr: false },
  //   '/testing': { ssr: false },
  //   '/products': { static: true },
  //   '/products/*': { ssr: false, swr: 3600 },
  //   '/*': { static: true } 
  // },

  ssr: true,

  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig.dev) {

        const categoriesRoutes = await loadCategories()
        console.log('categoriesRoutes', categoriesRoutes)
        
        const blogsRoutes = await loadBlogs()
        console.log('blogsRoutes', blogsRoutes)

        const productsRoutes = await loadProducts()
        console.log('productsRoutes', productsRoutes)

        nitroConfig.prerender = nitroConfig.prerender || {}
        nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
        
        nitroConfig.prerender.routes.push(...categoriesRoutes)
        nitroConfig.prerender.routes.push(...blogsRoutes)
        nitroConfig.prerender.routes.push(...productsRoutes)
      }
    }
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