// Core types for the Swetaranyam Sisters website

export interface Performance {
	id: string;
	title: string;
	date: string;
	venue: string;
	location: string;
	description: string;
	type: 'concert' | 'lecture-demo' | 'workshop' | 'festival';
	status: 'upcoming' | 'past' | 'cancelled';
	image?: string;
	videoUrl?: string;
	locationUrl?: string;
	accompaniment?: string[];
	tags: string[];
}
export interface Track{
	title: string,
    artist: string,
    src: string,
    cover: string,
}

export interface Event {
	id: string;
	title: string;
	date: string;
	time: string;
	venue: string;
	location: string;
	description: string;
	type: 'concert' | 'workshop' | 'lecture-demo' | 'masterclass';
	status: 'upcoming' | 'past' | 'cancelled';
	image?: string;
	ticketUrl?: string;
	calendarUrl?: string;
	tags: string[];
}

export interface MediaItem {
	id: string;
	title: string;
	type: 'album' | 'video' | 'audio' | 'interview' | 'article';
	description: string;
	thumbnail?: string;
	url?: string;
	platform?: string;
	releaseDate: string;
	credits?: string;
	tags: string[];
}

export interface Album extends MediaItem {
	type: 'album';
	tracklist: {
		title: string;
		duration: string;
		Raga: string;
		composer: string;
	}[];
	label: string;
	format: string;
	buyUrl?: string;
	listenUrl?: string;
}

export interface TeachingProgram {
	id: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	title: string;
	description: string;
	duration: string;
	format:  string;
	topics: string[];
	prerequisites: string[];
	price?: string;
	contactInfo: string;
}

export interface ResearchWork {
	id: string;
	author: 'Prof. Dr. R Nithya' | 'Prof. Dr. R Vidya' | 'both';
	title: string;
	type: 'thesis' | 'paper' | 'presentation' | 'book';
	description: string;
	institution?: string;
	year?: string;
	url?: string;
	buttonText?: string;
	abstract?: string;
	tags: string[];
}

export interface Testimonial {
	id: string;
	content: string;
	author: string;
	role: string;
	location: string;
	rating?: number;
	date: string;
}

export interface ContactForm {
	name: string;
	email: string;
	inquiryType: 'concert' | 'teaching' | 'research' | 'other';
	message: string;
	phone?: string;
	organization?: string;
}

export interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: PaginationInfo;
}

// Research data interfaces
export interface ResearchAspect {
	id: string;
	title: string;
	description: string;
	details: string[];
	icon: string;
	quote: string;
	examples?: string[];
}

export interface ResearchAudience {
	title: string;
	description: string;
	icon: string;
}

export interface ResearchOpportunity {
	title: string;
	description: string;
	icon: string;
}

export interface ResearchMethodology {
	title: string;
	icon: string;
	items: string[];
}

export interface ResearchData {
	title: string;
	subtitle: string;
	introduction: string;
	aspects: ResearchAspect[];
	educationalValue: {
		title: string;
		description: string;
		audiences: ResearchAudience[];
		exampleStudy?: {
			title: string;
			description: string;
			details: string;
		};
	};
	methodology?: {
		title: string;
		sections: ResearchMethodology[];
	};
	impact: {
		title: string;
		description: string;
		opportunities: ResearchOpportunity[];
	};
}

// Navigation types
export interface NavItem {
	label: string;
	href: string;
	children?: NavItem[];
}

export interface SiteConfig {
	siteName: string;
	tagline: string;
	description: string;
	url: string;
	email: string;
	phone?: string;
	address: string;
	socialLinks: {
		youtube?: string;
		instagram?: string;
		facebook?: string;
		twitter?: string;
	};
}
