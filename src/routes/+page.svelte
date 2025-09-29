<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { performances, events, albums, mediaItems, teachingPrograms, researchWorks, testimonials } from '$lib/data';
	import { formatDate } from '$lib/utils';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	
	// Get featured items
	$: featuredEvents = events.slice(0, 3);
	$: featuredAlbums = albums.slice(0, 2);
	$: featuredTestimonials = testimonials.slice(0, 3);
	
	const heroImages = [
		'/images/AKF_0036.jpg',
		'/images/AKF_0038.jpg',
		'/images/AKF_0013.jpg',
		'/images/AKF_0041.jpg',
		'/images/AKF_0015.jpg',
	];
	
	let current = 0;
	let interval: any;
	
	function next() {
		current = (current + 1) % heroImages.length;
	}
	function prev() {
		current = (current - 1 + heroImages.length) % heroImages.length;
	}
	
	onMount(() => {
		interval = setInterval(next, 4000);
		return () => clearInterval(interval);
	});
	
	onMount(() => {
		// Smooth scroll for anchor links
		const handleAnchorClick = (e: Event) => {
			const target = e.target as HTMLAnchorElement;
			if (target.hash) {
				e.preventDefault();
				const element = document.querySelector(target.hash);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}
		};
		
		document.addEventListener('click', handleAnchorClick);
		return () => document.removeEventListener('click', handleAnchorClick);
	});
</script>

