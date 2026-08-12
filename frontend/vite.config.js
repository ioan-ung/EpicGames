import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ['react-redux'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/images': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/images/videos': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    },
  },
})
