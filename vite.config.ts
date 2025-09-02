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
    // Target modern browsers to avoid unnecessary transpilation
    target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88'],
    // Disable legacy browser support to reduce bundle size
    cssTarget: 'chrome80',
    // Performance optimizations
    rollupOptions: {
      // Enhanced tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        manualChunks: (id) => {
          // Vendor chunks with more granular splitting
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              // Split radix components by type for better tree shaking
              if (id.includes('accordion') || id.includes('collapsible')) {
                return 'radix-layout';
              }
              if (id.includes('dialog') || id.includes('popover') || id.includes('dropdown')) {
                return 'radix-overlay';
              }
              return 'radix-core';
            }
            if (id.includes('lucide-react')) {
              // Separate chunk for icons to allow better tree shaking
              return 'icons';
            }
            if (id.includes('posthog') || id.includes('analytics')) {
              return 'analytics';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'forms';
            }
            if (id.includes('date-fns') || id.includes('class-variance-authority') || id.includes('clsx')) {
              return 'utils';
            }
            return 'vendor';
          }
          
          // Page chunks for better code splitting
          if (id.includes('src/pages/')) {
            const pageName = id.split('/pages/')[1]?.split('.')[0];
            return `page-${pageName?.toLowerCase()}`;
          }
          
          // Component chunks
          if (id.includes('src/components/ui/')) {
            return 'ui-components';
          }
          
          return undefined;
        },
        // Add cache-friendly asset naming
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Optimize images and caching
    assetsInlineLimit: 4096, // Inline small assets
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: ['console.log'], // Remove console.log calls
        unused: true, // Remove unused code
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
    },
  },
  // Performance hints
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
}));
