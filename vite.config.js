import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite automatically exposes VITE_ prefixed env variables
  // No need to manually define process.env
  server: {
    proxy: {
      '/api': 'http://localhost:8000', // or whatever port your backend runs on
    }
  }
})
