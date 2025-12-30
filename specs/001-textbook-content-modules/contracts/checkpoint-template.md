# Checkpoint Exercise Template

**Purpose**: Standard format for module validation exercises, enforcing spec FR-010 (each module concludes with checkpoint validating learning objectives).

**Version**: 1.0.0
**Date**: 2025-12-26

---

## Template Structure

### 1. Checkpoint Header

**Pattern**:
```markdown
---
title: "Module [XX] Checkpoint"
description: "Validation exercises confirming mastery of [Module Topic] learning objectives."
keywords: ["checkpoint", "validation", "quiz", "[module keywords]"]
sidebar_position: [last position in module]
---

# Module [XX] Checkpoint

**Purpose**: Validate that you've achieved the learning objectives for this module.

**Time Required**: 15-30 minutes

**Pass Criteria**: [Define minimum success criteria, e.g., "Complete 4/5 questions correctly OR successfully implement the coding challenge"]
```

**Guidelines**:
- Use highest sidebar_position number in module (e.g., if module has 6 pages, checkpoint is position 6 or 7)
- Pass criteria should be achievable but ensure competency (e.g., 80% correct for quizzes)
- Time estimate helps learners plan their session

---

### 2. Learning Objectives Review

**Pattern**:
```markdown
## Learning Objectives Review

By completing this module, you should be able to:

- [Learning objective 1 from module index.md]
- [Learning objective 2 from module index.md]
- [Learning objective 3 from module index.md]
...

The exercises below validate these objectives.
```

**Guidelines**:
- Copy exact learning objectives from module index.md
- Use bullet points, imperative phrasing (e.g., "Create ROS 2 nodes...", "Explain the difference between...")
- Helps learners self-assess before attempting checkpoint

---

### 3. Exercise Sections

Checkpoints can include mix of:
- **Multiple Choice Questions** (knowledge validation)
- **Short Answer Questions** (concept explanation)
- **Coding Challenges** (hands-on validation)
- **Deliverable Review** (verify module deliverable works)

---

### 4. Multiple Choice Questions

**Pattern**:
```markdown
## Exercise [N]: [Question Type] - [Topic]

### Question [N.X]: [Question text]

**A)** [Option A text]
**B)** [Option B text]
**C)** [Option C text]
**D)** [Option D text]

<details>
<summary><strong>Click to reveal answer</strong></summary>

**Correct Answer**: [Letter]

**Explanation**: [Why this answer is correct and why other options are incorrect. Reference relevant page from module.]

**Reference**: [Link to module page, e.g., [Python Bridging](./02-python-bridging.md)]

</details>
```

**Guidelines**:
- Use `<details>` tag to hide answers initially (encourages learner to attempt before checking)
- Provide clear explanation with rationale
- Link to relevant module page for review
- Avoid trick questions; test genuine understanding

**Example**:
```markdown
## Exercise 1: Multiple Choice - ROS 2 Architecture

### Question 1.1: What is the primary role of rclpy in ROS 2?

**A)** Compile C++ nodes
**B)** Bridge Python code with ROS 2 communication
**C)** Visualize robot models in 3D
**D)** Simulate physics environments

<details>
<summary><strong>Click to reveal answer</strong></summary>

**Correct Answer**: B

**Explanation**: `rclpy` is the Python client library for ROS 2. It enables Python scripts to create nodes, publish/subscribe to topics, call services, and trigger actions. Option A is incorrect (compilation is handled by build tools like colcon). Option C is incorrect (RViz handles visualization). Option D is incorrect (Gazebo/Isaac Sim handle physics simulation).

**Reference**: [Python Bridging with rclpy](./02-python-bridging.md)

</details>
```

---

### 5. Short Answer Questions

**Pattern**:
```markdown
### Question [N.X]: [Question text requiring explanation]

**Answer Guidelines**: [Brief hint about what to include in answer, word count target]

<details>
<summary><strong>Click to reveal sample answer</strong></summary>

**Sample Answer**:

[2-3 sentence model answer demonstrating key points]

**Key Points to Include**:
- [Key point 1]
- [Key point 2]
- [Key point 3]

**Reference**: [Link to module page]

</details>
```

**Guidelines**:
- Ask "explain", "describe", or "compare" questions testing conceptual understanding
- Provide answer guidelines (word count, key concepts to include)
- Sample answer should be concise but complete
- List key points learners should mention

