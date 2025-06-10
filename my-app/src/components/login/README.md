# Login Components

This folder contains all components related to the login page functionality, originally generated from Builder.io and converted to React Native.

## Components

### `WelcomeScreen5.tsx`
- Main container component for the login screen
- Combines all other login components
- Handles layout, header with book image, and "pagez" logo
- Props: `onLogin`, `onSocialLogin`, `onUsePhone`, `onJoinNow`, `inOnboarding`

### `LoginForm.tsx`
- Username/Email and Password input fields
- Login button
- "Use phone number instead" link
- Maintains exact 8px spacing between elements

### `SocialLogin.tsx`
- Social media login buttons (Facebook, Google, Instagram, Apple)
- "Or continue using..." text
- "Don't have an account? Join now" section

### `NavigationDots.tsx`
- Page indicator dots
- Configurable current page and total pages
- Uses app theme colors (#EB4D2A for active, #D9D9D9 for inactive)

### `HomeIndicator.tsx`
- iOS-style home indicator bar at bottom of screen
- Black rounded bar, positioned absolutely

## Usage

```typescript
import { WelcomeScreen5 } from '../../src/components/login';

// Or import individual components
import { LoginForm, SocialLogin } from '../../src/components/login';
```

## Integration

Currently used in:
- `app/(auth)/login.tsx` - Main login page

## Design Specifications

- **Background**: #f5f3f0 (light beige)
- **Primary Color**: #EB4D2A (orange/red)
- **Fonts**: Bogart-Bold-Trial, Inter
- **Spacing**: Consistent 8px between form elements
- **Responsive**: Uses screen dimensions for adaptive sizing 