# Code Examples

This directory contains downloadable code bundles for all hands-on exercises in the Physical AI & Humanoid Robotics textbook.

## Structure

Each module has its own subdirectory with complete, tested code examples:

```
code/
├── module01-hello-robot/      # ROS 2 publisher node example
├── module01-bipedal-urdf/     # 6-DOF bipedal URDF model
├── module02-gazebo-world/     # Gazebo simulation world files
├── module02-unity-project/    # Unity ROS integration project
├── module03-isaac-config/     # NVIDIA Isaac Sim configuration
├── module03-nav2-config/      # Nav2 navigation parameters
├── module04-vla-pipeline/     # Voice-Language-Action pipeline
└── README.md                  # This file
```

## Usage

### Download Individual Modules

Click the module directory you need and download all files, or clone the entire repository:

```bash
git clone https://github.com/asmamasood/book.git
cd book/static/code/
```

### Module 01: ROS 2 Foundation

**module01-hello-robot/**
- Complete ROS 2 Python package
- Includes publisher node, package.xml, setup.py
- Prerequisites: ROS 2 Humble, Python 3.10+

**module01-bipedal-urdf/**
- 6-DOF humanoid URDF model
- Includes simple_humanoid.urdf, launch files
- Prerequisites: ROS 2 Humble, urdf_tutorial package

### Module 02: Digital Twin Simulation

**module02-gazebo-world/**
- Gazebo world files with physics configuration
- Robot spawning launch files
- Prerequisites: Gazebo Classic or Gazebo Sim (Fortress)

**module02-unity-project/**
- Unity project with ROS-TCP-Connector
- URDF Importer pre-configured
- Prerequisites: Unity 2021.3 LTS, Unity Robotics Hub

### Module 03: AI-Powered Perception

**module03-isaac-config/**
- Docker Compose setup for Isaac Sim
- Synthetic data generation scripts
- Prerequisites: NVIDIA GPU (6GB VRAM), Docker with NVIDIA runtime

**module03-nav2-config/**
- Nav2 parameters optimized for bipedal robots
- Navigation launch files
- Prerequisites: ROS 2 Humble, Nav2 stack

### Module 04: Vision-Language-Action Capstone

**module04-vla-pipeline/**
- Complete VLA pipeline (Whisper → LLM → ROS 2 actions)
- Audio samples for testing
- Prerequisites: Python 3.10+, OpenAI API key (or local LLM), Whisper.cpp

## Testing Code Examples

Each module directory contains a `README.md` with:
- Installation instructions
- Build/setup steps
- Expected output
- Troubleshooting tips

**General workflow**:
1. Navigate to the module directory
2. Read the module-specific `README.md`
3. Follow setup instructions
4. Run the example code
5. Verify expected output matches documentation

## Reporting Issues

If you encounter issues with any code example:
1. Check the module's `README.md` troubleshooting section
2. Verify all prerequisites are installed
3. Review the textbook page for that hands-on exercise
4. Report bugs: [GitHub Issues](https://github.com/asmamasood/book/issues)

## License

All code examples are licensed under [MIT License](../../LICENSE) unless otherwise specified.

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on:
- Adding new code examples
- Improving existing examples
- Testing procedures
- Code quality standards
