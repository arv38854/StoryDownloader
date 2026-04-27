import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Use /fetch instead of /api to avoid ad blocker blocking
      '/fetch': 'http://localhost:5000',
    },
  },
});
