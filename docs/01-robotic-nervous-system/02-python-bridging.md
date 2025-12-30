---
title: "Python Bridging with rclpy"
description: "Master the rclpy Python API for creating ROS 2 nodes, publishers, subscribers, services, and action clients."
keywords: [rclpy, python, ros 2, api, node, publisher, subscriber, service, client]
sidebar_position: 2
---

# Python Bridging with rclpy

## Introduction

**rclpy** is the official Python client library for ROS 2. It provides a Pythonic interface to the ROS 2 middleware, allowing you to create nodes, publish/subscribe to topics, call services, and manage actions—all without writing C++.

---

## Why Python for ROS 2?

### Advantages

✅ **Rapid Prototyping**: Write and test robot behaviors quickly
✅ **Rich Ecosystem**: Access NumPy, OpenCV, TensorFlow, PyTorch for AI
✅ **Readable Code**: Clean syntax ideal for learning and collaboration
✅ **Dynamic Typing**: Faster development cycles

### Trade-offs

⚠️ **Performance**: ~10-20% slower than C++ for CPU-intensive tasks
⚠️ **Memory**: Higher memory footprint than compiled languages
⚠️ **Real-time**: Not suitable for hard real-time control loops (less than 1ms)

:::tip Use Case
Use Python for high-level logic (navigation, perception, AI) and C++ for low-level control (motor drivers, sensors with tight timing).
:::

---

## Core rclpy API

### 1. Node Class

The foundation of every ROS 2 Python program.

```python
import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__('my_node')  # Node name in ROS 2 graph
        self.get_logger().info('Node initialized!')

def main():
    rclpy.init()  # Initialize ROS 2 context
    node = MyNode()
    rclpy.spin(node)  # Keep node running
    node.destroy_node()
    rclpy.shutdown()
```

**Key Methods**:
- `get_logger()`: Returns logger for console output
- `create_timer(period, callback)`: Schedule periodic tasks
- `now()`: Get current ROS 2 time

---

### 2. Publishers

Send messages to topics.

```python
from std_msgs.msg import String

class PublisherNode(Node):
    def __init__(self):
        super().__init__('publisher_node')
        self.publisher = self.create_publisher(
            String,        # Message type
            'my_topic',    # Topic name
            10             # Queue size
        )
        self.timer = self.create_timer(1.0, self.publish_message)

    def publish_message(self):
        msg = String()
        msg.data = 'Hello from Python!'
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: {msg.data}')
```

**API**: `create_publisher(msg_type, topic, qos_profile)`

**Parameters**:
- `msg_type`: ROS 2 message class (e.g., `String`, `Image`, `LaserScan`)
- `topic`: Topic name (string)
- `qos_profile`: Quality of Service settings (default: 10 for queue size)

---

### 3. Subscribers

Receive messages from topics.

```python
class SubscriberNode(Node):
    def __init__(self):
        super().__init__('subscriber_node')
        self.subscription = self.create_subscription(
            String,
            'my_topic',
            self.listener_callback,
            10
        )

    def listener_callback(self, msg):
        self.get_logger().info(f'Received: {msg.data}')
```

**API**: `create_subscription(msg_type, topic, callback, qos_profile)`

**Callback Rules**:
- Must accept one parameter: the received message
- Runs in the main thread (keep it fast!)
- Avoid blocking operations (file I/O, sleep, network requests)

---

### 4. Service Servers

Provide request-reply services.

```python
from example_interfaces.srv import AddTwoInts

class ServiceNode(Node):
    def __init__(self):
        super().__init__('service_node')
        self.srv = self.create_service(
            AddTwoInts,
            'add_two_ints',
            self.add_callback
        )

    def add_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'{request.a} + {request.b} = {response.sum}')
        return response
```

**API**: `create_service(srv_type, service_name, callback)`

**Callback Rules**:
- Must accept two parameters: `request` and `response`
- Must return the `response` object
- Blocks client until response is ready

---

### 5. Service Clients

Call services from other nodes.

```python
class ClientNode(Node):
    def __init__(self):
        super().__init__('client_node')
        self.client = self.create_client(AddTwoInts, 'add_two_ints')

        # Wait for service to be available
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for service...')

    def send_request(self, a, b):
        request = AddTwoInts.Request()
        request.a = a
        request.b = b

        future = self.client.call_async(request)
        rclpy.spin_until_future_complete(self, future)

        if future.result() is not None:
            self.get_logger().info(f'Result: {future.result().sum}')
        else:
            self.get_logger().error('Service call failed')
```

**API**: `create_client(srv_type, service_name)`

**Async Pattern**:
- `call_async(request)`: Returns a `Future` object
- `spin_until_future_complete(node, future)`: Wait for response
- Check `future.result()` for service response

---

### 6. Action Clients

Send goals to action servers and monitor progress.

```python
from rclpy.action import ActionClient
from nav2_msgs.action import NavigateToPose

class ActionClientNode(Node):
    def __init__(self):
        super().__init__('action_client_node')
        self._action_client = ActionClient(
            self,
            NavigateToPose,
            'navigate_to_pose'
        )

    def send_goal(self, x, y):
        goal_msg = NavigateToPose.Goal()
        goal_msg.pose.pose.position.x = x
        goal_msg.pose.pose.position.y = y

        self._action_client.wait_for_server()

        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info(f'Distance remaining: {feedback.distance_remaining}')

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().error('Goal rejected')
            return

        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info(f'Navigation complete!')
```

