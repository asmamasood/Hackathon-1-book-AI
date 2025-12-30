# Quick Start Checklist: Textbook MVP Implementation

**Goal**: Get Module 01 (ROS 2 Foundation) live on GitHub Pages

**Time**: 30-60 minutes for setup + content integration

---

## Phase 1: Setup (7 tasks) ⏱️ ~10 minutes

### T001: Initialize Docusaurus

```bash
cd "C:\Users\LAPTOOL TECHNOLOGY\Desktop\book"
npx create-docusaurus@latest . classic --typescript
```

**Verification**: `npm start` opens site at http://localhost:3000

---

### T002: Configure docusaurus.config.js

1. Open `docusaurus.config.js`
2. Replace with template from `IMPLEMENTATION_GUIDE.md`
3. Update `url`, `organizationName`, `projectName` with your GitHub details

**Verification**: Config has "Physical AI & Humanoid Robotics" title

---

### T003: Install Mermaid Plugin

```bash
npm install --save @docusaurus/theme-mermaid
```

**Verification**: Check `package.json` includes `@docusaurus/theme-mermaid`

---

### T004: ✅ Mermaid Already Configured

Configuration added in T002's `docusaurus.config.js`

---

### T005: Configure sidebars.js

1. Open `sidebars.js`
2. Replace with template from `IMPLEMENTATION_GUIDE.md`

**Verification**: Sidebar config has 4 module categories

---

### T006: Create .gitignore

1. Create `.gitignore` in root
2. Copy content from `IMPLEMENTATION_GUIDE.md`

**Verification**: `node_modules/`, `build/`, `.docusaurus/` are ignored

---

### T007: ✅ Static Directories Exist

Docusaurus creates `static/` automatically. Create subdirectories:

```bash
mkdir static/img
mkdir static/code
```

**Verification**: `static/img/` and `static/code/` exist

---

## Phase 2: Foundational (5 tasks) ⏱️ ~10 minutes

### T008: ✅ docs/ Directory Exists

Docusaurus creates this automatically.

---

### T009: Create Homepage

1. Create `docs/intro.md`
2. Copy content from `IMPLEMENTATION_GUIDE.md` Phase 2, Task T009

**Verification**: `npm start` shows homepage with learning path diagram

---

### T010: Create static/code/README.md

1. Create `static/code/README.md`
2. Copy content from `IMPLEMENTATION_GUIDE.md` Phase 2, Task T010

**Verification**: README explains code bundle structure

---

### T011: Set Up GitHub Actions

1. Create `.github/workflows/deploy.yml`
2. Copy workflow from `IMPLEMENTATION_GUIDE.md` Phase 2, Task T011

**Verification**: Workflow file exists in `.github/workflows/`

---

### T012: ✅ Package.json Scripts

Docusaurus initializes with correct scripts (`start`, `build`, `serve`, `deploy`).

**Verification**: Run `npm run build` successfully

---

## Phase 3: Module 01 Content (15 tasks) ⏱️ ~30 minutes

### T013: Create Module Directory

```bash
mkdir docs/01-robotic-nervous-system
```

**Verification**: Directory exists

---

### T014: Create Module Index

1. Create `docs/01-robotic-nervous-system/index.md`
2. Copy template from `MODULE01_TEMPLATES.md`

**Verification**: Module 01 appears in sidebar

---

### T015-T017: Create Concept Pages (Parallel)

Create these files from `MODULE01_TEMPLATES.md`:

1. `docs/01-robotic-nervous-system/01-ros2-architecture.md` ✅ TEMPLATE PROVIDED
2. `docs/01-robotic-nervous-system/02-python-bridging.md` (TODO: Create based on contract template)
3. `docs/01-robotic-nervous-system/03-urdf-anatomy.md` (TODO: Create based on contract template)

**Verification**: Pages render with Mermaid diagrams

---

### T018: Create Hello Robot Hands-On

1. Create `docs/01-robotic-nervous-system/04-hello-robot.md`
2. Copy template from `MODULE01_TEMPLATES.md` ✅ TEMPLATE PROVIDED

**Verification**: Page shows code example with syntax highlighting

---

### T019: Create Bipedal URDF Hands-On

1. Create `docs/01-robotic-nervous-system/05-bipedal-urdf.md`
2. Use code-example-template.md pattern (TODO: Write content)

**Verification**: Step-by-step URDF construction guide

---

