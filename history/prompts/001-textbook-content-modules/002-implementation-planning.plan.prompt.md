---
id: 002
title: Implementation planning
stage: plan
date: 2025-12-26
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-textbook-content-modules
branch: 001-textbook-content-modules
user: asmamasood
command: /sp.plan
labels: ["planning", "architecture", "docusaurus", "curriculum-design"]
links:
  spec: specs/001-textbook-content-modules/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-textbook-content-modules/plan.md
  - specs/001-textbook-content-modules/research.md
  - specs/001-textbook-content-modules/data-model.md
  - specs/001-textbook-content-modules/contracts/module-page-schema.yaml
  - specs/001-textbook-content-modules/contracts/code-example-template.md
  - specs/001-textbook-content-modules/contracts/checkpoint-template.md
  - specs/001-textbook-content-modules/quickstart.md
  - CLAUDE.md (updated with new tech stack)
tests:
  - N/A (planning artifact; implementation tests defined in tasks.md)
---

## Prompt

```text
You are an expert technical curriculum architect and robotics systems engineer.

Create a step-by-step implementation plan for the textbook "Physical AI & Humanoid Robotics", strictly following the approved /sp.specify content and formatting standards.

Planning Scope

Plan must cover all 4 modules and map directly to the following Docusaurus structure:

docs/01-robotic-nervous-system/
docs/02-digital-twin/
docs/03-ai-robot-brain/
docs/04-vision-language-action/

For EACH module, define:

Chapter Breakdown
List markdown files in learning order
Assign sidebar_label and sidebar_position

Learning Flow
Concept → Tooling → Implementation → Validation
Clearly show progression toward the module deliverable

Technical Tasks
ROS 2 nodes, simulations, AI pipelines, or integrations required
Tools used (ROS 2, Gazebo, Unity, Isaac Sim, Nav2, Whisper, LLMs)

Diagrams & Visuals
Where Mermaid.js diagrams are required (node graphs, pipelines, workflows)

Code Integration
Specify where Python/C++ code blocks are embedded
```

## Response snapshot

Created comprehensive implementation plan for **Textbook Content Modules** (branch: 001-textbook-content-modules) covering all phases from research through design.

**Implementation Plan Structure**:

**Technical Context**: Defined as Docusaurus 3.x-based documentation site with Python 3.10+, ROS 2 Humble, Gazebo/Unity simulation, NVIDIA Isaac Sim, OpenAI Whisper, and LLM integration. Target platform: GitHub Pages with Ubuntu 22.04 learner environments. Scale: 4 modules, 30-40 pages, 50+ code examples, 20+ Mermaid diagrams.

**Constitution Check**: ✅ PASSED all 7 principles:
- Principle I (Human-Agent-Robot Symbiosis): Module 04 VLA capstone demonstrates full voice → LLM → ROS 2 pipeline
- Principle II (AI-Native Pedagogy): YAML frontmatter + structured Markdown enable Claude Code/Agent navigation
- Principle III (Practical Rigor): Minimum 3 executable code examples per module with setup/run/output requirements
- Principle IV (Future-Ready Skills): Curriculum covers ROS 2, simulation, NVIDIA Isaac, LLM integration per Panaversity mission
- Principle V (Modular Structure): Independent modules with learning objectives and prerequisites
- Principle VI (Specification-Driven): Follows SDD workflow (spec → plan → tasks → implementation)
- Principle VII (Zero-Error Deployment): Zero build errors, link validation, WCAG 2.1 AA accessibility mandated

**Project Structure**: Documentation site structure with `docs/0X-module-name/` directories containing 6-7 ordered pages each. Static assets in `static/img/` (diagrams, screenshots) and `static/code/` (downloadable bundles). Module breakdown:
- Module 01 (6 pages): ROS 2 architecture, Python bridging, URDF anatomy, hands-on Hello Robot node, bipedal URDF, checkpoint
- Module 02 (6 pages): Gazebo physics, Unity rendering, sensor simulation, hands-on spawn robot, sensor streams, checkpoint
- Module 03 (7 pages): Isaac Sim intro, Visual SLAM, Nav2 planning, hands-on synthetic data, mapping, autonomous nav, checkpoint
- Module 04 (7 pages): Voice pipeline, LLM reasoning, ROS 2 actions, hands-on Whisper setup, LLM integration, autonomous humanoid, checkpoint

