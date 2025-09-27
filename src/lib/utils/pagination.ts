import type { PaginationInfo } from '../types';

/**
 * Calculate pagination information
 */
export function calculatePagination(
	currentPage: number,
	totalItems: number,
	itemsPerPage: number = 6
): PaginationInfo {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const hasNextPage = currentPage < totalPages;
	const hasPreviousPage = currentPage > 1;

	return {
		currentPage,
		totalPages,
		totalItems,
		itemsPerPage,
		hasNextPage,
		hasPreviousPage
	};
}

/**
 * Get items for current page
 */
export function getPaginatedItems<T>(
	items: T[],
	currentPage: number,
	itemsPerPage: number = 6
): T[] {
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	return items.slice(startIndex, endIndex);
}

/**
 * Generate page numbers for pagination component
 */
export function generatePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
	const pages: (number | string)[] = [];
	const maxVisiblePages = 7;

	if (totalPages <= maxVisiblePages) {
		// Show all pages if total is small
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		// Always show first page
		pages.push(1);

		if (currentPage <= 4) {
			// Show first 5 pages, then ellipsis, then last page
			for (let i = 2; i <= 5; i++) {
				pages.push(i);
			}
			pages.push('...');
			pages.push(totalPages);
		} else if (currentPage >= totalPages - 3) {
			// Show first page, ellipsis, then last 5 pages
			pages.push('...');
			for (let i = totalPages - 4; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Show first page, ellipsis, current page and neighbors, ellipsis, last page
			pages.push('...');
			for (let i = currentPage - 1; i <= currentPage + 1; i++) {
				pages.push(i);
			}
			pages.push('...');
			pages.push(totalPages);
		}
	}

	return pages;
}

/**
 * Validate page number
 */
export function validatePageNumber(page: string | number, totalPages: number): number {
	const pageNum = typeof page === 'string' ? parseInt(page, 10) : page;
	
	if (isNaN(pageNum) || pageNum < 1) {
		return 1;
	}
	
	if (pageNum > totalPages) {
		return totalPages;
	}
	
	return pageNum;
}
