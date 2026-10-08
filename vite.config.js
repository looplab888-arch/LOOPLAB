import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://looplab.lk',
    })
  ],
  server: {
    port: 5174,           // LoopLab company webapp — always on 5174
    strictPort: true,     // fail clearly if 5174 is taken
  },
})
