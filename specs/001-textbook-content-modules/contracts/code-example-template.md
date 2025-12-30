# Code Example Template

**Purpose**: Standard format for all code examples across modules, enforcing spec FR-005, FR-006, FR-007 (executable code with setup, run instructions, expected output).

**Version**: 1.0.0
**Date**: 2025-12-26

---

## Template Structure

### 1. Example Header

**Pattern**:
```markdown
### Code Example: [Brief Descriptive Title]
```

**Guidelines**:
- Title should clearly state what the code demonstrates (e.g., "Hello Robot Node", "URDF Bipedal Model", "Whisper Voice Transcription")
- Use imperative or descriptive phrasing (e.g., "Create a Publisher Node" or "Subscriber Node Implementation")

---

### 2. Setup Instructions (REQUIRED)

**Pattern**:
```markdown
**Setup Instructions**:

1. [First prerequisite or installation step]
2. [Second step (e.g., create workspace, install dependencies)]
3. [Third step (e.g., configure environment variables)]
...

**Environment**: [Specify runtime environment, e.g., "ROS 2 Humble on Ubuntu 22.04", "Python 3.10+"]
```

**Guidelines**:
- List all prerequisites (package installations, environment setup, file creation)
- Use numbered steps for sequential operations
- Include exact commands learners should run
- Specify runtime environment (ROS 2 version, Ubuntu version, Python version, etc.)

**Example**:
```markdown
**Setup Instructions**:

1. Source ROS 2 environment: `source /opt/ros/humble/setup.bash`
2. Create workspace: `mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src`
3. Create package: `ros2 pkg create --build-type ament_python hello_robot`
4. Navigate to package: `cd hello_robot/hello_robot`

**Environment**: ROS 2 Humble on Ubuntu 22.04, Python 3.10+
```

---

### 3. Code Block (REQUIRED)

**Pattern**:
````markdown
**Code** ([File path or description]):

```[language]
[code content]
```
````

**Guidelines**:
- Specify language in code fence (python, cpp, yaml, xml, bash)
- Include file path where code should be saved (e.g., `~/ros2_ws/src/hello_robot/hello_robot/hello_robot_node.py`)
- Use clear, well-commented code with inline explanations for complex sections
- Keep code concise (prefer 20-50 lines; split longer examples into multiple code blocks)

**Example**:
````markdown
**Code** (`~/ros2_ws/src/hello_robot/hello_robot/hello_robot_node.py`):

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloRobotNode(Node):
    """Simple publisher node demonstrating ROS 2 basics."""

    def __init__(self):
        super().__init__('hello_robot')
        # Create publisher: topic='hello_topic', message type=String, queue size=10
        self.publisher = self.create_publisher(String, 'hello_topic', 10)
        # Create timer: trigger publish_message() every 1.0 second
        self.timer = self.create_timer(1.0, self.publish_message)
        self.get_logger().info('Hello Robot Node started!')

    def publish_message(self):
        """Publish a greeting message to hello_topic."""
        msg = String()
        msg.data = 'Hello, Robot!'
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: {msg.data}')

def main():
    rclpy.init()
    node = HelloRobotNode()
    rclpy.spin(node)  # Keep node running until Ctrl+C
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
````

---

### 4. Run Command (REQUIRED)

**Pattern**:
```markdown
**Run Command**:

```bash
[exact command to execute code]
```

Or for multi-step execution:

```bash
# Step 1: [description]
[command 1]

# Step 2: [description]
[command 2]
```
```

**Guidelines**:
- Provide exact, copy-pasteable commands
- Include build steps if necessary (e.g., `colcon build` for ROS 2 packages)
- Specify working directory if not obvious (e.g., `cd ~/ros2_ws`)
- Use inline comments for multi-step commands

**Example**:
```markdown
**Run Command**:

```bash
# Build the package
cd ~/ros2_ws
colcon build --packages-select hello_robot

# Source the workspace
source install/setup.bash

# Run the node
ros2 run hello_robot hello_robot_node
```
```

---

### 5. Expected Output (REQUIRED)

**Pattern**:
```markdown
**Expected Output**:

```
[exact output learners should see]
```

**Validation**: [How to verify code works correctly, if not obvious from output]
```

**Guidelines**:
- Show exact console output including info/warning logs
- Use `...` to indicate repeated or truncated output
- Add validation instructions if output alone isn't sufficient to confirm success
- Include troubleshooting hints for common errors (optional, in separate section)

**Example**:
```markdown
**Expected Output**:

```
[INFO] [1735203456.123456789] [hello_robot]: Hello Robot Node started!
[INFO] [1735203457.123456789] [hello_robot]: Published: Hello, Robot!
[INFO] [1735203458.123456789] [hello_robot]: Published: Hello, Robot!
[INFO] [1735203459.123456789] [hello_robot]: Published: Hello, Robot!
...
```

**Validation**: In a separate terminal, run `ros2 topic echo /hello_topic` to verify messages are being published:

```
data: 'Hello, Robot!'
---
data: 'Hello, Robot!'
---
```

Press `Ctrl+C` to stop the node.
```

