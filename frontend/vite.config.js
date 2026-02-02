import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CHECKMA',
        short_name: 'CHECKMA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4969B2',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
})
