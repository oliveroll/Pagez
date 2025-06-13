import React, { createContext, useContext, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: any;
}

interface ReadingList {
  id: string;
  name: string;
  books: Book[];
}

interface ReadingListContextType {
  readingLists: ReadingList[];
  addList: (name: string) => void;
  addBookToList: (listId: string, book: Book) => void;
  removeBookFromList: (listId: string, bookId: string) => void;
}

const defaultReadingLists: ReadingList[] = [
  {
    id: 'latest',
    name: 'Latest discoveries',
    books: [],
  },
  {
    id: 'horrors',
    name: 'Horrors',
    books: [],
  },
];

const ReadingListContext = createContext<ReadingListContextType | undefined>(undefined);

export const ReadingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readingLists, setReadingLists] = useState<ReadingList[]>(defaultReadingLists);

  const addList = (name: string) => {
    const newList: ReadingList = {
      id: Date.now().toString(),
      name,
      books: [],
    };
    setReadingLists([...readingLists, newList]);
  };

  const addBookToList = (listId: string, book: Book) => {
    setReadingLists(readingLists.map(list => {
      if (list.id === listId) {
        // Check if book already exists in list
        if (!list.books.find(b => b.id === book.id)) {
          return {
            ...list,
            books: [...list.books, book],
          };
        }
      }
      return list;
    }));
  };

  const removeBookFromList = (listId: string, bookId: string) => {
    setReadingLists(readingLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          books: list.books.filter(book => book.id !== bookId),
        };
      }
      return list;
    }));
  };

  return (
    <ReadingListContext.Provider value={{ readingLists, addList, addBookToList, removeBookFromList }}>
      {children}
    </ReadingListContext.Provider>
  );
};

export const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (context === undefined) {
    throw new Error('useReadingList must be used within a ReadingListProvider');
  }
  return context;
}; 