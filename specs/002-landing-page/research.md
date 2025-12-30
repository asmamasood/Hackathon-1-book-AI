# Research: Landing Page Technical Decisions

**Feature**: Modern Landing Page for Physical AI & Humanoid Robotics Textbook
**Date**: 2025-12-26
**Status**: Complete

## Overview

This document resolves technical implementation decisions for the landing page feature, covering Docusaurus homepage customization, React component structure, CSS animation approaches, hero image sourcing, and responsive design patterns.

---

## Decision 1: Docusaurus Homepage Customization Approach

**Question**: How should we implement a custom landing page in Docusaurus while maintaining compatibility with the existing docs-only setup?

**Decision**: Use Docusaurus **"swizzled" homepage component** (`src/pages/index.js` or `src/pages/index.tsx`)

**Rationale**:
- Docusaurus provides two homepage approaches:
  1. **Docs-only mode** (`routeBasePath: '/'`) - Currently used, makes intro.md the homepage
  2. **Custom homepage** (`src/pages/index.js`) - Allows full React component control
- Since we need a custom landing page distinct from the intro/module overview, we'll create `src/pages/index.js`
- This overrides the default homepage while keeping docs at `/intro` route
- Provides maximum design flexibility for hero sections, animations, and custom layouts

**Alternatives Considered**:
- **Option A: Modify intro.md with custom MDX components** - Rejected because MDX has limited layout control and doesn't support complex animations/hero sections easily
- **Option B: Use Docusaurus theme swizzling for Layout component** - Rejected because it's more invasive and affects all pages, not just homepage
- **Option C: Create plugin for homepage** - Rejected as overcomplicated for a single page

**Implementation Path**:
1. Update `docusaurus.config.js` to change docs `routeBasePath` from `/` to `/docs` (or keep intro accessible at `/intro`)
2. Create `src/pages/index.js` as React component
3. Import Docusaurus Layout wrapper for header/footer consistency
4. Build custom hero section, CTA button, and footer within the page component

---

## Decision 2: CSS Animation Strategy

**Question**: What CSS animation approach should be used for hover effects and fade-in animations?

**Decision**: Use **CSS3 transitions + CSS animations** with `prefers-reduced-motion` media query support

**Rationale**:
- **Pure CSS approach** (no JavaScript animation libraries):
  - Lightweight (no additional bundle size)
  - Performant (GPU-accelerated transforms and opacity)
  - Accessible (respects user motion preferences)
  - Compatible with Docusaurus custom CSS
- **Specific techniques**:
  - **Hover animation**: CSS `transition` on `transform: scale()` and `box-shadow` (glow effect)
  - **Fade-in animation**: CSS `@keyframes` with `opacity` and `translateY` for subtle entry
  - **Reduced motion**: `@media (prefers-reduced-motion: reduce)` to disable/minimize animations
- Achieves 60 FPS performance requirement (SC-004) using hardware-accelerated properties

**Alternatives Considered**:
- **Framer Motion / React Spring** - Rejected as unnecessary dependency (adds ~30-50KB), overkill for simple hover/fade effects
- **JavaScript-based animations** - Rejected due to performance concerns and unnecessary complexity
- **Lottie animations** - Rejected as too heavy for simple button hover effects

**Implementation Code Pattern**:
```css
.cta-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  .cta-button {
    transition: none;
  }
  .cta-button:hover {
    transform: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content {
  animation: fadeIn 0.8s ease-out;
}
```

---

## Decision 3: Hero Image Asset Strategy

**Question**: Where should we source the humanoid robot hero image, and how should we optimize it?

**Decision**: Use **free stock illustration** from Undraw.co or similar, optimized to WebP format with fallback

**Rationale**:
- **Free stock illustration sources**:
  - **Undraw.co** - Customizable SVG illustrations, modern flat design, robotics/tech themes available
  - **Freepik** - Free tier with attribution, has humanoid robot illustrations
  - **Pixabay/Unsplash** - Free photos of robots (Boston Dynamics-style imagery available)
- **Optimization requirements** (FR-013, SC-008, SC-009):
  - Convert to **WebP format** for 25-35% smaller file size vs PNG/JPEG
  - Target **< 100KB** for hero image (leaves 400KB budget for HTML/CSS/JS)
  - Use **responsive images** with `srcset` for mobile/tablet/desktop sizes
  - Implement **lazy loading** with `loading="eager"` for above-the-fold image
- **Fallback**: Provide PNG/JPEG fallback for browsers without WebP support (Safari < 14)

