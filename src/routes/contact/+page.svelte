<script lang="ts">
	// import { Clock, Users, BookOpen, Music, Award, Lightbulb, Calendar, MapPin, Star } from 'lucide-svelte';
	// import { compositionResearchData } from '$lib/data';

	// // Icon mapping for dynamic rendering
	// const iconMap = {
	// 	Clock,
	// 	Users,
	// 	BookOpen,
	// 	Music,
	// 	Award,
	// 	Lightbulb,
	// 	Calendar,
	// 	MapPin,
	// 	Star
	// };

	// $: ({ title, subtitle, introduction, aspects, educationalValue, methodology, impact } = compositionResearchData);
</script>

<svelte:head>
	<title>Contact Us | Swetaranyam Sisters</title>
	<meta
		name="description"
		content="Explore the Swetaranyam Sisters' comprehensive research on Carnatic compositions, including chronological mapping, comparative interpretation, and theme-based curation."
	/>
</svelte:head>

<section id="contact" class="py-16" aria-labelledby="contact-heading">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div >
			<div class="py-8">
				<h2
					id="contact-heading"
					class="font-display text-3xl text-gold-200"
				>
					Contact & Bookings
				</h2>
				<p class="mt-3 text-amber-100/90">
					For concerts, workshops and classes, send a message and
					we'll get back shortly.
				</p>
			</div>
			<form
				class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-6 space-y-4"
			>
				<div class="grid sm:grid-cols-2 gap-4">
					<div>
						<label for="name" class="text-sm text-gold-200"
							>Name</label
						>
						<input
							id="name"
							type="text"
							class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
							placeholder="Your name"
						/>
					</div>
					<div>
						<label for="email" class="text-sm text-gold-200"
							>Your Email</label
						>
						<input
							id="email"
							type="email"
							class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
							placeholder="you@example.com"
						/>
					</div>
				</div>
				<div>
					<label for="organization" class="text-sm text-gold-200"
						>Organization</label
					>
					<input
						id="organization"
						type="organization"
						class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
						placeholder="Your Organization"
					/>
				</div>
				<div>
					<label for="phone" class="text-sm text-gold-200"
						>Your phone number</label
					>
					<input
						id="phone"
						type="phone"
						class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
						placeholder="10 Digit Phone Number"
					/>
				</div>
				<div>
					<label for="message" class="text-sm text-gold-200"
						>Message</label
					>
					<textarea
						id="message"
						rows="5"
						class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
						placeholder="Tell us about your request..."
					></textarea>
				</div>
				<button
					type="submit"
					class="w-full rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 transition-colors"
				>
					Send Message
				</button>
			</form>
		</div>
	</div>
</section>
