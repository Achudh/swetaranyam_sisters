import { events } from '$lib/data';
import { calculatePagination, getPaginatedItems } from '$lib/utils/pagination';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const itemsPerPage = 6;
	
	// Filter upcoming events
	const upcomingEvents = events.filter(e => e.status === 'upcoming');
	
	// Calculate pagination
	const pagination = calculatePagination(page, upcomingEvents.length, itemsPerPage);
	
	// Get items for current page
	const paginatedEvents = getPaginatedItems(upcomingEvents, page, itemsPerPage);
	
	return {
		events: paginatedEvents,
		pagination
	};
};
