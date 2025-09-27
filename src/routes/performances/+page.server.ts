import { performances } from '$lib/data';
import { calculatePagination, getPaginatedItems } from '$lib/utils/pagination';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const itemsPerPage = 6;
	
	// Filter upcoming performances
	const upcomingPerformances = performances.filter(p => p.status === 'upcoming');
	
	// Calculate pagination
	const pagination = calculatePagination(page, upcomingPerformances.length, itemsPerPage);
	
	// Get items for current page
	const paginatedPerformances = getPaginatedItems(upcomingPerformances, page, itemsPerPage);
	
	return {
		performances: paginatedPerformances,
		pagination
	};
};
