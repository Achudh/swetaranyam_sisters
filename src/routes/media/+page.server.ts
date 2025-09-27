import { albums, mediaItems } from '$lib/data';
import { calculatePagination, getPaginatedItems } from '$lib/utils/pagination';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const itemsPerPage = 6;
	
	// Combine albums and media items
	const allMedia = [...albums, ...mediaItems];
	
	// Sort by release date (newest first)
	allMedia.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
	
	// Calculate pagination
	const pagination = calculatePagination(page, allMedia.length, itemsPerPage);
	
	// Get items for current page
	const paginatedMedia = getPaginatedItems(allMedia, page, itemsPerPage);
	
	return {
		media: paginatedMedia,
		pagination
	};
};
