import { browser } from '$app/environment';
import { goto } from '$app/navigation';

/**
 * Format date for display
 */
export function formatDate(date: string | Date, format: 'short' | 'long' | 'time' = 'long'): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	
	if (format === 'short') {
		return d.toLocaleDateString('en-US', { 
			month: 'short', 
			day: 'numeric',
			year: 'numeric'
		});
	}
	
	if (format === 'time') {
		return d.toLocaleTimeString('en-US', { 
			hour: 'numeric', 
			minute: '2-digit',
			hour12: true
		});
	}
	
	return d.toLocaleDateString('en-US', { 
		weekday: 'long',
		year: 'numeric', 
		month: 'long', 
		day: 'numeric'
	});
}

/**
 * Generate SEO-friendly slug from string
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single
		.trim();
}

/**
 * Debounce function for search and other inputs
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Scroll to element with smooth behavior
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
	if (!browser) return;
	
	const element = document.getElementById(elementId);
	if (element) {
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - offset;
		
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	if (!browser) return false;
	
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error('Failed to copy text: ', err);
		return false;
	}
}

/**
 * Share content using Web Share API or fallback
 */
export async function shareContent(data: {
	title?: string;
	text?: string;
	url?: string;
}): Promise<boolean> {
	if (!browser) return false;
	
	const shareData = {
		title: data.title || 'Swetaranyam Sisters',
		text: data.text || 'Check out this Carnatic music content',
		url: data.url || window.location.href
	};
	
	if (navigator.share) {
		try {
			await navigator.share(shareData);
			return true;
		} catch (err) {
			console.error('Error sharing: ', err);
			return false;
		}
	} else {
		// Fallback to copying URL
		return await copyToClipboard(shareData.url);
	}
}

/**
 * Format currency for teaching programs
 */
export function formatCurrency(amount: number, currency: string = 'INR'): string {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 0
	}).format(amount);
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: string | Date): string {
	const now = new Date();
	const targetDate = typeof date === 'string' ? new Date(date) : date;
	const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
	
	if (diffInSeconds < 60) {
		return 'just now';
	}
	
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
	}
	
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
	}
	
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) {
		return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
	}
	
	const diffInWeeks = Math.floor(diffInDays / 7);
	if (diffInWeeks < 4) {
		return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
	}
	
	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) {
		return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
	}
	
	const diffInYears = Math.floor(diffInDays / 365);
	return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

/**
 * Navigate with query parameters
 */
export function navigateWithParams(
	path: string, 
	params: Record<string, string | number | undefined>
): void {
	const searchParams = new URLSearchParams();
	
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.set(key, value.toString());
		}
	});
	
	const queryString = searchParams.toString();
	const url = queryString ? `${path}?${queryString}` : path;
	
	goto(url);
}
