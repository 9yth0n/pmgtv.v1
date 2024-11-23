import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            'nativewind/babel',
            'react-native-reanimated/plugin'
          ]
        }
      })
    ],
    root: './',
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3001,
      strictPort: true,
      host: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3001,
        clientPort: 3001,
        timeout: 5000
      }
    },
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'expo-router': 'expo-router/web'
      },
      extensions: ['.web.jsx', '.web.js', '.jsx', '.js', '.json', '.ts', '.tsx']
    },
    optimizeDeps: {
      include: ['react-native-web', 'expo-router'],
      exclude: ['react-native-webview']
    },
    define: {
      __DEV__: command === 'serve',
      process: {
        env: {
          ...env,
          NODE_ENV: command === 'serve' ? 'development' : 'production'
        }
      }
    }
  };
});
