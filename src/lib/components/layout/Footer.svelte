<script lang="ts">
	import { onMount } from 'svelte';
	
	let currentYear: number;
	
	onMount(() => {
		currentYear = new Date().getFullYear();
	});
</script>

<footer class="border-t border-maroon-700 bg-maroon-900/80">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm">
		<div>
			<div class="font-display text-lg tracking-wide">SWETARANYAM</div>
			<div class="text-xs uppercase tracking-[0.2em] text-gold-300">Sisters</div>
			<p class="mt-4 text-amber-100/80">
				Carnatic vocal duo dedicated to preserving tradition through performance, teaching, and research.
			</p>
		</div>
		
		<nav class="grid grid-cols-2 gap-6">
			<div>
				<h4 class="font-semibold text-gold-300">Explore</h4>
				<ul class="mt-2 space-y-2">
					<li>
						<a class="hover:text-gold-300 transition-colors" href="/performances">Performances</a>
					</li>
					<li>
						<a class="hover:text-gold-300 transition-colors" href="/teaching">Teaching</a>
					</li>
					<li>
						<a class="hover:text-gold-300 transition-colors" href="/media">Media</a>
					</li>
					<li>
						<a class="hover:text-gold-300 transition-colors" href="/events">Events</a>
					</li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-semibold text-gold-300">Follow</h4>
				<ul class="mt-2 space-y-2">
					<li>
						<a href="#" class="hover:text-gold-300 transition-colors">YouTube</a>
					</li>
					<li>
						<a href="#" class="hover:text-gold-300 transition-colors">Instagram</a>
					</li>
					<li>
						<a href="#" class="hover:text-gold-300 transition-colors">Facebook</a>
					</li>
				</ul>
			</div>
		</nav>
		
		<div class="md:text-right">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-5 py-2.5 font-semibold hover:bg-gold-500 transition-colors"
			>
				Book Us
			</a>
			<p class="mt-3 text-amber-100/60">
				© {currentYear} Swetaranyam Sisters. All rights reserved.
			</p>
		</div>
	</div>
</footer>

<style>
	.transition-colors {
		transition: color 0.2s ease-in-out;
	}
</style>