**Example**:
```markdown
### Question 1.2: Explain the difference between ROS 2 topics and services.

**Answer Guidelines**: Write 3-5 sentences comparing topics and services, mentioning communication patterns and use cases. (~50-100 words)

<details>
<summary><strong>Click to reveal sample answer</strong></summary>

**Sample Answer**:

ROS 2 topics use a publish-subscribe communication pattern where multiple publishers can send messages to a topic and multiple subscribers can receive them, enabling one-to-many or many-to-many communication. This is ideal for streaming data like sensor readings. In contrast, ROS 2 services use a request-reply pattern where one client sends a request and waits for a single server to respond, enabling one-to-one synchronous communication. Services are best for discrete actions like triggering calculations or querying robot state.

**Key Points to Include**:
- Topics: publish-subscribe, many-to-many, asynchronous, streaming data
- Services: request-reply, one-to-one, synchronous, discrete actions
- Use case distinction (continuous vs. on-demand)

**Reference**: [ROS 2 Architecture](./01-ros2-architecture.md)

</details>
```

---

### 6. Coding Challenges

**Pattern**:
```markdown
## Exercise [N]: Coding Challenge - [Challenge Title]

**Objective**: [What learner should build/modify]

**Requirements**:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

**Starter Code** (optional): [Link to starter template if provided]

**Validation**:
- Run [command] and verify [expected behavior]
- Check [specific output or log message]

<details>
<summary><strong>Click to reveal solution</strong></summary>

**Solution Code**:

```[language]
[complete solution code]
```

**Explanation**:

[2-3 paragraphs explaining solution approach, key concepts used, and how it meets requirements]

**Reference**: [Link to relevant module page]

</details>
```

**Guidelines**:
- Clearly state objective and requirements
- Provide validation method (how to test solution)
- Solution should match one of the coding patterns taught in module
- Explanation helps learners understand solution, not just copy code

**Example**:
```markdown
## Exercise 2: Coding Challenge - Create a Subscriber Node

**Objective**: Create a ROS 2 subscriber node that listens to `/hello_topic` and logs each received message.

**Requirements**:
1. Node name must be `hello_listener`
2. Subscribe to `/hello_topic` (message type: `std_msgs/String`)
3. Log each received message with `self.get_logger().info()`
4. Node must run continuously until stopped with Ctrl+C

**Starter Code**: Use the Hello Robot publisher from [Exercise 04-hello-robot.md](./04-hello-robot.md) to generate messages.

**Validation**:
1. In terminal 1, run the Hello Robot publisher: `ros2 run hello_robot hello_robot_node`
2. In terminal 2, run your subscriber node: `ros2 run [your_package] hello_listener_node`
3. Verify terminal 2 logs show: `[INFO] [hello_listener]: Received: Hello, Robot!`

<details>
<summary><strong>Click to reveal solution</strong></summary>

**Solution Code**:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloListenerNode(Node):
    """Subscriber node that listens to /hello_topic."""

    def __init__(self):
        super().__init__('hello_listener')
        # Create subscription: topic='hello_topic', callback=listener_callback
        self.subscription = self.create_subscription(
            String,
            'hello_topic',
            self.listener_callback,
            10  # Queue size
        )
        self.get_logger().info('Hello Listener Node started!')

    def listener_callback(self, msg):
        """Called whenever a message is received on /hello_topic."""
        self.get_logger().info(f'Received: {msg.data}')

def main():
    rclpy.init()
    node = HelloListenerNode()
    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Explanation**:

The solution creates a `HelloListenerNode` class inheriting from `rclpy.node.Node`. In the `__init__` method, we use `create_subscription()` to listen to `/hello_topic` with message type `String` (imported from `std_msgs.msg`). The third argument `listener_callback` specifies the function to call when messages arrive.

Inside `listener_callback`, we log the received message data using `self.get_logger().info()`. The callback receives a `msg` parameter containing the `String` message, and we access its data with `msg.data`.

This pattern (create subscription → implement callback → log data) is the standard approach for ROS 2 subscribers and can be adapted for any message type and topic.

**Reference**: [Python Bridging with rclpy](./02-python-bridging.md#subscribers)

</details>
```

---

