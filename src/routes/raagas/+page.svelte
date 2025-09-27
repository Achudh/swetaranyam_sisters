<script lang="ts">
	import { Clock, Users, BookOpen, Music, Award, Lightbulb } from 'lucide-svelte';
	import { raagaResearchData } from '$lib/data';
	
	// Icon mapping for dynamic rendering
	const iconMap = {
		Clock,
		Users,
		BookOpen,
		Music,
		Award,
		Lightbulb
	};
	
	$: ({ title, subtitle, introduction, aspects, educationalValue, impact } = raagaResearchData);
</script>

<svelte:head>
	<title>Research on Rāgas | Swetaranyam Sisters</title>
	<meta name="description" content="Explore the Swetaranyam Sisters' comprehensive research on Carnatic rāgas, including chronological exploration, comparative analysis, and thematic curation." />
</svelte:head>

<div class="py-14">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="font-display text-4xl sm:text-5xl text-gold-200 mb-4">{title}</h1>
			<p class="text-lg text-amber-100/90 max-w-4xl mx-auto">
				{@html subtitle}
			</p>
		</div>
		
		<!-- Key Aspects Section -->
		<div class="mb-16">
			<h2 class="font-display text-3xl text-gold-200 mb-8 text-center">Key Aspects of Their Work on Rāgas</h2>
			<p class="text-lg text-amber-100/90 max-w-4xl mx-auto mb-12 text-center">
				{introduction}
			</p>
			
			<div class="grid gap-8 lg:grid-cols-2">
				{#each aspects as aspect}
					{@const IconComponent = iconMap[aspect.icon]}
					<article class="rounded-2xl border border-maroon-700 bg-maroon-900/60 p-6 card-hover">
						<div class="flex items-start gap-4 mb-4">
							<div class="w-12 h-12 rounded-full bg-gold-600 flex items-center justify-center shrink-0">
								<IconComponent class="w-6 h-6 text-maroon-900" />
							</div>
							<div class="flex-1">
								<h3 class="font-display text-xl text-gold-200 mb-2">{aspect.title}</h3>
							</div>
						</div>
						<div class="text-amber-100/90 leading-relaxed">
							<p class="mb-3">{aspect.description}</p>
							<div class="bg-maroon-800/40 rounded-lg p-4 mt-4">
								<p class="text-sm text-amber-100/80 italic">
									"{aspect.quote}"
								</p>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<!-- Archival & Educational Value -->
		<div class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8 mb-16">
			<div class="flex items-start gap-6">
				<div class="w-16 h-16 rounded-full bg-gold-600 flex items-center justify-center shrink-0">
					<Award class="w-8 h-8 text-maroon-900" />
				</div>
				<div class="flex-1">
					<h3 class="font-display text-2xl text-gold-200 mb-4">{educationalValue.title}</h3>
					<p class="text-amber-100/90 leading-relaxed mb-6">
						{educationalValue.description}
					</p>
					<div class="grid md:grid-cols-3 gap-6">
						{#each educationalValue.audiences as audience}
							{@const AudienceIcon = iconMap[audience.icon]}
							<div class="text-center">
								<div class="w-12 h-12 rounded-full bg-maroon-700 flex items-center justify-center mx-auto mb-3">
									<AudienceIcon class="w-6 h-6 text-gold-400" />
								</div>
								<h4 class="font-semibold text-gold-300 mb-2">{audience.title}</h4>
								<p class="text-sm text-amber-100/80">{audience.description}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		
		<!-- Call to Action Section -->
		<div class="mt-16 text-center">
			<div class="rounded-2xl border border-maroon-700 bg-maroon-800/60 p-8 max-w-4xl mx-auto">
				<h2 class="font-display text-2xl text-gold-200 mb-4">{impact.title}</h2>
				<p class="text-amber-100/90 mb-6">
					{impact.description}
				</p>
				<div class="grid md:grid-cols-2 gap-6 text-left">
					{#each impact.opportunities as opportunity}
						<div>
							<h3 class="font-semibold text-gold-300 mb-2">{opportunity.title}</h3>
							<ul class="space-y-1 text-sm text-amber-100/85">
								{#each opportunity.description.split(', ') as item}
									<li>• {item}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
				<div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/performances"
						class="inline-flex items-center justify-center rounded-full bg-gold-600 text-maroon-900 px-6 py-3 font-semibold hover:bg-gold-500 transition-colors"
					>
						Attend a Performance
					</a>
					<a
						href="/#contact"
						class="inline-flex items-center justify-center rounded-full border border-gold-600 text-gold-200 px-6 py-3 font-semibold hover:bg-maroon-800/60 transition-colors"
					>
						Discuss Research
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