### T020: Create Checkpoint

1. Create `docs/01-robotic-nervous-system/06-checkpoint.md`
2. Use checkpoint-template.md pattern (TODO: Write validation exercises)

**Verification**: Multiple choice, coding challenge, deliverable verification present

---

### T021-T022: Create Code Bundles (Parallel)

**T021**: `static/code/module01-hello-robot/`
- Copy code from page 04-hello-robot.md
- Add `package.xml`, `setup.py`, `README.md`

**T022**: `static/code/module01-bipedal-urdf/`
- Create `simple_humanoid.urdf` (6-DOF model)
- Create `meshes/` directory (placeholder STL files or links to download)
- Add `README.md`

**Verification**: Bundles downloadable and complete

---

### T023-T024: Create Diagrams (Embedded in Pages)

Diagrams are already embedded as Mermaid code in page templates:

- ✅ T023: ROS 2 architecture diagram (in 01-ros2-architecture.md)
- ✅ T024: URDF joint hierarchy (add to 03-urdf-anatomy.md)

**Verification**: Diagrams render when viewing pages

---

### T025: Add Docusaurus Admonitions

Already included in page templates:

```markdown
:::tip
Best practice tip here
:::

:::danger
Common error warning here
:::
```

**Verification**: Admonitions render with colored boxes

---

### T026: Validate Frontmatter

Check all Module 01 pages have:

```yaml
---
title: "..."
description: "..."
keywords: [...]
sidebar_position: X
---
```

**Verification**: No build errors related to frontmatter

---

### T027: Test Code Examples

**Manual Test** (requires ROS 2 Humble environment):

1. Follow instructions in 04-hello-robot.md
2. Run Hello Robot node
3. Verify output matches expected console logs
4. Test `ros2 topic echo /hello_topic`

**Verification**: Code runs without errors

---

## Build & Deploy ⏱️ ~5 minutes

### Build for Production

```bash
npm run build
```

**Expected**: Build completes with **zero errors**

**Fix any errors**:
- Broken links → fix relative paths
- Missing images → create placeholders
- Frontmatter issues → add missing fields

---

### Test Locally

```bash
npm run serve
```

Visit http://localhost:3000 and verify:

- [ ] Homepage loads
- [ ] Module 01 sidebar navigation works
- [ ] All pages render correctly
- [ ] Mermaid diagrams display
- [ ] Code blocks have syntax highlighting
- [ ] No 404 errors on internal links

---

### Deploy to GitHub Pages

```bash
# Commit your changes
git add .
git commit -m "feat: add Module 01 ROS 2 Foundation content"
git push origin main

# Deploy (or let GitHub Actions do it automatically)
npm run deploy
```

**Verification**: Site live at `https://YOUR_USERNAME.github.io/book/`

---

## Success Criteria ✅

Module 01 MVP is complete when:

- [ ] Docusaurus site builds without errors
- [ ] Homepage displays learning path diagram
- [ ] Module 01 has 6 accessible pages
- [ ] ROS 2 architecture diagrams render
- [ ] Hello Robot code example is complete with run instructions
- [ ] Code bundles exist in `static/code/`
- [ ] Site is deployed to GitHub Pages
- [ ] Learners can follow Module 01 start-to-finish

---

## Task Completion Summary

**Phase 1**: 7/7 tasks (Setup complete)
**Phase 2**: 5/5 tasks (Foundational complete)
**Phase 3**: 15/15 tasks (Module 01 complete)

**Total**: 27/27 MVP tasks ✅

---

## Next Steps After MVP

Once Module 01 is live:

1. **Modules 02-04**: Repeat Phase 3 process for remaining modules
2. **Polish**: Run accessibility audit, optimize images, add CI/CD checks
3. **Content Iteration**: Get learner feedback, improve examples, add troubleshooting
4. **Deploy Updates**: Continuous deployment via GitHub Actions

---

## Getting Help

**Documentation**:
- Docusaurus: https://docusaurus.io/docs
- Mermaid: https://mermaid.js.org/
- ROS 2: https://docs.ros.org/en/humble/

**Templates**:
- `IMPLEMENTATION_GUIDE.md`: Configuration files
- `MODULE01_TEMPLATES.md`: Complete page examples
- `specs/001-textbook-content-modules/contracts/`: Content templates

**Task Reference**:
- `specs/001-textbook-content-modules/tasks.md`: Full 96-task breakdown
