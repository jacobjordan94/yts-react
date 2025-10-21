import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    define: {
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        tailwindcss(),
        visualizer({
            filename: './dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.svg', 'robots.txt', 'sitemap.xml'],
            manifest: {
                name: 'YTS Movie Browser',
                short_name: 'YTS React',
                description: 'Browse and discover movies with a beautiful, performant interface',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/yts\.mx\/api\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'yts-api-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60, // 1 hour
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/.*\.(jpg|jpeg|png|webp)$/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'movie-images-cache',
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // React core libraries
                    'react-vendor': ['react', 'react-dom', 'react-router'],

                    // Radix UI components
                    'radix-ui': [
                        '@radix-ui/react-aspect-ratio',
                        '@radix-ui/react-avatar',
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-scroll-area',
                        '@radix-ui/react-select',
                        '@radix-ui/react-separator',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-tabs',
                        '@radix-ui/react-tooltip',
                    ],

                    // Icons
                    icons: ['lucide-react'],
                },
            },
        },
    },
});
