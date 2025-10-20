<script lang="ts">
  import type { ErrorResponse } from "@nhost/nhost-js/auth";
  import type { FetchError } from "@nhost/nhost-js/fetch";
  import { goto } from "$app/navigation";
  import { auth, nhost } from "$lib/stores/auth";

  let email = $state("");
  let password = $state("");
  let isLoading = $state(false);
  let error = $state<string | null>(null);

  // Navigate to admin when authenticated
  $effect(() => {
    if ($auth.isAuthenticated) {
      void goto("/admin");
    }
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    error = null;

    try {
      // Use the signIn function from auth context
      const response = await nhost.auth.signInEmailPassword({
        email,
        password,
      });

      // If we have a session, sign in was successful
      if (response.body?.session) {
        void goto("/admin");
      } else {
        error = "Failed to sign in. Please check your credentials.";
      }
    } catch (err) {
      const fetchError = err as FetchError<ErrorResponse>;
      error = `An error occurred during sign in: ${fetchError.message}`;
    } finally {
      isLoading = false;
    }
  }
</script>

<div
  class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-maroon-600/20 via-maroon-700/20 to-maroon-900"
>
  <h1 class="mb-8 text-3xl font-bold text-gold-500 text-center">Sign In</h1>

  <form
    onsubmit={handleSubmit}
    class="auth-form w-full max-w-sm bg-maroon-600 rounded-xl shadow-lg p-8 flex flex-col gap-5"
  >
    <div class="auth-form-field flex flex-col gap-2">
      <label for="email" class="font-medium text-gold-50">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="auth-input px-4 py-3 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 bg-maroon-500"
      />
    </div>

    <div class="auth-form-field flex flex-col gap-2">
      <label for="password" class="font-medium text-gold-50">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        required
        class="auth-input px-4 py-3 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 bg-maroon-500"
      />
    </div>

    {#if error}
      <div
        class="auth-error text-white-700 bg-red-100 rounded-lg px-4 py-2 text-center text-sm"
      >
        {error}
      </div>
    {/if}

    <button
      type="submit"
      disabled={isLoading}
      class="auth-button bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gold-300"
    >
      {isLoading ? "Signing In..." : "Sign In"}
    </button>
  </form>
</div>