### 7. Deliverable Review

**Pattern**:
```markdown
## Exercise [N]: Deliverable Verification

**Objective**: Verify your module deliverable meets the acceptance criteria.

**Deliverable**: [Name of module deliverable, e.g., "Hello Robot Node + Bipedal URDF Model"]

**Acceptance Criteria** (from module specification):
1. [Criterion 1 from spec.md acceptance scenarios]
2. [Criterion 2]
3. [Criterion 3]

**Verification Steps**:

### Step 1: [First verification task]
- Run: `[command]`
- Expected: [expected result]
- ✅ **Pass if**: [specific success condition]
- ❌ **Fail if**: [specific failure condition] → Review [page reference]

### Step 2: [Second verification task]
- Run: `[command]`
- Expected: [expected result]
- ✅ **Pass if**: [specific success condition]
- ❌ **Fail if**: [specific failure condition] → Review [page reference]

...

**Completion**: If all steps pass, you've successfully completed the module deliverable! ✅
```

**Guidelines**:
- Map verification steps to spec.md acceptance scenarios
- Provide clear pass/fail conditions
- Link to relevant pages for review if verification fails
- Use checkboxes or emoji (✅/❌) for visual clarity

---

## Complete Template (Copy-Paste Ready)

```markdown
---
title: "Module [XX] Checkpoint"
description: "Validation exercises confirming mastery of [Module Topic] learning objectives."
keywords: ["checkpoint", "validation", "quiz", "[module keywords]"]
sidebar_position: [last position]
---

# Module [XX] Checkpoint

**Purpose**: Validate that you've achieved the learning objectives for this module.

**Time Required**: 15-30 minutes

**Pass Criteria**: [Define minimum success criteria]

---

## Learning Objectives Review

By completing this module, you should be able to:

- [Learning objective 1]
- [Learning objective 2]
- [Learning objective 3]

---

## Exercise 1: Multiple Choice - [Topic]

### Question 1.1: [Question text]

**A)** [Option A]
**B)** [Option B]
**C)** [Option C]
**D)** [Option D]

<details>
<summary><strong>Click to reveal answer</strong></summary>

**Correct Answer**: [Letter]

**Explanation**: [Explanation]

**Reference**: [Link]

</details>

---

## Exercise 2: Coding Challenge - [Challenge Title]

**Objective**: [What to build]

**Requirements**:
1. [Requirement 1]
2. [Requirement 2]

**Validation**:
- Run [command] and verify [expected behavior]

<details>
<summary><strong>Click to reveal solution</strong></summary>

**Solution Code**:

```[language]
[code]
```

**Explanation**: [Explanation]

**Reference**: [Link]

</details>

---

## Exercise 3: Deliverable Verification

**Objective**: Verify your module deliverable meets acceptance criteria.

**Deliverable**: [Deliverable name]

**Acceptance Criteria**:
1. [Criterion 1]
2. [Criterion 2]

**Verification Steps**:

### Step 1: [Verification task]
- Run: `[command]`
- Expected: [expected result]
- ✅ **Pass if**: [condition]
- ❌ **Fail if**: [condition] → Review [page reference]

**Completion**: If all steps pass, you've successfully completed the module deliverable! ✅

---

## Next Steps

✅ **Module Complete!** If you've passed the checkpoint, you're ready to move on to [Next Module Title](../0X-next-module/index.md).

📚 **Need Review?** If you struggled with specific topics, revisit the relevant pages before proceeding.

🚀 **Advanced Challenge** (optional): [Suggest an extension or advanced variation of the module content]
```

---

## Validation Checklist

Before publishing a checkpoint:

- [ ] Learning objectives copied from module index.md
- [ ] Pass criteria clearly defined (e.g., 80% quiz score, successful deliverable verification)
- [ ] At least 3-5 exercises covering key concepts
- [ ] Mix of question types (multiple choice, short answer, coding, deliverable verification)
- [ ] All answers hidden in `<details>` tags with explanations
- [ ] References link back to relevant module pages
- [ ] Deliverable verification maps to spec.md acceptance criteria
- [ ] Next steps section guides learner to next module or review

---

## Example: Module 01 Checkpoint (Complete)

See `docs/01-robotic-nervous-system/06-checkpoint.md` (to be created during implementation) for a full example following this template.
