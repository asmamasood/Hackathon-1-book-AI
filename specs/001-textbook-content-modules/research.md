# Research: Technology Decisions & Best Practices

**Feature**: Textbook Content Modules
**Date**: 2025-12-26
**Phase**: 0 (Research & Technology Selection)

## Purpose

Resolve technical unknowns from Phase 0 planning and establish best practices for implementing a 4-module Physical AI & Humanoid Robotics textbook as a Docusaurus-based educational platform.

---

## 1. Docusaurus Version & Plugin Selection

### Decision

**Docusaurus 3.x (latest stable: 3.1.0+)** with the following plugins:

- `@docusaurus/theme-mermaid` (built-in Mermaid diagram support)
- `@docusaurus/plugin-ideal-image` (optimized image loading)
- `docusaurus-lunr-search` or `@docusaurus/preset-classic` search (built-in)
- `rehype-accessible-emojis` (WCAG 2.1 AA emoji accessibility)

### Rationale

- **Docusaurus 3.x**: Latest version with MDX 2.0 support, improved performance, and built-in dark mode (AI-Native Pedagogy requirement for flexible learning environments)
- **Mermaid Plugin**: Native integration for diagrams without external tools (required for 20+ diagrams per plan)
- **WCAG 2.1 AA Support**: Built-in semantic HTML, keyboard navigation, and screen reader support meet Constitution Principle VII (Zero-Error Deployment includes accessibility)
- **AI-Native Pedagogy**: Structured YAML frontmatter + Markdown enables Claude Code/Agents to parse and navigate content efficiently

### Alternatives Considered

- **MkDocs**: Python-based, but Constitution mandates Docusaurus per Tech Stack requirements
- **Jekyll**: GitHub Pages default, but lacks modern MDX support and Mermaid integration
- **Hugo**: Fast build times, but Constitution specifies Docusaurus for hackathon compliance

### Implementation Notes

- Configure `docusaurus.config.js` with Mermaid theme, search plugin, and GitHub Pages deployment
- Enable MDX for interactive code blocks with live syntax highlighting
- Set up `.nojekyll` file in `static/` to prevent GitHub Pages Jekyll processing

---

## 2. ROS 2 Version & Compatibility

### Decision

**ROS 2 Humble Hawksbill (LTS release)** for Ubuntu 22.04 LTS

### Rationale

- **Long-Term Support**: Humble LTS supported until May 2027, ensuring curriculum remains valid for 2+ years
- **Ubuntu 22.04 Compatibility**: Matches assumption in spec.md (learners use Ubuntu 22.04 native/VM/WSL2)
- **Gazebo Harmonic Support**: Humble officially supports both Gazebo Classic (11.x) and Gazebo Harmonic (new architecture)
- **Isaac ROS Compatibility**: NVIDIA Isaac ROS officially supports ROS 2 Humble (confirmed in Isaac ROS 2.0+ releases)
- **Nav2 Maturity**: Nav2 Humble release includes bipedal locomotion plugins and improved path planning

### Alternatives Considered

- **ROS 2 Iron/Jazzy**: Newer releases but shorter support cycles; Humble LTS preferred for educational stability
- **ROS 2 Foxy**: EOL (End of Life) in May 2023; not recommended for new curriculum

### Implementation Notes

- All code examples must specify `ROS_DISTRO=humble` in setup instructions
- Document installation via `sudo apt install ros-humble-desktop` (Debian packages for ease of use)
- Module 01 includes ROS 2 environment setup guide (source `/opt/ros/humble/setup.bash`)

---

## 3. Gazebo vs Isaac Sim Trade-offs

### Decision

**Use both, strategically allocated by module**:

- **Module 02 (Digital Twin)**: Gazebo Classic/Harmonic for lightweight physics simulation and sensor plugins
- **Module 03 (AI-Robot Brain)**: NVIDIA Isaac Sim for synthetic data generation, photorealistic rendering, and Isaac ROS integration

### Rationale

**Gazebo Strengths**:
- Lightweight: Runs on 8GB RAM, no GPU required (accessible to all learners per spec assumptions)
- ROS 2 Native Integration: Gazebo Harmonic has built-in ros_gz bridge for seamless ROS 2 topic communication
- Sensor Plugins: Mature LiDAR, depth camera, IMU plugins readily available
- Educational Accessibility: Lower barrier to entry for Module 02 foundational simulation

