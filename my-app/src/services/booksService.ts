import { Book, SearchFilters, ApiResponse } from '../types';
import { MOCK_BOOKS, TRENDING_BOOKS, RECOMMENDED_BOOKS } from '../constants/mockData';

// No delays - instant responses for better UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class BooksService {
  private books: Book[] = [...MOCK_BOOKS];

  async getAllBooks(): Promise<ApiResponse<Book[]>> {
    return {
      success: true,
      data: this.books,
    };
  }

  async getBookById(id: string): Promise<ApiResponse<Book | null>> {
    const book = this.books.find(b => b.id === id);
    return {
      success: true,
      data: book || null,
    };
  }

  async getTrendingBooks(): Promise<ApiResponse<Book[]>> {
    return {
      success: true,
      data: TRENDING_BOOKS,
    };
  }

  async getRecommendedBooks(): Promise<ApiResponse<Book[]>> {
    return {
      success: true,
      data: RECOMMENDED_BOOKS,
    };
  }

  async searchBooks(filters: SearchFilters): Promise<ApiResponse<Book[]>> {
    let results = [...this.books];

    // Filter by query (title or author)
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase().trim();
      results = results.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );
    }

    // Filter by genres
    if (filters.genres.length > 0) {
      results = results.filter(book =>
        book.genres.some(genre => filters.genres.includes(genre))
      );
    }

    // Filter by authors
    if (filters.authors.length > 0) {
      results = results.filter(book =>
        filters.authors.includes(book.author)
      );
    }

    // Filter by rating
    if (filters.rating.min > 0 || filters.rating.max < 5) {
      results = results.filter(book =>
        book.rating >= filters.rating.min && book.rating <= filters.rating.max
      );
    }

    // Filter by published year
    if (filters.publishedYear.min > 0 || filters.publishedYear.max < new Date().getFullYear()) {
      results = results.filter(book => {
        const year = new Date(book.publishedDate).getFullYear();
        return year >= filters.publishedYear.min && year <= filters.publishedYear.max;
      });
    }

    // Sort results
    results.sort((a, b) => {
      const direction = filters.sortOrder === 'asc' ? 1 : -1;
      
      switch (filters.sortBy) {
        case 'title':
          return direction * a.title.localeCompare(b.title);
        case 'author':
          return direction * a.author.localeCompare(b.author);
        case 'rating':
          return direction * (a.rating - b.rating);
        case 'published':
          return direction * (new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
        case 'relevance':
        default:
          // For relevance, prioritize exact matches in title
          if (filters.query.trim()) {
            const query = filters.query.toLowerCase();
            const aScore = a.title.toLowerCase().includes(query) ? 2 : 1;
            const bScore = b.title.toLowerCase().includes(query) ? 2 : 1;
            return direction * (bScore - aScore);
          }
          return 0;
      }
    });

    return {
      success: true,
      data: results,
    };
  }

  async addBook(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Book>> {
    const newBook: Book = {
      ...bookData,
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.books.push(newBook);

    return {
      success: true,
      data: newBook,
    };
  }

  async updateBook(id: string, updates: Partial<Book>): Promise<ApiResponse<Book | null>> {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Book not found',
      };
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.books[bookIndex],
    };
  }

  async deleteBook(id: string): Promise<ApiResponse<boolean>> {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Book not found',
      };
    }

    this.books.splice(bookIndex, 1);

    return {
      success: true,
      data: true,
    };
  }

  async getBooksByAuthor(authorId: string): Promise<ApiResponse<Book[]>> {
    const authorBooks = this.books.filter(book => book.authorId === authorId);
    
    return {
      success: true,
      data: authorBooks,
    };
  }

  async getBooksByGenre(genre: string): Promise<ApiResponse<Book[]>> {
    const genreBooks = this.books.filter(book => 
      book.genres.includes(genre)
    );
    
    return {
      success: true,
      data: genreBooks,
    };
  }
}

export const booksService = new BooksService();
export default booksService; 