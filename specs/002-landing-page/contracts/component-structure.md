# Landing Page Component Contract

**Feature**: Modern Landing Page
**Date**: 2025-12-26

## Component API

### LandingPage Component

**File**: `src/pages/index.js`

**Purpose**: Custom Docusaurus homepage with hero section, CTA button, and footer

**Props**: None (top-level page component)

**Returns**: JSX.Element

**Example Usage**:
```jsx
// Docusaurus automatically renders this at http://localhost:3000/book/
export default function LandingPage() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="AI-Native textbook for humanoid robotics and physical AI">
      <main className="landing-page">
        <HeroSection />
        <CallToAction />
        <LandingFooter />
      </main>
    </Layout>
  );
}
```

---

### HeroSection Component

**Purpose**: Display title, subtitle, and hero image

**Props**:
```typescript
interface HeroSectionProps {
  title?: string;           // Default: "Physical AI & Humanoid Robotics"
  subtitle?: string;        // Default: "Learn Humanoid Robotics..."
  imageUrl?: string;        // Default: "/img/hero-robot.webp"
  imageAlt?: string;        // Default: "Humanoid robot illustration..."
}
```

**Returns**: JSX.Element

**Example**:
```jsx
<HeroSection
  title="Physical AI & Humanoid Robotics"
  subtitle="Learn Humanoid Robotics from Robotic Nervous Systems to Autonomous AI Agents."
  imageUrl="/img/hero-robot.webp"
  imageAlt="Humanoid robot illustration representing Physical AI and Robotics"
/>
```

**CSS Classes**:
- `.hero-section` - Container (flexbox, center-aligned)
- `.hero-content` - Text wrapper (title + subtitle)
- `.hero-title` - H1 heading
- `.hero-subtitle` - Paragraph text
- `.hero-image-wrapper` - Image container

---

### CallToAction Component

**Purpose**: Render "Start Learning" button with hover animation

**Props**:
```typescript
interface CallToActionProps {
  buttonText?: string;      // Default: "Start Learning"
  targetUrl?: string;       // Default: "/docs/intro"
  ariaLabel?: string;       // Default: "Navigate to introduction"
}
```

**Returns**: JSX.Element

**Example**:
```jsx
<CallToAction
  buttonText="Start Learning"
  targetUrl="/docs/intro"
  ariaLabel="Navigate to introduction page"
/>
```

**CSS Classes**:
- `.cta-section` - Container
- `.cta-button` - Button with hover animation
- `.cta-button:hover` - Scale + glow effect
- `.cta-button:focus` - Keyboard focus outline

**Behavior Contract**:
- On click: Navigate to `targetUrl` using Docusaurus `<Link>` component
- On hover (desktop): Trigger `transform: scale(1.05)` + `box-shadow` glow over 300ms
- On focus (keyboard): Show visible focus outline (WCAG 2.1 AA)
- On mobile tap: Immediate navigation (no hover delay)

---

### LandingFooter Component

**Purpose**: Display copyright and platform attribution

**Props**:
```typescript
interface LandingFooterProps {
  bookName?: string;           // Default: "Physical AI & Humanoid Robotics"
  showAttribution?: boolean;   // Default: true
}
```

**Returns**: JSX.Element

**Example**:
```jsx
<LandingFooter
  bookName="Physical AI & Humanoid Robotics"
  showAttribution={true}
/>
```

**CSS Classes**:
- `.landing-footer` - Footer container
- `.copyright` - Copyright text
- `.attribution` - "Built with Docusaurus" link

**Content Contract**:
- Copyright line: `© {currentYear} {bookName}`
- Attribution line (if showAttribution): `Built with Docusaurus` (hyperlinked)

---

## CSS Contract

### Required CSS Classes

All classes must be defined in `src/css/custom.css` or inline in component:

#### Layout Classes

```css
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  flex: 1;
}
```

#### Typography Classes

```css
.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);  /* Responsive sizing */
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  text-align: center;
  max-width: 800px;
  margin-bottom: 2rem;
  opacity: 0.9;
}
```

#### Button Classes

```css
.cta-button {
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: var(--ifm-color-primary);
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.cta-button:focus {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 4px;
}
```

#### Animation Classes

```css
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

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Accessibility: Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
  }
  .cta-button {
    transition: none;
  }
  .cta-button:hover {
    transform: none;
  }
}
```

---

## Responsive Behavior Contract

### Mobile (≤767px)

- **Layout**: Single column, stacked vertically
- **Title**: Font size 2rem (32px)
- **Subtitle**: Font size 1rem (16px)
- **Hero Image**: Max width 90vw, centered
- **Button**: Full width (max 280px), centered
- **Padding**: 2rem vertical, 1rem horizontal

### Tablet (768px - 1023px)

- **Layout**: Single column, increased spacing
- **Title**: Font size 2.5rem (40px)
- **Subtitle**: Font size 1.25rem (20px)
- **Hero Image**: Max width 500px
- **Button**: Fixed width (auto), centered
- **Padding**: 3rem vertical, 2rem horizontal

### Desktop (≥1024px)

- **Layout**: Single column (centered), maximum width 1200px
- **Title**: Font size 3.5rem (56px)
- **Subtitle**: Font size 1.5rem (24px)
- **Hero Image**: Max width 600px
- **Button**: Fixed width, centered
- **Padding**: 4rem vertical, 4rem horizontal