**Isaac Sim Strengths**:
- Synthetic Data Generation: Automated domain randomization for training perception models (critical for Module 03)
- Photorealism: RTX-accelerated rendering for Unity-quality visuals within a single simulation environment
- Isaac ROS Integration: Native support for Isaac ROS GEMs (Visual SLAM, DNN inference, image processing)
- Future-Ready Skills: Industry-standard tool used by NVIDIA robotics teams (Constitution Principle IV)

### Alternatives Considered

- **Isaac Sim Only**: Excludes learners without NVIDIA GPUs (violates spec assumption of 8GB RAM minimum)
- **Gazebo Only**: Lacks photorealistic rendering and synthetic data generation capabilities needed for Module 03 AI perception

### Implementation Notes

- Module 02 pages emphasize Gazebo's accessibility and provide cloud GPU workarounds (Google Colab, AWS EC2) for optional Unity rendering
- Module 03 explicitly states Isaac Sim requirements (16GB RAM, NVIDIA GPU 6GB VRAM) with Docker container fallback for CPU-only simulation
- Checkpoint exercises for Module 03 include "verified in Isaac Sim" and "verified in Gazebo (simplified)" variants

---

## 4. Unity Integration Pattern

### Decision

**Unity Robotics Hub with ROS-TCP-Connector** for Module 02 Unity rendering section

### Rationale

