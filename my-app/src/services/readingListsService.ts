import { ReadingList, Book, CreateReadingListForm, ApiResponse } from '../types';
import { MOCK_READING_LISTS, MOCK_BOOKS, DEFAULT_READING_LISTS } from '../constants/mockData';

// No delays - instant responses for better UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ReadingListsService {
  private readingLists: ReadingList[] = [...MOCK_READING_LISTS];

  async getUserReadingLists(userId: string): Promise<ApiResponse<ReadingList[]>> {
    const userLists = this.readingLists.filter(list => list.userId === userId);
    
    return {
      success: true,
      data: userLists,
    };
  }

  async getReadingListById(id: string): Promise<ApiResponse<ReadingList | null>> {
    const list = this.readingLists.find(l => l.id === id);
    
    return {
      success: true,
      data: list || null,
    };
  }

  async createReadingList(userId: string, form: CreateReadingListForm): Promise<ApiResponse<ReadingList>> {
    const newList: ReadingList = {
      id: `list-${Date.now()}`,
      userId,
      name: form.name,
      description: form.description,
      books: [],
      isPublic: form.isPublic,
      coverImages: [],
      totalBooks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: form.tags,
    };

    this.readingLists.push(newList);

    return {
      success: true,
      data: newList,
    };
  }

  async createDefaultReadingLists(userId: string): Promise<ApiResponse<ReadingList[]>> {
    const defaultLists: ReadingList[] = [
      {
        id: `list-${userId}-want-to-read`,
        userId,
        name: DEFAULT_READING_LISTS.WANT_TO_READ,
        books: [],
        isPublic: false,
        coverImages: [],
        totalBooks: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['default'],
      },
      {
        id: `list-${userId}-currently-reading`,
        userId,
        name: DEFAULT_READING_LISTS.CURRENTLY_READING,
        books: [],
        isPublic: false,
        coverImages: [],
        totalBooks: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['default'],
      },
      {
        id: `list-${userId}-read`,
        userId,
        name: DEFAULT_READING_LISTS.READ,
        books: [],
        isPublic: false,
        coverImages: [],
        totalBooks: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['default'],
      },
    ];

    // Check if default lists already exist
    const existingDefaults = this.readingLists.filter(list => 
      list.userId === userId && list.tags.includes('default')
    );

    const listsToCreate = defaultLists.filter(newList => 
      !existingDefaults.some(existing => existing.name === newList.name)
    );

    this.readingLists.push(...listsToCreate);

    return {
      success: true,
      data: listsToCreate,
    };
  }

  async updateReadingList(id: string, updates: Partial<ReadingList>): Promise<ApiResponse<ReadingList | null>> {
    const listIndex = this.readingLists.findIndex(l => l.id === id);
    if (listIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Reading list not found',
      };
    }

    this.readingLists[listIndex] = {
      ...this.readingLists[listIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.readingLists[listIndex],
    };
  }

  async deleteReadingList(id: string): Promise<ApiResponse<boolean>> {
    const listIndex = this.readingLists.findIndex(l => l.id === id);
    if (listIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Reading list not found',
      };
    }

    // Prevent deletion of default lists
    const list = this.readingLists[listIndex];
    if (list.tags.includes('default')) {
      return {
        success: false,
        data: false,
        message: 'Cannot delete default reading lists',
      };
    }

    this.readingLists.splice(listIndex, 1);

    return {
      success: true,
      data: true,
    };
  }

  async addBookToList(listId: string, bookId: string): Promise<ApiResponse<ReadingList | null>> {
    const listIndex = this.readingLists.findIndex(l => l.id === listId);
    if (listIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Reading list not found',
      };
    }

    const book = MOCK_BOOKS.find(b => b.id === bookId);
    if (!book) {
      return {
        success: false,
        data: null,
        message: 'Book not found',
      };
    }

    const list = this.readingLists[listIndex];
    
    // Check if book is already in the list
    if (list.books.some(b => b.id === bookId)) {
      return {
        success: false,
        data: null,
        message: 'Book is already in this reading list',
      };
    }

    // Add book to list
    list.books.push(book);
    list.totalBooks = list.books.length;
    
    // Update cover images (first 4 book covers)
    list.coverImages = list.books.slice(0, 4).map(b => b.coverUrl);
    list.updatedAt = new Date().toISOString();

    this.readingLists[listIndex] = list;

    return {
      success: true,
      data: list,
    };
  }

  async removeBookFromList(listId: string, bookId: string): Promise<ApiResponse<ReadingList | null>> {
    const listIndex = this.readingLists.findIndex(l => l.id === listId);
    if (listIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Reading list not found',
      };
    }

    const list = this.readingLists[listIndex];
    
    // Remove book from list
    list.books = list.books.filter(b => b.id !== bookId);
    list.totalBooks = list.books.length;
    
    // Update cover images
    list.coverImages = list.books.slice(0, 4).map(b => b.coverUrl);
    list.updatedAt = new Date().toISOString();

    this.readingLists[listIndex] = list;

    return {
      success: true,
      data: list,
    };
  }

  async getPublicReadingLists(): Promise<ApiResponse<ReadingList[]>> {
    const publicLists = this.readingLists.filter(list => list.isPublic);
    
    return {
      success: true,
      data: publicLists,
    };
  }

  async searchReadingLists(query: string, userId?: string): Promise<ApiResponse<ReadingList[]>> {
    let lists = [...this.readingLists];
    
    // Filter by user if provided
    if (userId) {
      lists = lists.filter(list => list.userId === userId);
    } else {
      // Only show public lists if no user filter
      lists = lists.filter(list => list.isPublic);
    }

    // Search by name, description, or tags
    if (query.trim()) {
      const searchQuery = query.toLowerCase().trim();
      lists = lists.filter(list =>
        list.name.toLowerCase().includes(searchQuery) ||
        (list.description && list.description.toLowerCase().includes(searchQuery)) ||
        list.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    }

    return {
      success: true,
      data: lists,
    };
  }

  async duplicateReadingList(listId: string, userId: string, newName?: string): Promise<ApiResponse<ReadingList | null>> {
    const originalList = this.readingLists.find(l => l.id === listId);
    if (!originalList) {
      return {
        success: false,
        data: null,
        message: 'Reading list not found',
      };
    }

    const duplicatedList: ReadingList = {
      ...originalList,
      id: `list-${Date.now()}`,
      userId,
      name: newName || `${originalList.name} (Copy)`,
      isPublic: false, // Duplicated lists are private by default
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.readingLists.push(duplicatedList);

    return {
      success: true,
      data: duplicatedList,
    };
  }
}

export const readingListsService = new ReadingListsService();
export default readingListsService; 