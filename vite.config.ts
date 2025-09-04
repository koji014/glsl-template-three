/** @format */

import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

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
    plugins: [
        glsl({
            minify: true,
        }),
    ],
});
