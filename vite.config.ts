import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
		vue(),
    pluginSvgVue(),
    compression({
      algorithm: 'brotliCompress', // Usa Brotli en lugar de gzip
      ext: '.br', // Extensión de archivos Brotli
      deleteOriginFile: false,
      threshold: 10240, 
      filter: /\.(js|mjs|json|css|html|vue|svg)$/i, 
    }),
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
  build: {
    minify: 'esbuild', // Asegúrate de usar el minificador por defecto rápido.
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vuetify')) {
              return 'vuetify'; // Mueve Vuetify a un chunk separado.
            }
            if (id.includes('vue-gtag-next')) {
              return 'gtag'; // Mueve la librería de Google Analytics a un chunk separado.
            }
            if (id.includes('axios')) {
              return 'axios'; // Si usas Axios, crea un chunk para esta librería.
            }
            // Crea un chunk "vendor" para todas las dependencias grandes que no tengan un chunk específico.
            return 'vendor';
          }
        },
      },
    },
  },
  
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
