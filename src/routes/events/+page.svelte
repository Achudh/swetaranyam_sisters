<script lang="ts">
	import type { PageData } from './$types';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-svelte';
	import { formatDate } from '$lib/utils';
	
	export let data: PageData;
	
	$: ({ events, pagination } = data);
</script>

<svelte:head>
	<title>Events | Swetaranyam Sisters</title>
	<meta name="description" content="Upcoming events and concerts featuring Swetaranyam Sisters. Join us for performances, workshops, and lectures." />
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">Upcoming Events</h1>
			<p class="text-lg text-amber-100/90 max-w-3xl mx-auto">
				Join us for concerts, workshops, and lecture-demonstrations across India and internationally.
			</p>
		</div>
		
		{#if events.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each events as event}
					<article class="rounded-2xl border border-maroon-700 bg-maroon-900/60 overflow-hidden card-hover">
						{#if event.image}
							<div class="aspect-[16/9] bg-maroon-700/50">
								<img
									src={event.image}
									alt={event.title}
									class="w-full h-full object-cover"
								/>
							</div>
						{/if}
						
						<div class="p-6">
							<div class="flex items-start justify-between gap-4 mb-3">
								<h3 class="font-semibold text-amber-50 text-lg">{event.title}</h3>
								<span class="inline-flex items-center rounded-full bg-gold-600 text-maroon-900 px-3 py-1 text-xs font-bold shrink-0">
									{event.type}
								</span>
							</div>
							
							<div class="space-y-2 text-sm text-amber-100/80">
								<div class="flex items-center gap-2">
									<Calendar class="w-4 h-4 text-gold-400" />
									<span>{formatDate(event.date, 'long')} at {event.time}</span>
								</div>
								
								<div class="flex items-center gap-2">
									<MapPin class="w-4 h-4 text-gold-400" />
									<span>{event.venue}, {event.location}</span>
								</div>
							</div>
							
							<p class="mt-3 text-sm text-amber-100/90">{event.description}</p>
							
							<div class="mt-4 flex gap-2 flex-wrap">
								{#if event.calendarUrl}
									<a 
										href={event.calendarUrl} 
										class="text-gold-300 underline underline-offset-4 hover:text-gold-200 transition-colors text-sm"
									>
										Add to Calendar
									</a>
								{/if}
								{#if event.ticketUrl}
									<a 
										href={event.ticketUrl} 
										class="text-gold-300 underline underline-offset-4 hover:text-gold-200 transition-colors text-sm flex items-center gap-1"
									>
										Get Tickets
										<ExternalLink class="w-3 h-3" />
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
			
			<Pagination {pagination} baseUrl="/events" />
		{:else}
			<div class="text-center py-12">
				<p class="text-amber-100/80 text-lg">No upcoming events scheduled at this time.</p>
				<p class="text-amber-100/60 mt-2">Please check back later or contact us for event inquiries.</p>
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
