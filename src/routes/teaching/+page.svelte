<script lang="ts">
	import { teachingPrograms } from '$lib/data';
	import { Mail, Clock, Users, BookOpen } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Teaching Programs | Swetaranyam Sisters</title>
	<meta name="description" content="Learn Carnatic music with Swetaranyam Sisters. Structured programs for beginner, intermediate, and advanced students." />
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">Teaching Programs</h1>
			<p class="text-lg text-amber-100/90 max-w-3xl mx-auto">
				Structured lessons for beginner, intermediate, and advanced students. Learn varnams, kritis, manodharma (alapana, neraval, swaras) and concert craft.
			</p>
		</div>
		
		<div class="grid gap-8 md:grid-cols-3">
			{#each teachingPrograms as program}
				<div class="rounded-2xl border border-maroon-700 bg-maroon-900/60 p-6 card-hover">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-12 h-12 rounded-full bg-gold-600 flex items-center justify-center">
							<BookOpen class="w-6 h-6 text-maroon-900" />
						</div>
						<div>
							<h3 class="font-display text-xl text-gold-200 capitalize">{program.level}</h3>
							<p class="text-sm text-amber-100/60">{program.title}</p>
						</div>
					</div>
					
					<p class="text-amber-100/90 mb-4">{program.description}</p>
					
					<div class="space-y-3 mb-6">
						<div class="flex items-center gap-2 text-sm text-amber-100/80">
							<Clock class="w-4 h-4 text-gold-400" />
							<span>Duration: {program.duration}</span>
						</div>
						
						<div class="flex items-center gap-2 text-sm text-amber-100/80">
							<Users class="w-4 h-4 text-gold-400" />
							<span>Format: {program.format}</span>
						</div>
					</div>
					
					<div class="mb-6">
						<h4 class="font-semibold text-gold-300 mb-2">What you'll learn:</h4>
						<ul class="space-y-1 text-sm text-amber-100/85">
							{#each program.topics as topic}
								<li class="flex items-start gap-2">
									<span class="text-gold-400 mt-1">•</span>
									<span>{topic}</span>
								</li>
							{/each}
						</ul>
					</div>
					
					{#if program.prerequisites.length > 0}
						<div class="mb-6">
							<h4 class="font-semibold text-gold-300 mb-2">Prerequisites:</h4>
							<ul class="space-y-1 text-sm text-amber-100/85">
								{#each program.prerequisites as prereq}
									<li class="flex items-start gap-2">
										<span class="text-gold-400 mt-1">•</span>
										<span>{prereq}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					
					<div class="flex items-center gap-2 text-sm text-amber-100/80 mb-4">
						<Mail class="w-4 h-4 text-gold-400" />
						<span>Contact: {program.contactInfo}</span>
					</div>
					
					<a
						href="/contact"
						class="w-full inline-flex justify-center items-center rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 transition-colors"
					>
						Enroll Now
					</a>
				</div>
			{/each}
		</div>
		
		<div class="mt-16 text-center">
			<div class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8 max-w-4xl mx-auto">
				<h2 class="font-display text-2xl text-gold-200 mb-4">Ready to Start Your Musical Journey?</h2>
				<p class="text-amber-100/90 mb-6">
					Whether you're a beginner or an advanced student of music looking to refine your skills, 
					we offer personalized instruction that respects traditional methods while adapting to modern learning needs.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 transition-colors"
					>
					Ask Questions
					</a>
				
				</div>
			</div>
		</div>
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
