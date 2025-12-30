---
title: "Hands-On: Hello Robot Node"
description: "Create your first ROS 2 publisher node that sends messages to a topic using Python and rclpy."
keywords: [ros 2, rclpy, publisher, hello robot, hands-on, python, node]
sidebar_position: 4
---

# Hands-On: Create a Hello Robot Node

## Objective

Build a **ROS 2 publisher node** that publishes "Hello, Robot!" messages to a topic every second. This demonstrates the core publish-subscribe pattern in ROS 2.

---

## Prerequisites

- ✅ Completed Pages 01-03 (ROS 2 architecture, Python bridging, URDF anatomy)
- ✅ ROS 2 Humble installed and sourced
- ✅ Basic Python knowledge

---

## Step 1: Create ROS 2 Workspace

```bash
# Create workspace directory
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# Create a Python package
ros2 pkg create --build-type ament_python hello_robot \
  --dependencies rclpy std_msgs

cd hello_robot
```

**Expected Output**:
```
going to create a new package
package name: hello_robot
destination directory: /home/user/ros2_ws/src
package format: 3
...
```

---

## Step 2: Write the Hello Robot Node

**File**: `~/ros2_ws/src/hello_robot/hello_robot/hello_robot_node.py`

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class HelloRobotNode(Node):
    """
    A simple ROS 2 publisher node that sends "Hello, Robot!" messages.

    This demonstrates:
    - Creating a ROS 2 node
    - Publishing messages to a topic
    - Using timers for periodic execution
    """

    def __init__(self):
        # Initialize the node with name 'hello_robot'
        super().__init__('hello_robot')

        # Create a publisher
        # - Message type: String (from std_msgs)
        # - Topic name: 'hello_topic'
        # - Queue size: 10 (buffer for messages)
        self.publisher = self.create_publisher(String, 'hello_topic', 10)

        # Create a timer that calls publish_message() every 1.0 seconds
        self.timer = self.create_timer(1.0, self.publish_message)

        # Log startup message
        self.get_logger().info('Hello Robot Node started!')

    def publish_message(self):
        """
        Callback function executed by the timer.
        Creates and publishes a "Hello, Robot!" message.
        """
        msg = String()
        msg.data = 'Hello, Robot!'

        # Publish the message
        self.publisher.publish(msg)

        # Log what was published
        self.get_logger().info(f'Published: "{msg.data}"')


def main(args=None):
    """
    Main entry point for the node.
    """
    # Initialize the ROS 2 Python client library
    rclpy.init(args=args)

    # Create the node
    node = HelloRobotNode()

    # Keep the node running (press Ctrl+C to stop)
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass

    # Clean shutdown
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## Step 3: Update setup.py

**File**: `~/ros2_ws/src/hello_robot/setup.py`

Add the entry point for your node:

```python
entry_points={
    'console_scripts': [
        'hello_robot_node = hello_robot.hello_robot_node:main',
    ],
},
```

Full `setup.py` should look like:

```python
from setuptools import setup

package_name = 'hello_robot'

setup(
    name=package_name,
    version='0.0.1',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='your_name',
    maintainer_email='your_email@example.com',
    description='A simple Hello Robot ROS 2 publisher node',
    license='Apache License 2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'hello_robot_node = hello_robot.hello_robot_node:main',
        ],
    },
)
```

---

## Step 4: Build the Package

```bash
cd ~/ros2_ws

# Build the package
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

---

## Step 5: Run the Hello Robot Node

### Terminal 1: Run the Publisher

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

:::tip Success!
If you see the log messages above, your publisher is working! Press `Ctrl+C` to stop.
:::

---

## Step 6: Verify with ros2 topic

### Terminal 2: Echo the Topic

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
data: 'Hello, Robot!'
---
```

You should see the messages being published in real-time!

---

## Step 7: Inspect with ros2 CLI Tools

### List Active Topics

```bash
ros2 topic list
```

**Expected**:
```
/hello_topic
/parameter_events
/rosout
```

### Get Topic Info

```bash
ros2 topic info /hello_topic
```

**Expected**:
```
Type: std_msgs/msg/String
Publisher count: 1
Subscription count: 0
```

### Check Topic Frequency

```bash
ros2 topic hz /hello_topic
```

**Expected**:
```
average rate: 1.000
    min: 1.000s max: 1.000s std dev: 0.00001s window: 10
```

---

## Understanding the Code

### Key Components

1. **Node Initialization**
   ```python
   super().__init__('hello_robot')
   ```
   Creates a node named `hello_robot` in the ROS 2 graph.

2. **Publisher Creation**
   ```python
   self.publisher = self.create_publisher(String, 'hello_topic', 10)
   ```
   - `String`: Message type from `std_msgs`
   - `'hello_topic'`: Topic name (must start with `/` in ROS 2)
   - `10`: Queue size (buffers up to 10 messages if subscriber is slow)

3. **Timer Setup**
   ```python
   self.timer = self.create_timer(1.0, self.publish_message)
   ```
   Calls `publish_message()` every 1.0 seconds automatically.

4. **Message Publishing**
   ```python
   msg = String()
   msg.data = 'Hello, Robot!'
   self.publisher.publish(msg)
   ```
   Creates a message, sets its content, and publishes it.

---

## Deliverable Checkpoint

✅ **Verify Your Hello Robot Node**:

1. Node runs without errors
2. Logs show "Published: Hello, Robot!" every second
3. `ros2 topic echo /hello_topic` displays messages
4. Topic frequency is ~1 Hz (`ros2 topic hz /hello_topic`)

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'hello_robot'"

**Solution**: Make sure you sourced the workspace:
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

---

## Challenge: Create a Subscriber

**Task**: Modify the code to create a **subscriber node** that listens to `/hello_topic` and logs received messages.

**Hint**: Use `self.create_subscription()` and implement a callback function.

---

## Downloadable Code

Complete working example available in:
`static/code/module01-hello-robot/`

---

## Next Steps

Now that you've built a ROS 2 publisher, let's create a **bipedal URDF model** to visualize a humanoid robot in RViz.

[Continue to Bipedal URDF →](05-bipedal-urdf.md)
