import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://abyssiralis850.github.io',
  base: '/demo-plombier',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  devToolbar: { enabled: false }
});