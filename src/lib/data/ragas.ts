import type { ResearchWork } from '../types';

export interface RagaResearchAspect {
	id: string;
	title: string;
	description: string;
	details: string[];
	icon: string;
	quote: string;
}

export interface RagaResearchData {
	title: string;
	subtitle: string;
	introduction: string;
	aspects: RagaResearchAspect[];
	educationalValue: {
		title: string;
		description: string;
		audiences: {
			title: string;
			description: string;
			icon: string;
		}[];
	};
	impact: {
		title: string;
		description: string;
		opportunities: {
			title: string;
			description: string;
			icon: string;
		}[];
	};
}

export const RagaResearchData: RagaResearchData = {
	title: 'Research on Rāgas',
	subtitle: 'The Swetaranyam Sisters\' research is framed around Carnatic music, especially with a chronological and analytical approach. One of their highlighted areas of contribution is their work on rāgas.',
	introduction: 'Their approach isn\'t just about singing or listing ragas, but more about:',
	aspects: [
		{
			id: 'chronological',
			title: '1. Chronological Exploration',
			description: 'They trace the evolution of ragas across time, connecting how a rāga was interpreted before, during and after the Trinity period. (Tyagaraja, Muthuswami Dikshitar, Shyama Shastri)',
			details: [
				'Historical context and evolution documentation',
				'Trinity period interpretation analysis',
				'Transformation patterns across centuries',
				'Performance practice evolution'
			],
			icon: 'Clock',
			quote: 'Understanding the historical context and evolution of each rāga provides deeper insight into its essence and performance practices.'
		},
		{
			id: 'comparative',
			title: '2. Comparative Analysis',
			description: 'They compare the same rāga as seen in different schools of music —e.g., how Narayani is treated differently in a kriti of Tyagaraja versus Dikshitar.',
			details: [
				'Cross-composer rāga treatment analysis',
				'Bhairavi as example of comparative study',
				'Unique perspectives of each composer',
				'Creative possibilities revelation'
			],
			icon: 'Users',
			quote: 'Each composer brings their unique perspective to a rāga, revealing its multifaceted nature and creative possibilities.'
		},
		{
			id: 'thematic',
			title: '3. Thematic Curation',
			description: 'They group ragas based on moods, deities, and occasions (like Navaratri, temple rituals, etc.), creating thematic journeys.',
			details: [
				'Mood-based rāga categorization',
				'Deity-specific rāga associations',
				'Occasion-based thematic journeys',
				'Cultural and spiritual connections'
			],
			icon: 'BookOpen',
			quote: 'Rāgas are not isolated entities but part of a larger spiritual and cultural tapestry that connects music with life\'s sacred moments.'
		},
		{
			id: 'performance',
			title: '4. Performance + Research Blend',
			description: 'They don\'t just document ragas in text; their performances integrate scholarly explanation with demonstration, showing how gamakas, sangatis, and manodharma vary across time.',
			details: [
				'Scholarly explanation integration',
				'Performance demonstration',
				'Gamakas and sangatis variation',
				'Manodharma evolution across time'
			],
			icon: 'Music',
			quote: 'Theory comes alive through performance, making complex concepts accessible and meaningful to all audiences.'
		}
	],
	educationalValue: {
		title: '5. Archival & Educational Value',
		description: 'Their work is designed for accessibility—students, rasikas, and researchers can see rāgas not as isolated entities, but as living, evolving traditions.',
		audiences: [
			{
				title: 'Students',
				description: 'Comprehensive learning materials with historical context and performance examples',
				icon: 'Users'
			},
			{
				title: 'Rasikas',
				description: 'Deep insights into the emotional and spiritual dimensions of rāgas',
				icon: 'Lightbulb'
			},
			{
				title: 'Researchers',
				description: 'Systematic documentation and analysis for academic study',
				icon: 'BookOpen'
			}
		]
	},
	impact: {
		title: 'Experience the Research',
		description: 'The Swetaranyam Sisters\' research on rāgas represents a unique blend of scholarly investigation and performance artistry. Their work bridges the gap between academic study and musical practice, making the rich traditions of Carnatic music accessible to all levels of understanding.',
		opportunities: [
			{
				title: 'Research Impact',
				description: 'Comprehensive rāga evolution documentation, Cross-composer comparative analysis, Thematic rāga categorization, Performance-integrated research methodology',
				icon: 'Award'
			},
			{
				title: 'Engagement Opportunities',
				description: 'Lecture-demonstrations on rāga research, Academic collaboration and partnerships, Student mentorship programs, Research publication consultations',
				icon: 'Users'
			}
		]
	}
};

// Related research work data
export const RagaResearchWork: ResearchWork = {
	id: 'Raga-research',
	author: 'Prof. Dr. R Nithya',
	title: 'Development of rāga-s with special reference to Rāgalakṣaṇamu of Śāha Mahārāja',
	type: 'thesis',
	description: 'Doctoral research on the development of Ragas with chronological and analytical approach',
	url: '/raagas',
	abstract: 'This research explores the development of Ragas with special reference to the Rāgalakṣaṇamu of Śāha Mahārāja, focusing on chronological evolution, comparative analysis across composers, and thematic curation of rāgas in the Carnatic tradition.',
	tags: ['Raga', 'development', 'traditional-music', 'chronological-analysis'],
	buttonText: 'Explore Rāga Research'
};
