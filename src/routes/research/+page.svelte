<script lang="ts">
	import { researchWorks } from '$lib/data';
	import { FileText, Calendar, ExternalLink, User } from 'lucide-svelte';
	import { formatDate } from '$lib/utils';
</script>

<svelte:head>
	<title>Research Works | Swetaranyam Sisters</title>
	<meta name="description" content="Explore the research contributions of Dr. R Nithya & Dr. R Vidya in Carnatic music, including doctoral theses and scholarly work." />
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">Research Works</h1>
			<p class="text-lg text-amber-100/90 max-w-3xl mx-auto">
				Explore the scholarly contributions of Dr. R Nithya & Dr. R Vidya in the field of Carnatic music research and tradition preservation.
			</p>
		</div>
		
		<div class="grid gap-8 md:grid-cols-2">
			{#each researchWorks as work}
				<article class="rounded-2xl border border-maroon-700 bg-maroon-900/60 p-6 card-hover">
					<div class="flex items-start gap-4 mb-4">
						<div class="w-12 h-12 rounded-full bg-gold-600 flex items-center justify-center shrink-0">
							<FileText class="w-6 h-6 text-maroon-900" />
						</div>
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-2">
								<User class="w-4 h-4 text-gold-400" />
								<span class="text-sm text-gold-300">{work.author}</span>
							</div>
							<h3 class="font-display text-xl text-gold-200 mb-2">{work.title}</h3>
							<div class="flex items-center gap-4 text-sm text-amber-100/60">
								{#if work.year}
								<div class="flex items-center gap-1">
									<Calendar class="w-4 h-4" />
									<span>{work.year}</span>
								</div>
								{/if}
								<span class="px-2 py-1 bg-maroon-800 rounded-full text-xs">
									{work.type}
								</span>
							</div>
						</div>
					</div>
					
					<p class="text-amber-100/90 mb-4">{work.description}</p>
					
					{#if work.institution}
						<div class="mb-4">
							<p class="text-sm text-gold-300">
								<strong>Institution:</strong> {work.institution}
							</p>
						</div>
					{/if}
					
					{#if work.abstract}
						<details class="mb-4">
							<summary class="text-sm text-gold-300 cursor-pointer hover:text-gold-200 font-medium">
								View Abstract
							</summary>
							<div class="mt-2 text-sm text-amber-100/85 leading-relaxed">
								{work.abstract}
							</div>
						</details>
					{/if}
					
					<div class="flex items-center justify-between">
						<div class="flex flex-wrap gap-1">
							{#each work.tags as tag}
								<span class="px-2 py-1 bg-maroon-800/60 rounded-full text-xs text-amber-100/80">
									{tag}
								</span>
							{/each}
						</div>
						
						{#if work.url}
							<div class="flex gap-2">
								<a
									href={work.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center rounded-full bg-gold-600 text-maroon-900 px-4 py-2 font-semibold hover:bg-gold-500 transition-colors text-sm"
									style="text-decoration: none;"
								>
								{work.buttonText || 'View Full Work'}
								</a>
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>
		
		<div class="mt-16 text-center">
			<div class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8 max-w-4xl mx-auto">
				<h2 class="font-display text-2xl text-gold-200 mb-4">Academic Contributions</h2>
				<p class="text-amber-100/90 mb-6">
					Our research work represents a commitment to preserving and documenting the rich traditions of Carnatic music. 
					Through scholarly investigation, we aim to contribute to the academic understanding of this ancient art form 
					while ensuring its transmission to future generations.
				</p>
				<div class="grid md:grid-cols-2 gap-6 text-left">
					<div>
						<h3 class="font-semibold text-gold-300 mb-2">Research Focus Areas</h3>
						<ul class="space-y-1 text-sm text-amber-100/85">
							<li>• Raga Development and Classification</li>
							<li>• Lesser-known Composers and Their Works</li>
							<li>• Traditional Music Pedagogy</li>
							<li>• Performance Practice Documentation</li>
						</ul>
					</div>
					<div>
						<h3 class="font-semibold text-gold-300 mb-2">Collaboration Opportunities</h3>
						<ul class="space-y-1 text-sm text-amber-100/85">
							<li>• Academic Research Partnerships</li>
							<li>• Conference Presentations</li>
							<li>• Publication Collaborations</li>
							<li>• Student Research Guidance</li>
						</ul>
					</div>
				</div>
				<div class="mt-6">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 transition-colors"
					>
						Discuss Research Collaboration
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
