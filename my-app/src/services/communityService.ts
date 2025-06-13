import { Post, Comment, ApiResponse } from '../types';
import { MOCK_POSTS, MOCK_COMMENTS, MOCK_USERS } from '../constants/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class CommunityService {
  private posts: Post[] = [...MOCK_POSTS];
  private comments: Comment[] = [...MOCK_COMMENTS];

  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    await delay(500);
    
    // Sort posts by creation date (newest first)
    const sortedPosts = this.posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return {
      success: true,
      data: sortedPosts,
    };
  }

  async getPostById(id: string): Promise<ApiResponse<Post | null>> {
    await delay(300);
    const post = this.posts.find(p => p.id === id);
    
    return {
      success: true,
      data: post || null,
    };
  }

  async getUserPosts(userId: string): Promise<ApiResponse<Post[]>> {
    await delay(400);
    const userPosts = this.posts.filter(post => post.userId === userId);
    
    return {
      success: true,
      data: userPosts,
    };
  }

  async createPost(postData: {
    userId: string;
    content: string;
    bookId?: string;
    imageUrl?: string;
    type: 'text' | 'book-review' | 'quote' | 'recommendation';
    tags?: string[];
  }): Promise<ApiResponse<Post>> {
    await delay(600);
    
    const user = MOCK_USERS.find(u => u.id === postData.userId);
    if (!user) {
      return {
        success: false,
        data: {} as Post,
        message: 'User not found',
      };
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: postData.userId,
      user,
      content: postData.content,
      bookId: postData.bookId,
      imageUrl: postData.imageUrl,
      type: postData.type,
      likes: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: postData.tags || [],
    };

    this.posts.unshift(newPost); // Add to beginning (newest first)

    return {
      success: true,
      data: newPost,
    };
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<ApiResponse<Post | null>> {
    await delay(500);
    
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Post not found',
      };
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.posts[postIndex],
    };
  }

  async deletePost(id: string): Promise<ApiResponse<boolean>> {
    await delay(400);
    
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Post not found',
      };
    }

    // Also remove all comments for this post
    this.comments = this.comments.filter(comment => comment.postId !== id);
    
    // Remove the post
    this.posts.splice(postIndex, 1);

    return {
      success: true,
      data: true,
    };
  }

  async likePost(postId: string, userId: string): Promise<ApiResponse<Post | null>> {
    await delay(300);
    
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Post not found',
      };
    }

    const post = this.posts[postIndex];
    
    if (!post.isLiked) {
      post.likes += 1;
      post.isLiked = true;
    }

    return {
      success: true,
      data: post,
    };
  }

  async unlikePost(postId: string, userId: string): Promise<ApiResponse<Post | null>> {
    await delay(300);
    
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Post not found',
      };
    }

    const post = this.posts[postIndex];
    
    if (post.isLiked && post.likes > 0) {
      post.likes -= 1;
      post.isLiked = false;
    }

    return {
      success: true,
      data: post,
    };
  }

  // Comment methods
  async getPostComments(postId: string): Promise<ApiResponse<Comment[]>> {
    await delay(400);
    
    const postComments = this.comments.filter(comment => comment.postId === postId);
    
    return {
      success: true,
      data: postComments,
    };
  }

  async createComment(commentData: {
    postId: string;
    userId: string;
    content: string;
  }): Promise<ApiResponse<Comment>> {
    await delay(500);
    
    const user = MOCK_USERS.find(u => u.id === commentData.userId);
    if (!user) {
      return {
        success: false,
        data: {} as Comment,
        message: 'User not found',
      };
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId: commentData.postId,
      userId: commentData.userId,
      user,
      content: commentData.content,
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.comments.push(newComment);

    // Update post comment count
    const postIndex = this.posts.findIndex(p => p.id === commentData.postId);
    if (postIndex !== -1) {
      this.posts[postIndex].commentsCount += 1;
    }

    return {
      success: true,
      data: newComment,
    };
  }

  async deleteComment(id: string): Promise<ApiResponse<boolean>> {
    await delay(300);
    
    const commentIndex = this.comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
      return {
        success: false,
        data: false,
        message: 'Comment not found',
      };
    }

    const comment = this.comments[commentIndex];
    
    // Update post comment count
    const postIndex = this.posts.findIndex(p => p.id === comment.postId);
    if (postIndex !== -1 && this.posts[postIndex].commentsCount > 0) {
      this.posts[postIndex].commentsCount -= 1;
    }

    this.comments.splice(commentIndex, 1);

    return {
      success: true,
      data: true,
    };
  }

  async likeComment(commentId: string, userId: string): Promise<ApiResponse<Comment | null>> {
    await delay(200);
    
    const commentIndex = this.comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Comment not found',
      };
    }

    const comment = this.comments[commentIndex];
    
    if (!comment.isLiked) {
      comment.likes += 1;
      comment.isLiked = true;
    }

    return {
      success: true,
      data: comment,
    };
  }

  async unlikeComment(commentId: string, userId: string): Promise<ApiResponse<Comment | null>> {
    await delay(200);
    
    const commentIndex = this.comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Comment not found',
      };
    }

    const comment = this.comments[commentIndex];
    
    if (comment.isLiked && comment.likes > 0) {
      comment.likes -= 1;
      comment.isLiked = false;
    }

    return {
      success: true,
      data: comment,
    };
  }

  async searchPosts(query: string): Promise<ApiResponse<Post[]>> {
    await delay(600);
    
    if (!query.trim()) {
      return this.getAllPosts();
    }

    const searchQuery = query.toLowerCase().trim();
    const results = this.posts.filter(post =>
      post.content.toLowerCase().includes(searchQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      post.user.displayName.toLowerCase().includes(searchQuery)
    );

    return {
      success: true,
      data: results,
    };
  }

  async getPostsByBook(bookId: string): Promise<ApiResponse<Post[]>> {
    await delay(400);
    
    const bookPosts = this.posts.filter(post => post.bookId === bookId);
    
    return {
      success: true,
      data: bookPosts,
    };
  }

  async getFeedForUser(userId: string): Promise<ApiResponse<Post[]>> {
    await delay(500);
    
    // For now, return all posts (in a real app, this would be filtered by following)
    // This could be enhanced to show posts from followed users, trending posts, etc.
    const feedPosts = this.posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return {
      success: true,
      data: feedPosts,
    };
  }
}

export const communityService = new CommunityService();
export default communityService; 