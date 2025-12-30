---
slug: urdf-modeling-basics
title: "URDF Modeling Basics: Building Your First Humanoid Robot"
authors: [admin]
tags: [urdf, modeling, ros2, tutorial]
image: /img/blog/urdf-banner.jpg
---

# URDF Modeling Basics: Building Your First Humanoid Robot

Creating a digital twin of your robot is the first step in robotic development. URDF (Unified Robot Description Format) is the standard way to describe robot geometry, kinematics, and dynamics in ROS 2.

<!-- truncate -->

## What is URDF?

URDF is an XML format that defines:
- **Links**: Physical components (torso, limbs, sensors)
- **Joints**: Connections between links (revolute, prismatic, fixed)
- **Visual Properties**: How the robot looks (meshes, colors)
- **Collision Geometry**: For physics simulation
- **Inertial Properties**: Mass, center of mass, inertia tensors

## Anatomy of a Humanoid Robot

A typical bipedal humanoid consists of:

```
torso (base_link)
├── left_leg
│   ├── left_hip (revolute)
│   ├── left_knee (revolute)
│   └── left_ankle (revolute)
├── right_leg
│   ├── right_hip (revolute)
│   ├── right_knee (revolute)
│   └── right_ankle (revolute)
├── left_arm
└── right_arm
```

## Simple Humanoid URDF Example

Here's a minimal URDF for a 6-DOF bipedal robot:

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Torso (Base Link) -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
      <material name="blue">
        <color rgba="0.0 0.0 0.8 1.0"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10.0"/>
      <inertia ixx="0.5" ixy="0.0" ixz="0.0"
               iyy="0.5" iyz="0.0" izz="0.5"/>
    </inertial>
  </link>

  <!-- Left Hip Joint -->
  <joint name="left_hip_joint" type="revolute">
    <parent link="torso"/>
    <child link="left_thigh"/>
    <origin xyz="0.1 0.0 -0.25" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57"
           effort="100" velocity="1.0"/>
  </joint>

  <!-- Left Thigh Link -->
  <link name="left_thigh">
    <visual>
      <geometry>
        <cylinder radius="0.05" length="0.4"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1.0"/>
      </material>
    </visual>
    <!-- collision and inertial... -->
  </link>

  <!-- Add more joints and links... -->
</robot>
```

## Key Concepts

### 1. **Coordinate Frames**
Every link has its own coordinate frame. Joint origins specify where child links attach relative to parent links.

### 2. **Joint Types**
- **Revolute**: Rotates around an axis (hip, knee, shoulder)
- **Continuous**: Revolves infinitely (wheels)
- **Prismatic**: Slides along an axis (linear actuators)
- **Fixed**: Rigidly attached (sensors, cameras)

### 3. **Inertial Properties**
Critical for realistic physics simulation:
```xml
<inertial>
  <mass value="5.0"/>
  <inertia ixx="0.1" ixy="0.0" ixz="0.0"
           iyy="0.1" iyz="0.0" izz="0.1"/>
</inertial>
```

## Visualizing Your Robot

Use RViz to see your robot model:

```bash
# Launch joint state publisher with GUI
ros2 launch urdf_tutorial display.launch.py model:=simple_humanoid.urdf

# Or use robot_state_publisher
ros2 run robot_state_publisher robot_state_publisher \
  --ros-args -p robot_description:="$(cat simple_humanoid.urdf)"
```

## Best Practices

1. **Start Simple**: Begin with basic shapes, add complexity gradually
2. **Use XACRO**: Macros reduce repetition in large models
3. **Check Your Math**: Incorrect inertia causes simulation instability
4. **Validate**: Use `check_urdf` to catch errors early
5. **Keep It Organized**: Group related links and joints together

## Next Steps

In our textbook, we cover:
- Complete 6-DOF bipedal humanoid URDF
- Adding sensors (cameras, IMU, LiDAR)
- Integrating with Gazebo for physics simulation
- Controlling joints with ROS 2 controllers

Check out [URDF Anatomy](/docs/robotic-nervous-system/urdf-anatomy) and [Building a Bipedal URDF](/docs/robotic-nervous-system/bipedal-urdf) to learn more!

## Resources

- [URDF XML Specification](http://wiki.ros.org/urdf/XML)
- [RViz Visualization](https://github.com/ros2/rviz)
- [GitHub Repository](https://github.com/asmamasood/book)

Happy modeling! 🤖
