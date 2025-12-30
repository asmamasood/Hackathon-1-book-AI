---
description: "Task list for Modern Landing Page implementation"
---

# Tasks: Modern Landing Page

**Input**: Design documents from `/specs/002-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: No explicit test requirements in specification. Tasks focus on component creation and validation.

**Organization**: Tasks are grouped by user story (P1, P2 priorities) to enable independent implementation and testing of each feature slice.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **React components**: `src/pages/` and `src/components/` at repository root
- **Styles**: `src/pages/index.module.css` (CSS Modules) and `src/css/custom.css` (global)
- **Static assets**: `static/img/` (hero images)
- **Configuration**: `docusaurus.config.js`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and routing configuration

- [X] T001 Create src/pages/ directory for custom Docusaurus pages
- [X] T002 Update docusaurus.config.js to change docs.routeBasePath from '/' to 'docs' (frees up root URL for landing page)
- [X] T003 [P] Verify static/img/ directory exists for hero image assets
- [X] T004 [P] Create src/components/ directory for reusable React components (if needed for future features)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Hero image asset acquisition and optimization

**⚠️ CRITICAL**: Hero image must be available before landing page can be visually complete

- [X] T005 Source hero image of humanoid robot from Undraw.co or similar free stock illustration site
- [X] T006 Customize hero image colors to match site theme (primary blue: #3b82f6 from Docusaurus config)
- [X] T007 [P] Convert hero image to WebP format with target size < 100KB (use online converter or cwebp tool)
- [X] T008 [P] Create PNG fallback version of hero image (for browsers without WebP support)
- [X] T009 [P] Place optimized images in static/img/hero-robot.webp and static/img/hero-robot.png

**Checkpoint**: Hero image assets ready - landing page component creation can now begin

---

## Phase 3: User Story 1 - First-Time Visitor Landing Experience (Priority: P1) 🎯 MVP

**Goal**: Create core landing page with title, subtitle, hero image, and "Start Learning" button

**Independent Test**: Landing page loads at http://localhost:3000/book/ with all elements visible (title, subtitle, hero image, button, footer) and "Start Learning" button navigates to /book/docs/intro

### Implementation for User Story 1

- [X] T010 [US1] Create src/pages/index.js with base React component structure (import Layout from @theme/Layout, export default function)
- [X] T011 [US1] Add title "Physical AI & Humanoid Robotics" as H1 heading in src/pages/index.js
- [X] T012 [US1] Add subtitle "Learn Humanoid Robotics from Robotic Nervous Systems to Autonomous AI Agents" as paragraph in src/pages/index.js
- [X] T013 [US1] Add hero image using <picture> element with WebP source and PNG fallback in src/pages/index.js (src="/book/img/hero-robot.webp", fallback="/book/img/hero-robot.png", alt text per spec)
- [X] T014 [US1] Add "Start Learning" button using Docusaurus Link component in src/pages/index.js (to="/book/docs/intro")
- [X] T015 [US1] Create src/pages/index.module.css with base styles (landingPage, heroSection, heroContent classes)
- [X] T016 [US1] Add hero title styles in index.module.css (large font using clamp(2rem, 5vw, 3.5rem), bold weight, center aligned)
- [X] T017 [US1] Add hero subtitle styles in index.module.css (medium font using clamp(1rem, 2.5vw, 1.5rem), opacity 0.9, max-width 800px)
- [X] T018 [US1] Add hero image styles in index.module.css (max-width 600px desktop, 90vw mobile, border-radius 12px)
- [X] T019 [US1] Verify landing page loads at root URL and all content is visible (title, subtitle, hero image, button)

**Checkpoint**: At this point, User Story 1 (core landing page) should be fully functional and testable independently

---

## Phase 4: User Story 2 - Interactive Call-to-Action (Priority: P1)

**Goal**: Add hover animations and ensure button navigation works correctly

**Independent Test**: Hover over "Start Learning" button triggers scale + glow animation (desktop), click navigates to /book/docs/intro, mobile tap works without hover delay

### Implementation for User Story 2

- [X] T020 [P] [US2] Add base button styles in index.module.css (padding 1rem 2.5rem, font-size 1.25rem, border-radius 8px, background var(--ifm-color-primary))
- [X] T021 [P] [US2] Add hover animation styles in index.module.css (transform scale(1.05), box-shadow glow effect, transition 0.3s ease)
- [X] T022 [P] [US2] Add focus styles in index.module.css (outline 2px solid, outline-offset 4px for keyboard accessibility)
- [X] T023 [US2] Test button hover animation on desktop (verify smooth 60 FPS transform and glow effect)
- [X] T024 [US2] Test button click navigation (verify navigates to /book/docs/intro successfully)
- [X] T025 [US2] Test button on mobile device or DevTools mobile emulation (verify no hover delay, immediate tap response)

**Checkpoint**: At this point, User Story 2 (interactive CTA) should be fully functional and testable independently

---

## Phase 5: User Story 3 - Responsive Multi-Device Experience (Priority: P1)

**Goal**: Ensure landing page adapts responsively to all device sizes without layout breaks

**Independent Test**: Open landing page on mobile (375px), tablet (768px), desktop (1920px) viewports and verify no horizontal scrolling, text readability, and proper element spacing

### Implementation for User Story 3

- [X] T026 [P] [US3] Add mobile-first base styles in index.module.css (single column flexbox, padding 2rem 1rem, all elements center-aligned)
- [X] T027 [P] [US3] Add tablet media query @media (min-width: 768px) in index.module.css (padding 3rem 2rem, hero image max-width 500px)
- [X] T028 [P] [US3] Add desktop media query @media (min-width: 1024px) in index.module.css (padding 4rem, max-width 1200px container, hero image max-width 600px)
- [X] T029 [P] [US3] Add button responsive styles in index.module.css (full width max 280px on mobile, auto width on desktop)
- [X] T030 [US3] Test layout on mobile viewport 375px width (verify single column, no horizontal scroll, readable text, touch-friendly button)
- [X] T031 [US3] Test layout on tablet viewport 768px width (verify proper spacing, scaled images, readable fonts)
- [X] T032 [US3] Test layout on desktop viewport 1920px width (verify centered layout, max-width applied, appropriate element sizing)
- [X] T033 [US3] Test device rotation (portrait to landscape) on mobile emulation (verify layout re-flows correctly)

**Checkpoint**: At this point, User Story 3 (responsive design) should be fully functional and testable independently

---

## Phase 6: User Story 4 - Brand Identity and Footer Information (Priority: P2)

**Goal**: Add footer with copyright and Docusaurus attribution

**Independent Test**: Scroll to bottom of landing page and verify footer displays textbook name, copyright year (2025), and "Built with Docusaurus" link

### Implementation for User Story 4

- [X] T034 [P] [US4] Add footer section in src/pages/index.js with copyright text and Docusaurus attribution
- [X] T035 [P] [US4] Implement dynamic copyright year using new Date().getFullYear() in src/pages/index.js
- [X] T036 [P] [US4] Add "Built with Docusaurus" link with target="_blank" and rel="noopener noreferrer" in src/pages/index.js
- [X] T037 [P] [US4] Add footer styles in index.module.css (padding 2rem, border-top, center-aligned text, small font sizes)
- [X] T038 [US4] Verify footer displays at bottom of page with correct content (textbook name, current year, Docusaurus link)

**Checkpoint**: At this point, User Story 4 (footer) should be fully functional and testable independently

---

## Phase 7: User Story 5 - Theme Compatibility and Accessibility (Priority: P2)

**Goal**: Support light/dark themes and ensure WCAG 2.1 AA accessibility compliance

**Independent Test**: Toggle Docusaurus theme switcher and verify landing page adapts colors correctly, run accessibility audit (Lighthouse or axe DevTools) to confirm WCAG AA compliance

### Implementation for User Story 5

- [X] T039 [P] [US5] Add dark mode styles in index.module.css using [data-theme='dark'] selector (hero image opacity 0.9, brightness filter 0.95, button glow color adjustment)
- [X] T040 [P] [US5] Add prefers-reduced-motion media query in index.module.css to disable animations for users with motion sensitivity
- [X] T041 [P] [US5] Add fade-in animations in index.module.css using @keyframes (title, subtitle, image, button with staggered delays)
- [X] T042 [P] [US5] Apply fade-in animation classes to elements in src/pages/index.js (title: 0s delay, subtitle: 0.2s, image: 0.4s, button: 0.6s)
- [X] T043 [US5] Test light mode appearance (verify light background, dark text, appropriate contrast)
- [X] T044 [US5] Test dark mode appearance (verify dark background, light text, hero image adapts, button glow color)
- [X] T045 [US5] Test with browser motion preferences disabled (verify animations disabled or minimal)
- [X] T046 [US5] Run color contrast checker on title, subtitle, and button (verify 4.5:1 for text, 3:1 for button in both themes)

**Checkpoint**: At this point, User Story 5 (theme/accessibility) should be fully functional and testable independently

---

## Phase 8: Polish & Validation

**Purpose**: Final quality checks, performance optimization, and deployment readiness

- [ ] T047 [P] Run npm run build and verify zero errors (Docusaurus build succeeds)
- [ ] T048 [P] Run npm run serve and test production build locally (verify all features work in production mode)
- [ ] T049 Run Lighthouse audit on production build (verify Performance ≥90, Accessibility ≥95, Best Practices ≥90, SEO ≥90)
- [ ] T050 [P] Check total bundle size (verify landing page assets < 500KB excluding Docusaurus framework)
- [ ] T051 [P] Test page load time on throttled connection (verify < 2 seconds on 5 Mbps broadband simulation)
- [ ] T052 [P] Verify hero image loads in < 1 second on 3G connection simulation in Chrome DevTools
- [ ] T053 Test complete user flow (visit homepage → hover button → click → arrive at /book/docs/intro in < 5 seconds)
- [ ] T054 [P] Verify no console errors or warnings in browser DevTools
- [ ] T055 [P] Test keyboard navigation (Tab to button, Enter/Space activates, focus indicator visible)
- [ ] T056 [P] Verify external links have proper attributes (target="_blank", rel="noopener noreferrer")
- [ ] T057 Cross-browser testing (Chrome, Firefox, Safari, Edge - verify consistent appearance and behavior)
- [ ] T058 Update docs/intro.md if needed to adjust navigation flow from landing page (verify "Start Learning" target is correct)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T004) - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User Story 1 (Phase 3): Can start after Foundational - Core landing page (PRIORITY: Build first)
  - User Story 2 (Phase 4): Depends on User Story 1 (T010-T019) - Adds animations to existing button
  - User Story 3 (Phase 5): Can start after User Story 1 (T010-T019) - Adds responsive styles
  - User Story 4 (Phase 6): Can start after User Story 1 (T010) - Independent footer implementation
  - User Story 5 (Phase 7): Can start after User Story 1 (T015-T018) - Adds theme/accessibility to existing styles
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies (can start after Foundational) - Core landing page with title, subtitle, image, button
- **User Story 2 (P1)**: Depends on User Story 1 (button must exist before adding hover animations)
- **User Story 3 (P1)**: Depends on User Story 1 (responsive styles applied to existing components)
- **User Story 4 (P2)**: Independent (footer can be added separately) - Only depends on T010 (base component structure)
- **User Story 5 (P2)**: Depends on User Story 1 (theme styles applied to existing components)

### Within Each User Story

- Setup tasks before component tasks
- Component structure before styles
- Styles before validation/testing tasks
- User Story phases can be worked on in parallel by different developers (after Foundational complete)

### Parallel Opportunities

- **Phase 1 Setup**: T003-T004 can run in parallel (different tasks)
- **Phase 2 Foundational**: T007-T009 can run in parallel (image conversion tasks)
- **Phase 3 User Story 1**: T016-T018 can run in parallel (different CSS sections)
- **Phase 4 User Story 2**: T020-T022 can run in parallel (different CSS sections for button)
- **Phase 5 User Story 3**: T026-T029 can run in parallel (different media query sections)
- **Phase 6 User Story 4**: T034-T037 can run in parallel (footer markup and styles)
- **Phase 7 User Story 5**: T039-T042 can run in parallel (different CSS sections for theme/animations)
- **Phase 8 Polish**: T047-T048, T050-T052, T054-T057 can run in parallel (independent validation tasks)

---

## Parallel Example: User Story 1 (Core Landing Page)

```bash
# After T010-T014 complete (component structure), launch all style tasks together:
Task T016: Add hero title styles in index.module.css
Task T017: Add hero subtitle styles in index.module.css
Task T018: Add hero image styles in index.module.css

