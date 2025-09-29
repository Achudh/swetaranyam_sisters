<script lang="ts">
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
</script>

<svelte:head>
	<title>About | Swetaranyam Sisters</title>
	<meta
		name="description"
		content="Learn about the musical journey, training, and achievements of Dr. Dr. R Nithya & Dr. Dr. R Vidya - acclaimed Carnatic vocalists."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<!-- Background Image -->
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image: url('/images/AKF_0015.jpg'); background-position: center 35%;"
	></div>
	<!-- Gradient Overlay -->
	<div
		class="absolute inset-0 bg-gradient-to-b from-maroon-600/20 via-maroon-700/90 via-maroon-900/80 to-maroon-900"
	></div>
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
		<div class="text-center">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<h1
				class="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-gold-200 mx-6"
				in:fade={{ delay: 200 }}
			>
				About Swetaranyam Sisters
			</h1>
			<p
				class="text-xl text-amber-100/90 max-w-3xl mx-auto"
				in:fade={{ delay: 400 }}
			>
				Dr. Dr. R Nithya & Dr. Dr. R Vidya - A journey through tradition,
				excellence, and dedication to Carnatic music
			</p>
		</div>
	</div>
</section>

<!-- Training & Education Section -->
<section class="py-16 bg-maroon-800/40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
			<div in:fade={{ delay: 200 }}>
				<h2 class="font-display text-3xl text-gold-200 mb-8">
					Musical Training & Education
				</h2>
				<div class="space-y-8">
					<div class="border-l-4 border-gold-600 pl-6">
						<h3 class="font-semibold text-amber-100 text-lg mb-1">
							Foundational Training
						</h3>
						<p class="text-amber-100/85">
							The Swetaranyam Sisters were initiated into the
							basic nuances and foundational techniques of
							Carnatic music by <strong
								>Smt. Lalitha Venkataramani (Grand-niece of
								Harikeshanallur Muthaiah Bhagavathar)</strong
							>.
						</p>
					</div>
					<br />
					<div class="border-l-4 border-gold-600 pl-6">
						<h3 class="font-semibold text-amber-100 text-lg mb-1">
							Advance Training
						</h3>
						<p class="text-amber-100/85">
							Later, they underwent intense training in
							Gurukulavasa for <strong
								>17 years under Guru Thiruvengadu Sri A
								Jayaraman</strong
							>, establishing a deep foundation in classical music
							traditions. Since 2007, the artists have been
							undergoing advanced training under the renowned
							violinist
							<strong>Isai Peroli Sri R.K. Shriramkumar</strong>.
						</p>
					</div>
					<br />
					<div class="border-l-4 border-gold-600 pl-6">
						<h3 class="font-semibold text-amber-100 text-lg mb-1">
							Mentorship by Legendary Masters
						</h3>
						<p class="text-amber-100/85">
							They also took advanced training under <strong
								>Sangita Kalanidhi, Padma Bhushan Dr. R.K.
								Srikantan</strong
							>.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-8 lg:mt-0" in:fade={{ delay: 400 }}>
				<div
					class="rounded-2xl border border-maroon-700 bg-maroon-900/60 p-8"
				>
					<h3 class="font-display text-xl text-gold-200 mb-6">
						Specialized Training in Rare Compositions
					</h3>
					<div class="space-y-6">
						<div class="flex items-start gap-4">
							<div class="bullet-point"></div>
							<p class="text-amber-100/85">
								<strong
									>Rare compositions of Sri Muthuswami
									Dikshitar</strong
								>
								from Sangita Kala Acharya
								<strong>Smt. Kalpagam Swaminathan</strong>
							</p>
						</div>
						<div class="flex items-start gap-4">
							<div class="bullet-point"></div>
							<p class="text-amber-100/85">
								<strong>Rare kritis of Sri Thyagaraja</strong>
								from Sangita Kala Acharya
								<strong>Sri S. Rajam</strong>
							</p>
						</div>
						<div class="flex items-start gap-4">
							<div class="bullet-point"></div>
							<p class="text-amber-100/85">
								<strong>Bhajans and slokas</strong> from
								<strong>Smt. Kanaka Natarajan</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Performance Experience Section -->
<section class="py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12" in:fade={{ delay: 200 }}>
			<h2 class="font-display text-3xl text-gold-200 mb-4">
				Performance Experience
			</h2>
			<p class="text-xl text-amber-100/90 max-w-3xl mx-auto">
				With over 25 years of experience, the Swetaranyam Sisters have
				graced prestigious venues and events
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8" in:fade={{ delay: 400 }}>
			<!-- National Performances -->
			<div
				class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8"
			>
				<h3 class="font-display text-xl text-gold-200 mb-4">
					National Performances
				</h3>
				<p class="text-amber-100/85 mb-4">
					They have performed extensively in Carnatic music concerts
					across Tamil Nadu and other states under prestigious banners
					such as:
				</p>
				<span class="text-amber-100/85"
					>Sri Parthasarathy Swami Sabha, Brahma Gana Sabha, Sree Poornathrayeesa Temple(Kerala), etc.</span
				>
			</div>

			<!-- International Performances -->
			<div
				class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8"
			>
				<h3 class="font-display text-xl text-gold-200 mb-4">
					International Recognition
				</h3>
				<p class="text-amber-100/85 mb-4">
					Internationally, they were a part of the <strong
						>Cleveland Thyagaraja Aradhana</strong
					>
					in the USA, commemorating the centenary celebration of
					Sangita Kalanidhi <strong>Madurai Shri Mani Iyer</strong>.
				</p>
			</div>
		</div>
	</div>
	
