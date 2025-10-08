<script lang="ts">
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  injectAnalytics({ mode: dev ? "development" : "production" });
  import "$lib/components/app.css";
</script>

<div class="min-h-screen flex flex-col">
  <main class="flex-1">
    <Header />
    <slot />
    <Footer />
  </main>
</div>
