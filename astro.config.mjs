import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xfhaixx.github.io',
  base: '/person_blog',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
