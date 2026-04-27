import { heyApiPlugin } from '@hey-api/vite-plugin';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config';

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
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './junit-report.xml',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary'],
    },
  }
})
