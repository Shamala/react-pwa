import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Technologists Dream',
    short_name: 'Tech Dream',
    description: 'React PWA App for Demo',
    theme_color: '#ffffff',
    background_color: '#e8ebf2',
    display:"standalone",
    scope:"/",
    start_url:"/",
    orientation:"portrait",
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon'
      },
      {
        src:'/maskable-icon.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'any maskable'
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
    
