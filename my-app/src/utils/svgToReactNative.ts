// Utility functions to help convert SVG to React Native components

export interface SVGComponentConfig {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

// Helper to generate React Native SVG component template
export const generateSVGComponent = (
  componentName: string,
  svgContent: string,
  config: SVGComponentConfig = {}
): string => {
  const {
    width = 24,
    height = 24,
    viewBox = `0 0 ${width} ${height}`,
    fill = "currentColor",
    stroke,
    strokeWidth
  } = config;

  return `import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polygon, Polyline, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface ${componentName}Props {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  width = ${width},
  height = ${height},
  color = '${fill}',
  style,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="${viewBox}"
      style={style}
    >
      ${svgContent}
    </Svg>
  );
};`;
};

// Helper to clean SVG markup for React Native
export const cleanSVGForReactNative = (svgString: string): string => {
  return svgString
    // Remove SVG wrapper tags
    .replace(/<svg[^>]*>/gi, '')
    .replace(/<\/svg>/gi, '')
    // Convert attributes to camelCase
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-dasharray/g, 'strokeDasharray')
    .replace(/stroke-dashoffset/g, 'strokeDashoffset')
    // Replace color values with props
    .replace(/fill="[^"]*"/g, 'fill={color}')
    .replace(/stroke="[^"]*"/g, 'stroke={color}')
    // Clean up spacing
    .trim();
};

// Pre-defined icon configurations for common use cases
export const ICON_CONFIGS = {
  small: { width: 16, height: 16 },
  medium: { width: 24, height: 24 },
  large: { width: 32, height: 32 },
  navigation: { width: 28, height: 28 },
  social: { width: 40, height: 40 },
} as const;

// Helper to extract SVG attributes from markup
export const extractSVGAttributes = (svgString: string): SVGComponentConfig => {
  const widthMatch = svgString.match(/width="([^"]*)"/);
  const heightMatch = svgString.match(/height="([^"]*)"/);
  const viewBoxMatch = svgString.match(/viewBox="([^"]*)"/);
  
  return {
    width: widthMatch ? parseInt(widthMatch[1]) : undefined,
    height: heightMatch ? parseInt(heightMatch[1]) : undefined,
    viewBox: viewBoxMatch ? viewBoxMatch[1] : undefined,
  };
}; 