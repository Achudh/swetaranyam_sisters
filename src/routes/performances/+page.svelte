<script lang="ts">
	import type { PageData } from './$types';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import { Calendar, MapPin, Clock } from 'lucide-svelte';
	import { formatDate } from '$lib/utils';
	
	export let data: PageData;
	
	$: ({ performances, pagination } = data);
</script>

<svelte:head>
	<title>Performances | Swetaranyam Sisters</title>
	<meta name="description" content="Upcoming Carnatic music performances by Swetaranyam Sisters across India and internationally." />
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">Upcoming Performances</h1>
			<p class="text-lg text-amber-100/90 max-w-3xl mx-auto">
				Experience the soulful renditions of traditional Carnatic music by R. Nithya & R. Vidya at premier venues across India and internationally.
			</p>
		</div>
		
		{#if performances.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each performances as performance}
					<article class="rounded-2xl border border-maroon-700 bg-maroon-900/60 overflow-hidden card-hover">
						{#if performance.image}
							<div class="aspect-[16/9] bg-maroon-700/50">
								<img
									src={performance.image}
									alt={performance.title}
									class="w-full h-full object-cover"
								/>
							</div>
						{/if}
						
						<div class="p-6">
							<div class="flex items-start justify-between gap-4 mb-3">
								<h3 class="font-semibold text-amber-50 text-lg">{performance.title}</h3>
								<span class="inline-flex items-center rounded-full bg-gold-600 text-maroon-900 px-3 py-1 text-xs font-bold shrink-0">
									{performance.type}
								</span>
							</div>
							
							<div class="space-y-2 text-sm text-amber-100/80">
								<div class="flex items-center gap-2">
									<Calendar class="w-4 h-4 text-gold-400" />
									<span>{formatDate(performance.date, 'long')}</span>
								</div>
								
								<div class="flex items-center gap-2">
									<MapPin class="w-4 h-4 text-gold-400" />
									<span>{performance.venue}, {performance.location}</span>
								</div>
								
								{#if performance.accompaniment && performance.accompaniment.length > 0}
									<div class="flex items-center gap-2">
										<Clock class="w-4 h-4 text-gold-400" />
										<span>With {performance.accompaniment.join(', ')}</span>
									</div>
								{/if}
							</div>
							
							<p class="mt-3 text-sm text-amber-100/90">{performance.description}</p>
							
							<div class="mt-4 flex gap-2">
								<a 
									href="#" 
									class="text-gold-300 underline underline-offset-4 hover:text-gold-200 transition-colors"
								>
									Add to Calendar
								</a>
								<a 
									href="#" 
									class="text-gold-300 underline underline-offset-4 hover:text-gold-200 transition-colors"
								>
									Get Tickets
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
			
			<Pagination {pagination} baseUrl="/performances" />
		{:else}
			<div class="text-center py-12">
				<p class="text-amber-100/80 text-lg">No upcoming performances scheduled at this time.</p>
				<p class="text-amber-100/60 mt-2">Please check back later or contact us for booking inquiries.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.card-hover {
		transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}
	
	.card-hover:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}
	
	.transition-colors {
		transition: color 0.2s ease-in-out;
	}
</style>
