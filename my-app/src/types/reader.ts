export interface Highlight {
  id: string;
  bookId: string;
  userId: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  startPosition: number;
  endPosition: number;
  createdAt: string;
} 