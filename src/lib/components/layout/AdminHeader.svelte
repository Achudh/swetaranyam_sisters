<script lang="ts">
  import { mobileMenuOpen } from "$lib/stores";
  import { Menu, X } from "lucide-svelte";
  import { auth, nhost } from "$lib/stores/auth";
  import { goto } from "$app/navigation";

  $: mobileMenu = $mobileMenuOpen;

  function toggleMobileMenu() {
    mobileMenuOpen.set(!mobileMenu);
  }

  function closeMobileMenu() {
    mobileMenuOpen.set(false);
    handleSignOut;
  }

  async function handleSignOut() {
    if ($auth.session) {
      await nhost.auth.signOut({
        refreshToken: $auth.session.refreshToken,
      });
      void goto("/admin/login");
    }
  }
</script>

<header
  class="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-maroon-700/70 bg-maroon-800/90 border-b border-gold-700/40"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <button class="flex items-center gap-3" onclick={closeMobileMenu}>
        <span
          class="inline-grid place-items-center w-9 h-9 rounded-full bg-gold-600 text-maroon-900 font-display font-bold"
        >
          SS
        </span>
        <div class="leading-tight">
          <div class="font-display text-lg tracking-wide">SWETARANYAM</div>
          <div class="text-xs uppercase tracking-[0.2em] text-gold-300">
            Sisters
          </div>
        </div>
      </button>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm">
        {#if $auth.isAuthenticated}
          <button
            onclick={handleSignOut}
            class="ml-2 inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300 transition-colors"
          >
            Log out
          </button>
        {/if}
      </nav>

      <!-- Mobile menu button -->
      <button
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
        aria-label={mobileMenu ? "Close Menu" : "Open Menu"}
        onclick={toggleMobileMenu}
      >
        {#if mobileMenu}
          <X class="w-6 h-6" />
        {:else}
          <Menu class="w-6 h-6" />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Drawer -->
  {#if mobileMenu}
    <div class="md:hidden border-t border-maroon-600 bg-maroon-800/95">
      <div class="px-4 py-4 space-y-2 text-sm">
        {#if $auth.isAuthenticated}
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 transition-colors"
            onclick={closeMobileMenu}
          >
            Log out
          </button>
        {/if}
      </div>
    </div>
  {/if}
</header>

<style>
  /* Custom styles for smooth transitions */
  .transition-colors {
    transition: color 0.2s ease-in-out;
  }
</style>
