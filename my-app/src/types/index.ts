// Core data interfaces for Pagez app

export interface User {
  id: string;
  email: string;
  displayName: string;
  username: string;
  profilePicture?: string;
  isAuthor: boolean;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  favoriteGenres: string[];
  readingGoal?: number;
  notificationsEnabled: boolean;
  privacySettings: PrivacySettings;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  readingListsVisibility: 'public' | 'private' | 'friends';
  activityVisibility: 'public' | 'private' | 'friends';
}

export interface UserStats {
  totalBooksRead: number;
  currentlyReading: number;
  totalReadingLists: number;
  followersCount: number;
  followingCount: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  coverUrl: string;
  description: string;
  isbn?: string;
  publishedDate: string;
  genres: string[];
  rating: number;
  totalRatings: number;
  pageCount?: number;
  language: string;
  publisher?: string;
  tags: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  books: Book[];
  isPublic: boolean;
  coverImages: string[]; // First 4 book covers for display
  totalBooks: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface ReadingProgress {
  id: string;
  userId: string;
  bookId: string;
  currentPage: number;
  totalPages: number;
  percentage: number;
  status: 'not-started' | 'reading' | 'completed' | 'on-hold';
  startedAt?: string;
  completedAt?: string;
  lastReadAt: string;
  notes?: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  bookId?: string;
  book?: Book;
  imageUrl?: string;
  type: 'text' | 'book-review' | 'quote' | 'recommendation';
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorNote {
  id: string;
  authorId: string;
  bookId: string;
  title: string;
  content: string;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Author extends User {
  books: Book[];
  notes: AuthorNote[];
  publishedBooksCount: number;
  totalReaders: number;
  bio: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface Highlight {
  id: string;
  userId: string;
  bookId: string;
  text: string;
  color: string;
  page: number;
  position: {
    start: number;
    end: number;
  };
  note?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query: string;
  genres: string[];
  authors: string[];
  rating: {
    min: number;
    max: number;
  };
  publishedYear: {
    min: number;
    max: number;
  };
  sortBy: 'relevance' | 'rating' | 'published' | 'title' | 'author';
  sortOrder: 'asc' | 'desc';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Navigation types
export interface BookParams {
  id: string;
}

export interface AuthorParams {
  id: string;
}

export interface SearchParams {
  query?: string;
  genre?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  username: string;
}

export interface CreateAuthorForm {
  bio: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface CreateReadingListForm {
  name: string;
  description?: string;
  isPublic: boolean;
  tags: string[];
}

// Context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (form: LoginForm) => Promise<void>;
  register: (form: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
}

export interface BooksContextType {
  books: Book[];
  trending: Book[];
  recommended: Book[];
  isLoading: boolean;
  searchBooks: (filters: SearchFilters) => Promise<Book[]>;
  getBookById: (id: string) => Book | null;
  addBook: (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
}

export interface ReadingListsContextType {
  readingLists: ReadingList[];
  isLoading: boolean;
  createReadingList: (form: CreateReadingListForm) => Promise<void>;
  updateReadingList: (id: string, updates: Partial<ReadingList>) => Promise<void>;
  deleteReadingList: (id: string) => Promise<void>;
  addBookToList: (listId: string, bookId: string) => Promise<void>;
  removeBookFromList: (listId: string, bookId: string) => Promise<void>;
} 