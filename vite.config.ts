import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
<<<<<<< HEAD
    open: true
=======
    open: true,
    proxy: {
      '/api': 'http://localhost:8787'
    }
>>>>>>> origin/main
  }
});
