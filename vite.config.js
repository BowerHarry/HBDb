import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { demoPosters } from './src/demo/posterPlugin.js'

// Demo mode (VITE_DEMO=1) runs over plain http with generated posters
const demo = process.env.VITE_DEMO === '1'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: !demo }, // Not needed for Vite 5+
  plugins: [react(), demo ? demoPosters() : mkcert() ],
  build: {
    target: "ES2022" 
  },
})