**API**: `ActionClient(node, action_type, action_name)`

**Workflow**:
1. Create action client
2. Wait for action server: `wait_for_server()`
3. Send goal: `send_goal_async(goal, feedback_callback)`
4. Handle goal response: Check if accepted
5. Get result: `goal_handle.get_result_async()`

---

## QoS (Quality of Service) Profiles

Control message delivery reliability and performance.

```python
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy

# Reliable delivery (guaranteed, slower)
reliable_qos = QoSProfile(
    reliability=ReliabilityPolicy.RELIABLE,
    history=HistoryPolicy.KEEP_LAST,
    depth=10
)

# Best effort (fast, may drop messages)
sensor_qos = QoSProfile(
    reliability=ReliabilityPolicy.BEST_EFFORT,
    history=HistoryPolicy.KEEP_LAST,
    depth=5
)

self.publisher = self.create_publisher(
    LaserScan,
    'scan',
    sensor_qos  # Use best-effort for high-frequency sensors
)
```

**Common Profiles**:
- **Default QoS**: RELIABLE, KEEP_LAST (depth 10)
- **Sensor Data QoS**: BEST_EFFORT, KEEP_LAST (depth 5) - for high-frequency data
- **Services QoS**: RELIABLE, KEEP_ALL - guaranteed delivery

---

## Parameter Management

Configure nodes dynamically.

```python
class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')

        # Declare parameters with defaults
        self.declare_parameter('max_speed', 1.0)
        self.declare_parameter('robot_name', 'my_robot')

        # Read parameters
        max_speed = self.get_parameter('max_speed').value
        robot_name = self.get_parameter('robot_name').value

        self.get_logger().info(f'Max speed: {max_speed} m/s')
        self.get_logger().info(f'Robot name: {robot_name}')
```

**API**:
- `declare_parameter(name, default_value)`: Define parameter
- `get_parameter(name).value`: Read parameter value
- `set_parameters([Parameter('name', value)])`: Update parameter

**Command-line Override**:
```bash
ros2 run my_package my_node --ros-args -p max_speed:=2.0
```

---

## Lifecycle Nodes

Manage node states (configuring, active, inactive, shutdown).

```python
from rclpy.lifecycle import LifecycleNode, State

class MyLifecycleNode(LifecycleNode):
    def on_configure(self, state: State):
        self.get_logger().info('Configuring...')
        # Initialize resources
        return super().on_configure(state)

    def on_activate(self, state: State):
        self.get_logger().info('Activating...')
        # Start operations
        return super().on_activate(state)

    def on_deactivate(self, state: State):
        self.get_logger().info('Deactivating...')
        # Pause operations
        return super().on_deactivate(state)

    def on_cleanup(self, state: State):
        self.get_logger().info('Cleaning up...')
        # Release resources
        return super().on_cleanup(state)
```

**Use Cases**:
- Graceful startup/shutdown
- Reconfiguration without restarting
- Resource management (cameras, sensors, network connections)

---

## Common Patterns

### Pattern 1: Timer-based Publishing

```python
class TimerNode(Node):
    def __init__(self):
        super().__init__('timer_node')
        self.publisher = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)  # 2 Hz
        self.counter = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Message {self.counter}'
        self.publisher.publish(msg)
        self.counter += 1
```

### Pattern 2: Multi-threaded Executors

Handle multiple callbacks concurrently.

```python
from rclpy.executors import MultiThreadedExecutor

def main():
    rclpy.init()
    node = MyNode()
    executor = MultiThreadedExecutor(num_threads=4)
    executor.add_node(node)

    try:
        executor.spin()
    finally:
        executor.shutdown()
        node.destroy_node()
        rclpy.shutdown()
```

### Pattern 3: Context Managers

Clean resource management.

```python
import rclpy
from rclpy.node import Node

def main():
    rclpy.init()
    node = MyNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()
```

---

## Debugging Tips

### 1. Check Node is Running

```bash
ros2 node list
ros2 node info /my_node
```

### 2. Inspect Topics

```bash
ros2 topic list
ros2 topic echo /my_topic
ros2 topic hz /my_topic  # Check publishing frequency
```

### 3. Test Services

```bash
ros2 service list
ros2 service call /add_two_ints example_interfaces/srv/AddTwoInts "{a: 2, b: 3}"
```

### 4. Logging Levels

```python
self.get_logger().debug('Detailed info')
self.get_logger().info('Standard info')
self.get_logger().warn('Warning message')
self.get_logger().error('Error occurred')
self.get_logger().fatal('Critical failure')
```

Set log level:
```bash
ros2 run my_package my_node --ros-args --log-level DEBUG
```

---

## Key Takeaways

✅ **rclpy** provides Pythonic access to all ROS 2 features
✅ **Node class** is the base for all ROS 2 Python programs
✅ **Publishers/Subscribers** handle asynchronous topic communication
✅ **Services** provide synchronous request-reply
✅ **Actions** enable long-running tasks with feedback
✅ **QoS profiles** control message delivery guarantees
✅ **Parameters** enable runtime configuration

---

## Next Steps

Now that you understand the rclpy API, let's learn how to model robots using **URDF (Unified Robot Description Format)**.

[Continue to URDF Anatomy →](03-urdf-anatomy.md)
