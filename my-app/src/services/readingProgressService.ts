import { ReadingProgress, ApiResponse } from '../types';
import { MOCK_READING_PROGRESS } from '../constants/mockData';

// No delays - instant responses for better UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ReadingProgressService {
  private readingProgress: ReadingProgress[] = [...MOCK_READING_PROGRESS];

  async getUserProgress(userId: string): Promise<ApiResponse<ReadingProgress[]>> {
    const userProgress = this.readingProgress.filter(p => p.userId === userId);
    
    return {
      success: true,
      data: userProgress,
    };
  }

  async getBookProgress(userId: string, bookId: string): Promise<ApiResponse<ReadingProgress | null>> {
    const progress = this.readingProgress.find(p => p.userId === userId && p.bookId === bookId);
    
    return {
      success: true,
      data: progress || null,
    };
  }

  async updateProgress(progressData: {
    userId: string;
    bookId: string;
    currentPage: number;
    totalPages: number;
    notes?: string;
  }): Promise<ApiResponse<ReadingProgress>> {
    const percentage = Math.round((progressData.currentPage / progressData.totalPages) * 100);
    const status = percentage >= 100 ? 'completed' : 'reading';
    
    const existingIndex = this.readingProgress.findIndex(
      p => p.userId === progressData.userId && p.bookId === progressData.bookId
    );

    const updatedProgress: ReadingProgress = {
      id: existingIndex >= 0 ? this.readingProgress[existingIndex].id : `progress-${Date.now()}`,
      userId: progressData.userId,
      bookId: progressData.bookId,
      currentPage: progressData.currentPage,
      totalPages: progressData.totalPages,
      percentage,
      status,
      startedAt: existingIndex >= 0 ? this.readingProgress[existingIndex].startedAt : new Date().toISOString(),
      completedAt: status === 'completed' ? new Date().toISOString() : undefined,
      lastReadAt: new Date().toISOString(),
      notes: progressData.notes,
    };

    if (existingIndex >= 0) {
      this.readingProgress[existingIndex] = updatedProgress;
    } else {
      this.readingProgress.push(updatedProgress);
    }

    return {
      success: true,
      data: updatedProgress,
    };
  }

  async startReading(userId: string, bookId: string, totalPages: number): Promise<ApiResponse<ReadingProgress>> {
    // Check if already exists
    const existing = this.readingProgress.find(p => p.userId === userId && p.bookId === bookId);
    if (existing) {
      return {
        success: true,
        data: existing,
      };
    }

    const newProgress: ReadingProgress = {
      id: `progress-${Date.now()}`,
      userId,
      bookId,
      currentPage: 0,
      totalPages,
      percentage: 0,
      status: 'not-started',
      startedAt: new Date().toISOString(),
      lastReadAt: new Date().toISOString(),
    };

    this.readingProgress.push(newProgress);

    return {
      success: true,
      data: newProgress,
    };
  }

  async markAsCompleted(userId: string, bookId: string): Promise<ApiResponse<ReadingProgress | null>> {
    const progressIndex = this.readingProgress.findIndex(
      p => p.userId === userId && p.bookId === bookId
    );

    if (progressIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Reading progress not found',
      };
    }

    const progress = this.readingProgress[progressIndex];
    this.readingProgress[progressIndex] = {
      ...progress,
      currentPage: progress.totalPages,
      percentage: 100,
      status: 'completed',
      completedAt: new Date().toISOString(),
      lastReadAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.readingProgress[progressIndex],
    };
  }

  async pauseReading(userId: string, bookId: string): Promise<ApiResponse<ReadingProgress | null>> {
    const progressIndex = this.readingProgress.findIndex(
      p => p.userId === userId && p.bookId === bookId
    );

    if (progressIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Reading progress not found',
      };
    }

    this.readingProgress[progressIndex] = {
      ...this.readingProgress[progressIndex],
      status: 'on-hold',
      lastReadAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.readingProgress[progressIndex],
    };
  }

  async resumeReading(userId: string, bookId: string): Promise<ApiResponse<ReadingProgress | null>> {
    const progressIndex = this.readingProgress.findIndex(
      p => p.userId === userId && p.bookId === bookId
    );

    if (progressIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Reading progress not found',
      };
    }

    const progress = this.readingProgress[progressIndex];
    this.readingProgress[progressIndex] = {
      ...progress,
      status: progress.percentage > 0 ? 'reading' : 'not-started',
      lastReadAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.readingProgress[progressIndex],
    };
  }

  async getUserReadingStats(userId: string): Promise<ApiResponse<{
    totalBooksStarted: number;
    totalBooksCompleted: number;
    currentlyReading: number;
    onHold: number;
    totalPagesRead: number;
    averageProgress: number;
  }>> {
    const userProgress = this.readingProgress.filter(p => p.userId === userId);
    
    const stats = {
      totalBooksStarted: userProgress.filter(p => p.status !== 'not-started').length,
      totalBooksCompleted: userProgress.filter(p => p.status === 'completed').length,
      currentlyReading: userProgress.filter(p => p.status === 'reading').length,
      onHold: userProgress.filter(p => p.status === 'on-hold').length,
      totalPagesRead: userProgress.reduce((total, p) => total + p.currentPage, 0),
      averageProgress: userProgress.length > 0 
        ? Math.round(userProgress.reduce((total, p) => total + p.percentage, 0) / userProgress.length)
        : 0,
    };

    return {
      success: true,
      data: stats,
    };
  }

  async getCurrentlyReading(userId: string): Promise<ApiResponse<ReadingProgress[]>> {
    const currentlyReading = this.readingProgress.filter(
      p => p.userId === userId && p.status === 'reading'
    );

    return {
      success: true,
      data: currentlyReading,
    };
  }

  async getRecentlyCompleted(userId: string, limit = 5): Promise<ApiResponse<ReadingProgress[]>> {
    const completed = this.readingProgress
      .filter(p => p.userId === userId && p.status === 'completed')
      .sort((a, b) => {
        const aDate = new Date(a.completedAt || 0).getTime();
        const bDate = new Date(b.completedAt || 0).getTime();
        return bDate - aDate;
      })
      .slice(0, limit);

    return {
      success: true,
      data: completed,
    };
  }

  async deleteProgress(userId: string, bookId: string): Promise<ApiResponse<boolean>> {
    const progressIndex = this.readingProgress.findIndex(
      p => p.userId === userId && p.bookId === bookId
    );

    if (progressIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Reading progress not found',
      };
    }

    this.readingProgress.splice(progressIndex, 1);

    return {
      success: true,
      data: true,
    };
  }
}

export const readingProgressService = new ReadingProgressService();
export default readingProgressService; 