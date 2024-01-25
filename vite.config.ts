import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';

export default defineConfig({
  plugins: [
		vue(),
    pluginSvgVue(),
		vuetify({ autoImport: true }),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
      imports: ['vue', 'vue-router', 'pinia'],
      vueTemplate: true,
    }),
	],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets/', import.meta.url)),
      '@validators': fileURLToPath(new URL('./src/utils/validators', import.meta.url)),
      '@formatters': fileURLToPath(new URL('./src/utils/formatters', import.meta.url))
    }
  }
})