---

## Accessibility Contract

### WCAG 2.1 AA Requirements

1. **Color Contrast**:
   - Title text: ≥4.5:1 contrast ratio with background
   - Subtitle text: ≥4.5:1 contrast ratio
   - Button text: ≥4.5:1 contrast ratio with button background
   - Button focus outline: ≥3:1 contrast ratio

2. **Semantic HTML**:
   - Use `<h1>` for title (only one per page)
   - Use `<p>` for subtitle
   - Use `<button>` or `<a>` for CTA (not `<div>`)
   - Use `<footer>` for footer section

3. **ARIA Attributes**:
   - Hero image: `alt` attribute (descriptive, not decorative)
   - CTA button: `aria-label` if button text is ambiguous
   - Footer links: `rel="noopener noreferrer"` for external links

4. **Keyboard Navigation**:
   - CTA button must be focusable with `Tab` key
   - Focus indicator must be visible (outline or box-shadow)
   - Enter/Space keys must activate button

5. **Motion Preferences**:
   - Respect `prefers-reduced-motion: reduce` media query
   - Disable all animations if user preference set

---

## Performance Contract

### Bundle Size Targets

| Asset | Target Size | Format |
|-------|-------------|--------|
| HTML | < 5KB | Minified |
| CSS | < 15KB | Minified, inlined critical CSS |
| JavaScript | 0KB additional | No custom JS (use Docusaurus core) |
| Hero Image | < 100KB | WebP with PNG fallback |
| **Total** | **< 120KB** | (Excluding Docusaurus framework) |

### Loading Strategy

1. **Critical content** (title, subtitle, button): Render immediately (no lazy loading)
2. **Hero image**: Use `loading="eager"` (above the fold)
3. **Footer**: Can be lazy-loaded if needed (below the fold)

### Lighthouse Targets (from spec)

- Performance: ≥90/100
- Accessibility: ≥95/100
- Best Practices: ≥90/100
- SEO: ≥90/100

---

## Testing Contract

### Manual Testing Checklist

1. **Visual Testing**:
   - [ ] Title displays in large, bold font
   - [ ] Subtitle displays below title
   - [ ] Hero image loads and displays correctly
   - [ ] "Start Learning" button is prominently visible
   - [ ] Footer displays copyright and attribution

2. **Interaction Testing**:
   - [ ] Hover over button triggers scale + glow animation
   - [ ] Click button navigates to `/docs/intro`
   - [ ] Keyboard Tab focuses button
   - [ ] Enter/Space activates button
   - [ ] Footer links open in new tab

3. **Responsive Testing**:
   - [ ] Mobile (375px): Single column, no horizontal scroll
   - [ ] Tablet (768px): Proper spacing, readable text
   - [ ] Desktop (1920px): Centered layout, max-width applied
   - [ ] Rotate mobile device: Layout re-flows correctly

4. **Theme Testing**:
   - [ ] Light mode: High contrast, light background
   - [ ] Dark mode: High contrast, dark background
   - [ ] Theme toggle works (Docusaurus theme switcher)
   - [ ] Hero image adapts or has appropriate overlay

5. **Accessibility Testing**:
   - [ ] Screen reader announces title, subtitle, button
   - [ ] Keyboard-only navigation works
   - [ ] Focus indicators visible
   - [ ] `prefers-reduced-motion` disables animations
   - [ ] Color contrast meets WCAG AA (use contrast checker)

6. **Performance Testing**:
   - [ ] Lighthouse performance ≥90
   - [ ] Lighthouse accessibility ≥95
   - [ ] Total page size < 500KB
   - [ ] Page loads in < 2 seconds

---

## Integration Points

### Docusaurus Integration

1. **Layout Wrapper**:
   ```jsx
   import Layout from '@theme/Layout';

   export default function LandingPage() {
     return (
       <Layout title="..." description="...">
         {/* Landing page content */}
       </Layout>
     );
   }
   ```

2. **Link Component**:
   ```jsx
   import Link from '@docusaurus/Link';

   <Link to="/docs/intro" className="cta-button">
     Start Learning
   </Link>
   ```

3. **Theme Variables**:
   ```css
   /* Access Docusaurus CSS variables */
   background: var(--ifm-background-color);
   color: var(--ifm-font-color-base);
   ```

4. **Routing**:
   - Update `docusaurus.config.js`: `docs.routeBasePath: 'docs'`
   - Landing page auto-serves at `/` (root URL)
   - Docs accessible at `/docs/*` routes

---

## Error Handling

### Image Load Failure

**Contract**: If hero image fails to load, display background gradient placeholder

```css
.hero-image-wrapper {
  background: linear-gradient(135deg, var(--ifm-color-primary-lightest), var(--ifm-color-primary-lighter));
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
}
```

### Navigation Failure

**Contract**: If `/docs/intro` route doesn't exist, button should still render but log console warning

```jsx
<Link
  to="/docs/intro"
  className="cta-button"
  onClick={(e) => {
    // Docusaurus handles routing, no custom error handling needed
  }}
>
  Start Learning
</Link>
```

---

## Next Steps

1. Create `quickstart.md` with development workflow
2. Update agent context with React/Docusaurus tech stack
3. Generate tasks in `/sp.tasks`
