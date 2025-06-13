import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BooksContextType, Book, SearchFilters } from '../types';
import { MOCK_BOOKS, TRENDING_BOOKS, RECOMMENDED_BOOKS } from '../constants/mockData';

interface BooksProviderProps {
  children: ReactNode;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [trending, setTrending] = useState<Book[]>([]);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize with mock data
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        // Load immediately without delay
        setBooks(MOCK_BOOKS);
        setTrending(TRENDING_BOOKS);
        setRecommended(RECOMMENDED_BOOKS);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const searchBooks = async (filters: SearchFilters): Promise<Book[]> => {
    try {
      setIsLoading(true);
      
      let filteredBooks = [...MOCK_BOOKS];

      // Filter by query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
        );
      }

      // Filter by genres
      if (filters.genres.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
          book.genres.some(genre => filters.genres.includes(genre))
        );
      }

      // Filter by authors
      if (filters.authors.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
          filters.authors.includes(book.author)
        );
      }

      // Filter by rating
      if (filters.rating.min > 0 || filters.rating.max < 5) {
        filteredBooks = filteredBooks.filter(book =>
          book.rating >= filters.rating.min && book.rating <= filters.rating.max
        );
      }

      // Filter by published year
      if (filters.publishedYear.min > 0 || filters.publishedYear.max < new Date().getFullYear()) {
        filteredBooks = filteredBooks.filter(book => {
          const year = new Date(book.publishedDate).getFullYear();
          return year >= filters.publishedYear.min && year <= filters.publishedYear.max;
        });
      }

      // Sort results
      filteredBooks.sort((a, b) => {
        switch (filters.sortBy) {
          case 'title':
            return filters.sortOrder === 'asc' 
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          case 'author':
            return filters.sortOrder === 'asc'
              ? a.author.localeCompare(b.author)
              : b.author.localeCompare(a.author);
          case 'rating':
            return filters.sortOrder === 'asc'
              ? a.rating - b.rating
              : b.rating - a.rating;
          case 'published':
            return filters.sortOrder === 'asc'
              ? new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
              : new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
          default:
            return 0; // relevance - would be calculated differently in real app
        }
      });

      return filteredBooks;
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getBookById = (id: string): Book | null => {
    return books.find(book => book.id === id) || null;
  };

  const addBook = async (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      setIsLoading(true);
      
      const newBook: Book = {
        ...bookData,
        id: `book-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setBooks(prevBooks => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBook = async (id: string, updates: Partial<Book>): Promise<void> => {
    try {
      setIsLoading(true);
      
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === id
            ? { ...book, ...updates, updatedAt: new Date().toISOString() }
            : book
        )
      );
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: BooksContextType = {
    books,
    trending,
    recommended,
    isLoading,
    searchBooks,
    getBookById,
    addBook,
    updateBook,
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
}; 