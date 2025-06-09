// API configuration and endpoints

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.pagez.app',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    GOOGLE_AUTH: '/auth/google',
    APPLE_AUTH: '/auth/apple',
  },

  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    UPLOAD_AVATAR: '/users/avatar',
    PREFERENCES: '/users/preferences',
    STATS: '/users/stats',
    FOLLOW: '/users/follow',
    UNFOLLOW: '/users/unfollow',
    FOLLOWERS: '/users/followers',
    FOLLOWING: '/users/following',
    SEARCH: '/users/search',
  },

  // Books
  BOOKS: {
    LIST: '/books',
    DETAIL: '/books/:id',
    SEARCH: '/books/search',
    TRENDING: '/books/trending',
    RECOMMENDED: '/books/recommended',
    BY_GENRE: '/books/genre/:genre',
    BY_AUTHOR: '/books/author/:authorId',
    REVIEWS: '/books/:id/reviews',
    ADD_REVIEW: '/books/:id/reviews',
  },

  // Reading Lists
  READING_LISTS: {
    LIST: '/reading-lists',
    CREATE: '/reading-lists',
    DETAIL: '/reading-lists/:id',
    UPDATE: '/reading-lists/:id',
    DELETE: '/reading-lists/:id',
    ADD_BOOK: '/reading-lists/:id/books',
    REMOVE_BOOK: '/reading-lists/:id/books/:bookId',
    PUBLIC: '/reading-lists/public',
  },

  // Reading Progress
  READING_PROGRESS: {
    LIST: '/reading-progress',
    UPDATE: '/reading-progress/:bookId',
    DELETE: '/reading-progress/:bookId',
    STATS: '/reading-progress/stats',
  },

  // Posts (Community)
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts',
    DETAIL: '/posts/:id',
    UPDATE: '/posts/:id',
    DELETE: '/posts/:id',
    LIKE: '/posts/:id/like',
    UNLIKE: '/posts/:id/like',
    COMMENTS: '/posts/:id/comments',
    ADD_COMMENT: '/posts/:id/comments',
  },

  // Comments
  COMMENTS: {
    UPDATE: '/comments/:id',
    DELETE: '/comments/:id',
    LIKE: '/comments/:id/like',
    UNLIKE: '/comments/:id/like',
  },

  // Authors
  AUTHORS: {
    LIST: '/authors',
    DETAIL: '/authors/:id',
    BOOKS: '/authors/:id/books',
    NOTES: '/authors/:id/notes',
    CREATE_NOTE: '/authors/notes',
    UPDATE_NOTE: '/authors/notes/:id',
    DELETE_NOTE: '/authors/notes/:id',
    BECOME_AUTHOR: '/authors/register',
    UPDATE_AUTHOR_PROFILE: '/authors/profile',
  },

  // Highlights
  HIGHLIGHTS: {
    LIST: '/highlights',
    CREATE: '/highlights',
    UPDATE: '/highlights/:id',
    DELETE: '/highlights/:id',
    BY_BOOK: '/highlights/book/:bookId',
    PUBLIC: '/highlights/public',
  },

  // Search
  SEARCH: {
    GLOBAL: '/search',
    BOOKS: '/search/books',
    AUTHORS: '/search/authors',
    USERS: '/search/users',
    POSTS: '/search/posts',
  },

  // File Upload
  UPLOAD: {
    IMAGE: '/upload/image',
    AVATAR: '/upload/avatar',
    BOOK_COVER: '/upload/book-cover',
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNAUTHORIZED: 'Authentication required. Please log in.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Request Headers
export const API_HEADERS = {
  CONTENT_TYPE_JSON: 'application/json',
  CONTENT_TYPE_FORM: 'multipart/form-data',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'application/json',
};

// Cache Keys (for AsyncStorage or other caching mechanisms)
export const CACHE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  RECENT_SEARCHES: 'recent_searches',
  TRENDING_BOOKS: 'trending_books',
  RECOMMENDED_BOOKS: 'recommended_books',
  READING_LISTS: 'reading_lists',
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  INFINITE_SCROLL_THRESHOLD: 0.7,
}; 