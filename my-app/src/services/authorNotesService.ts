import { AuthorNote, ApiResponse } from '../types';
import { MOCK_AUTHOR_NOTES } from '../constants/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthorNotesService {
  private authorNotes: AuthorNote[] = [...MOCK_AUTHOR_NOTES];

  async getAuthorNotes(authorId: string): Promise<ApiResponse<AuthorNote[]>> {
    await delay(400);
    const notes = this.authorNotes.filter(note => note.authorId === authorId);
    
    return {
      success: true,
      data: notes,
    };
  }

  async getBookNotes(bookId: string, includePrivate = false, authorId?: string): Promise<ApiResponse<AuthorNote[]>> {
    await delay(400);
    
    let bookNotes = this.authorNotes.filter(note => note.bookId === bookId);
    
    if (!includePrivate) {
      // Only public notes
      bookNotes = bookNotes.filter(note => note.isPublic);
    } else if (authorId) {
      // Include private notes only for the specific author
      bookNotes = bookNotes.filter(note => 
        note.isPublic || note.authorId === authorId
      );
    }
    
    return {
      success: true,
      data: bookNotes,
    };
  }

  async getPublicNotes(): Promise<ApiResponse<AuthorNote[]>> {
    await delay(500);
    const publicNotes = this.authorNotes.filter(note => note.isPublic);
    
    return {
      success: true,
      data: publicNotes,
    };
  }

  async getNoteById(id: string): Promise<ApiResponse<AuthorNote | null>> {
    await delay(300);
    const note = this.authorNotes.find(n => n.id === id);
    
    return {
      success: true,
      data: note || null,
    };
  }

  async createAuthorNote(noteData: {
    authorId: string;
    bookId: string;
    title: string;
    content: string;
    isPublic?: boolean;
    tags?: string[];
  }): Promise<ApiResponse<AuthorNote>> {
    await delay(600);
    
    const newNote: AuthorNote = {
      id: `note-${Date.now()}`,
      authorId: noteData.authorId,
      bookId: noteData.bookId,
      title: noteData.title,
      content: noteData.content,
      isPublic: noteData.isPublic ?? false,
      tags: noteData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.authorNotes.push(newNote);

    return {
      success: true,
      data: newNote,
    };
  }

  async updateAuthorNote(id: string, updates: Partial<AuthorNote>): Promise<ApiResponse<AuthorNote | null>> {
    await delay(500);
    
    const noteIndex = this.authorNotes.findIndex(n => n.id === id);
    if (noteIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Author note not found',
      };
    }

    this.authorNotes[noteIndex] = {
      ...this.authorNotes[noteIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.authorNotes[noteIndex],
    };
  }

  async deleteAuthorNote(id: string): Promise<ApiResponse<boolean>> {
    await delay(400);
    
    const noteIndex = this.authorNotes.findIndex(n => n.id === id);
    if (noteIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Author note not found',
      };
    }

    this.authorNotes.splice(noteIndex, 1);

    return {
      success: true,
      data: true,
    };
  }

  async toggleNoteVisibility(id: string): Promise<ApiResponse<AuthorNote | null>> {
    await delay(300);
    
    const noteIndex = this.authorNotes.findIndex(n => n.id === id);
    if (noteIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Author note not found',
      };
    }

    this.authorNotes[noteIndex] = {
      ...this.authorNotes[noteIndex],
      isPublic: !this.authorNotes[noteIndex].isPublic,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.authorNotes[noteIndex],
    };
  }

  async searchAuthorNotes(query: string, authorId?: string): Promise<ApiResponse<AuthorNote[]>> {
    await delay(500);
    
    let searchableNotes = authorId 
      ? this.authorNotes.filter(n => n.authorId === authorId || n.isPublic)
      : this.authorNotes.filter(n => n.isPublic);

    if (!query.trim()) {
      return {
        success: true,
        data: searchableNotes,
      };
    }

    const searchQuery = query.toLowerCase().trim();
    const results = searchableNotes.filter(note =>
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );

    return {
      success: true,
      data: results,
    };
  }

  async getNotesByTag(tag: string, authorId?: string): Promise<ApiResponse<AuthorNote[]>> {
    await delay(400);
    
    let tagNotes = this.authorNotes.filter(note => 
      note.tags.includes(tag)
    );
    
    if (authorId) {
      // Include private notes only for the specific author
      tagNotes = tagNotes.filter(note => 
        note.isPublic || note.authorId === authorId
      );
    } else {
      // Only public notes
      tagNotes = tagNotes.filter(note => note.isPublic);
    }

    return {
      success: true,
      data: tagNotes,
    };
  }

  async getAuthorNotesStats(authorId: string): Promise<ApiResponse<{
    totalNotes: number;
    publicNotes: number;
    privateNotes: number;
    tagBreakdown: Record<string, number>;
    booksWithNotes: number;
  }>> {
    await delay(400);
    
    const authorNotes = this.authorNotes.filter(n => n.authorId === authorId);
    const publicCount = authorNotes.filter(n => n.isPublic).length;
    const privateCount = authorNotes.filter(n => !n.isPublic).length;
    
    const tagBreakdown: Record<string, number> = {};
    authorNotes.forEach(note => {
      note.tags.forEach(tag => {
        tagBreakdown[tag] = (tagBreakdown[tag] || 0) + 1;
      });
    });

    const uniqueBooks = new Set(authorNotes.map(n => n.bookId));

    return {
      success: true,
      data: {
        totalNotes: authorNotes.length,
        publicNotes: publicCount,
        privateNotes: privateCount,
        tagBreakdown,
        booksWithNotes: uniqueBooks.size,
      },
    };
  }

  async duplicateNote(id: string, newTitle?: string): Promise<ApiResponse<AuthorNote | null>> {
    await delay(600);
    
    const originalNote = this.authorNotes.find(n => n.id === id);
    if (!originalNote) {
      return {
        success: false,
        data: null,
        message: 'Author note not found',
      };
    }

    const duplicatedNote: AuthorNote = {
      ...originalNote,
      id: `note-${Date.now()}`,
      title: newTitle || `${originalNote.title} (Copy)`,
      isPublic: false, // Duplicated notes are private by default
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.authorNotes.push(duplicatedNote);

    return {
      success: true,
      data: duplicatedNote,
    };
  }

  async getRecentNotes(authorId: string, limit = 10): Promise<ApiResponse<AuthorNote[]>> {
    await delay(300);
    
    const authorNotes = this.authorNotes
      .filter(n => n.authorId === authorId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);

    return {
      success: true,
      data: authorNotes,
    };
  }
}

export const authorNotesService = new AuthorNotesService();
export default authorNotesService; 