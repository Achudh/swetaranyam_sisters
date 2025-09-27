import { writable } from 'svelte/store';
import type { PaginationInfo } from '../types';

// Global pagination state
export const paginationStore = writable<PaginationInfo>({
	currentPage: 1,
	totalPages: 1,
	totalItems: 0,
	itemsPerPage: 6,
	hasNextPage: false,
	hasPreviousPage: false
});

// Mobile menu state
export const mobileMenuOpen = writable(false);

// Loading state
export const isLoading = writable(false);

// Theme state (for future dark/light mode)
export const theme = writable<'light' | 'dark'>('dark');

// Active section for navigation highlighting
export const activeSection = writable('home');

// Search state
export const searchQuery = writable('');
export const searchResults = writable([]);
