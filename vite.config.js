import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sets BASE_URL during deployment (e.g. '/about-me/')
// Falls back to a sensible default for local dev / non-Pages builds.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/about-me/',
})
