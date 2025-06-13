import { Highlight, ApiResponse } from '../types';
import { MOCK_HIGHLIGHTS } from '../constants/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class HighlightsService {
  private highlights: Highlight[] = [...MOCK_HIGHLIGHTS];

  async getUserHighlights(userId: string): Promise<ApiResponse<Highlight[]>> {
    await delay(400);
    const userHighlights = this.highlights.filter(h => h.userId === userId);
    
    return {
      success: true,
      data: userHighlights,
    };
  }

  async getBookHighlights(bookId: string, userId?: string): Promise<ApiResponse<Highlight[]>> {
    await delay(300);
    
    let bookHighlights = this.highlights.filter(h => h.bookId === bookId);
    
    // If userId provided, include private highlights for that user
    if (userId) {
      bookHighlights = bookHighlights.filter(h => 
        h.isPublic || h.userId === userId
      );
    } else {
      // Only public highlights
      bookHighlights = bookHighlights.filter(h => h.isPublic);
    }
    
    return {
      success: true,
      data: bookHighlights,
    };
  }

  async getPublicHighlights(): Promise<ApiResponse<Highlight[]>> {
    await delay(400);
    const publicHighlights = this.highlights.filter(h => h.isPublic);
    
    return {
      success: true,
      data: publicHighlights,
    };
  }

  async createHighlight(highlightData: {
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
    isPublic?: boolean;
  }): Promise<ApiResponse<Highlight>> {
    await delay(500);
    
    const newHighlight: Highlight = {
      id: `highlight-${Date.now()}`,
      userId: highlightData.userId,
      bookId: highlightData.bookId,
      text: highlightData.text,
      color: highlightData.color,
      page: highlightData.page,
      position: highlightData.position,
      note: highlightData.note,
      isPublic: highlightData.isPublic ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.highlights.push(newHighlight);

    return {
      success: true,
      data: newHighlight,
    };
  }

  async updateHighlight(id: string, updates: Partial<Highlight>): Promise<ApiResponse<Highlight | null>> {
    await delay(400);
    
    const highlightIndex = this.highlights.findIndex(h => h.id === id);
    if (highlightIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Highlight not found',
      };
    }

    this.highlights[highlightIndex] = {
      ...this.highlights[highlightIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.highlights[highlightIndex],
    };
  }

  async deleteHighlight(id: string): Promise<ApiResponse<boolean>> {
    await delay(300);
    
    const highlightIndex = this.highlights.findIndex(h => h.id === id);
    if (highlightIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Highlight not found',
      };
    }

    this.highlights.splice(highlightIndex, 1);

    return {
      success: true,
      data: true,
    };
  }

  async shareHighlight(id: string): Promise<ApiResponse<string>> {
    await delay(200);
    
    const highlight = this.highlights.find(h => h.id === id);
    if (!highlight) {
      return {
        success: false,
        data: '',
        message: 'Highlight not found',
      };
    }

    // Generate a shareable text
    const shareText = `"${highlight.text}"${highlight.note ? `\n\nNote: ${highlight.note}` : ''}`;

    return {
      success: true,
      data: shareText,
    };
  }

  async copyHighlight(id: string): Promise<ApiResponse<string>> {
    await delay(150);
    
    const highlight = this.highlights.find(h => h.id === id);
    if (!highlight) {
      return {
        success: false,
        data: '',
        message: 'Highlight not found',
      };
    }

    return {
      success: true,
      data: highlight.text,
    };
  }

  async searchHighlights(query: string, userId?: string): Promise<ApiResponse<Highlight[]>> {
    await delay(500);
    
    let searchableHighlights = userId 
      ? this.highlights.filter(h => h.userId === userId || h.isPublic)
      : this.highlights.filter(h => h.isPublic);

    if (!query.trim()) {
      return {
        success: true,
        data: searchableHighlights,
      };
    }

    const searchQuery = query.toLowerCase().trim();
    const results = searchableHighlights.filter(highlight =>
      highlight.text.toLowerCase().includes(searchQuery) ||
      highlight.note?.toLowerCase().includes(searchQuery)
    );

    return {
      success: true,
      data: results,
    };
  }

  async getHighlightsByColor(color: string, userId?: string): Promise<ApiResponse<Highlight[]>> {
    await delay(300);
    
    let colorHighlights = this.highlights.filter(h => h.color === color);
    
    if (userId) {
      colorHighlights = colorHighlights.filter(h => 
        h.isPublic || h.userId === userId
      );
    } else {
      colorHighlights = colorHighlights.filter(h => h.isPublic);
    }

    return {
      success: true,
      data: colorHighlights,
    };
  }

  async getHighlightStats(userId: string): Promise<ApiResponse<{
    totalHighlights: number;
    publicHighlights: number;
    privateHighlights: number;
    colorBreakdown: Record<string, number>;
    booksHighlighted: number;
  }>> {
    await delay(400);
    
    const userHighlights = this.highlights.filter(h => h.userId === userId);
    const publicCount = userHighlights.filter(h => h.isPublic).length;
    const privateCount = userHighlights.filter(h => !h.isPublic).length;
    
    const colorBreakdown: Record<string, number> = {};
    userHighlights.forEach(h => {
      colorBreakdown[h.color] = (colorBreakdown[h.color] || 0) + 1;
    });

    const uniqueBooks = new Set(userHighlights.map(h => h.bookId));

    return {
      success: true,
      data: {
        totalHighlights: userHighlights.length,
        publicHighlights: publicCount,
        privateHighlights: privateCount,
        colorBreakdown,
        booksHighlighted: uniqueBooks.size,
      },
    };
  }
}

export const highlightsService = new HighlightsService();
export default highlightsService; 