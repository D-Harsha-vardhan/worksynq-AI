import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: false,
      host: true,
      proxy: {
        '/api/dronahq': {
          target: 'https://agents-backend.dronahq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/dronahq/, '')
        }
      }
    }
  };
});
