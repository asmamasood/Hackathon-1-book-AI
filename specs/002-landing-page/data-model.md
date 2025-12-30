# Data Model: Landing Page Components

**Feature**: Modern Landing Page
**Date**: 2025-12-26

## Overview

This document defines the component structure, props, and state for the landing page React component. Since this is a presentational page with no backend data persistence, the "data model" focuses on component architecture and prop interfaces.

---

## Component Hierarchy

```
LandingPage (src/pages/index.js)
├── HeroSection
│   ├── Title
│   ├── Subtitle
│   └── HeroImage
├── CallToAction
│   └── StartButton
└── LandingFooter
    ├── CopyrightText
    └── Attribution
```

---

## Entity 1: LandingPage Component

**Purpose**: Root component for the custom homepage, wraps all sections

**Props**:
- None (top-level page component)

**State**:
- None (static presentational component)

**Responsibilities**:
- Render hero section, CTA button, and footer
- Import Docusaurus Layout wrapper for consistency
- Apply fade-in animation on mount

**Type Definition**:
```typescript
interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  // Component implementation
}
```

---

## Entity 2: HeroSection

**Purpose**: Display textbook title, subtitle, and hero image

**Props**:
```typescript
interface HeroSectionProps {
  title: string;           // "Physical AI & Humanoid Robotics"
  subtitle: string;        // "Learn Humanoid Robotics from..."
  heroImageUrl: string;    // Path to hero image (e.g., "/img/hero-robot.webp")
  heroImageAlt: string;    // Alt text for accessibility
}
```

**State**:
- None (presentational component)

**Validation Rules**:
- `title`: Required, max 100 characters
- `subtitle`: Required, max 200 characters
- `heroImageUrl`: Required, must be valid path or URL
- `heroImageAlt`: Required for accessibility (WCAG AA)

**Styling Classes**:
- `.hero-section` - Flexbox container
- `.hero-title` - Large, bold heading (H1)
- `.hero-subtitle` - Secondary text below title
- `.hero-image` - Responsive image with max-width constraints

---

## Entity 3: HeroImage

**Purpose**: Display optimized, responsive hero image with WebP/fallback support

**Props**:
```typescript
interface HeroImageProps {
  src: string;              // WebP image path
  fallbackSrc: string;      // PNG/JPEG fallback
  alt: string;              // Accessibility description
  width?: number;           // Optional explicit width
  height?: number;          // Optional explicit height
}
```

**Implementation Pattern**:
```jsx
<picture>
  <source srcSet="/img/hero-robot.webp" type="image/webp" />
  <img
    src="/img/hero-robot.png"
    alt="Humanoid robot illustration representing Physical AI and Robotics"
    loading="eager"
    width="600"
    height="400"
  />
</picture>
```

**Validation Rules**:
- `alt`: Required, min 10 characters (meaningful description)
- Image dimensions should maintain 3:2 or 16:9 aspect ratio
- File size must be < 100KB (per research decision)

---

## Entity 4: CallToAction (StartButton)

**Purpose**: Primary CTA button with hover animation and navigation

**Props**:
```typescript
interface CallToActionProps {
  buttonText: string;       // "Start Learning"
  targetUrl: string;        // "/docs/intro" (navigation destination)
  ariaLabel?: string;       // Optional ARIA label for screen readers
}
```

**State**:
- CSS hover state (managed by browser, no React state needed)

**Validation Rules**:
- `buttonText`: Required, max 30 characters
- `targetUrl`: Required, must be valid internal route
- Button must have `:hover` and `:focus` states for accessibility

**Styling Classes**:
- `.cta-button` - Base button styles
- `.cta-button:hover` - Hover animation (scale + glow)
- `.cta-button:focus` - Keyboard focus indicator

**Behavior**:
- On click: Navigate to `targetUrl` using Docusaurus Link component
- On hover (desktop): Trigger scale(1.05) + box-shadow glow
- On tap (mobile): Immediate navigation without hover delay

---

## Entity 5: LandingFooter

**Purpose**: Display copyright, textbook name, and platform attribution

**Props**:
```typescript
interface LandingFooterProps {
  bookName: string;            // "Physical AI & Humanoid Robotics"
  copyrightYear: number;       // Dynamically generated (new Date().getFullYear())
  showAttribution: boolean;    // Whether to show "Built with Docusaurus"
}
```

**State**:
- None (presentational component)

**Validation Rules**:
- `bookName`: Required
- `copyrightYear`: Required, must be valid year (2020-2100)
- `showAttribution`: Boolean, defaults to `true`

**Content**:
- Line 1: `© {copyrightYear} {bookName}`
- Line 2 (if showAttribution): `Built with Docusaurus` (linked to https://docusaurus.io/)

---

## Component Communication

### Data Flow

```
LandingPage (static props)
  ↓
HeroSection (title, subtitle, image)
  ↓
HeroImage (src, alt)

LandingPage (static props)
  ↓
CallToAction (buttonText, targetUrl)

LandingPage (static props)
  ↓
LandingFooter (bookName, copyrightYear, showAttribution)
```

**Note**: All data is static/hardcoded in the component. No external API calls, no database queries, no user input handling (except button click for navigation).

---

## Configuration Data

Since all content is static, configuration can be defined as constants:

```javascript
// Landing page configuration
const LANDING_CONFIG = {
  title: "Physical AI & Humanoid Robotics",
  subtitle: "Learn Humanoid Robotics from Robotic Nervous Systems to Autonomous AI Agents.",
  heroImage: {
    webp: "/img/hero-robot.webp",
    fallback: "/img/hero-robot.png",
    alt: "Humanoid robot illustration representing Physical AI and Robotics"
  },
  cta: {
    text: "Start Learning",
    url: "/docs/intro"
  },
  footer: {
    bookName: "Physical AI & Humanoid Robotics",
    showAttribution: true
  }
};
```

---

## Validation Rules Summary

| Field | Required | Type | Constraints |
|-------|----------|------|-------------|
| title | Yes | string | Max 100 chars |
| subtitle | Yes | string | Max 200 chars |
| heroImageUrl | Yes | string | Valid path, WebP format |
| heroImageAlt | Yes | string | Min 10 chars (meaningful) |
| buttonText | Yes | string | Max 30 chars |
| targetUrl | Yes | string | Valid internal route |
| bookName | Yes | string | - |
| copyrightYear | Yes | number | 2020-2100 |
| showAttribution | No | boolean | Default: true |

---

## State Management

**No state management library required.**

This is a fully static presentational page with:
- No user input forms
- No data fetching
- No dynamic content updates
- No authentication state
- No client-side routing state (handled by Docusaurus)

All content is hardcoded or computed from simple functions (e.g., `new Date().getFullYear()`).

---

## Next Steps

1. Create component prop type definitions in `contracts/component-props.ts`
2. Document development workflow in `quickstart.md`
3. Generate implementation tasks in `/sp.tasks`
