import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const nvidiaKey = env.VITE_NVIDIA_API_KEY || process.env.VITE_NVIDIA_API_KEY || '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';

  return {
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
          headers: nvidiaKey ? { 'Authorization': `Bearer ${nvidiaKey}` } : {}
        },
        '/api/dronahq': {
          target: 'https://agents-backend.dronahq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/dronahq/, '')
        }
      }
    }
  };
});
