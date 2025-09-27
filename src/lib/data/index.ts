import type { Performance, Event, MediaItem, Album, TeachingProgram, ResearchWork, Testimonial } from '../types';

// Export research data
export { raagaResearchData, raagaResearchWork } from './raagas';
export { compositionResearchData, compositionResearchWork } from './compositions';

// Sample data - in production, this would come from a CMS or API
export const performances: Performance[] = [
	{
		id: '1',
		title: 'Sri Parthasarathy Swami Sabha',
		date: '2024-12-18T19:00:00Z',
		venue: 'Sri Parthasarathy Swami Sabha',
		location: 'Mylapore, Chennai',
		description: 'Main concert with violin and mridangam accompaniment',
		type: 'concert',
		status: 'upcoming',
		image: 'https://placehold.co/800x600/3b0f0f/f7e7c6?text=Concert+Image',
		accompaniment: ['Violin', 'Mridangam'],
		tags: ['season', 'chennai', 'main-concert']
	},
	{
		id: '2',
		title: 'Cleveland Thyagaraja Aradhana',
		date: '2024-04-12T16:00:00Z',
		venue: 'Cleveland Thyagaraja Aradhana',
		location: 'Cleveland, USA',
		description: 'Special thematic presentation with lec-dem segment',
		type: 'festival',
		status: 'upcoming',
		image: 'https://placehold.co/800x600/3b0f0f/f7e7c6?text=Festival+Image',
		accompaniment: ['Violin', 'Mridangam'],
		tags: ['festival', 'international', 'lec-dem']
	}
];

export const events: Event[] = [
	{
		id: '1',
		title: 'Sri Parthasarathy Swami Sabha',
		date: '2024-12-18',
		time: '7:00 PM',
		venue: 'Sri Parthasarathy Swami Sabha',
		location: 'Mylapore, Chennai',
		description: 'Main concert with violin and mridangam accompaniment',
		type: 'concert',
		status: 'upcoming',
		image: 'https://placehold.co/800x600/3b0f0f/f7e7c6?text=Event+Image',
		ticketUrl: '#',
		calendarUrl: '#',
		tags: ['season', 'chennai', 'main-concert']
	},
	{
		id: '2',
		title: 'Cleveland Thyagaraja Aradhana',
		date: '2024-04-12',
		time: '4:00 PM',
		venue: 'Cleveland Thyagaraja Aradhana',
		location: 'Cleveland, USA',
		description: 'Special thematic presentation with lec-dem segment',
		type: 'concert',
		status: 'upcoming',
		image: 'https://placehold.co/800x600/3b0f0f/f7e7c6?text=Festival+Image',
		ticketUrl: '#',
		calendarUrl: '#',
		tags: ['festival', 'international', 'lec-dem']
	}
];

export const albums: Album[] = [
	{
		id: '1',
		title: 'Shri Mukha Kirtanas',
		type: 'album',
		description: 'Classical Carnatic vocal album featuring traditional compositions',
		thumbnail: 'https://placehold.co/800x800/3b0f0f/f7e7c6?text=Shri+Mukha+Kirtanas',
		releaseDate: '2023-01-01',
		label: 'Super Audios (Madras) Pvt. Ltd.',
		format: 'CD/Digital',
		buyUrl: '#',
		listenUrl: '#',
		tracklist: [
			{
				title: 'Track 1',
				duration: '4:30',
				raaga: 'Kalyani',
				composer: 'Traditional'
			},
			{
				title: 'Track 2',
				duration: '5:15',
				raaga: 'Bhairavi',
				composer: 'Traditional'
			}
		],
		tags: ['classical', 'traditional', 'vocal']
	},
	{
		id: '2',
		title: 'Companion',
		type: 'album',
		description: 'Contemporary Carnatic vocal album',
		thumbnail: 'https://placehold.co/800x800/3b0f0f/f7e7c6?text=Companion',
		releaseDate: '2023-06-01',
		label: 'Ajna Productions Pvt. Ltd.',
		format: 'CD/Digital',
		buyUrl: '#',
		listenUrl: '#',
		tracklist: [
			{
				title: 'Track 1',
				duration: '3:45',
				raaga: 'Hamsadhwani',
				composer: 'Traditional'
			}
		],
		tags: ['contemporary', 'vocal', 'ensemble']
	}
];