<svelte:head>
	<title>Swetaranyam Sisters | Carnatic Vocal Duo</title>
	<meta name="description" content="Dr. R Nithya & Dr. R Vidya - acclaimed Carnatic vocalists with over 25 years of concerts, teaching, and research across India and internationally." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<!-- Background Carousel -->
	<div class="absolute inset-0">
		{#each heroImages as image, index}
			<div 
				class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
				class:opacity-100={current === index}
				class:opacity-0={current !== index}
				style="background-image: url('{image}'); background-position: center 15%; background-size: cover;"
			></div>
		{/each}
	</div>
	<div class="absolute inset-0 bg-gradient-to-b from-maroon-600/20 via-maroon-700/20 via-maroon-600/30 to-maroon-900"></div>
	
	<!-- Navigation Arrows for Hero -->
	<button
		on:click={prev}
		class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-maroon-900/70 hover:bg-maroon-800/90 text-gold-200 rounded-full p-3 shadow-lg focus:outline-none transition-colors"
		aria-label="Previous background image"
	>
		<ChevronLeft class="w-6 h-6" />
	</button>
	<button
		on:click={next}
		class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-maroon-900/70 hover:bg-maroon-800/90 text-gold-200 rounded-full p-3 shadow-lg focus:outline-none transition-colors"
		aria-label="Next background image"
	>
		<ChevronRight class="w-6 h-6" />
	</button>

	<!-- Content -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
		<div class="py-12 md:py-20 lg:py-56">
		</div>
	</div>
</section>
<!-- Hero Section 2-->
<section class="relative pt-12 md:pt-16 lg:pt-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
		<!-- Text Left -->
		<div class="flex-1 max-w-2xl">
			<h1 class="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-gold-200 mb-6">
				Preserving Tradition, Creating Legacy
			</h1>
			<p class="text-lg text-amber-100/90 mb-8">
				Dr. Dr. R Nithya & Dr. Dr. R Vidya - acclaimed Carnatic vocalists with over 25 years of concerts, teaching, and research across India and internationally.
			</p>
			<div class="flex flex-wrap gap-3">
				<a
					href="#contact"
					class="inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300 transition-colors"
				>
					Book with us
				</a>
				<a
					href="/teaching"
					class="inline-flex items-center gap-2 rounded-full border border-gold-600 text-gold-200 px-6 py-3 font-semibold hover:bg-maroon-800/60 transition-colors"
				>
					Learn Carnatic Music
				</a>
			</div>
		</div>
	</div>
	<div class="gold-border mt-10 md:mt-16"></div>
</section>
<!-- Highlights Section -->
<section class="py-12 sm:py-16" aria-labelledby="highlights">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 id="highlights" class="sr-only">Highlights</h2>
		<div class="grid gap-6 md:grid-cols-3">
			<!-- Featured Events -->
			<a
				href="/events"
				class="group rounded-2xl overflow-hidden border border-maroon-700 bg-maroon-800/60 hover:bg-maroon-800 transition-all duration-300 card-hover"
			>
				<div class="aspect-[16/9] bg-maroon-700/50 grid place-items-center">
					<img
						src="/images/AKF_0006-Enhanced-NR.jpg"
						alt="Upcoming concerts"
						class="h-80 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
					/>
				</div>
				<div class="p-5">
					<h3 class="font-display text-xl text-gold-200">Upcoming Concerts</h3>
					<p class="mt-2 text-sm text-amber-100/80">See dates and venues for the December season and tours.</p>
				</div>
			</a>
			
			<!-- Featured Albums -->
			<a
				href="/media"
				class="group rounded-2xl overflow-hidden border border-maroon-700 bg-maroon-800/60 hover:bg-maroon-800 transition-all duration-300 card-hover"
			>
				<div class="aspect-[16/9] bg-maroon-700/50 grid place-items-center">
					<img
						src="/images/AKF_0041 copy.jpg"
						alt="Featured album"
						class="h-80 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
					/>
				</div>
				<div class="p-5">
					<h3 class="font-display text-xl text-gold-200">Featured Album</h3>
					<p class="mt-2 text-sm text-amber-100/80">Listen to "Shri Mukha Kirtanas" on your favourite platform.</p>
				</div>
			</a>
			
			<!-- Gallery -->
			<a
				href="/media"
				class="group rounded-2xl overflow-hidden border border-maroon-700 bg-maroon-800/60 hover:bg-maroon-800 transition-all duration-300 card-hover"
			>
				<div class="aspect-[16/9] bg-maroon-700/50 grid place-items-center">
					<img
						src="/images/AKF_0015 copy.jpg"
						alt="Gallery"
						class="h-80 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
					/>
				</div>
				<div class="p-5">
					<h3 class="font-display text-xl text-gold-200">Gallery</h3>
					<p class="mt-2 text-sm text-amber-100/80">Glimpses from concerts, events, and student showcases.</p>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="bg-maroon-800/40 py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
		<div in:fade={{ delay: 200 }}>
			<h2 class="font-display text-3xl text-gold-200">About the Artists</h2>
			<p class="mt-4 text-amber-100/90">
				Disciples hailing from a rich guru parampara of Carnatic music. The Swetaranyam Sisters have performed across premier sabhas in Chennai and beyond, presented lec-dems, accompanied dance productions, and are extensively training numerous students worldwide.
			</p>
			<div class="mt-6 flex gap-3">
				<a
					href="/about"
					class="inline-flex rounded-full bg-gold-600 text-maroon-900 px-5 py-2.5 font-semibold hover:bg-gold-500 transition-colors"
				>
					About
				</a>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-2" in:fade={{ delay: 400 }}>
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img
				class="rounded-xl border border-maroon-700 object-cover aspect-[4/5]"
				src="/images/Nithya.jpg"
				alt="Nithya"
			/>
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img
				class="rounded-xl border border-maroon-700 object-cover aspect-[4/5]"
				src="/images/Vidya.jpg"
				alt="Vidya"
			/>
		</div>
	</div>
</section>

<!-- Research Section -->
<section id="research" class="py-14" aria-labelledby="research-heading">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 id="research-heading" class="font-display text-3xl text-gold-200">Research Works</h2>
		<div class="py-8">
			Explore the scholarly contributions of Dr. R Nithya & Dr. R Vidya in the field of Carnatic music research and tradition preservation.
		</div>
		<div class="">
			<a
				href="/research"
				class="inline-flex rounded-full bg-gold-600 text-maroon-900 px-5 py-2.5 font-semibold hover:bg-gold-500 transition-colors"
			>
				View Research Works
			</a>
		</div>
	</div>
</section>

<!-- Featured Video Section -->
<section class="bg-maroon-800/40 py-14" aria-labelledby="featured-video">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <h2 id="featured-video" class="font-display text-3xl text-gold-200">
		Featured Performance
	  </h2>
	  <div class="mt-6 rounded-2xl overflow-hidden border border-maroon-700 bg-maroon-800/50">
		<div class="aspect-video">
		  <iframe
			class="w-full h-full"
			src="https://www.youtube.com/embed/yCaKhNMtVoc"
			title="Poorna Chandra Bimba | Ragamalika | Rupakam | Muthuswamy Dikshitar | Swetaranyam Sisters"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		  ></iframe>
		</div>
	  </div>
	</div>
  </section>
  

<!-- Testimonials Section
<section class="py-14 bg-maroon-800/40" aria-labelledby="testimonials">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 id="testimonials" class="font-display text-3xl text-gold-200">Words from Students & Organizers</h2>
		<div class="mt-6 overflow-x-auto no-scrollbar">
			<div class="flex gap-5 min-w-max">
				{#each featuredTestimonials as testimonial}
					<figure class="w-80 shrink-0 rounded-2xl border border-maroon-700 bg-maroon-900/60 p-6">
						<blockquote class="text-amber-100/90">"{testimonial.content}"</blockquote>
						<figcaption class="mt-4 text-sm text-gold-200">
							— {testimonial.author}, {testimonial.location}
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</div>
</section> -->

<!-- Contact Section -->
<section id="contact" class="py-16" aria-labelledby="contact-heading">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-10">
			<div>
				<h2 id="contact-heading" class="font-display text-3xl text-gold-200">Contact & Bookings</h2>
				<p class="mt-3 text-amber-100/90">
					For concerts, workshops and classes, send a message and we'll get back shortly.
				</p>
				<div class="mt-6 space-y-2 text-amber-100/85">
					<p>
						<strong class="text-gold-300">Email:</strong> sriswetaranyam@gmail.com
					</p>
					<p>
						<strong class="text-gold-300">Location:</strong> Thiruvanmiyur, Chennai
					</p>
				</div>
			</div>
			<form class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-6 space-y-4">
				<div class="grid sm:grid-cols-2 gap-4">
					<div>
						<label class="text-sm text-gold-200">Name</label>
						<input
							type="text"
							class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
							placeholder="Your name"
						/>
					</div>
					<div>
						<label class="text-sm text-gold-200">Email</label>
						<input
							type="email"
							class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
							placeholder="you@example.com"
						/>
					</div>
				</div>
				<div>
					<label class="text-sm text-gold-200">Inquiry Type</label>
					<select class="mt-1 w-full rounded-lg bg-maroon-900/70 border border-maroon-700 px-3 py-2 text-amber-50 focus:outline-none focus:ring-2 focus:ring-gold-500">
						<option>Concert Booking</option>
						<option>Teaching / Classes</option>
						<option>Research / Collaboration</option>
						<option>Other</option>
					</select>
				</div>
				<div>
					<label class="text-sm text-gold-200">Message</label>
					<textarea
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

<style>
	.transition-colors {
		transition: all 0.2s ease-in-out;
	}
	
	.transition-all {
		transition: all 0.3s ease-in-out;
	}
	
	.transition-opacity {
		transition: opacity 0.3s ease-in-out;
	}
</style>
