import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ReadingListsContextType, ReadingList, CreateReadingListForm } from '../types';
import { MOCK_READING_LISTS, MOCK_BOOKS } from '../constants/mockData';
import { useAuth } from './AuthContext';

interface ReadingListsProviderProps {
  children: ReactNode;
}

const ReadingListsContext = createContext<ReadingListsContextType | undefined>(undefined);

export const ReadingListsProvider: React.FC<ReadingListsProviderProps> = ({ children }) => {
  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // Load user's reading lists
  useEffect(() => {
    const loadReadingLists = async () => {
      if (!user) {
        setReadingLists([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter reading lists for current user
        const userLists = MOCK_READING_LISTS.filter(list => list.userId === user.id);
        setReadingLists(userLists);
      } catch (error) {
        console.error('Error loading reading lists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReadingLists();
  }, [user]);

  const createReadingList = async (form: CreateReadingListForm): Promise<void> => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newList: ReadingList = {
        id: `list-${Date.now()}`,
        userId: user.id,
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

      setReadingLists(prevLists => [...prevLists, newList]);
    } catch (error) {
      console.error('Error creating reading list:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateReadingList = async (id: string, updates: Partial<ReadingList>): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReadingLists(prevLists =>
        prevLists.map(list =>
          list.id === id
            ? { 
                ...list, 
                ...updates, 
                updatedAt: new Date().toISOString(),
                // Update totalBooks if books array is updated
                totalBooks: updates.books ? updates.books.length : list.totalBooks,
                // Update cover images if books are updated
                coverImages: updates.books ? 
                  updates.books.slice(0, 4).map(book => book.coverUrl) : 
                  list.coverImages
              }
            : list
        )
      );
    } catch (error) {
      console.error('Error updating reading list:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReadingList = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReadingLists(prevLists => prevLists.filter(list => list.id !== id));
    } catch (error) {
      console.error('Error deleting reading list:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addBookToList = async (listId: string, bookId: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Find the book
      const book = MOCK_BOOKS.find(b => b.id === bookId);
      if (!book) throw new Error('Book not found');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReadingLists(prevLists =>
        prevLists.map(list => {
          if (list.id === listId) {
            // Check if book is already in the list
            if (list.books.some(b => b.id === bookId)) {
              return list; // Book already exists, no change
            }
            
            const updatedBooks = [...list.books, book];
            return {
              ...list,
              books: updatedBooks,
              totalBooks: updatedBooks.length,
              coverImages: updatedBooks.slice(0, 4).map(b => b.coverUrl),
              updatedAt: new Date().toISOString(),
            };
          }
          return list;
        })
      );
    } catch (error) {
      console.error('Error adding book to list:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookFromList = async (listId: string, bookId: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReadingLists(prevLists =>
        prevLists.map(list => {
          if (list.id === listId) {
            const updatedBooks = list.books.filter(book => book.id !== bookId);
            return {
              ...list,
              books: updatedBooks,
              totalBooks: updatedBooks.length,
              coverImages: updatedBooks.slice(0, 4).map(b => b.coverUrl),
              updatedAt: new Date().toISOString(),
            };
          }
          return list;
        })
      );
    } catch (error) {
      console.error('Error removing book from list:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: ReadingListsContextType = {
    readingLists,
    isLoading,
    createReadingList,
    updateReadingList,
    deleteReadingList,
    addBookToList,
    removeBookFromList,
  };

  return (
    <ReadingListsContext.Provider value={value}>
      {children}
    </ReadingListsContext.Provider>
  );
};

export const useReadingLists = (): ReadingListsContextType => {
  const context = useContext(ReadingListsContext);
  if (context === undefined) {
    throw new Error('useReadingLists must be used within a ReadingListsProvider');
  }
  return context;
}; 