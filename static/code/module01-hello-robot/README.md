# Module 01: Hello Robot Node

Complete ROS 2 Python package that publishes "Hello, Robot!" messages to a topic.

## Prerequisites

- ✅ ROS 2 Humble installed and sourced
- ✅ Python 3.10+
- ✅ Basic command-line proficiency

## Installation

### Step 1: Copy Package to Workspace

```bash
# Create workspace if needed
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# Copy this package
cp -r /path/to/module01-hello-robot ./hello_robot
```

### Step 2: Build the Package

```bash
cd ~/ros2_ws

# Build
colcon build --packages-select hello_robot

# Source the workspace
source install/setup.bash
```

**Expected Output**:
```
Starting >>> hello_robot
Finished <<< hello_robot [0.52s]

Summary: 1 package finished [0.75s]
```

## Usage

### Run the Publisher Node

```bash
source ~/ros2_ws/install/setup.bash
ros2 run hello_robot hello_robot_node
```

**Expected Output**:
```
[INFO] [hello_robot]: Hello Robot Node started!
[INFO] [hello_robot]: Published: "Hello, Robot!"
[INFO] [hello_robot]: Published: "Hello, Robot!"
[INFO] [hello_robot]: Published: "Hello, Robot!"
...
```

Press `Ctrl+C` to stop.

### Verify with ROS 2 CLI Tools

#### Terminal 2: Echo the Topic

```bash
source ~/ros2_ws/install/setup.bash
ros2 topic echo /hello_topic
```

**Expected Output**:
```
data: 'Hello, Robot!'
---
data: 'Hello, Robot!'
---
```

#### Check Topic Frequency

```bash
ros2 topic hz /hello_topic
```

**Expected Output**:
```
average rate: 1.000
    min: 1.000s max: 1.000s std dev: 0.00001s window: 10
```

## Package Structure

```
hello_robot/
├── hello_robot/
│   ├── __init__.py
│   └── hello_robot_node.py    # Main publisher node
├── resource/
│   └── hello_robot             # Package marker
├── package.xml                 # Package metadata
├── setup.cfg                   # Setup configuration
├── setup.py                    # Python package setup
└── README.md                   # This file
```

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'hello_robot'"

**Solution**: Source the workspace:
```bash
source ~/ros2_ws/install/setup.bash
```

### Issue: "No executable found"

**Solution**: Check `setup.py` has the correct entry point and rebuild:
```bash
colcon build --packages-select hello_robot --symlink-install
```

### Issue: Messages not appearing

**Solution**: Verify both terminals have sourced ROS 2 and your workspace:
```bash
source /opt/ros/humble/setup.bash
source ~/ros2_ws/install/setup.bash
```

## Learning Outcomes

After running this example, you should understand:
- ✅ How to create a ROS 2 Python package
- ✅ How to implement a publisher node with rclpy
- ✅ How to use timers for periodic publishing
- ✅ How to verify topic communication with ROS 2 CLI tools

## Next Steps

Try modifying the code:
1. Change the message content
2. Adjust the publishing frequency (timer period)
3. Add a subscriber node (see Module 01 Checkpoint exercises)

## Support

- Textbook page: [Module 01: Hello Robot Node](../../docs/01-robotic-nervous-system/04-hello-robot.md)
- ROS 2 documentation: https://docs.ros.org/en/humble/
- Report issues: https://github.com/asmamasood/book/issues
