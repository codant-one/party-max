import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import AutoImport from 'unplugin-auto-import/vite';
import pluginSvgVue from '@vuetter/vite-plugin-vue-svg';
import compression from 'vite-plugin-compression';
import imagemin from 'vite-plugin-imagemin';
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      pluginSvgVue(),
      Sitemap({ hostname: `https://${env.VITE_MY_DOMAIN}`, }),
      imagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 80,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
        webp: {
          quality: 80,
        },
      }),
      compression({
        algorithm: 'brotliCompress', // Usa Brotli en lugar de gzip
        ext: '.br', // Extensión de archivos Brotli
        deleteOriginFile: false,
        threshold: 10240,
        compressionOptions: { level: 6 }, // Ajusta el nivel de compresión
        filter: /\.(js|mjs|json|css|html|vue|svg)$/i,
      }),
      vuetify({ autoImport: true, styles: 'sass' }),
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
      minify: 'terser', // Cambia de 'esbuild' a 'terser'
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: true, // Elimina console.log
        },
        output: {
          beautify: false, // Asegúrate de no embellecer la salida
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('vuetify')) return 'chunk-vuetify';
              if (id.includes('dayjs')) return 'chunk-dayjs';
              if (id.includes('swiper')) return 'chunk-swiper';
              if (id.includes('axios')) return 'chunk-axios';
              if (id.includes('vue-router')) return 'chunk-router';
              return 'vendor';
            }
          }        
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    },
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
        '@metapixel': fileURLToPath(new URL('./src/plugins/metapixel', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets/', import.meta.url)),
        '@validators': fileURLToPath(new URL('./src/utils/validators', import.meta.url)),
        '@formatters': fileURLToPath(new URL('./src/utils/formatters', import.meta.url)),
      },
    }
  }
});
