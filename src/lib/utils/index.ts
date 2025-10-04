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

/**
 * Generate Google Calendar and ICS links for an event
 */
export function getCalendarLinks({
  title,
  description,
  location,
  date,
  time
}: {
  title: string;
  description: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. '4:00 PM'
}) {
  // Robustly parse date and time to a Date object
  function parseDateTime(date: string, time: string): Date {
    // Example: date = "2024-04-12", time = "4:00 PM"
    const [hourMin, ampm] = time.trim().split(' ');
    let [hour, minute] = hourMin.split(':').map(Number);
    if (ampm && ampm.toLowerCase() === 'pm' && hour < 12) hour += 12;
    if (ampm && ampm.toLowerCase() === 'am' && hour === 12) hour = 0;
    const d = new Date(date);
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  const start = parseDateTime(date, time);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

  function format(d: Date) {
    return (
      d.getUTCFullYear().toString().padStart(4, '0') +
      (d.getUTCMonth() + 1).toString().padStart(2, '0') +
      d.getUTCDate().toString().padStart(2, '0') +
      'T' +
      d.getUTCHours().toString().padStart(2, '0') +
      d.getUTCMinutes().toString().padStart(2, '0') +
      d.getUTCSeconds().toString().padStart(2, '0') +
      'Z'
    );
  }

  const startStr = format(start);
  const endStr = format(end);

  // Google Calendar link
  const googleUrl =
    'https://www.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${startStr}/${endStr}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  // ICS file content
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;

  return {
    google: googleUrl,
    ics: icsUrl
  };
}
