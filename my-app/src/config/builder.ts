import { builder } from '@builder.io/sdk';

// Initialize Builder.io with your API key
// You'll need to get this from your Builder.io account
builder.init(process.env.EXPO_PUBLIC_BUILDER_API_KEY || 'your-builder-api-key-here');

// Configure Builder.io for React Native
builder.canTrack = false; // Disable tracking for mobile apps

export { builder };

// Types for Builder.io content
export interface BuilderContent {
  id: string;
  name: string;
  data: any;
  variations?: any[];
  testRatio?: number;
}

// Helper function to get content from Builder.io
export const getBuilderContent = async (
  model: string,
  options?: {
    userAttributes?: Record<string, any>;
    query?: Record<string, any>;
  }
): Promise<BuilderContent | null> => {
  try {
    const content = await builder
      .get(model, {
        userAttributes: options?.userAttributes,
        query: options?.query,
      })
      .toPromise();
    
    return content;
  } catch (error) {
    console.error('Error fetching Builder.io content:', error);
    return null;
  }
}; 