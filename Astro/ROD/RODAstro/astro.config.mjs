// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import alpinejs from '@astrojs/alpinejs';

import preact from '@astrojs/preact';

import cloudflare from '@astrojs/cloudflare';

import netlify from '@astrojs/netlify';

import node from '@astrojs/node';

import markdoc from '@astrojs/markdoc';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), alpinejs(), preact(), markdoc(), tailwind(), sitemap()],
  adapter: node({
    mode: 'standalone'
  })
});