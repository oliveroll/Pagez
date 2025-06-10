# Onboarding Components

This folder contains all components related to the app onboarding flow, originally generated from Builder.io and converted to React Native.

## Components

### `WelcomeScreen3.tsx`
- Second onboarding screen showing "& explore stories" 
- Features the main onboarding illustration
- Navigation dots showing current position (first dot active)
- Home indicator at bottom
- Props: `onComplete`, `inOnboarding`

## Design Specifications

- **Background**: #f5f3f0 (light beige) - consistent with app theme
- **Primary Color**: #EB4D2A (orange/red)
- **Fonts**: Bogart-Bold-Trial (bold, italic)
- **Navigation Dots**: First dot active (orange), others inactive (grey)
- **Responsive**: Adapts to different screen sizes

## Usage

```typescript
import { WelcomeScreen3 } from '../../src/components/onboarding';

// In onboarding flow
<WelcomeScreen3 
  onComplete={() => navigateToNext()}
  inOnboarding={true}
/>
```

## Integration

Can be integrated into:
- `app/onboarding.tsx` - Main onboarding flow
- Standalone screen for demonstrating features

## Builder.io Source

Originally generated from Builder.io Figma export:
- Fiddle ID: 61cb256abc9e4f15ba90ca55850c4be7
- Converted to React Native with proper styling and props 