import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Vercel configuration
			runtime: 'nodejs20.x',
			regions: ['iad1'], // US East region
			split: true, // Enable function splitting for better performance
			external: [],
			envPrefixes: ['PUBLIC_']
		}),
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
