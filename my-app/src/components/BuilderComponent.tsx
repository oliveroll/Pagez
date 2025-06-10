import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { builder, getBuilderContent, BuilderContent } from '../config/builder';

interface BuilderComponentProps {
  model: string;
  content?: BuilderContent;
  loading?: React.ReactNode;
  error?: React.ReactNode;
  userAttributes?: Record<string, any>;
  query?: Record<string, any>;
}

export const BuilderComponent: React.FC<BuilderComponentProps> = ({
  model,
  content: initialContent,
  loading,
  error,
  userAttributes,
  query,
}) => {
  const [content, setContent] = useState<BuilderContent | null>(initialContent || null);
  const [isLoading, setIsLoading] = useState(!initialContent);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialContent) return;

    const fetchContent = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const result = await getBuilderContent(model, {
          userAttributes,
          query,
        });

        if (result) {
          setContent(result);
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error('Error loading Builder.io content:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [model, userAttributes, query, initialContent]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {loading || <ActivityIndicator size="large" color="#EB4D2A" />}
      </View>
    );
  }

  if (hasError || !content) {
    return (
      <View style={styles.container}>
        {error || <Text style={styles.errorText}>Failed to load content</Text>}
      </View>
    );
  }

  // This is where you would render the Builder.io content
  // For now, we'll show a placeholder that you can customize
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Builder.io Content: {content.name}</Text>
      <Text style={styles.subtitle}>Model: {model}</Text>
      {/* Your custom rendering logic goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#EB4D2A',
    textAlign: 'center',
  },
}); 