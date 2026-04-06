import { defineConfig } from 'vite'
import { heyApiPlugin } from '@hey-api/vite-plugin';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    heyApiPlugin({
      config: {
        input: './openapi.json',
        output: 'src/client',
      },
    }),
  ],
})
