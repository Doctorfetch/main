import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path: https://<user>.github.io/main/
export default defineConfig({
  base: '/main/',
  plugins: [react()],
})
