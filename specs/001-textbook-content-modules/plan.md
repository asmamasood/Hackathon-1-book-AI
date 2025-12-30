# Implementation Plan: Textbook Content Modules

**Branch**: `001-textbook-content-modules` | **Date**: 2025-12-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-textbook-content-modules/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create comprehensive educational content for a 4-module Physical AI & Humanoid Robotics textbook deployed as a Docusaurus static site. Each module progresses from foundational concepts (ROS 2 middleware) through simulation (Gazebo/Unity) and AI perception (NVIDIA Isaac) to culminate in a voice-commanded humanoid capstone (Vision-Language-Action integration). Content must include executable code examples, Mermaid diagrams, YAML frontmatter, and follow AI-Native Pedagogy principles for Claude Code/Agent-assisted learning.

## Technical Context

**Language/Version**: Python 3.10+, YAML (frontmatter), Markdown/MDX (content), JavaScript (Docusaurus config)
**Primary Dependencies**: Docusaurus 3.x, ROS 2 Humble, Gazebo Classic/Harmonic, Unity 2022 LTS, NVIDIA Isaac Sim 2023.1+, OpenAI Whisper, LLM APIs (OpenAI/Anthropic)
**Storage**: Static files (Markdown/MDX), code examples (Python/C++), URDF/SDF models, Mermaid diagrams, SVG assets in `/static/`
**Testing**: Docusaurus build validation, Markdown linting, link checking (CI), code example execution tests
**Target Platform**: GitHub Pages (static site deployment), learner environments (Ubuntu 22.04 LTS for ROS 2 development)
**Project Type**: Documentation site (Docusaurus-based curriculum)
**Performance Goals**: < 3s page load time, < 1s search latency, zero build errors/warnings
**Constraints**: WCAG 2.1 AA accessibility, mobile-responsive, no server-side execution, all code examples must run in learner environments
**Scale/Scope**: 4 modules, ~30-40 pages total, 50+ code examples, 20+ Mermaid diagrams, 10+ URDF/SDF models

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I: Human-Agent-Robot Symbiosis**
- ✅ **PASS**: Each module explicitly demonstrates human-agent-robot integration (Module 04 capstone is entire VLA workflow)
- **Evidence**: FR-015 requires Human-Agent-Robot Symbiosis demonstration; Module 04 acceptance scenarios show voice (human) → LLM (agent) → ROS 2 (robot) pipeline

**Principle II: AI-Native Pedagogy**
- ✅ **PASS**: Content designed for Claude Code/Agent-assisted learning with structured Markdown and YAML frontmatter
- **Evidence**: FR-002 mandates YAML frontmatter (title, description, keywords, sidebar_position); Docusaurus structure enables AI navigation

**Principle III: Practical Rigor**
- ✅ **PASS**: Every major concept includes executable code examples with setup/run instructions
- **Evidence**: FR-005, FR-006, FR-007 mandate executable code examples (min 3 per module) with language specs, runtime environment, and execution guarantees; SC-002 validates this

**Principle IV: Future-Ready Skills Alignment**
- ✅ **PASS**: Curriculum covers ROS 2, simulation, NVIDIA Isaac, and LLM integration per Panaversity mission
- **Evidence**: Four modules directly map to "Future of Work" demands: agentic AI (Module 04 LLMs), humanoid robotics (all modules), edge computing (Isaac ROS), human-machine collaboration (VLA capstone)

**Principle V: Modular Structure & Learning Objectives**
- ✅ **PASS**: Each module is self-contained with explicit learning objectives and prerequisites
- **Evidence**: FR-003, FR-004 mandate learning objectives and prerequisite declarations; four user stories (P1-P4) are independently testable per spec

**Principle VI: Specification-Driven Documentation**
- ✅ **PASS**: This plan follows SDD workflow (spec → plan → tasks → implementation)
- **Evidence**: Feature created via `/sp.specify`, now planning via `/sp.plan`, will generate tasks via `/sp.tasks` before implementation

**Principle VII: Zero-Error Deployment Standard**
- ✅ **PASS**: Build validation and link checking required; zero-error deployment to GitHub Pages mandated
- **Evidence**: SC-001 requires "zero build errors", SC-006 requires "no 404 errors as validated by CI checks", FR-012 mandates relative path link validation

