import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/config/msw/setupTests.ts',
    coverage: {
      provider: 'v8',
      all: true,
      exclude: [
        '**/config.*',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.types.*',
        '.eslintrc.cjs',
      ],
    },
  },
});
