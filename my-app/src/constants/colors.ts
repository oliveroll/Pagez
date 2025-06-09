// Enhanced color palette for Pagez app

export const COLORS = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Secondary colors
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef', // Main secondary
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },

  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main info
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // App-specific colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
  },

  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    inverse: '#ffffff',
  },

  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
  },

  // Social media colors
  social: {
    facebook: '#1877f2',
    twitter: '#1da1f2',
    instagram: '#e4405f',
    google: '#ea4335',
    apple: '#000000',
  },

  // Book rating colors
  rating: {
    star: '#fbbf24',
    background: '#e5e7eb',
  },

  // Reading status colors
  readingStatus: {
    'not-started': '#94a3b8',
    'reading': '#3b82f6',
    'completed': '#22c55e',
    'on-hold': '#f59e0b',
  },

  // Genre colors (for tags and categories)
  genres: {
    'Fiction': '#8b5cf6',
    'Romance': '#ec4899',
    'Mystery': '#6366f1',
    'Science Fiction': '#06b6d4',
    'Fantasy': '#10b981',
    'Thriller': '#ef4444',
    'Biography': '#f59e0b',
    'History': '#84cc16',
    'Self-Help': '#14b8a6',
    'Psychology': '#8b5cf6',
    'Philosophy': '#6366f1',
    'Young Adult': '#ec4899',
    'Contemporary Fiction': '#06b6d4',
    'Literary Fiction': '#10b981',
    'Historical Fiction': '#f59e0b',
    'Horror': '#ef4444',
    'Adventure': '#14b8a6',
    'Crime': '#6b7280',
    'Drama': '#8b5cf6',
    'Poetry': '#ec4899',
  },
};

// Dark mode colors (for future implementation)
export const DARK_COLORS = {
  background: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
  },

  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    tertiary: '#94a3b8',
    inverse: '#1e293b',
  },

  border: {
    light: '#334155',
    medium: '#475569',
    dark: '#64748b',
  },
};

// Export legacy colors for backward compatibility
export const colors = {
  primary: COLORS.primary[500],
  secondary: COLORS.secondary[500],
  background: COLORS.background.primary,
  text: COLORS.text.primary,
  textSecondary: COLORS.text.secondary,
  border: COLORS.border.light,
  success: COLORS.success[500],
  error: COLORS.error[500],
  warning: COLORS.warning[500],
  info: COLORS.info[500],
}; 