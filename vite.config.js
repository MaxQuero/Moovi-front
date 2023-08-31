import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  server: {
    host: true // Added manually by Max so we can reach 127.0.0.1 and host from driver/etc
  }
});
