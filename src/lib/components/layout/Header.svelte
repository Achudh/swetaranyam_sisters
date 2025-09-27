<script lang="ts">
	import { mobileMenuOpen } from '$lib/stores';
	import { Menu, X } from 'lucide-svelte';

	$: mobileMenu = $mobileMenuOpen;

	function toggleMobileMenu() {
		mobileMenuOpen.set(!mobileMenu);
	}

	function closeMobileMenu() {
		mobileMenuOpen.set(false);
	}
</script>

<header class="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-maroon-700/70 bg-maroon-800/90 border-b border-gold-700/40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-3" on:click={closeMobileMenu}>
				<span class="inline-grid place-items-center w-9 h-9 rounded-full bg-gold-600 text-maroon-900 font-display font-bold">
					SS
				</span>
				<div class="leading-tight">
					<div class="font-display text-lg tracking-wide">SWETARANYAM</div>
					<div class="text-xs uppercase tracking-[0.2em] text-gold-300">Sisters</div>
				</div>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden md:flex items-center gap-6 text-sm">
				<a class="hover:text-gold-300 transition-colors" href="/about">About</a>
				<a class="hover:text-gold-300 transition-colors" href="/performances">Performances</a>
				<a class="hover:text-gold-300 transition-colors" href="/teaching">Teaching</a>
				<a class="hover:text-gold-300 transition-colors" href="/research">Research</a>
				<a class="hover:text-gold-300 transition-colors" href="/media">Media</a>
				<a class="hover:text-gold-300 transition-colors" href="/events">Events</a>
				<a class="hover:text-gold-300 transition-colors" href="/contact">Contact</a>
				<a
					href="/#contact"
					class="ml-2 inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300 transition-colors"
				>
					Book Us
				</a>
			</nav>

			<!-- Mobile menu button -->
			<button
				class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors"
				aria-label={mobileMenu ? 'Close Menu' : 'Open Menu'}
				on:click={toggleMobileMenu}
			>
				{#if mobileMenu}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Drawer -->
	{#if mobileMenu}
		<div class="md:hidden border-t border-maroon-600 bg-maroon-800/95">
			<div class="px-4 py-4 space-y-2 text-sm">
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/#about" on:click={closeMobileMenu}>About</a>
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/performances" on:click={closeMobileMenu}>Performances</a>
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/teaching" on:click={closeMobileMenu}>Teaching</a>
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/research" on:click={closeMobileMenu}>Research</a>
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/media" on:click={closeMobileMenu}>Media</a>
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/events" on:click={closeMobileMenu}>Events</a>
				<a class="block py-2 hover:text-gold-300 transition-colors" href="/#contact" on:click={closeMobileMenu}>Contact</a>
				<a
					href="/#contact"
					class="inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 transition-colors"
					on:click={closeMobileMenu}
				>
					Book Us
				</a>
			</div>
		</div>
	{/if}
</header>

<style>
	/* Custom styles for smooth transitions */
	.transition-colors {
		transition: color 0.2s ease-in-out;
	}
</style>
