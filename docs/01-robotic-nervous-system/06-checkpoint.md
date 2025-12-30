---
title: "Module 01 Checkpoint"
description: "Validate your understanding of ROS 2 architecture, rclpy API, and URDF modeling with exercises and deliverable verification."
keywords: [checkpoint, validation, exercises, ros 2, quiz, assessment]
sidebar_position: 6
---

# Module 01 Checkpoint

## Learning Objectives Review

Before proceeding, ensure you can:

✅ **Explain** the differences between topics, services, and actions
✅ **Create** ROS 2 nodes with publishers and subscribers in Python
✅ **Build** URDF models with links, joints, and inertial properties
✅ **Visualize** robot models in RViz with joint control
✅ **Debug** ROS 2 communication using CLI tools (`ros2 topic`, `ros2 node`)

---

## Section 1: Multiple Choice (10 questions)

### Question 1

**Which ROS 2 communication pattern should you use for streaming camera images at 30 Hz?**

- A) Service (request-reply)
- B) Topic (publish-subscribe) ✅
- C) Action (goal-feedback-result)
- D) Parameter server

<details>
<summary>Explanation</summary>
**Answer: B) Topic (publish-subscribe)**

Topics are ideal for continuous, high-frequency data streams. Services would block the client for each frame, and actions are for long-running tasks with feedback.
</details>

---

### Question 2

**What does the following rclpy code do?**

```python
self.publisher = self.create_publisher(String, '/cmd_vel', 10)
```

- A) Creates a subscriber listening to `/cmd_vel`
- B) Creates a publisher that sends String messages to `/cmd_vel` ✅
- C) Creates a service server named `/cmd_vel`
- D) Creates an action client for `/cmd_vel`

<details>
<summary>Explanation</summary>
**Answer: B) Creates a publisher that sends String messages to `/cmd_vel`**

`create_publisher()` creates a publisher. The first argument is the message type (`String`), the second is the topic name (`/cmd_vel`), and the third is the queue size (10).
</details>

---

### Question 3

**In URDF, what is the purpose of the `<collision>` element?**

- A) Defines visual appearance for rendering
- B) Specifies mass and inertia properties
- C) Defines simplified geometry for physics simulation ✅
- D) Sets joint limits and effort

<details>
<summary>Explanation</summary>
**Answer: C) Defines simplified geometry for physics simulation**

Collision geometry is used by physics engines (Gazebo) to detect collisions. It should be simpler than visual geometry for performance.
</details>

---

### Question 4

**Which joint type allows unlimited continuous rotation?**

- A) Revolute (limited rotation)
- B) Continuous ✅
- C) Prismatic (linear motion)
- D) Fixed (no motion)

<details>
<summary>Explanation</summary>
**Answer: B) Continuous**

Continuous joints rotate without limits (e.g., wheels). Revolute joints have angular limits defined by `<limit lower="..." upper="..."/>`.
</details>

---

### Question 5

**What command checks if a ROS 2 topic is being published?**

- A) `ros2 topic list`
- B) `ros2 topic echo /topic_name`
- C) `ros2 topic hz /topic_name` ✅
- D) `ros2 node info /node_name`

<details>
<summary>Explanation</summary>
**Answer: C) `ros2 topic hz /topic_name`**

`ros2 topic hz` measures the publishing frequency (messages per second). `ros2 topic echo` displays message content, and `ros2 topic list` shows available topics.
</details>

---

### Question 6

**In rclpy, what does `rclpy.spin(node)` do?**

- A) Publishes a message once
- B) Keeps the node running and processing callbacks ✅
- C) Shuts down the ROS 2 context
- D) Validates node configuration

<details>
<summary>Explanation</summary>
**Answer: B) Keeps the node running and processing callbacks**

`spin()` enters a loop that processes callbacks (subscriptions, timers, services). Without it, the node would exit immediately after initialization.
</details>

---

### Question 7

**What does the `<origin xyz="0.1 0 -0.25" rpy="0 0 0"/>` element in a joint specify?**

- A) Joint rotation limits
- B) Joint position and orientation relative to parent link ✅
- C) Link mass and inertia
- D) Joint type and axis

<details>
<summary>Explanation</summary>
**Answer: B) Joint position and orientation relative to parent link**

`xyz` defines translation (x=0.1m, y=0, z=-0.25m), and `rpy` defines rotation (roll-pitch-yaw). This transforms the child link relative to the parent.
</details>

---

### Question 8

**Which QoS reliability policy guarantees message delivery but may be slower?**

- A) BEST_EFFORT (fast, may drop messages)
- B) RELIABLE ✅
- C) VOLATILE (no historical data)
- D) TRANSIENT_LOCAL (stores last message)

<details>
<summary>Explanation</summary>
**Answer: B) RELIABLE**

RELIABLE QoS ensures messages are delivered (retransmits if lost), suitable for commands and state updates. BEST_EFFORT prioritizes speed over reliability (used for sensor data).
</details>

---

### Question 9

**What tool validates URDF syntax before loading into RViz?**

