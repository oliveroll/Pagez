import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BuilderComponent } from '../BuilderComponent';
import { generateSVGComponent, cleanSVGForReactNative, ICON_CONFIGS } from '../../utils/svgToReactNative';

// Example SVG to React Native conversion
const ExampleSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const BuilderExample: React.FC = () => {
  // Example of how to convert SVG to React Native component
  const convertSVGExample = () => {
    const cleanedSVG = cleanSVGForReactNative(ExampleSVG);
    const componentCode = generateSVGComponent('BookIcon', cleanedSVG, ICON_CONFIGS.medium);
    console.log('Generated React Native SVG Component:', componentCode);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Builder.io Integration with Pagez</Text>
        <Text style={styles.description}>
          This example shows how to integrate Builder.io with your Pagez app for visual component building.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Builder.io Content</Text>
        <BuilderComponent
          model="page"
          userAttributes={{
            userType: 'reader',
            interests: ['fiction', 'mystery']
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. SVG to React Native</Text>
        <Text style={styles.description}>
          Use the SVG conversion utilities to convert your designs to React Native components.
        </Text>
        <Text style={styles.codeExample}>
          {`// Example usage:
const cleanedSVG = cleanSVGForReactNative(svgString);
const component = generateSVGComponent('IconName', cleanedSVG);`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Setup Instructions</Text>
        <Text style={styles.stepText}>
          1. Get your Builder.io API key from https://builder.io/account/organization
        </Text>
        <Text style={styles.stepText}>
          2. Add EXPO_PUBLIC_BUILDER_API_KEY to your environment variables
        </Text>
        <Text style={styles.stepText}>
          3. Create models in Builder.io for your content types (pages, components, etc.)
        </Text>
        <Text style={styles.stepText}>
          4. Use the BuilderComponent to fetch and render your content
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. VS Code Extension Features</Text>
        <Text style={styles.featureText}>• Visual component builder</Text>
        <Text style={styles.featureText}>• Figma to React Native conversion</Text>
        <Text style={styles.featureText}>• Drag & drop interface</Text>
        <Text style={styles.featureText}>• TypeScript code generation</Text>
        <Text style={styles.featureText}>• Real-time preview</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  section: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EB4D2A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    paddingLeft: 16,
  },
  codeExample: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 4,
    color: '#333',
  },
}); 