<script lang="ts">
	import type { PageData } from './$types';
	import type { Album, MediaItem } from '$lib/types';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import { Play, ShoppingCart, ExternalLink, Calendar } from 'lucide-svelte';
	import { formatDate } from '$lib/utils';
	
	export let data: PageData;
	
	$: ({ media, pagination } = data);
	
	function isAlbum(item: Album | MediaItem): item is Album {
		return item.type === 'album';
	}
</script>

<svelte:head>
	<title>Media & Albums | Swetaranyam Sisters</title>
	<meta name="description" content="Explore our collection of Carnatic music albums, videos, and media content by Swetaranyam Sisters." />
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">Media & Albums</h1>
			<p class="text-lg text-amber-100/90 max-w-3xl mx-auto">
				Discover our collection of Carnatic music albums, performance videos, and other media content.
			</p>
		</div>
		
		{#if media.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each media as item}
					<article class="rounded-2xl border border-maroon-700 bg-maroon-900/60 overflow-hidden card-hover">
						{#if item.thumbnail}
							<div class="aspect-square bg-maroon-700/50 relative group">
								<img
									src={item.thumbnail}
									alt={item.title}
									class="w-full h-full object-cover"
								/>
								{#if isAlbum(item)}
									<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<Play class="w-12 h-12 text-white" />
									</div>
								{/if}
							</div>
						{/if}
						
						<div class="p-6">
							<div class="flex items-start justify-between gap-4 mb-3">
								<h3 class="font-semibold text-amber-50 text-lg">{item.title}</h3>
								<span class="inline-flex items-center rounded-full bg-gold-600 text-maroon-900 px-3 py-1 text-xs font-bold shrink-0">
									{item.type}
								</span>
							</div>
							
							<p class="text-sm text-amber-100/90 mb-3">{item.description}</p>
							
							<div class="flex items-center gap-2 text-xs text-amber-100/60 mb-4">
								<Calendar class="w-4 h-4" />
								<span>{formatDate(item.releaseDate, 'short')}</span>
								{#if isAlbum(item) && item.label}
									<span>• {item.label}</span>
								{/if}
							</div>
							
							{#if isAlbum(item)}
								<div class="space-y-2">
									<div class="flex gap-2">
										{#if item.listenUrl}
											<a 
												href={item.listenUrl} 
												class="flex items-center gap-1 rounded-full border border-gold-600 px-4 py-2 text-sm hover:bg-maroon-800/60 transition-colors"
											>
												<Play class="w-4 h-4" />
												Listen
											</a>
										{/if}
										{#if item.buyUrl}
											<a 
												href={item.buyUrl} 
												class="flex items-center gap-1 rounded-full border border-gold-600 px-4 py-2 text-sm hover:bg-maroon-800/60 transition-colors"
											>
												<ShoppingCart class="w-4 h-4" />
												Buy
											</a>
										{/if}
									</div>
									
									{#if item.tracklist && item.tracklist.length > 0}
										<details class="mt-3">
											<summary class="text-sm text-gold-300 cursor-pointer hover:text-gold-200">
												Tracklist ({item.tracklist.length} tracks)
											</summary>
											<div class="mt-2 space-y-1 text-xs text-amber-100/80">
												{#each item.tracklist.slice(0, 3) as track}
													<div class="flex justify-between">
														<span>{track.title}</span>
														<span>{track.duration}</span>
													</div>
												{/each}
												{#if item.tracklist.length > 3}
													<div class="text-gold-300">...and {item.tracklist.length - 3} more</div>
												{/if}
											</div>
										</details>
									{/if}
								</div>
							{:else}
								{#if item.url}
									<a 
										href={item.url} 
										class="inline-flex items-center gap-1 rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 transition-colors text-sm"
									>
										<ExternalLink class="w-4 h-4" />
										Explore
									</a>
								{/if}
							{/if}
						</div>
					</article>
				{/each}
			</div>
			
			<Pagination {pagination} baseUrl="/media" />
		{:else}
			<div class="text-center py-12">
				<p class="text-amber-100/80 text-lg">No media content available at this time.</p>
				<p class="text-amber-100/60 mt-2">Please check back later for new releases and content.</p>
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
	
	.transition-opacity {
		transition: opacity 0.3s ease-in-out;
	}
</style>
