<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	
	<main class="flex-1">
		<slot />
	</main>
	
	<Footer />
</div>
