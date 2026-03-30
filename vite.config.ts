import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/stacked-2-step-paywall-experiment/',
  plugins: [vue()],
  cacheDir: '/tmp/vite-cache',
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
})