**Gate Result**: ✅ **PASS** - All 7 Constitution principles satisfied. No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-textbook-content-modules/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output: Technology decisions and best practices
├── data-model.md        # Phase 1 output: Content entities (Module, CodeExample, Deliverable, etc.)
├── quickstart.md        # Phase 1 output: Quick start guide for content authors
├── contracts/           # Phase 1 output: Content contracts (page templates, frontmatter schemas)
│   ├── module-page-schema.yaml      # YAML frontmatter schema for module pages
│   ├── code-example-template.md     # Template for code examples
│   └── checkpoint-template.md       # Template for module checkpoint exercises
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
docs/                           # Docusaurus content directory
├── 01-robotic-nervous-system/  # Module 01: ROS 2 Foundation
│   ├── index.md                # Module overview, learning objectives
│   ├── 01-ros2-architecture.md # Nodes, topics, services, actions
│   ├── 02-python-bridging.md   # rclpy implementation
│   ├── 03-urdf-anatomy.md      # URDF structure for humanoids
│   ├── 04-hello-robot.md       # Hands-on: Create Hello Robot node
│   ├── 05-bipedal-urdf.md      # Hands-on: Build bipedal URDF model
│   └── 06-checkpoint.md        # Validation exercises
│
├── 02-digital-twin/            # Module 02: Simulation
│   ├── index.md                # Module overview, learning objectives
│   ├── 01-gazebo-physics.md    # Gravity, friction, collision config
│   ├── 02-unity-rendering.md   # Unity setup and import
│   ├── 03-sensor-simulation.md # LiDAR, depth camera, IMU plugins
│   ├── 04-spawn-robot.md       # Hands-on: Spawn URDF in Gazebo
│   ├── 05-sensor-streams.md    # Hands-on: Access sensor data via ROS 2 topics
│   └── 06-checkpoint.md        # Validation exercises
│
├── 03-ai-robot-brain/          # Module 03: NVIDIA Isaac & Perception
│   ├── index.md                # Module overview, learning objectives
│   ├── 01-isaac-sim-intro.md   # Isaac Sim setup and synthetic data
│   ├── 02-visual-slam.md       # Isaac ROS Visual SLAM config
│   ├── 03-nav2-planning.md     # Nav2 for bipedal navigation
│   ├── 04-synthetic-data.md    # Hands-on: Generate training data
│   ├── 05-mapping.md           # Hands-on: Create map with VSLAM
│   ├── 06-autonomous-nav.md    # Hands-on: Navigate point A to B
│   └── 07-checkpoint.md        # Validation exercises
│
└── 04-vision-language-action/  # Module 04: VLA Capstone
    ├── index.md                # Module overview, learning objectives
    ├── 01-voice-pipeline.md    # OpenAI Whisper integration
    ├── 02-llm-reasoning.md     # LLM for action sequence generation
    ├── 03-ros2-actions.md      # Mapping NL to ROS 2 action calls
    ├── 04-whisper-setup.md     # Hands-on: Voice transcription
    ├── 05-llm-integration.md   # Hands-on: LLM command parsing
    ├── 06-autonomous-humanoid.md # Hands-on: Complete VLA workflow
    └── 07-checkpoint.md        # Validation exercises

static/                         # Static assets
├── img/                        # Diagrams, screenshots, robot renders
│   ├── ros2-architecture.svg   # Module 01 diagrams
│   ├── gazebo-setup.png        # Module 02 screenshots
│   ├── isaac-sim-ui.png        # Module 03 screenshots
│   └── vla-pipeline.svg        # Module 04 diagrams
└── code/                       # Downloadable code bundles
    ├── module01-hello-robot/   # Hello Robot node example
    ├── module01-bipedal-urdf/  # Bipedal URDF model
    ├── module02-gazebo-world/  # Gazebo world files
    ├── module03-isaac-config/  # Isaac Sim config files
    └── module04-vla-pipeline/  # Complete VLA pipeline code

