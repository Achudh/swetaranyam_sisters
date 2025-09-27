import type { ResearchWork } from '../types';

export interface CompositionResearchAspect {
	id: string;
	title: string;
	description: string;
	details: string[];
	icon: string;
	quote: string;
	examples?: string[];
}

export interface CompositionResearchData {
	title: string;
	subtitle: string;
	introduction: string;
	aspects: CompositionResearchAspect[];
	educationalValue: {
		title: string;
		description: string;
		exampleStudy: {
			title: string;
			description: string;
			details: string;
		};
		audiences: {
			title: string;
			description: string;
			icon: string;
		}[];
	};
	methodology: {
		title: string;
		sections: {
			title: string;
			icon: string;
			items: string[];
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

export const compositionResearchData: CompositionResearchData = {
	title: 'Research on Compositions',
	subtitle: 'The Swetaranyam Sisters\' work on compositions goes hand in hand with their rāga research, but with a special emphasis on contextualizing and curating kritis across time, composers, and traditions.',
	introduction: 'Their work on compositions can be understood in a few main layers:',
	aspects: [
		{
			id: 'chronological',
			title: '1. Chronological Mapping of Compositions',
			description: 'They place compositions along a historical timeline — from pre-Trinity works to modern-day varnams, kritis, and padams.',
			details: [
				'Historical timeline placement',
				'Pre-Trinity to contemporary works',
				'Musical language evolution',
				'Lyrical focus transformation',
				'Devotional intent development'
			],
			icon: 'Clock',
			quote: 'Understanding the historical progression of compositions reveals the evolution of both musical and spiritual expression in Carnatic tradition.'
		},
		{
			id: 'comparative',
			title: '2. Comparative Interpretation',
			description: 'A kriti by Tyagaraja, Dikshitar, or Shyama Shastri in the same rāga is compared side by side.',
			details: [
				'Trinity composer comparison',
				'Lyrical themes analysis',
				'Rhythmic structure differences',
				'Melodic grammar variations',
				'Unique composer voices'
			],
			icon: 'Users',
			quote: 'Each composer\'s unique voice emerges clearly when their works are examined in the same musical framework.'
		},
		{
			id: 'thematic',
			title: '3. Theme-Based Curation',
			description: 'Compositions are curated around festivals, deities, and rituals.',
			details: [
				'Festival-based curation',
				'Deity-specific compositions',
				'Ritual-centered works',
				'Cultural context integration'
			],
			icon: 'BookOpen',
			quote: 'Thematic curation reveals the deep connection between music, devotion, and cultural practices.',
			examples: [
				'Navaratri series – kritis on Devi in various rāgas',
				'Temple-centered works – highlighting compositions tied to specific kshetras (e.g., Chidambaram, Thiruvaiyaru)'
			]
		},
		{
			id: 'layered',
			title: '4. Layered Presentation',
			description: 'Each composition is shown not just as lyrics + tune, but with comprehensive contextual information.',
			details: [
				'Rāga context analysis',
				'Composer philosophy exploration',
				'Performance nuances documentation',
				'Improvisation scope analysis'
			],
			icon: 'Music',
			quote: 'Every composition becomes a window into the composer\'s world and the musical traditions of their time.',
			examples: [
				'Rāga context (how the raga frames the kriti)',
				'Composer\'s philosophy (bhakti, philosophy, or social vision)',
				'Performance nuances (gamakas, sangatis, improvisation scope)'
			]
		}
	],
	educationalValue: {
		title: '5. Educational Value',
		description: 'Their curation helps students and rasikas see compositions as living texts – dynamic, evolving, and rich in both literary and musical dimensions.',
		exampleStudy: {
			title: '"Sahana kritis across centuries"',
			description: 'a thematic study blending rāga and composition evolution.',
			details: 'This demonstrates how the same rāga has been interpreted differently by composers across different time periods, revealing both continuity and innovation in the tradition.'
		},
		audiences: [
			{
				title: 'Students',
				description: 'Comprehensive understanding of composition evolution and performance practices',
				icon: 'Users'
			},
			{
				title: 'Rasikas',
				description: 'Deep appreciation of compositional artistry and cultural context',
				icon: 'Lightbulb'
			},
			{
				title: 'Researchers',
				description: 'Systematic documentation of compositional trends and innovations',
				icon: 'BookOpen'
			}
		]
	},
	methodology: {
		title: 'Research Methodology',
		sections: [
			{
				title: 'Historical Analysis',
				icon: 'Calendar',
				items: [
					'Timeline mapping from pre-Trinity to contemporary works',
					'Evolution of musical language and lyrical themes',
					'Changes in devotional intent and cultural context',
					'Influence of social and political factors on composition'
				]
			},
			{
				title: 'Contextual Curation',
				icon: 'MapPin',
				items: [
					'Temple and pilgrimage center compositions',
					'Festival and seasonal musical traditions',
					'Regional variations in compositional style',
					'Cross-cultural influences and adaptations'
				]
			}
		]
	},
	impact: {
		title: 'Explore the Compositions',
		description: 'The Swetaranyam Sisters\' research on compositions offers a unique perspective on the evolution of Carnatic music. Their work bridges historical scholarship with performance practice, making the rich tradition of kritis, varnams, and padams accessible to contemporary audiences.',
		opportunities: [
			{
				title: 'Research Impact',
				description: 'Comprehensive composition timeline documentation, Cross-composer comparative analysis, Thematic curation and cultural context, Performance-integrated research methodology',
				icon: 'Award'
			},
			{
				title: 'Engagement Opportunities',
				description: 'Lecture-demonstrations on composition research, Academic collaboration and partnerships, Student mentorship programs, Research publication consultations',
				icon: 'Users'
			}
		]
	}
};

// Related research work data
export const compositionResearchWork: ResearchWork = {
	id: 'composition-research',
	author: 'vidya',
	title: 'Lesser known composers in Saṅgīta Sampradāya Pradarśini - A Study',
	type: 'thesis',
	description: 'Research on lesser known composers in Carnatic music tradition with emphasis on contextualizing and curating compositions across time',
	url: '/compositions',
	abstract: 'This study focuses on lesser known composers mentioned in the Saṅgīta Sampradāya Pradarśini, examining their contributions through chronological mapping, comparative interpretation, and thematic curation of their compositions.',
	tags: ['composers', 'traditional-music', 'research', 'composition-analysis'],
	buttonText: 'Explore Composer Research'
};
