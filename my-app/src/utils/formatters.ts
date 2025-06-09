// Utility functions for formatting data

/**
 * Format a date string into a human-readable format
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options || defaultOptions);
};

/**
 * Format date as relative time (e.g., "2 hours ago", "3 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${diffInYears}y ago`;
};

/**
 * Format a number with appropriate suffixes (K, M, B)
 */
export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
};

/**
 * Format rating to show decimal places only when necessary
 */
export const formatRating = (rating: number): string => {
  return rating % 1 === 0 ? rating.toString() : rating.toFixed(1);
};

/**
 * Format reading progress percentage
 */
export const formatProgress = (current: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = Math.round((current / total) * 100);
  return `${percentage}%`;
};

/**
 * Format book title for display (truncate if too long)
 */
export const formatBookTitle = (title: string, maxLength: number = 50): string => {
  if (title.length <= maxLength) return title;
  return `${title.substring(0, maxLength - 3)}...`;
};

/**
 * Format author name for display
 */
export const formatAuthorName = (firstName: string, lastName?: string): string => {
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
};

/**
 * Format genre name for consistent display
 */
export const formatGenre = (genre: string): string => {
  return genre
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format reading time estimate
 */
export const formatReadingTime = (pageCount: number, readingSpeed: number = 250): string => {
  const wordsPerPage = 250;
  const totalWords = pageCount * wordsPerPage;
  const minutes = Math.ceil(totalWords / readingSpeed);
  
  if (minutes < 60) return `${minutes} min read`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m read` : `${hours}h read`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  return remainingHours > 0 ? `${days}d ${remainingHours}h read` : `${days}d read`;
};

/**
 * Format price for display
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format username for display (remove special characters, etc.)
 */
export const formatUsername = (username: string): string => {
  return username.toLowerCase().replace(/[^a-z0-9_]/g, '');
};

/**
 * Format email for privacy (hide part of the email)
 */
export const formatPrivateEmail = (email: string): string => {
  const [name, domain] = email.split('@');
  if (name.length <= 2) return email;
  
  const visibleChars = Math.min(2, Math.floor(name.length / 3));
  const hiddenPart = '*'.repeat(name.length - visibleChars);
  
  return `${name.substring(0, visibleChars)}${hiddenPart}@${domain}`;
};

/**
 * Format search query for highlighting
 */
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}; 