</section>

<!-- Academic & Educational Contributions -->
<section class="py-16 bg-maroon-800/40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div in:fade={{ delay: 200 }}>
				<h2 class="font-display text-3xl text-gold-200 mb-6">
					Academic & Educational Contributions
				</h2>
				<div class="space-y-6">
					<div class="border-l-4 border-gold-600 pl-6">
						<h3 class="font-semibold text-amber-100 text-lg">
							Lecture-Demonstrations
						</h3>
						<p class="mt-2 text-amber-100/85">
							They have participated in lecture-demonstrations
							during the December music season alongside eminent
							scholars.
						</p>
					</div>

					<div class="border-l-4 border-gold-600 pl-6">
						<h3 class="font-semibold text-amber-100 text-lg">
							Harikatha Accompaniment
						</h3>
						<p class="mt-2 text-amber-100/85">
							Additionally, they have accompanied Harikatha
							performances by <strong
								>Dr. Premila Gurumurthy</strong
							>.
						</p>
					</div>
				</div>
			</div>

			<div class="text-center" in:fade={{ delay: 400 }}>
				<div
					class="rounded-2xl border border-maroon-700 bg-maroon-900/60 p-8"
				>
					<h3 class="font-display text-2xl text-gold-200 mb-4">
						Dedicated Teaching
					</h3>
					<p class="text-amber-100/85 text-lg">
						As dedicated teachers, the Swetaranyam Sisters continue
						to train numerous students in Carnatic music both
						personally and institutionally.
					</p>
					<div class="mt-6">
						<a
							href="/teaching"
							class="inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 transition-colors"
						>
							Learn More About Classes
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Research Section -->
<section class="py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12" in:fade={{ delay: 200 }}>
			<h2 class="font-display text-3xl text-gold-200 mb-4">
				Research Contributions
			</h2>
			<p class="text-xl text-amber-100/90 max-w-3xl mx-auto">
				Beyond performance and teaching, the sisters have made
				significant contributions to Carnatic music research
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8" in:fade={{ delay: 400 }}>
			<a
				href="/raagas"
				class="group rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8 hover:bg-maroon-800 transition-colors"
			>
				<h3
					class="font-display text-xl text-gold-200 mb-4 group-hover:text-gold-100"
				>
					Rāga Research
				</h3>
				<p class="text-amber-100/85 mb-4">
					Dr. Dr. R Nithya's doctoral research on "Development of rāga-s
					with special reference to Rāgalakṣaṇamu of Śāha Mahārāja"
				</p>
				<span class="text-gold-400 group-hover:text-gold-300"
					>Explore Research →</span
				>
			</a>

			<a
				href="/compositions"
				class="group rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8 hover:bg-maroon-800 transition-colors"
			>
				<h3
					class="font-display text-xl text-gold-200 mb-4 group-hover:text-gold-100"
				>
					Composer Research
				</h3>
				<p class="text-amber-100/85 mb-4">
					Dr. Dr. R Vidya's study on "Lesser known composers in Saṅgīta
					Sampradāya Pradarśini"
				</p>
				<span class="text-gold-400 group-hover:text-gold-300"
					>Explore Research →</span
				>
			</a>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="py-16 bg-maroon-800/40">
	<div
		class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
		in:fade={{ delay: 200 }}
	>
		<h2 class="font-display text-3xl text-gold-200 mb-4">
			Experience Their Artistry
		</h2>
		<p class="text-xl text-amber-100/90 mb-8 max-w-3xl mx-auto">
			Discover the depth of tradition, the beauty of innovation, and the
			passion for preservation that defines the Swetaranyam Sisters'
			musical journey.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 transition-colors"
			>
				Book a Performance
			</a>
			<a
				href="/teaching"
				class="inline-flex items-center gap-2 rounded-full border border-gold-600 text-gold-200 px-6 py-3 font-semibold hover:bg-maroon-800/60 transition-colors"
			>
				Learn Carnatic Music
			</a>
			<a
				href="/research"
				class="inline-flex items-center gap-2 rounded-full border border-gold-600 text-gold-200 px-6 py-3 font-semibold hover:bg-maroon-800/60 transition-colors"
			>
				Explore Research
			</a>
		</div>
	</div>
</section>

<style>
	.transition-colors {
		transition: all 0.2s ease-in-out;
	}

	.bullet-point {
		width: 12px;
		height: 12px;
		background-color: #fbbf24; /* gold-400 */
		border-radius: 50%;
		margin-top: 8px;
		flex-shrink: 0;
	}
</style>