**Phase 0 (Research)**: Generated `research.md` with 10 technology decisions:
1. Docusaurus 3.x with Mermaid plugin for diagrams and WCAG 2.1 AA accessibility
2. ROS 2 Humble LTS for Ubuntu 22.04 compatibility and long-term support
3. Gazebo (Module 02) + Isaac Sim (Module 03) strategy balancing accessibility with advanced AI features
4. Unity Robotics Hub + ROS-TCP-Connector for cross-platform rendering integration
5. 6-DOF simplified bipedal URDF model for educational clarity (3-hour completion target)
6. Isaac ROS Docker containers with GPU passthrough to avoid dependency conflicts
7. Modified Nav2 parameters for bipedal locomotion constraints (smooth paths, balance-aware planning)
8. Local Whisper.cpp model for zero API costs and privacy
9. LangChain + OpenAI Function Calling for voice → LLM → ROS 2 action orchestration
10. Hybrid testing: linting (CI) + manual verification + Docker integration tests for critical paths

**Phase 1 (Design & Contracts)**: Generated comprehensive design artifacts:

1. **data-model.md**: Defined 6 content entities:
   - **Module**: Self-contained unit with learning objectives, prerequisites, deliverable, ordered pages
   - **Page**: Markdown/MDX file with YAML frontmatter (title, description, keywords, sidebar_position)
   - **CodeExample**: Executable snippet with setup, code, run command, expected output, runtime environment
   - **Diagram**: Mermaid or SVG with caption and alt text (WCAG compliance)
   - **Deliverable**: Hands-on artifact (ROS 2 node, URDF model, simulation, VLA pipeline) with acceptance criteria
   - **Checkpoint**: Validation exercise (quiz, coding challenge, deliverable review) confirming learning objectives

2. **contracts/module-page-schema.yaml**: YAML frontmatter schema enforcing required fields (title, description 5-10 keywords, sidebar_position) with validation rules and error messages

3. **contracts/code-example-template.md**: Standard format for code examples enforcing FR-005, FR-006, FR-007 (setup instructions, environment spec, code block with language tag, run command, expected output, validation method)

4. **contracts/checkpoint-template.md**: Template for module checkpoints with learning objectives review, multiple choice questions, short answer questions, coding challenges, and deliverable verification steps

5. **quickstart.md**: Complete author guide covering Docusaurus setup, page creation, code examples, Mermaid diagrams, static assets, local testing, and GitHub Pages deployment with troubleshooting section

**Agent Context Update**: Successfully updated `CLAUDE.md` with new technology stack (Docusaurus 3.x, ROS 2 Humble, Gazebo, Unity, Isaac Sim, Whisper, LangChain) for future implementation guidance.

**Next Steps**: Run `/sp.tasks` to generate detailed task breakdown for implementation based on plan and spec user stories.

## Outcome

- ✅ Impact: Complete technical plan ready for task generation; all modules architected with clear content structure, code examples, diagrams, and validation checkpoints
- 🧪 Tests: N/A (planning artifact; detailed testing strategy defined in research.md - hybrid approach with linting, manual verification, Docker integration tests)
- 📁 Files: 8 created (plan.md, research.md, data-model.md, 3 contract files, quickstart.md, CLAUDE.md updated)
- 🔁 Next prompts: /sp.tasks (generate detailed task breakdown for each module), /sp.implement (begin content authoring)
- 🧠 Reflection: Plan successfully translates spec's 4 user stories (P1-P4) into concrete Docusaurus page structure with 30-40 pages total. Research phase resolved 10 critical technology decisions (Docusaurus version, ROS 2 distribution, Gazebo vs Isaac Sim split, Unity integration, URDF complexity, Nav2 config, Whisper deployment, LLM integration, testing strategy). Data model and contracts provide clear templates for content authors, ensuring consistency across all modules. Constitution Check confirmed zero violations—all 7 principles satisfied without complexity justification.

## Evaluation notes (flywheel)

- Failure modes observed: None (planning complete with all required artifacts generated, Constitution Check passed)
- Graders run and results (PASS/FAIL): PASS - Plan includes: ✅ Technical Context filled, ✅ Constitution Check validated (7/7 principles), ✅ Project Structure defined with concrete Docusaurus directories, ✅ Phase 0 research.md with 10 technology decisions, ✅ Phase 1 data-model.md + 3 contract files + quickstart.md, ✅ Agent context updated
- Prompt variant (if applicable): Standard /sp.plan invocation with curriculum architect persona specialization
- Next experiment (smallest change to try): During /sp.tasks execution, validate that task breakdown correctly maps module pages to user story acceptance scenarios (e.g., Module 01 pages → "Hello Robot node + bipedal URDF" deliverable with 4 acceptance scenarios from spec)
