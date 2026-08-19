import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // `process.env` does not see .env files here — load them explicitly.
  const env = loadEnv(mode, import.meta.dirname, '')

  // Dev-only proxy so `/api` calls reach a backend on another origin without
  // CORS. This must be an ORIGIN with no path (e.g. http://localhost:5000);
  // a path here would be prefixed onto every request as /api/api/...
  // Leave VITE_API_URL unset in dev so requests stay relative and hit this proxy.
  const proxyTarget = env.VITE_DEV_API_PROXY

  return {
    plugins: [react(), tailwindcss()],
    server: proxyTarget
      ? {
          proxy: {
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : {},
  }
})
