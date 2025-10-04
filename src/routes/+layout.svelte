<script lang="ts">
	import Layout from "$lib/components/layout/Layout.svelte";
	import { dev } from "$app/environment";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";

	injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<Layout>
	<slot />
</Layout>
