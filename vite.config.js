import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    proxy: {
      '/api/nvidia': {
        target: 'https://integrate.api.nvidia.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nvidia/, ''),
        headers: {
          'Authorization': 'Bearer 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'
        }
      }
    }
  }
});
