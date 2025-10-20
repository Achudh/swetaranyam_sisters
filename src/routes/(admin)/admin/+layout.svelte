<script lang="ts">
  import { onMount } from "svelte";
  import { initializeAuth, isAuthenticated } from "$lib/stores/auth";
  import AdminHeader from "$lib/components/layout/AdminHeader.svelte";
  import "$lib/components/app.css";
  import { goto } from "$app/navigation";

  let { children }: { children?: import("svelte").Snippet } = $props();

  // Initialize auth when component mounts
  onMount(() => {
    if ($isAuthenticated) {
      goto("/admin");
    } else {
      goto("/admin/login");
    }
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
