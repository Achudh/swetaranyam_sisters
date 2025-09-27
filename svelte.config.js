import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      split: true,
      regions: ['iad1'],
      envPrefixes: ['PUBLIC_']
    }),
    prerender: {
      handleHttpError: 'warn',
      entries: ['*'] // prerender all routes
    }
  }
};

export default config;