**Alternatives Considered**:
- **AI-generated image** (Midjourney/DALL-E) - Rejected due to licensing uncertainty and generation time
- **3D rendered robot** - Rejected as too time-intensive and file size concerns
- **Icon/vector only** - Rejected as less visually impactful for hero section
- **Video background** - Rejected per spec (Out of Scope: "Video or animated hero backgrounds")

**Implementation Path**:
1. Source illustration from Undraw.co (search "robot", "artificial intelligence", "humanoid")
2. Customize colors to match site theme (blue/white for light, dark blue for dark mode)
3. Export as SVG (vector) or PNG (raster)
4. Convert to WebP using `cwebp` tool or online converter
5. Create responsive variants: mobile (375w), tablet (768w), desktop (1920w)
6. Place in `static/img/hero-robot.webp` (and fallback `.png`)

**Image Specs**:
- Format: WebP with PNG fallback
- Dimensions: 1200x800px (3:2 aspect ratio) for desktop
- File size target: < 80KB
- Alt text: "Humanoid robot illustration representing Physical AI and Robotics"

---

## Decision 4: Responsive Design Pattern

**Question**: What CSS approach should be used for responsive layout across desktop, tablet, and mobile?

**Decision**: Use **CSS Flexbox** with mobile-first media queries

**Rationale**:
- **Flexbox benefits**:
  - Simple vertical stacking for mobile (single column)
  - Horizontal layout for desktop (hero image + text side-by-side option if needed)
  - Built-in alignment and spacing control
  - Excellent browser support (IE 11+ not required for modern project)
- **Mobile-first approach**:
  - Base styles for mobile (375px)
  - `@media (min-width: 768px)` for tablet adjustments
  - `@media (min-width: 1024px)` for desktop enhancements
- **Key breakpoints** (per FR-009):
  - Mobile: ≤767px (default)
  - Tablet: 768px-1023px
  - Desktop: ≥1024px

**Alternatives Considered**:
- **CSS Grid** - Rejected as unnecessary complexity for simple landing page layout (Flexbox sufficient)
- **Bootstrap/Tailwind CSS** - Rejected to avoid adding CSS framework dependency (Docusaurus has custom CSS)
- **Responsive framework** (Foundation, Bulma) - Rejected for same reason as Bootstrap

**Implementation Pattern**:
```css
/* Mobile-first base */
.hero-section {
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
}

.hero-image {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 2rem;
}

/* Tablet */
@media (min-width: 768px) {
  .hero-section {
    padding: 3rem 2rem;
  }
  .hero-image {
    max-width: 500px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-section {
    padding: 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .hero-image {
    max-width: 600px;
  }
}
```

---

## Decision 5: Dark Mode Implementation

**Question**: How should light/dark theme switching be implemented to meet FR-011?

**Decision**: Use **Docusaurus built-in theme variables** with CSS custom properties

**Rationale**:
- Docusaurus 3.x provides automatic dark mode detection via `[data-theme="dark"]` attribute on `<html>`
- Custom CSS can reference Docusaurus CSS variables:
  - `--ifm-color-primary` - Primary brand color
  - `--ifm-background-color` - Page background
  - `--ifm-font-color-base` - Text color
- No JavaScript required for theme detection (Docusaurus handles it)
- Automatically respects user's system preference (`prefers-color-scheme`)

**Alternatives Considered**:
- **Manual theme context** - Rejected as redundant (Docusaurus already provides)
- **CSS-only with media query** - Rejected because Docusaurus toggle wouldn't work
- **Third-party theme library** - Rejected as unnecessary dependency

**Implementation Pattern**:
```css
/* Light mode (default) */
.landing-page {
  background: var(--ifm-background-color);
  color: var(--ifm-font-color-base);
}

.cta-button {
  background: var(--ifm-color-primary);
  color: #ffffff;
}

/* Dark mode overrides */
[data-theme="dark"] .hero-image {
  opacity: 0.9; /* Slightly dim hero image in dark mode */
  filter: brightness(0.95);
}

[data-theme="dark"] .cta-button:hover {
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.6); /* Lighter blue glow */
}
```

---

## Decision 6: Docusaurus Routing Configuration

**Question**: How should routing be configured to make the landing page the homepage while keeping existing docs accessible?

**Decision**: Set docs `routeBasePath: 'docs'` and create `src/pages/index.js` for custom homepage