---

### 6. Downloadable Code Bundle (OPTIONAL)

**Pattern**:
```markdown
**Download Complete Example**: [Link to static/code/moduleXX-example-name/]

This example is available as a complete package in `static/code/module01-hello-robot/` with:
- Full package structure (package.xml, setup.py)
- Launch files (if applicable)
- README with detailed instructions
```

**Guidelines**:
- Provide for complex examples requiring multiple files
- Link to `static/code/` directory with complete package structure
- Include README in bundle with setup and run instructions

---

## Complete Template (Copy-Paste Ready)

````markdown
### Code Example: [Title]

**Setup Instructions**:

1. [Step 1]
2. [Step 2]
3. [Step 3]

**Environment**: [Runtime environment specification]

**Code** ([File path]):

```[language]
[code content]
```

**Run Command**:

```bash
[command]
```

**Expected Output**:

```
[output]
```

**Validation**: [How to verify success]
````

---

## Validation Checklist

Before publishing a code example, verify:

- [ ] Setup instructions are complete and sequential
- [ ] Runtime environment is specified (ROS 2 version, Ubuntu version, Python version)
- [ ] Code includes language tag in fence (python, cpp, yaml, xml, bash)
- [ ] File path is provided (where to save code)
- [ ] Code is commented for educational clarity
- [ ] Run command is exact and copy-pasteable
- [ ] Expected output is shown with actual console output format
- [ ] Code has been tested and executes without errors (FR-007 compliance)
- [ ] Validation method is provided if output alone is insufficient

---

## Examples by Language

### Python (ROS 2 Node)
See "Complete Template" section above.

### C++ (ROS 2 Node)
````markdown
### Code Example: C++ Publisher Node

**Setup Instructions**:

1. Create C++ package: `ros2 pkg create --build-type ament_cmake hello_robot_cpp --dependencies rclcpp std_msgs`
2. Navigate to source: `cd hello_robot_cpp/src`

**Environment**: ROS 2 Humble on Ubuntu 22.04, GCC 11.3+

**Code** (`hello_robot_cpp/src/hello_robot_node.cpp`):

```cpp
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

class HelloRobotNode : public rclcpp::Node {
public:
    HelloRobotNode() : Node("hello_robot_cpp") {
        publisher_ = this->create_publisher<std_msgs::msg::String>("hello_topic", 10);
        timer_ = this->create_wall_timer(
            std::chrono::seconds(1),
            std::bind(&HelloRobotNode::publish_message, this));
        RCLCPP_INFO(this->get_logger(), "Hello Robot C++ Node started!");
    }

private:
    void publish_message() {
        auto msg = std_msgs::msg::String();
        msg.data = "Hello from C++!";
        publisher_->publish(msg);
        RCLCPP_INFO(this->get_logger(), "Published: %s", msg.data.c_str());
    }

    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
    rclcpp::TimerBase::SharedPtr timer_;
};

int main(int argc, char** argv) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<HelloRobotNode>());
    rclcpp::shutdown();
    return 0;
}
```

**Run Command**:

```bash
cd ~/ros2_ws
colcon build --packages-select hello_robot_cpp
source install/setup.bash
ros2 run hello_robot_cpp hello_robot_node
```

**Expected Output**:

```
[INFO] [hello_robot_cpp]: Hello Robot C++ Node started!
[INFO] [hello_robot_cpp]: Published: Hello from C++!
...
```
````

### YAML (Configuration File)
````markdown
### Code Example: Nav2 Parameters for Bipedal Robot

**Setup Instructions**:

1. Create config directory: `mkdir -p ~/ros2_ws/src/my_robot/config`
2. Save parameters file as shown below

**Environment**: ROS 2 Humble, Nav2 stack installed

**Code** (`~/ros2_ws/src/my_robot/config/nav2_params_bipedal.yaml`):

```yaml
controller_server:
  ros__parameters:
    controller_frequency: 10.0
    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      max_vel_x: 0.3  # Slower for bipedal stability
      max_vel_theta: 0.5
      min_vel_x: -0.1
      acc_lim_x: 0.2
      acc_lim_theta: 0.5
      # Bipedal-specific: wider inflation radius for balance
      inflation_radius: 0.5
```

**Run Command**:

```bash
ros2 launch my_robot nav2_launch.py params_file:=config/nav2_params_bipedal.yaml
```

**Expected Output**:

```
[controller_server]: Setting parameter controller_frequency to 10.0
[controller_server]: Loaded plugin FollowPath of type dwb_core::DWBLocalPlanner
```
````

---

## Troubleshooting Common Issues

If code examples fail during testing:

1. **Import Errors**: Verify all packages installed (`ros2 pkg list | grep <package>`)
2. **Build Failures**: Check `colcon build --event-handlers console_direct+` for detailed errors
3. **Runtime Errors**: Ensure ROS 2 environment sourced (`echo $ROS_DISTRO` should show "humble")
4. **Permission Errors**: Verify file permissions (`chmod +x <script>` if needed)

Include troubleshooting section in page if specific error is common for that example.
