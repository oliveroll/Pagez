// Validation utility functions

/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 */
export const isValidPassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Username validation
 */
export const isValidUsername = (username: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (username.length > 20) {
    errors.push('Username must be no more than 20 characters long');
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }
  
  if (/^[0-9]/.test(username)) {
    errors.push('Username cannot start with a number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Display name validation
 */
export const isValidDisplayName = (displayName: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (displayName.trim().length < 2) {
    errors.push('Display name must be at least 2 characters long');
  }
  
  if (displayName.length > 50) {
    errors.push('Display name must be no more than 50 characters long');
  }
  
  if (!/^[a-zA-Z\s]+$/.test(displayName.trim())) {
    errors.push('Display name can only contain letters and spaces');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Book title validation
 */
export const isValidBookTitle = (title: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (title.trim().length < 1) {
    errors.push('Title is required');
  }
  
  if (title.length > 200) {
    errors.push('Title must be no more than 200 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Author name validation
 */
export const isValidAuthorName = (name: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (name.trim().length < 2) {
    errors.push('Author name must be at least 2 characters long');
  }
  
  if (name.length > 100) {
    errors.push('Author name must be no more than 100 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * ISBN validation
 */
export const isValidISBN = (isbn: string): boolean => {
  // Remove hyphens and spaces
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  
  // Check if it's ISBN-10 or ISBN-13
  if (cleanISBN.length === 10) {
    return isValidISBN10(cleanISBN);
  } else if (cleanISBN.length === 13) {
    return isValidISBN13(cleanISBN);
  }
  
  return false;
};

const isValidISBN10 = (isbn: string): boolean => {
  if (!/^\d{9}[\dX]$/.test(isbn)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn[i]) * (10 - i);
  }
  
  const checkDigit = isbn[9] === 'X' ? 10 : parseInt(isbn[9]);
  sum += checkDigit;
  
  return sum % 11 === 0;
};

const isValidISBN13 = (isbn: string): boolean => {
  if (!/^\d{13}$/.test(isbn)) return false;
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  
  const checkDigit = parseInt(isbn[12]);
  const calculatedCheck = (10 - (sum % 10)) % 10;
  
  return checkDigit === calculatedCheck;
};

/**
 * URL validation
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Rating validation (1-5 scale)
 */
export const isValidRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5 && Number.isFinite(rating);
};

/**
 * Page count validation
 */
export const isValidPageCount = (pages: number): boolean => {
  return Number.isInteger(pages) && pages > 0 && pages <= 10000;
};

/**
 * Year validation
 */
export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= 1000 && year <= currentYear + 1;
};

/**
 * Price validation
 */
export const isValidPrice = (price: number): boolean => {
  return Number.isFinite(price) && price >= 0 && price <= 9999.99;
};

/**
 * Reading list name validation
 */
export const isValidReadingListName = (name: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (name.trim().length < 1) {
    errors.push('Reading list name is required');
  }
  
  if (name.length > 100) {
    errors.push('Reading list name must be no more than 100 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Bio validation
 */
export const isValidBio = (bio: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (bio.length > 500) {
    errors.push('Bio must be no more than 500 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Post content validation
 */
export const isValidPostContent = (content: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (content.trim().length < 1) {
    errors.push('Post content is required');
  }
  
  if (content.length > 2000) {
    errors.push('Post content must be no more than 2000 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Comment content validation
 */
export const isValidCommentContent = (content: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (content.trim().length < 1) {
    errors.push('Comment content is required');
  }
  
  if (content.length > 500) {
    errors.push('Comment must be no more than 500 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Search query validation
 */
export const isValidSearchQuery = (query: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (query.trim().length < 2) {
    errors.push('Search query must be at least 2 characters long');
  }
  
  if (query.length > 100) {
    errors.push('Search query must be no more than 100 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}; 