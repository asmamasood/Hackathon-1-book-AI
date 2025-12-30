# Quickstart: Landing Page Development

**Feature**: Modern Landing Page
**Date**: 2025-12-26

## Prerequisites

- ✅ Docusaurus 3.9.2 installed
- ✅ Node.js 20.13.1+ and npm 10.5.2+
- ✅ Repository cloned and on branch `002-landing-page`
- ✅ Development server running (`npm start`)

---

## Development Workflow

### Step 1: Set Up Project Structure

```bash
# Ensure you're on the correct branch
git checkout 002-landing-page

# Create necessary directories
mkdir -p src/pages
mkdir -p src/components
mkdir -p static/img
```

---

### Step 2: Update Docusaurus Configuration

**File**: `docusaurus.config.js`

Change the docs routing to free up `/` for the landing page:

```javascript
docs: {
  sidebarPath: './sidebars.js',
  routeBasePath: 'docs',  // Changed from '/'
},
```

This makes:
- Landing page: `http://localhost:3000/book/`
- Docs (intro): `http://localhost:3000/book/docs/intro`
- Module 01: `http://localhost:3000/book/docs/robotic-nervous-system/...`

---

### Step 3: Source Hero Image

**Option A: Use Free Stock Illustration**

1. Visit [Undraw.co](https://undraw.co/illustrations)
2. Search for "robot", "artificial intelligence", or "technology"
3. Customize color to match site theme (use primary blue: #3b82f6)
4. Download as SVG or PNG
5. Convert to WebP:
   ```bash
   # Using online tool or:
   npm install -g cwebp
   cwebp -q 80 hero-robot.png -o hero-robot.webp
   ```
6. Place in `static/img/`:
   - `static/img/hero-robot.webp` (primary)
   - `static/img/hero-robot.png` (fallback)

**Option B: Use Placeholder**

Create a simple gradient placeholder until final image is sourced:
- No file needed, use CSS gradient in component

**Image Requirements**:
- Dimensions: 1200x800px (or 16:9 aspect ratio)
- File size: < 100KB
- Alt text: "Humanoid robot illustration representing Physical AI and Robotics"

---

### Step 4: Create Landing Page Component

**File**: `src/pages/index.js`

```jsx
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function LandingPage() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="AI-Native textbook for humanoid robotics and physical AI">
      <main className={styles.landingPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Physical AI & Humanoid Robotics
            </h1>
            <p className={styles.heroSubtitle}>
              Learn Humanoid Robotics from Robotic Nervous Systems to Autonomous AI Agents.
            </p>
          </div>

          {/* Hero Image */}
          <div className={styles.heroImageWrapper}>
            <picture>
              <source srcSet="/book/img/hero-robot.webp" type="image/webp" />
              <img
                src="/book/img/hero-robot.png"
                alt="Humanoid robot illustration representing Physical AI and Robotics"
                className={styles.heroImage}
                loading="eager"
                width="600"
                height="400"
              />
            </picture>
          </div>

          {/* Call to Action */}
          <div className={styles.ctaSection}>
            <Link
              to="/book/docs/intro"
              className={styles.ctaButton}
              aria-label="Navigate to introduction page">
              Start Learning
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.landingFooter}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Physical AI & Humanoid Robotics
          </p>
          <p className={styles.attribution}>
            Built with{' '}
            <a
              href="https://docusaurus.io/"
              target="_blank"
              rel="noopener noreferrer">
              Docusaurus
            </a>
          </p>
        </footer>
      </main>
    </Layout>
  );
}
```

---

### Step 5: Create CSS Module

**File**: `src/pages/index.module.css`

```css
/* Landing Page Container */
.landingPage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.heroSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  flex: 1;
  text-align: center;
}

.heroContent {
  margin-bottom: 3rem;
}

.heroTitle {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  animation: fadeIn 0.8s ease-out;
}

.heroSubtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  line-height: 1.6;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

/* Hero Image */
.heroImageWrapper {
  margin-bottom: 3rem;
  animation: fadeIn 0.8s ease-out 0.4s both;
}

.heroImage {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

/* Call to Action Button */
.ctaSection {
  animation: fadeIn 0.8s ease-out 0.6s both;
}

.ctaButton {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 8px;
  background: var(--ifm-color-primary);
  color: #ffffff !important;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.ctaButton:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  text-decoration: none;
  color: #ffffff !important;
}

.ctaButton:focus {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 4px;
}

/* Footer */
.landingFooter {
  padding: 2rem;
  text-align: center;
  border-top: 1px solid var(--ifm-color-emphasis-300);
  background: var(--ifm-background-surface-color);
}

.copyright {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.attribution {
  font-size: 0.75rem;
  opacity: 0.7;
}

.attribution a {
  color: var(--ifm-color-primary);
  text-decoration: none;
}

.attribution a:hover {
  text-decoration: underline;
}

/* Animations */
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

/* Responsive Adjustments */
@media (max-width: 767px) {
  .heroSection {
    padding: 2rem 1rem;
  }

  .heroImageWrapper {
    max-width: 90vw;
  }

  .ctaButton {
    width: 100%;
    max-width: 280px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .heroSection {
    padding: 3rem 2rem;
  }

  .heroImageWrapper {
    max-width: 500px;
  }
}

@media (min-width: 1024px) {
  .heroSection {
    padding: 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .heroImageWrapper {
    max-width: 600px;
  }
}

/* Accessibility: Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .heroTitle,
  .heroSubtitle,
  .heroImageWrapper,
  .ctaSection {
    animation: none;
  }

  .ctaButton {
    transition: none;
  }

  .ctaButton:hover {
    transform: none;
  }
}

/* Dark Mode Adjustments */
[data-theme='dark'] .heroImage {
  opacity: 0.9;
  filter: brightness(0.95);
}

[data-theme='dark'] .ctaButton:hover {
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
}
```

---

### Step 6: Test Locally

```bash
# If server not running:
npm start

# Open browser:
# http://localhost:3000/book/

# Test:
# 1. Homepage loads with title, subtitle, hero image, button
# 2. Hover over "Start Learning" button (animation triggers)
# 3. Click button (navigates to /book/docs/intro)
# 4. Toggle dark mode (theme switches correctly)
# 5. Resize browser window (layout adapts responsively)
```

---

### Step 7: Validate with Lighthouse

```bash
# Build production version
npm run build

# Serve production build
npm run serve

# Open Chrome DevTools:
# 1. Navigate to http://localhost:3000/book/
# 2. Open DevTools (F12)
# 3. Go to "Lighthouse" tab
# 4. Run audit (Mobile + Desktop)
# 5. Verify scores:
#    - Performance: ≥90
#    - Accessibility: ≥95
#    - Best Practices: ≥90
#    - SEO: ≥90
```

---

### Step 8: Commit Changes

```bash
# Stage files
git add src/pages/index.js src/pages/index.module.css
git add docusaurus.config.js
git add static/img/hero-robot.* (if added)

# Commit
git commit -m "Add modern landing page with hero section and CTA button

- Create custom homepage at src/pages/index.js
- Add responsive CSS with mobile-first approach
- Include hover animations on Start Learning button
- Add copyright footer with Docusaurus attribution
- Update docs routing to /docs/* path
- Optimize for Lighthouse 90+ performance

Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Troubleshooting

### Issue: Landing page shows 404

**Solution**: Verify `src/pages/index.js` exists and `npm start` recompiled

### Issue: "Start Learning" button navigates to 404

**Solution**: Check that:
1. `docusaurus.config.js` has `docs.routeBasePath: 'docs'`
2. Button links to `/book/docs/intro` (include baseUrl)
3. Run `npm run build` to verify all routes

### Issue: Hero image doesn't load

**Solution**:
1. Verify image exists at `static/img/hero-robot.webp`
2. Check image path includes `/book/` prefix (baseUrl)
3. Check browser console for 404 errors

### Issue: Animations not smooth

**Solution**:
1. Use GPU-accelerated properties (`transform`, `opacity`)
2. Avoid animating `width`, `height`, `top`, `left`
3. Test in production build (`npm run build && npm run serve`)

### Issue: Dark mode not working

**Solution**:
1. Verify Docusaurus theme switcher in navbar
2. Check CSS uses `[data-theme='dark']` selector
3. Test with browser DevTools: Toggle `data-theme` attribute on `<html>`

---

## Development Checklist

Before marking feature complete:

- [ ] Landing page loads at root URL (`/book/`)
- [ ] All content displays (title, subtitle, hero image, button, footer)
- [ ] Hover animation works on desktop
- [ ] Button navigates to `/book/docs/intro`
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1920px)
- [ ] Light and dark themes work
- [ ] Lighthouse scores: Performance ≥90, Accessibility ≥95
- [ ] No console errors or warnings
- [ ] Total page size < 500KB
- [ ] Committed to branch `002-landing-page`

---

## Next Steps After Implementation

1. Run Lighthouse audit and address any issues
2. Test on real mobile device (not just browser DevTools)
3. Create pull request from `002-landing-page` to `main`
4. Deploy to GitHub Pages and verify live site