docusaurus.config.js            # Docusaurus configuration
sidebars.js                     # Sidebar navigation config
package.json                    # Node.js dependencies (Docusaurus)
```

**Structure Decision**: Documentation site structure selected. Docusaurus serves Markdown/MDX files from `docs/` directory with YAML frontmatter. Each module is a subdirectory with ordered pages (numeric prefixes). Static assets (diagrams, code) stored in `static/`. No traditional src/ needed—content IS the product.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations detected** - Constitution Check passed all 7 principles. No complexity justification required.

---

## Phase 0: Research & Technology Decisions

**Status**: Pending
**Output**: research.md

**Research Questions**:

1. **Docusaurus Version & Plugin Selection**: Which Docusaurus version (3.x latest) and plugins (search, Mermaid, code blocks) best support AI-Native Pedagogy and WCAG 2.1 AA?

2. **ROS 2 Version & Compatibility**: Which ROS 2 distribution (Humble LTS) ensures compatibility with Gazebo, Isaac ROS, and Nav2 for Ubuntu 22.04 learners?

3. **Gazebo vs Isaac Sim Trade-offs**: When to use Gazebo Classic/Harmonic vs Isaac Sim? (Research: Gazebo for lightweight physics, Isaac Sim for synthetic data generation and advanced rendering)

4. **Unity Integration Pattern**: How to integrate Unity with ROS 2 for rendering? (Research: Unity Robotics Hub package, ROS-TCP-Connector)

5. **URDF Best Practices for Bipedal Humanoids**: What joint structures, link hierarchies, and visualization best practices exist for educational bipedal URDF models?

6. **Isaac ROS Visual SLAM Setup**: What are the minimal hardware requirements and configuration steps for Isaac ROS Visual SLAM on learner machines?

7. **Nav2 Bipedal Configuration**: How to configure Nav2 cost maps, planners, and controllers for bipedal locomotion (vs. standard differential drive robots)?

8. **OpenAI Whisper Deployment**: Local Whisper model vs API? (Research: Local model for educational use to avoid API costs, Whisper.cpp for lightweight deployment)

9. **LLM Integration Pattern**: Best practices for chaining voice → LLM → ROS 2 actions (Research: LangChain for orchestration, function calling for action mapping)

10. **Code Example Testing Strategy**: How to automate testing of 50+ code examples across modules without requiring full Isaac Sim/GPU infrastructure in CI? (Research: Docker containers with mocked hardware, unit tests for code structure)

**Next Step**: Create research.md with findings and decisions for each question.

---

## Phase 1: Content Architecture & Contracts

**Status**: Pending (depends on Phase 0 research.md completion)
**Output**: data-model.md, contracts/, quickstart.md

**Deliverables**:

1. **data-model.md**: Define content entities:
   - **Module**: Directory, index page, learning objectives, prerequisites, deliverables
   - **Page**: Markdown file, YAML frontmatter (title, description, keywords, sidebar_position), content sections
   - **CodeExample**: Language, code block, setup instructions, runtime environment, expected output
   - **Diagram**: Mermaid syntax or SVG, caption, alt text
   - **Deliverable**: Hands-on artifact (ROS 2 node, URDF model, simulation, navigation system, VLA pipeline)
   - **Checkpoint**: Quiz questions, coding challenges, validation criteria

2. **contracts/**: Define content templates and schemas:
   - `module-page-schema.yaml`: YAML frontmatter schema enforcing FR-002 (title, description, keywords, sidebar_position)
   - `code-example-template.md`: Template for code examples enforcing FR-005, FR-006, FR-007 (language spec, setup, run instructions, expected output)
   - `checkpoint-template.md`: Template for module checkpoints enforcing FR-010 (validation exercises)

3. **quickstart.md**: Guide for content authors covering:
   - Docusaurus setup (Node.js, npm install, npm start)
   - Creating new module pages (frontmatter, content structure)
   - Adding code examples (embedding Python/C++, testing locally)
   - Creating Mermaid diagrams (node graphs, sequence diagrams, flowcharts)
   - Running build validation (npm run build, link checking)
   - Deployment to GitHub Pages (gh-pages branch, GitHub Actions)

**Next Step**: Generate data-model.md and contracts after research.md is complete.

---

## Phase 2: Module-Level Planning (Detailed Breakdown)

**Status**: Not started (completed by /sp.tasks command, NOT by /sp.plan)
**Note**: Detailed task breakdown for each module will be generated by `/sp.tasks` command based on this plan and spec.md user stories.

---

## Next Steps

1. ✅ Complete Constitution Check (PASSED)
2. ⏳ Generate research.md with technology decisions (Phase 0)
3. ⏳ Generate data-model.md and contracts/ (Phase 1)
4. ⏳ Generate quickstart.md (Phase 1)
5. ⏳ Update agent context with new technologies
6. ⏳ Run `/sp.tasks` to generate detailed task breakdown for implementation

---

## Notes

- This is a **documentation project**, not a traditional software application. The "product" is educational content deployed as a static site.
- Code examples are **educational artifacts**, not production code. They must be simple, well-commented, and guaranteed to execute in learner environments.
- **Modular independence** is critical: each module must be testable/completable independently (given prerequisites) per Constitution Principle V and spec user story design.
- **Accessibility** (WCAG 2.1 AA) is non-negotiable per Constitution and FR requirements. All diagrams need alt text, proper heading hierarchy required, semantic HTML enforced by Docusaurus MDX.
