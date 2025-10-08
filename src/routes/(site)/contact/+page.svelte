<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  let name = '';
  let email = '';
  let organization = '';
  let phone = '';
  let message = '';
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let feedback = '';

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    status = 'loading';
    feedback = '';
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, organization, phone, message })
      });

      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new Error('Invalid server response');
      }

      if (result.success) {
        status = 'success';
        feedback = 'Message sent successfully!';
        name = email = organization = phone = message = '';
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (err) {
      status = 'error';
      let errorMessage = 'Something went wrong. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      feedback = errorMessage;
      console.error('Submit error:', err);
    }
  }
</script>


<svelte:head>
	<title>Contact & Bookings | Swetaranyam Sisters</title>
	<meta
		name="description"
		content="Reach out to the Swetaranyam Sisters for concerts, workshops, and classes. Send a message to connect and collaborate on Carnatic musical journeys."
	/>
</svelte:head>

<section id="contact" class="py-20 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-maroon-950/90 via-maroon-900/80 to-maroon-950/90 pointer-events-none"></div>
  {#if status === 'success' || status === 'error'}
  <p
    class={`text-center text-sm pt-2 font-medium ${
      status === 'success'
        ? 'text-green-400'
        : 'text-red-400'
    }`}
    in:fly={{ y: -10, duration: 300 }}
    out:fade={{ duration: 300 }}
  >
    {feedback}
  </p>
{/if}

	<div class="relative max-w-5xl mx-auto px-6 lg:px-8">
		<header class="text-center mb-12">
			<h2 class="font-display text-4xl text-gold-300 tracking-wide">
				Contact &amp; Bookings
			</h2>
			<p class="mt-3 text-amber-100/80 max-w-2xl mx-auto">
				For concerts, workshops, or classes, share your details and we’ll get back to you shortly.
			</p>
		</header>

		<form
			on:submit|preventDefault={handleSubmit}
			class="rounded-3xl border border-maroon-700 bg-maroon-800/70 p-8 shadow-xl shadow-maroon-950/30 backdrop-blur-sm space-y-6"
		>
			<div class="grid sm:grid-cols-2 gap-6">
				<div>
					<label for="name" class="text-sm font-medium text-gold-200">Name</label>
					<input
						id="name"
						name="name"
						bind:value={name}
						required
						class="mt-2 w-full rounded-xl bg-maroon-900/70 border border-maroon-700 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500/70"
						placeholder="Your name"
					/>
				</div>
				<div>
					<label for="email" class="text-sm font-medium text-gold-200">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						bind:value={email}
						required
						class="mt-2 w-full rounded-xl bg-maroon-900/70 border border-maroon-700 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500/70"
						placeholder="you@example.com"
					/>
				</div>
			</div>

			<div class="grid sm:grid-cols-2 gap-6">
				<div>
					<label for="organization" class="text-sm font-medium text-gold-200">Organization</label>
					<input
						id="organization"
						name="organization"
						bind:value={organization}
						class="mt-2 w-full rounded-xl bg-maroon-900/70 border border-maroon-700 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500/70"
						placeholder="Organization name"
					/>
				</div>
				<div>
					<label for="phone" class="text-sm font-medium text-gold-200">Phone Number</label>
					<input
						id="phone"
						name="phone"
						bind:value={phone}
						class="mt-2 w-full rounded-xl bg-maroon-900/70 border border-maroon-700 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500/70"
						placeholder="10-digit number"
					/>
				</div>
			</div>

			<div>
				<label for="message" class="text-sm font-medium text-gold-200">Message</label>
				<textarea
					id="message"
					name="message"
					rows="5"
					required
					bind:value={message}
					class="mt-2 w-full rounded-xl bg-maroon-900/70 border border-maroon-700 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500/70"
					placeholder="Tell us about your request..."
				></textarea>
			</div>

			<div class="pt-4">
				<button
					type="submit"
					class="w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 px-6 py-3 font-semibold text-lg shadow-md hover:from-gold-400 hover:to-gold-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
					disabled={status === 'loading'}
				>
					{#if status === 'loading'}
						Sending...
					{:else}
						Send Message
					{/if}
				</button>
			</div>
		</form>
	</div>
</section>
