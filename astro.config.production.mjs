// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Production config for GitHub Pages - Static build
export default defineConfig({
    adapter: node({
        mode: 'standalone',
        experimentalStaticHeaders: true,
    })
}); 