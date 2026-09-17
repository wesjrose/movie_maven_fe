import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Third arg '' loads all env vars (not just VITE_-prefixed ones) since
  // BE_URL is only used here in Node, never bundled into client code.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Frontend calls `/api/...`; Vite forwards to the Go backend.
        // Example: GET /api/movies → ${BE_URL}/movies
        '/api': {
          target: env.BE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
