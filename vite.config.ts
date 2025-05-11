import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@mysten/sui.js/client',
        '@mysten/sui.js',
      ],
      output: {
        globals: {
          '@mysten/sui.js/client': 'SuiClient',
          '@mysten/sui.js': 'Sui'
        }
      }
    }
  }
}));
