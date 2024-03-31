import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.png'],
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
        src:'/maskable-icon.png',
        sizes: 'any',
        purpose: 'any maskable'
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
    

