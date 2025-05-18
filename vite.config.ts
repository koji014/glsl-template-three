/** @format */

import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        host: true,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/three')) return 'vendor-three';
                    if (id.includes('node_modules')) return 'vendor';
                },
            },
        },
    },
});
