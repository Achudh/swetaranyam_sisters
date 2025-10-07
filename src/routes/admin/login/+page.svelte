<script lang="ts">
    import type { ErrorResponse, FetchError } from "$lib/nhost";
    import { goto } from "$app/navigation";
    import { auth, nhost } from "$lib/stores/auth";

    let email = $state("");
    let password = $state("");
    let isLoading = $state(false);
    let error = $state<string | null>(null);

    // Navigate to profile when authenticated
    $effect(() => {
        if ($auth.isAuthenticated) {
            void goto("/profile");
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
                void goto("/profile");
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

<svelte:head>
    <title>Admin Login | Swetaranyam Sisters</title>
    <meta
        name="description"
        content="Prof. Dr. R Nithya & Prof. Dr. R Vidya - acclaimed Carnatic vocalists with over 25 years of concerts, teaching, and research across India and internationally."
    />
</svelte:head>

<form onsubmit={handleSubmit} class="login-form">
    <h1>Admin Login</h1>
    {#if error}<p class="error">{error}</p>{/if}
    <label>
        Email
        <input type="email" bind:value={email} required />
    </label>
    <label>
        Password
        <input type="password" bind:value={password} required />
    </label>
    <button type="submit">Sign in</button>
</form>
{#if isLoading}isLoading{/if}

<style>
    .login-form {
        max-width: 360px;
        margin: 4rem auto;
        display: grid;
        gap: 0.75rem;
    }
    .error {
        color: #b00020;
    }
    input {
        padding: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        background-color: #b00020;
    }
    button {
        padding: 0.6rem 0.9rem;
    }
    label {
        display: grid;
        gap: 0.25rem;
    }
    h1 {
        margin-bottom: 0.5rem;
    }
    form {
        padding: 1rem;
    }
</style>
