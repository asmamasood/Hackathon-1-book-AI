# AI-Native Textbook: Physical AI & Humanoid Robotics Constitution

<!--
SYNC IMPACT REPORT
==================
Version Change: 0.0.0 → 1.0.0
Change Type: MAJOR - Initial constitution ratification
Modified Principles: N/A (Initial creation)
Added Sections:
  - All core principles (I-VII)
  - Tech Stack & Tooling
  - Content Standards
  - Governance
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - Constitution Check section ready
  ✅ spec-template.md - Requirements alignment verified
  ✅ tasks-template.md - Task categorization compatible
Follow-up TODOs: None
-->

## Core Principles

### I. Human-Agent-Robot Symbiosis
Content MUST emphasize the partnership model between people, software agents (AI), and physical robots. Every chapter MUST demonstrate practical integration points showing how these three entities collaborate in real-world scenarios. Code examples MUST NOT focus solely on software; they MUST include hardware control interfaces and human decision points.

**Rationale**: The future of work in Physical AI requires understanding how humans guide, agents orchestrate, and robots execute. Treating any component in isolation produces graduates unprepared for real-world deployments.

### II. AI-Native Pedagogy
All learning materials MUST be designed for AI-assisted learning workflows using Claude Code and Claude Agents. Content structure, examples, and exercises MUST support both human learners and AI systems that will help students navigate, understand, and apply the material. Documentation MUST use clear, parseable formats (Markdown, structured YAML frontmatter) that enable AI-driven study aids.

**Rationale**: Students will increasingly use AI tools to learn. Materials that resist AI interaction create friction and disadvantage learners. AI-native design amplifies learning velocity and accessibility.

### III. Practical Rigor
Theory MUST be balanced with actionable, deployable code examples. Every concept MUST include at least one working code sample that students can execute, modify, and deploy. Abstract theory without implementation paths is prohibited. All code examples MUST be tested and include deployment instructions.

**Rationale**: Technical learners (O/A Level, Engineering, Medical backgrounds) learn best through doing. Theoretical-only content fails to build the muscle memory required for professional practice.

### IV. Future-Ready Skills Alignment
Curriculum MUST align with "Future of Work" demands as defined by Panaversity's mission: agentic AI, humanoid robotics, edge computing, and human-machine collaboration. Topics that do not connect to these themes MUST be justified as foundational prerequisites or removed.

**Rationale**: Educational resources must prepare students for jobs that exist in 5-10 years, not jobs that existed 5-10 years ago. Content drift toward legacy topics wastes student time and institutional credibility.

### V. Modular Structure & Learning Objectives
Each chapter MUST be self-contained with explicit learning objectives stated upfront. Chapters MUST declare prerequisites and can be completed independently (given prerequisites). Interactive code blocks MUST be embedded directly in documentation with clear setup instructions.

**Rationale**: Modular design enables flexible learning paths, supports different student backgrounds, and allows continuous content updates without cascading rewrites.

### VI. Specification-Driven Documentation
All content development MUST follow the Spec-Driven Development (SDD) workflow: specification → plan → tasks → implementation. Changes to curriculum structure, chapter additions, or topic modifications MUST be specified in `/specs/` before implementation. Ad-hoc content additions outside the SDD process are prohibited.

**Rationale**: Structured planning prevents scope creep, ensures consistency, and creates an auditable trail for curriculum governance and quality assurance.

### VII. Zero-Error Deployment Standard
The deployed site MUST build without errors and be accessible via a public GitHub Pages URL. Broken links, missing images, build failures, or inaccessible pages constitute deployment failures. All changes MUST pass CI/CD checks before merge.

**Rationale**: A broken learning platform erodes trust and blocks learning. Students cannot complete exercises if infrastructure fails. Professional standards require production-ready deployments.

## Tech Stack & Tooling

**MANDATORY TOOLS** (non-negotiable):

- **Framework**: Docusaurus (static site generator)
- **Scaffolding**: Spec-Kit Plus (workflow templates, commands)
- **Generation**: Claude Code (content creation, code examples)
- **Hosting**: GitHub Pages (public deployment)
- **Version Control**: Git + GitHub (source control, CI/CD)

**Prohibited Substitutions**: Do not substitute Docusaurus with Jekyll/Hugo/MkDocs, do not bypass Spec-Kit Plus workflows, do not use alternate AI tools for primary generation (Claude Code required), do not host elsewhere (GitHub Pages mandatory for hackathon compliance).

**Rationale**: These tools are specified by the Panaversity AI Agents Hackathon requirements. Deviating disqualifies the project from hackathon evaluation criteria.

## Content Standards

### Audience
Primary audience: Technical learners with O/A Level, Engineering, or Medical backgrounds entering the Physical AI and Humanoid Robotics field. Assume foundational programming literacy (Python, basic algorithms) but NOT advanced robotics or AI expertise.

### Output Format
- **Content Files**: Markdown (`.md` or `.mdx`) with structured YAML frontmatter
- **Code Examples**: Executable Python or JavaScript with clear runtime environment specs
- **Diagrams**: Mermaid syntax (embedded Markdown) or SVG (version-controlled)
- **Media**: Images/videos hosted in `/static/` directory with descriptive filenames

### Structure Requirements
- **Frontmatter**: Every page MUST include `title`, `description`, `keywords`, and `sidebar_position` in YAML frontmatter
- **Headings**: Hierarchical (H1 → H2 → H3), no skipped levels
- **Code Blocks**: Must specify language, include comments, and provide setup/run instructions
- **Cross-References**: Use relative links (validated by CI), not absolute URLs
- **Accessibility**: Alt text for images, semantic HTML, WCAG 2.1 AA compliance

## Governance

### Amendment Procedure
1. **Proposal**: Create ADR (Architecture Decision Record) in `history/adr/` documenting proposed change and rationale
2. **Review**: Core team review (minimum 2 approvals)
3. **Approval**: Merge ADR to main branch
4. **Update Constitution**: Increment version per semantic versioning rules (below)
5. **Propagation**: Update dependent templates (`plan-template.md`, `spec-template.md`, `tasks-template.md`, `CLAUDE.md`)
6. **Migration**: If changes affect existing content, create migration tasks in `/specs/constitution-migration/tasks.md`

### Versioning Policy
- **MAJOR (X.0.0)**: Backward-incompatible changes (e.g., removing a principle, changing mandatory tools, altering core pedagogy)
- **MINOR (0.X.0)**: Backward-compatible additions (e.g., new principle, expanded guidance, new tool requirement with fallback)
- **PATCH (0.0.X)**: Clarifications, typo fixes, rewordings that do not change meaning

### Compliance Review
- **Pre-Implementation**: Every `/sp.plan` command MUST include a Constitution Check section validating alignment
- **Pre-Merge**: Pull requests MUST include a checklist confirming no principle violations
- **Post-Deploy**: Monthly audits to verify deployed site adheres to Zero-Error Deployment Standard

### Justification for Complexity
If a feature or task violates a principle (e.g., theory-heavy chapter with no code, tool substitution), it MUST be documented in the plan's "Complexity Tracking" table with explicit justification and rejected alternatives. Unjustified violations block PR approval.

### Runtime Guidance Reference
For day-to-day development guidance, see `CLAUDE.md` (agent-specific instructions) and command files in `.claude/commands/` or `.specify/templates/commands/`.

---

**Version**: 1.0.0 | **Ratified**: 2025-12-26 | **Last Amended**: 2025-12-26
