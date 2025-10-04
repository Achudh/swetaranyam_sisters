<script lang="ts">
	import type { PageData } from "./$types";
	import Pagination from "$lib/components/ui/Pagination.svelte";
	import { Calendar, MapPin, Clock } from "lucide-svelte";

	export let data: PageData;

	$: ({ performances, pagination } = data);
</script>

<svelte:head>
	<title>Performances | Swetaranyam Sisters</title>
	<meta
		name="description"
		content="Carnatic music performances by Swetaranyam Sisters across India and internationally."
	/>
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">
				Performances
			</h1>
			<p class="text-lg text-amber-100/90 max-w-3xl mx-auto">
				Experience the soulful renditions of traditional Carnatic music
				by Dr. R Nithya & Dr. R Vidya at premier venues across India and
				internationally.
			</p>
		</div>

		{#if performances.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each performances as performance}
					<article
						class="rounded-2xl border border-maroon-700 bg-maroon-900/60 overflow-hidden card-hover"
					>
						{#if performance.image}
							<div class="aspect-[16/9] bg-maroon-700/50 relative">
								<!-- Status Banner -->
								<span class="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
									class:bg-green-600={performance.status === 'upcoming'}
									class:bg-gray-500={performance.status === 'past'}
									class:bg-red-700={performance.status === 'cancelled'}
									class:text-maroon-900={performance.status === 'upcoming'}
									class:text-amber-50={performance.status !== 'upcoming'}
								>
									{performance.status.charAt(0).toUpperCase() + performance.status.slice(1)}
								</span>
								<img
									src={performance.image}
									alt={performance.title}
									class="w-full h-full object-cover"
								/>
							</div>
						{/if}

						<div class="p-6">
							<div
								class="flex items-start justify-between gap-4 mb-3"
							>
								<h3 class="font-semibold text-amber-50 text-lg">
									{performance.title}
								</h3>
								<span
									class="inline-flex items-center rounded-full bg-gold-600 text-maroon-900 px-3 py-1 text-xs font-bold shrink-0"
								>
									{performance.type}
								</span>
							</div>

							<div class="space-y-2 text-sm text-amber-100/80">
								<div class="flex items-center gap-2">
									<Calendar class="w-4 h-4 text-gold-400" />

									<!-- Date span -->
									<span>
										{new Date(
											performance.date,
										).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</span>
									<Clock class="w-4 h-4 text-gold-400" />

									<!-- Time span -->
									<span>
										{new Date(
											performance.date,
										).toLocaleTimeString("en-US", {
											hour: "numeric",
											minute: "numeric",
											hour12: true,
										})}
									</span>
								</div>

								<div class="flex items-center gap-2">
									<MapPin class="w-4 h-4 text-gold-400" />
									<a href={performance.locationUrl}>
										<span
											>{performance.venue}, {performance.location}</span
										></a
									>
								</div>

								{#if performance.accompaniment && performance.accompaniment.length > 0}
									<div class="flex items-center gap-2">
										<ul
											class="space-y-1 text-sm text-amber-100/85"
										>
											{#each performance.accompaniment as perf}
												<li
													class="flex items-start gap-2"
												>
													<span
														class="text-gold-400 mt-1"
														>•</span
													>
													<span>{perf}</span>
												</li>
											{/each}
										</ul>
										<!-- <span>With {performance.accompaniment.join(', ')}</span> -->
									</div>
								{/if}
							</div>

							<p class="mt-3 text-sm text-amber-100/90">
								{performance.description}
							</p>

							<div class="mt-4 flex gap-2">
								<a
									href="#"
									class="text-gold-300 underline underline-offset-4 hover:text-gold-200 transition-colors"
								>
									Add to Calendar
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<Pagination {pagination} baseUrl="/performances" />
		{:else}
			<div class="text-center py-12">
				<p class="text-amber-100/80 text-lg">
					No upcoming performances scheduled at this time.
				</p>
				<p class="text-amber-100/60 mt-2">
					Please check back later or contact us for booking inquiries.
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.card-hover {
		transition:
			transform 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
	}

	.card-hover:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	.transition-colors {
		transition: color 0.2s ease-in-out;
	}
</style>
