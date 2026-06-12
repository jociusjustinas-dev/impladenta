import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',
    port: 5180,
    strictPort: true,
    open: 'http://localhost:5180/',
  },
  preview: {
    host: 'localhost',
    port: 5180,
    strictPort: true,
    open: 'http://localhost:5180/',
  },
})
