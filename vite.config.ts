import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Third arg '' loads all env vars (not just VITE_-prefixed ones) since
  // BE_URL is only used here in Node, never bundled into client code.
  const env = loadEnv(mode, process.cwd(), '')

  if (!env.BE_URL) {
    throw new Error(
      'BE_URL is not set. Copy .env.example to .env (or .env.local) and set BE_URL, e.g. BE_URL=http://localhost:8001',
    )
  }

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
