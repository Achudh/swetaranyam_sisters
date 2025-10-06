<script lang="ts">
	import Layout from "$lib/components/layout/Layout.svelte";
	import { dev } from "$app/environment";
	import Veil from "$lib/components/ui/Veil.svelte";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	let showVeil = false;
	if (typeof window !== "undefined") {
		const params = new URLSearchParams(window.location.search);
		showVeil = params.get("reveal") === "true";
	}
	injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<Layout>
	{#if showVeil}
		<Veil on:end={() => (showVeil = false)} />
	{:else}
	<slot />
	{/if}
</Layout>
<!-- <script>
	import Veil from '$lib/components/ui/Veil.svelte';
	let showVeil = false;
  
	if (typeof window !== 'undefined') {
	  const params = new URLSearchParams(window.location.search);
	  showVeil = params.get('reveal') === 'true';
	}
  </script>
  
  {#if showVeil}
	<Veil on:end={() => (showVeil = false)} />
  {/if}
  
  <slot />
   -->