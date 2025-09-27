<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { PaginationInfo } from '$lib/types';
	import { generatePageNumbers } from '$lib/utils/pagination';
	
	export let pagination: PaginationInfo;
	export let baseUrl: string = '';
	export let showInfo: boolean = true;
	
	$: pageNumbers = generatePageNumbers(pagination.currentPage, pagination.totalPages);
	
	function getPageUrl(page: number | string): string {
		if (typeof page === 'string') return '#';
		if (baseUrl) {
			return page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
		}
		return page === 1 ? '?' : `?page=${page}`;
	}
</script>

{#if pagination.totalPages > 1}
	<div class="flex flex-col items-center gap-4 py-8">
		{#if showInfo}
			<div class="text-sm text-amber-100/80">
				Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to 
				{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of 
				{pagination.totalItems} results
			</div>
		{/if}
		
		<nav class="flex items-center gap-2" aria-label="Pagination">
			<!-- Previous Button -->
			<a
				href={pagination.hasPreviousPage ? getPageUrl(pagination.currentPage - 1) : '#'}
				class="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-maroon-700 bg-maroon-800/60 hover:bg-maroon-700 transition-colors {!pagination.hasPreviousPage ? 'opacity-50 cursor-not-allowed' : 'text-amber-100'}"
				aria-label="Previous page"
				aria-disabled={!pagination.hasPreviousPage}
			>
				<ChevronLeft class="w-4 h-4" />
				<span class="hidden sm:inline">Previous</span>
			</a>
			
			<!-- Page Numbers -->
			<div class="flex items-center gap-1">
				{#each pageNumbers as page}
					{#if typeof page === 'number'}
						<a
							href={getPageUrl(page)}
							class="inline-flex items-center justify-center w-10 h-10 text-sm rounded-lg border transition-colors {
								page === pagination.currentPage 
									? 'bg-gold-600 text-maroon-900 border-gold-600' 
									: 'border-maroon-700 bg-maroon-800/60 hover:bg-maroon-700 text-amber-100'
							}"
							aria-label="Go to page {page}"
							aria-current={page === pagination.currentPage ? 'page' : undefined}
						>
							{page}
						</a>
					{:else}
						<span class="inline-flex items-center justify-center w-10 h-10 text-sm text-amber-100/60">
							{page}
						</span>
					{/if}
				{/each}
			</div>
			
			<!-- Next Button -->
			<a
				href={pagination.hasNextPage ? getPageUrl(pagination.currentPage + 1) : '#'}
				class="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-maroon-700 bg-maroon-800/60 hover:bg-maroon-700 transition-colors {!pagination.hasNextPage ? 'opacity-50 cursor-not-allowed' : 'text-amber-100'}"
				aria-label="Next page"
				aria-disabled={!pagination.hasNextPage}
			>
				<span class="hidden sm:inline">Next</span>
				<ChevronRight class="w-4 h-4" />
			</a>
		</nav>
		
		<!-- Jump to page (for large page counts) -->
		{#if pagination.totalPages > 10}
			<div class="flex items-center gap-2 text-sm">
				<span class="text-amber-100/80">Go to:</span>
				<select 
					class="bg-maroon-800/60 border border-maroon-700 rounded-lg px-2 py-1 text-amber-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
					on:change={(e) => {
						const page = parseInt(e.target.value);
						if (page && page !== pagination.currentPage) {
							window.location.href = getPageUrl(page);
						}
					}}
				>
					{#each Array.from({length: pagination.totalPages}, (_, i) => i + 1) as page}
						<option value={page} selected={page === pagination.currentPage}>
							Page {page}
						</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>
{/if}

<style>
	.transition-colors {
		transition: all 0.2s ease-in-out;
	}
</style>
