// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.wolfremium.dev',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },

  integrations: [sitemap()]
});