export const mediaItems: MediaItem[] = [
	{
		id: '1',
		title: 'Press & Interviews',
		type: 'article',
		description: 'Read features and watch appearances',
		thumbnail: 'https://placehold.co/800x600/3b0f0f/f7e7c6?text=Press+Interview',
		url: '#',
		platform: 'Various',
		releaseDate: '2023-01-01',
		tags: ['press', 'interviews', 'features']
	}
];

export const teachingPrograms: TeachingProgram[] = [
	{
		id: '1',
		level: 'beginner',
		title: 'Beginner Carnatic Vocal',
		description: 'Introduction to Carnatic music fundamentals',
		duration: 'Self paced',
		format: "Offline and Online",
		topics: ['Śruti alignment & exercises', 'Geethams & simple swaras', 'Laya basics'],
		prerequisites: ['Basic understanding of music', 'Commitment to regular practice'],
		contactInfo: 'sriswetaranyam@gmail.com'
	},
	{
		id: '2',
		level: 'intermediate',
		title: 'Intermediate Carnatic Vocal',
		description: 'Advanced techniques and repertoire building',
		duration: 'Self paced',
		format: 'Offline and Online',
		topics: ['Varnams & kritis', 'Manodharma introduction', 'Taalam & tempo control'],
		prerequisites: ['Completion of beginner course', 'Basic knowledge of raagas'],
		contactInfo: 'sriswetaranyam@gmail.com'
	},
	{
		id: '3',
		level: 'advanced',
		title: 'Advanced Carnatic Vocal',
		description: 'Mastery level training and concert preparation',
		duration: 'Self paced',
		format: 'Offline and Online',
		topics: ['Alapana, neraval, swaraprasthara', 'Concert planning & repertoire', 'Stagecraft & voice care'],
		prerequisites: ['Completion of intermediate course'],
		contactInfo: 'sriswetaranyam@gmail.com'
	}
];

export const researchWorks: ResearchWork[] = [
	{
		id: '1',
		author: 'nithya',
		title: 'Development of rāga-s with special reference to Rāgalakṣaṇamu of Śāha Mahārāja',
		type: 'thesis',
		description: 'Doctoral research on the development of raagas',
		url: '/raagas',
		abstract: 'This research explores the development of raagas with special reference to the Rāgalakṣaṇamu of Śāha Mahārāja...',
		tags: ['raaga', 'development', 'traditional-music'],
		buttonText: 'Explore Rāga Research'
	},
	{
		id: '2',
		author: 'vidya',
		title: 'Lesser known composers in Saṅgīta Sampradāya Pradarśini - A Study',
		type: 'thesis',
		description: 'Research on lesser known composers in Carnatic music tradition',
		url: '/compositions',
		abstract: 'This study focuses on lesser known composers mentioned in the Saṅgīta Sampradāya Pradarśini...',
		tags: ['composers', 'traditional-music', 'research'],
		buttonText: 'Explore Composer Research'
	}
];

export const testimonials: Testimonial[] = [
	{
		id: '1',
		content: 'Soulful renditions with impeccable classicism. A delight for connoisseurs.',
		author: 'Sabha Organizer',
		role: 'Organizer',
		location: 'Chennai',
		rating: 5,
		date: '2023-01-01'
	},
	{
		id: '2',
		content: 'Their classes blend tradition and clarity—perfect for serious learners.',
		author: 'Student',
		role: 'Student',
		location: 'USA',
		rating: 5,
		date: '2023-02-01'
	},
	{
		id: '3',
		content: 'An ideal duo for dance productions—sensitive and powerful.',
		author: 'Choreographer',
		role: 'Choreographer',
		location: 'Chennai',
		rating: 5,
		date: '2023-03-01'
	}
];