- **Official NVIDIA/Unity Solution**: Unity Robotics Hub is the official Unity-ROS 2 integration maintained by Unity Technologies
- **Bidirectional Communication**: ROS-TCP-Connector enables Unity (C#) ↔ ROS 2 (Python/C++) topic/service communication
- **Asset Pipeline**: Unity's URDF Importer package converts ROS URDF models to Unity Prefabs for rendering
- **Cross-Platform**: Works on Windows, macOS, Linux (accommodates diverse learner environments per spec edge cases)

### Alternatives Considered

- **ros2-web-bridge**: Web-based but lacks real-time 3D rendering capabilities
- **Ignition Gazebo Rendering**: Good rendering but requires Gazebo ecosystem; Unity preferred for photorealism and asset library access

### Implementation Notes

- Module 02 page `02-unity-rendering.md` includes Unity 2022 LTS installation guide
- Provide pre-configured Unity project template in `static/code/module02-unity-project/` with ROS-TCP-Connector installed
- Document Unity Package Manager setup for Unity Robotics Hub (com.unity.robotics.ros-tcp-connector)

---

## 5. URDF Best Practices for Bipedal Humanoids

### Decision

**Simplified 6-DOF Bipedal Model** for educational purposes with the following structure:

```
Base Link (torso)
├── Left Hip Joint → Left Upper Leg → Left Knee Joint → Left Lower Leg
├── Right Hip Joint → Right Upper Leg → Right Knee Joint → Right Lower Leg
└── Neck Joint → Head
```

### Rationale

- **Educational Simplicity**: 6 DOF (2 hips, 2 knees, 1 neck, 1 head) sufficient to demonstrate URDF concepts without overwhelming learners
- **Visualization Focus**: Model designed for RViz visualization and Gazebo spawning, not production-grade locomotion
- **Hands-On Time**: Spec SC-003 requires 90% learners complete Module 01 deliverable (Hello Robot + URDF) in <3 hours; complex models increase time-to-completion
- **Extensibility**: 6-DOF base model can be extended in checkpoint exercises (add arms, fingers) for advanced learners

### Alternatives Considered

- **Full Humanoid (20+ DOF)**: Too complex for introductory URDF lesson; reserved for advanced topics or Module 03/04 capstone enhancements
- **2-DOF Rover**: Not humanoid; violates "Anatomy of a Humanoid" learning objective

### Implementation Notes

- Provide complete URDF file in `static/code/module01-bipedal-urdf/simple_humanoid.urdf` with inline XML comments explaining each tag
- Include meshes (STL files) for visual geometry in `static/code/module01-bipedal-urdf/meshes/`
- Module 01 page `05-bipedal-urdf.md` includes step-by-step URDF construction with visualization checkpoints in RViz

---

## 6. Isaac ROS Visual SLAM Setup

### Decision

**Minimal Hardware Requirements**:
- NVIDIA GPU: GTX 1660 or better (6GB VRAM minimum)
- RAM: 16GB system memory
- Ubuntu 22.04 LTS with Docker support

**Configuration**: Use Isaac ROS Docker containers (pre-built by NVIDIA) to avoid native installation complexity

### Rationale

- **Docker Containers**: NVIDIA provides pre-configured Isaac ROS Docker images with CUDA, cuDNN, TensorRT, and Isaac ROS packages installed
- **Avoid Dependency Hell**: Native Isaac ROS installation requires 20+ system dependencies; Docker eliminates configuration errors
- **Consistent Environment**: All learners use identical Isaac ROS version (2.0+) regardless of local system variations
- **GPU Passthrough**: Docker supports NVIDIA Container Toolkit for GPU access inside containers

### Alternatives Considered

- **Native Installation**: Higher failure rate for learners due to CUDA/cuDNN version mismatches
- **Cloud-Only (AWS/GCP)**: Cost prohibitive for educational use (spec assumption: local development environment)

### Implementation Notes

- Module 03 page `01-isaac-sim-intro.md` includes Docker + NVIDIA Container Toolkit installation guide
- Provide `docker-compose.yml` in `static/code/module03-isaac-config/` for one-command Isaac ROS container launch
- Checkpoint exercise verifies GPU access inside container with `nvidia-smi` command

---

## 7. Nav2 Bipedal Configuration

### Decision

**Modified Nav2 Configuration** with the following adaptations:

- **Costmap**: Inflate obstacles by 0.5m (wider safety margin for bipedal balance)
- **Planner**: Use Theta* planner (smoother paths for center-of-mass constraints)
- **Controller**: DWB (Dynamic Window Approach) controller with custom velocity limits (slower max speed for bipedal stability)
- **Recovery Behaviors**: Disable aggressive rotation recovery (can tip bipedal robots)

### Rationale

- **Bipedal Locomotion Constraints**: Unlike differential drive robots, bipedal robots require smooth paths and cannot rotate in place
- **Center-of-Mass Balance**: Theta* planner generates smoother curves that respect balance constraints better than grid-based A*
- **Educational Safety**: Conservative velocity limits (0.3 m/s max linear, 0.5 rad/s max angular) prevent simulation instability
- **Nav2 Compatibility**: All modifications use standard Nav2 parameters (no custom plugins required)

### Alternatives Considered

- **MoveIt 2**: More advanced motion planning but requires IK solvers and complex joint trajectory generation (out of scope for Module 03)
- **Custom Bipedal Controller**: Overkill for educational content; simpler to constrain existing Nav2 controller

### Implementation Notes

- Module 03 page `03-nav2-planning.md` provides complete `nav2_params.yaml` configuration file
- Include explanation of each parameter modification with rationale (e.g., why `inflation_radius: 0.5` for bipedal robots)
- Checkpoint exercise: Learners compare default Nav2 params vs bipedal-adapted params and observe path smoothness differences

---

## 8. OpenAI Whisper Deployment

### Decision

**Local Whisper Model (Whisper.cpp)** for Module 04 voice pipeline

### Rationale

- **Cost**: Local model eliminates OpenAI API costs (important for educational use with 100+ learners)
- **Privacy**: Voice data stays on learner machines (no cloud transmission)
- **Latency**: Local inference faster than API round-trip for short commands ("navigate to kitchen")
- **Whisper.cpp Performance**: C++ implementation runs on CPU with acceptable latency (~1-2s for 5s audio clip)
- **Model Size**: Whisper "base" model (74MB) balances accuracy and resource usage

### Alternatives Considered

- **OpenAI Whisper API**: Requires API key management, costs $0.006/minute (adds up for 50+ learners), introduces external dependency
- **Google Speech-to-Text**: Similar cost and external dependency issues
- **Mozilla DeepSpeech**: Discontinued project; Whisper has better accuracy

### Implementation Notes

- Module 04 page `04-whisper-setup.md` includes Whisper.cpp installation guide (compile from source or use pre-built binaries)
- Provide sample audio files in `static/code/module04-vla-pipeline/audio-samples/` for testing without microphone
- Document Python binding (`pip install whisper-cpp-python`) for easy integration with ROS 2 nodes

---

## 9. LLM Integration Pattern

### Decision

**LangChain with OpenAI Function Calling** for voice → LLM → ROS 2 action sequence generation

### Rationale

- **LangChain Orchestration**: Simplifies prompt chaining, memory management, and output parsing for educational code examples
- **Function Calling**: OpenAI/Anthropic function calling API maps natural language to structured ROS 2 action calls without regex parsing
- **Prompt Engineering**: LangChain provides prompt templates for "system message" + "user command" → ROS 2 action JSON format
- **Educational Clarity**: Function definitions (navigate, pick, place) clearly demonstrate LLM-to-robot API contract

### Alternatives Considered

- **Raw LLM API**: Requires manual prompt engineering and output parsing; harder for learners to understand
- **Semantic Kernel**: Microsoft's framework but less Python ecosystem support than LangChain
- **AutoGPT/LangGraph**: Overkill for simple command → action mapping (adds autonomous agent complexity)

### Implementation Notes

- Module 04 page `02-llm-reasoning.md` explains LangChain prompt template structure with concrete examples
- Provide `llm_action_planner.py` in `static/code/module04-vla-pipeline/` with function definitions for `navigate(location)`, `pick(object)`, `place(location)`
- Checkpoint exercise: Learners add new function definition (`open_door(room)`) and test with LLM

---

## 10. Code Example Testing Strategy

### Decision

**Hybrid Testing Approach**:

1. **Linting & Syntax Validation** (CI): Black formatter, Pylint, mypy for Python code examples
2. **Unit Tests** (CI): Test code structure, imports, function signatures without hardware
3. **Manual Verification** (Pre-Publish): Author executes each code example in target environment (Ubuntu 22.04 + ROS 2 Humble) and captures output
4. **Docker Integration Tests** (Optional CI): Subset of critical examples (Hello Robot node, URDF load, Whisper transcription) run in Docker containers with mocked hardware

### Rationale

- **CI Limitations**: Cannot run full Isaac Sim or Gazebo with GPU in GitHub Actions free tier
- **Manual Verification**: Guarantees examples work per FR-007 (all code examples tested and guaranteed to execute)
- **Linting Catches Common Errors**: Syntax errors, import issues, type mismatches caught automatically
- **Docker for Critical Paths**: Validates environment setup instructions (ROS 2 installation, package dependencies)

### Alternatives Considered

- **Full Integration Tests**: Requires expensive GPU runners ($1-2/hour); not sustainable for 50+ examples
- **No Testing**: Violates FR-007 and Constitution Principle III (Practical Rigor requires tested code)

### Implementation Notes

- Add `.github/workflows/code-examples-lint.yml` for automated linting
- Document manual verification process in `specs/001-textbook-content-modules/quickstart.md` (author responsibilities)
- Provide `scripts/test-code-examples.sh` that runs unit tests for all Python files in `static/code/`

---

## Summary of Decisions

| Research Question | Decision | Rationale |
|-------------------|----------|-----------|
| Docusaurus Version | 3.x with Mermaid plugin | MDX 2.0, accessibility, AI-native structure |
| ROS 2 Version | Humble LTS | Ubuntu 22.04 compatibility, long-term support |
| Simulation Strategy | Gazebo (Module 02) + Isaac Sim (Module 03) | Balance accessibility (Gazebo) with advanced AI features (Isaac Sim) |
| Unity Integration | Unity Robotics Hub + ROS-TCP-Connector | Official solution, cross-platform, asset pipeline |
| URDF Complexity | 6-DOF simplified bipedal model | Educational focus, 3-hour completion target |
| Isaac ROS Setup | Docker containers with GPU passthrough | Avoid dependency conflicts, consistent environment |
| Nav2 Configuration | Modified params for bipedal constraints | Smooth paths, balance-aware planning |
| Whisper Deployment | Local Whisper.cpp model | No API costs, privacy, low latency |
| LLM Integration | LangChain + Function Calling | Orchestration, structured output, educational clarity |
| Code Testing | Hybrid: Linting (CI) + Manual verification + Docker (critical paths) | Balance automation with resource constraints |

---

## Next Steps

All research questions resolved. Proceed to **Phase 1**:
1. Generate `data-model.md` (content entities)
2. Create `contracts/` directory with schemas and templates
3. Generate `quickstart.md` (author guide)
4. Update agent context with technology decisions
