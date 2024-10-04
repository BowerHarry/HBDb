import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true, 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*'  }, // Not needed for Vite 5+
  plugins: [react(), mkcert() ],
  build: {
    target: "ES2022" 
  },
})