- A) `ros2 run urdf_tutorial display.launch.py`
- B) `check_urdf my_robot.urdf` ✅
- C) `urdf_to_graphiz my_robot.urdf`
- D) `colcon build`

<details>
<summary>Explanation</summary>
**Answer: B) `check_urdf my_robot.urdf`**

`check_urdf` parses the URDF and reports syntax errors, missing links, or invalid joint configurations. Always run this before launching RViz.
</details>

---

### Question 10

**In ROS 2, what does a subscriber's callback function receive as a parameter?**

- A) The topic name (string)
- B) The received message object ✅
- C) The publisher node name
- D) The QoS profile

<details>
<summary>Explanation</summary>
**Answer: B) The received message object**

Callback functions for subscriptions must accept one parameter: the message object. Example:
```python
def listener_callback(self, msg):
    self.get_logger().info(f'Received: {msg.data}')
```
</details>

---

## Section 2: Short Answer (5 questions)

### Question 11

**Explain the difference between a revolute joint and a prismatic joint in URDF. Provide an example use case for each.**

<details>
<summary>Sample Answer</summary>
- **Revolute joint**: Rotational motion around an axis (1 DOF). Example: Robot elbow, knee, or hip joint.
- **Prismatic joint**: Linear translation along an axis (1 DOF). Example: Elevator mechanism, gripper fingers sliding open/closed.

Key difference: Revolute uses angular limits (radians), prismatic uses linear limits (meters).
</details>

---

### Question 12

**Why should collision geometry in URDF be simpler than visual geometry?**

<details>
<summary>Sample Answer</summary>
Physics engines (Gazebo) perform real-time collision detection. Complex meshes (1000+ triangles) slow down simulation. Best practice:
- **Visual**: High-detail STL/DAE meshes for realism
- **Collision**: Simplified shapes (boxes, cylinders, low-poly meshes less than 500 triangles)

Example: Use a cylinder for collision on a detailed robot leg mesh.
</details>

---

### Question 13

**You run `ros2 topic echo /hello_topic` but see no output. List 3 possible reasons and how to diagnose each.**

