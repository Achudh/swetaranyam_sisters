<script lang="ts">
  import { onMount } from "svelte";
  import { initializeAuth } from "$lib/stores/auth";
  import AdminHeader from "$lib/components/layout/AdminHeader.svelte";
  import "$lib/components/app.css";

  let { children }: { children?: import("svelte").Snippet } = $props();

  // Initialize auth when component mounts
  onMount(() => {
    return initializeAuth();
  });
</script>

<div id="root">
  <AdminHeader />
  <div class="app-content">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
