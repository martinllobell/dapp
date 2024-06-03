import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dapp/',  // Asegúrate de que el nombre aquí coincida con el nombre de tu repositorio
  plugins: [react()],
  server: {
    proxy: {
      '/api/sportsdata': {
        target: 'https://api.sportsdata.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/sportsdata/, '')
      },
      '/api/football': {
        target: 'https://api.football-data.org/v2',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/football/, '')
      }
    }
  }
});
