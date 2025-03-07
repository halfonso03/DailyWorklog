import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../API/wwwroot/'
  },
  server: {
    port: 3001
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