<details>
<summary>Sample Answer</summary>
1. **No publisher running**: Check with `ros2 topic list` (topic won't appear) or `ros2 topic info /hello_topic` (Publisher count: 0).
2. **Publisher not sourced**: Verify the publisher terminal sourced ROS 2 with `source /opt/ros/humble/setup.bash`.
3. **QoS mismatch**: Publisher uses BEST_EFFORT QoS, subscriber expects RELIABLE. Check with `ros2 topic info /hello_topic -v`.
</details>

---

### Question 14

**What is the purpose of the `inertial` element in a URDF link, and what happens if it's missing?**

<details>
<summary>Sample Answer</summary>
`<inertial>` defines:
- **Mass** (kg): Link weight
- **Inertia tensor** (kg·m²): Resistance to rotation

**If missing**:
- Gazebo simulation issues warnings
- Physics behaves incorrectly (links may fall through floors, spin unrealistically)
- Robot may not respond to forces/torques

Use CAD software or online calculators to compute inertia from geometry.
</details>

---

### Question 15

**Compare ROS 2 topics vs services. When would you choose one over the other?**

<details>
<summary>Sample Answer</summary>
| Feature | Topics | Services |
|---------|--------|----------|
| **Pattern** | Publish-subscribe (asynchronous) | Request-reply (synchronous) |
| **Use case** | Continuous data streams | One-time queries/commands |
| **Response** | No reply expected | Immediate reply |
| **Example** | Camera images, sensor data | Path planning, battery check |

**Choose topics** for high-frequency data where you don't need confirmation.
**Choose services** when you need a guaranteed response (e.g., "Is path clear?" → Yes/No).
</details>

---

## Section 3: Coding Challenge (3 tasks)

### Challenge 1: Create a Subscriber Node

**Task**: Modify the Hello Robot node to create a **subscriber** that listens to `/hello_topic` and logs received messages.

**Starter Code**:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class HelloSubscriberNode(Node):
    def __init__(self):
        super().__init__('hello_subscriber')
        # TODO: Create a subscription to '/hello_topic'
        # TODO: Set the callback to self.listener_callback

    def listener_callback(self, msg):
        # TODO: Log the received message
        pass


def main(args=None):
    rclpy.init(args=args)
    node = HelloSubscriberNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

**Expected Behavior**:
- Run the subscriber: `ros2 run hello_robot hello_subscriber_node`
- Run the publisher (from Page 04): `ros2 run hello_robot hello_robot_node`
- Subscriber terminal shows: `[INFO] [hello_subscriber]: Received: "Hello, Robot!"`

<details>
<summary>Solution</summary>

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class HelloSubscriberNode(Node):
    def __init__(self):
        super().__init__('hello_subscriber')
        self.subscription = self.create_subscription(
            String,
            'hello_topic',
            self.listener_callback,
            10
        )
        self.get_logger().info('Hello Subscriber Node started!')

    def listener_callback(self, msg):
        self.get_logger().info(f'Received: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)
    node = HelloSubscriberNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

**Update `setup.py`**:
```python
entry_points={
    'console_scripts': [
        'hello_robot_node = hello_robot.hello_robot_node:main',
        'hello_subscriber_node = hello_robot.hello_robot_node:main',  # Add this
    ],
},
```

**Build and test**:
```bash
colcon build --packages-select hello_robot
source install/setup.bash
ros2 run hello_robot hello_subscriber_node
```
</details>

---

### Challenge 2: Add a Timer to the Subscriber

**Task**: Modify the subscriber to count how many messages it has received and print a summary every 5 seconds.

**Expected Output**:
```
[INFO] [hello_subscriber]: Received: "Hello, Robot!" (Count: 1)
[INFO] [hello_subscriber]: Received: "Hello, Robot!" (Count: 2)
...
[INFO] [hello_subscriber]: Summary: Received 10 messages in the last 5 seconds
```

<details>
<summary>Hint</summary>
- Add a `self.counter` variable in `__init__`
- Create a timer: `self.create_timer(5.0, self.summary_callback)`
- Increment `self.counter` in `listener_callback`
- Print and reset counter in `summary_callback`
</details>

---

### Challenge 3: Extend the Bipedal URDF

**Task**: Add a left arm to the `simple_humanoid.urdf` with:
- `left_shoulder` link (cylinder, radius=0.05, length=0.3)
- `left_shoulder_joint` (revolute, Y-axis, limits -1.57 to 1.57)
- Parent: `torso`, origin: `xyz="0 0.15 0.2"`

**Validation**:
1. Run `check_urdf` (should pass)
2. Launch RViz (`ros2 launch simple_humanoid_description display.launch.py`)
3. Verify the left arm appears and the shoulder joint slider works

<details>
<summary>Solution Snippet</summary>

```xml
<!-- Add after torso definition -->
<link name="left_shoulder">
  <visual>
    <origin xyz="0 0.15 0" rpy="0 0 0"/>
    <geometry>
      <cylinder radius="0.05" length="0.3"/>
    </geometry>
    <material name="gray"/>
  </visual>
  <collision>
    <origin xyz="0 0.15 0" rpy="0 0 0"/>
    <geometry>
      <cylinder radius="0.05" length="0.3"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="1.5"/>
    <origin xyz="0 0.15 0" rpy="0 0 0"/>
    <inertia ixx="0.02" ixy="0.0" ixz="0.0"
             iyy="0.02" iyz="0.0" izz="0.005"/>
  </inertial>
</link>

<joint name="left_shoulder_joint" type="revolute">
  <parent link="torso"/>
  <child link="left_shoulder"/>
  <origin xyz="0 0.15 0.2" rpy="0 0 0"/>
  <axis xyz="0 1 0"/>
  <limit lower="-1.57" upper="1.57" effort="80" velocity="1.0"/>
</joint>
```

Rebuild: `colcon build --packages-select simple_humanoid_description`
</details>

---

## Section 4: Deliverable Verification

### Deliverable 1: Hello Robot Node

✅ **Checklist**:
- [ ] Node runs without errors
- [ ] Publishes "Hello, Robot!" messages to `/hello_topic` every second
- [ ] `ros2 topic echo /hello_topic` displays messages
- [ ] `ros2 topic hz /hello_topic` shows ~1 Hz frequency
- [ ] Logs appear in terminal with timestamps

**Verification Command**:
```bash
ros2 run hello_robot hello_robot_node
# In another terminal:
ros2 topic hz /hello_topic
```

---

### Deliverable 2: Bipedal URDF Model

✅ **Checklist**:
- [ ] URDF passes `check_urdf` validation
- [ ] Robot model loads in RViz with correct colors (blue torso, gray legs, white head)
- [ ] All 6 joints have sliders in Joint State Publisher GUI
- [ ] Joint movements are smooth (no jittering or collision warnings)
- [ ] Robot maintains stable pose at default joint positions (all joints at 0.0)

**Verification Command**:
```bash
ros2 launch simple_humanoid_description display.launch.py
```

---

## Completion Certificate

If you can successfully:
1. Answer **8+/10** multiple choice questions correctly
2. Provide reasonable answers to **4+/5** short answer questions
3. Complete **2+/3** coding challenges
4. Verify **both deliverables** pass all checklist items

**You have mastered Module 01: ROS 2 Foundation!** 🎉

---

## Next Module Preview

**Module 02: Digital Twin Simulation** covers:
- Spawning robots in Gazebo with realistic physics
- Configuring sensor plugins (LiDAR, depth camera, IMU)
- Unity rendering with ROS-TCP-Connector
- Accessing sensor streams on ROS 2 topics

---

## Feedback & Support

**Stuck on a challenge?**
- Review the relevant concept page (Pages 01-05)
- Check ROS 2 documentation: [https://docs.ros.org/en/humble/](https://docs.ros.org/en/humble/)
- Search ROS Answers: [https://answers.ros.org/](https://answers.ros.org/)

**Found an error in this module?**
- Report issues on GitHub: [Link to repository issues page]

---

**Congratulations on completing Module 01!** You now have the foundation to build complex robotic systems with ROS 2.
