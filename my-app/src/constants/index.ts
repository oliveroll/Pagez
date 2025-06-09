// Export all constants from a central location

export * from './colors';
export * from './api';
export * from './mockData';
export { COLORS as ThemeColors, FONTS, SIZES, SHADOWS } from './theme'; // Export existing theme items

// Re-export specific items that might be commonly used
export { COLORS, DARK_COLORS } from './colors';
export { API_ENDPOINTS, API_CONFIG, HTTP_STATUS, CACHE_KEYS } from './api';
export { 
  MOCK_BOOKS, 
  MOCK_USERS, 
  MOCK_READING_LISTS, 
  MOCK_POSTS, 
  MOCK_AUTHORS,
  GENRES,
  TRENDING_BOOKS,
  RECOMMENDED_BOOKS 
} from './mockData'; 