# These can all be written in parallel since they affect different CSS classes
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only - All P1)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T009) - CRITICAL: Hero image must be available
3. Complete Phase 3: User Story 1 (T010-T019) - Core landing page
4. Complete Phase 4: User Story 2 (T020-T025) - Interactive CTA
5. Complete Phase 5: User Story 3 (T026-T033) - Responsive design
6. **STOP and VALIDATE**: Test landing page independently (all P1 features complete)
7. Run Phase 8: Polish validation tasks (T047-T058)
8. Deploy and verify live

### Incremental Delivery

1. Complete Setup + Foundational → Infrastructure ready
2. Add User Story 1 → Test independently → Core landing page works (title, subtitle, hero image, button)
3. Add User Story 2 → Test independently → Button animations work
4. Add User Story 3 → Test independently → Responsive across devices (MVP complete! P1 stories done)
5. Add User Story 4 → Test independently → Footer with copyright added (P2)
6. Add User Story 5 → Test independently → Themes and accessibility complete (P2)
7. Each user story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T009)
2. Once User Story 1 core structure exists (T010-T014):
   - Developer A: User Story 2 (T020-T025) - Button animations
   - Developer B: User Story 3 (T026-T033) - Responsive styles
   - Developer C: User Story 4 (T034-T038) - Footer
   - Developer D: User Story 5 (T039-T046) - Theme/accessibility
3. User stories integrate independently
4. Polish phase (T047-T058) completed collaboratively

---

## Notes

- [P] tasks = different files or CSS sections, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Component must be tested in browser at each checkpoint (visual verification)
- All styles use CSS Modules (index.module.css) for scoped styling
- Commit after each user story phase or logical group
- Stop at any checkpoint to validate user story independently
- **Total Tasks**: 58 (4 Setup, 5 Foundational, 10 US1, 6 US2, 8 US3, 5 US4, 8 US5, 12 Polish)
- **Parallel Opportunities**: ~25 tasks marked [P] can run in parallel within their phase
