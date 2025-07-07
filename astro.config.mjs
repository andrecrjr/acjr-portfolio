// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    site: 'https://acjr.dev', // Replace with your actual domain
    adapter: node({
        mode: 'standalone',
        experimentalStaticHeaders: true,
    }),
    integrations: [
        // Add sitemap integration when available
        // You can install @astrojs/sitemap: npm install @astrojs/sitemap
        // import sitemap from '@astrojs/sitemap';
        // sitemap(),
    ],
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto',
    },
    vite: {
        build: {
            cssMinify: true,
            minify: true,
        },
    },
}); 