**Rationale**:
- **Current config**: docs `routeBasePath: '/'` makes intro.md the homepage
- **New config**:
  - Change to `routeBasePath: 'docs'` - docs accessible at `/docs/*`
  - Create `src/pages/index.js` - becomes homepage at `/`
  - Keep intro.md accessible at `/docs/intro`
  - Update "Start Learning" button to link to `/docs/intro`
- This approach:
  - ✅ Gives landing page dedicated homepage route
  - ✅ Maintains all existing docs without changes
  - ✅ Clear separation between marketing (landing) and content (docs)

**Alternative Considered**:
- **Keep `routeBasePath: '/'` and use `/landing` for custom page** - Rejected because landing page should be at root URL for SEO and user expectations

**Configuration Change**:
```javascript
// docusaurus.config.js
docs: {
  sidebarPath: './sidebars.js',
  routeBasePath: 'docs', // Changed from '/'
},
```

---

## Decision 7: Performance Optimization Strategy

**Question**: How should we meet the performance requirements (SC-005: Lighthouse 90+, SC-008: < 500KB bundle)?

**Decision**: Use **code splitting, image optimization, and minimal dependencies**

**Rationale**:
- **Bundle size control**:
  - Landing page is standalone React component (no shared module overhead)
  - No third-party animation libraries (pure CSS)
  - Inline critical CSS in component (avoid extra HTTP request)
  - Total estimated: HTML (5KB) + CSS (10KB) + JS (minimal, Docusaurus core already loaded) + Image (80KB) = ~95KB + Docusaurus framework
- **Lighthouse optimization**:
  - **Performance**: Image optimization (WebP), no render-blocking resources, above-the-fold content prioritized
  - **Accessibility**: Semantic HTML, ARIA labels, color contrast verified, alt text on images
  - **Best Practices**: HTTPS (GitHub Pages default), no console errors, responsive images
  - **SEO**: Meta tags, title, description (already handled by Docusaurus)

**Implementation Checklist**:
- ✅ Use WebP images with `<picture>` element for fallback
- ✅ Inline critical CSS in `<style>` tag or `src/css/custom.css` (already loaded)
- ✅ Use semantic HTML (`<header>`, `<main>`, `<footer>`, `<button>`)
- ✅ Verify WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 UI components)
- ✅ Test with Chrome Lighthouse in DevTools

---

## Decision 8: Footer Content

**Question**: What content should the footer display to meet FR-007 and FR-008?

**Decision**: Display textbook name, copyright year (dynamic), and optional Docusaurus attribution

**Rationale**:
- **Required content** (FR-007): Textbook name + copyright
- **Optional content** (FR-008): "Built with Docusaurus" link
- **Implementation**:
  ```jsx
  <footer className="landing-footer">
    <p>© {new Date().getFullYear()} Physical AI & Humanoid Robotics</p>
    <p className="attribution">
      Built with <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a>
    </p>
  </footer>
  ```
- Dynamic year (`new Date().getFullYear()`) ensures copyright stays current
- External link attributes (`target="_blank"`, `rel="noopener noreferrer"`) for security

**Alternatives Considered**:
- **Reuse Docusaurus default footer** - Rejected because spec requires custom footer with specific content
- **Static year "2025"** - Rejected because it requires annual manual updates

---

## Summary of Technical Stack

| Component | Technology | Justification |
|-----------|------------|---------------|
| **Framework** | Docusaurus 3.9.2 | Constitution requirement, already in use |
| **Homepage** | React component (`src/pages/index.js`) | Docusaurus standard for custom pages |
| **Styling** | CSS3 (custom.css) | No additional dependencies, Docusaurus compatible |
| **Animations** | CSS transitions + @keyframes | Lightweight, performant, accessible |
| **Responsive** | Flexbox + media queries | Simple, widely supported, mobile-first |
| **Theme** | Docusaurus CSS variables | Built-in dark mode support |
| **Hero Image** | WebP + PNG fallback | Optimized file size, broad compatibility |
| **Routing** | Docusaurus pages + docs | Standard Docusaurus multi-section approach |
| **Performance** | Code splitting, image optimization | Meets Lighthouse 90+ requirement |

---

## Open Questions

None - All technical decisions resolved.

---

## Next Steps

1. Create `data-model.md` (Phase 1) - Define component props and state structure
2. Create `contracts/` (Phase 1) - Define component API contracts and prop types
3. Create `quickstart.md` (Phase 1) - Document development setup and testing
4. Proceed to `/sp.tasks` - Generate implementation task breakdown
