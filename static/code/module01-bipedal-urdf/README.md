# Module 01: Bipedal URDF Model

A 6-DOF humanoid robot model with torso, legs, and head for visualization in RViz.

## Prerequisites

- ✅ ROS 2 Humble installed and sourced
- ✅ urdf_tutorial package:
  ```bash
  sudo apt install ros-humble-urdf-tutorial ros-humble-joint-state-publisher-gui
  ```

## Installation

This is a standalone URDF file that doesn't require building. You can:

### Option A: Use Directly

```bash
# View in RViz with joint state publisher
ros2 launch urdf_tutorial display.launch.py model:=/path/to/simple_humanoid.urdf
```

### Option B: Create a Package

```bash
mkdir -p ~/ros2_ws/src/simple_humanoid_description
cd ~/ros2_ws/src/simple_humanoid_description

# Copy files
cp -r /path/to/module01-bipedal-urdf/* .

# Create CMakeLists.txt and package.xml (see below)
```

## Quick Start

### Validate the URDF

```bash
check_urdf urdf/simple_humanoid.urdf
```

**Expected Output**:
```
robot name is: simple_humanoid
---------- Successfully Parsed XML ---------------
root Link: torso has 3 child(ren)
    child(1):  left_thigh
        child(1):  left_shin
    child(2):  right_thigh
        child(1):  right_shin
    child(3):  neck
        child(1):  head
```

### Visualize in RViz

```bash
ros2 launch urdf_tutorial display.launch.py model:=$(pwd)/urdf/simple_humanoid.urdf
```

**What You Should See**:
1. RViz window opens with the robot model
2. Joint State Publisher GUI appears with 6 sliders:
   - `left_hip_joint`
   - `left_knee_joint`
   - `right_hip_joint`
   - `right_knee_joint`
   - `neck_pitch_joint`
   - `head_yaw_joint`
3. Moving sliders animates the robot joints

## Robot Specifications

### Degrees of Freedom: 6

| Joint | Type | Range | Description |
|-------|------|-------|-------------|
| left_hip_joint | revolute | -1.57 to 1.57 rad | Left leg forward/backward |
| left_knee_joint | revolute | 0.0 to 2.0 rad | Left leg bend |
| right_hip_joint | revolute | -1.57 to 1.57 rad | Right leg forward/backward |
| right_knee_joint | revolute | 0.0 to 2.0 rad | Right leg bend |
| neck_pitch_joint | revolute | -0.5 to 0.5 rad | Head up/down |
| head_yaw_joint | revolute | -1.0 to 1.0 rad | Head left/right |

### Links

- **torso**: Blue box (0.3m × 0.2m × 0.5m), 10kg
- **left_thigh**: Gray cylinder (radius 0.05m, length 0.4m), 2kg
- **left_shin**: Gray cylinder (radius 0.04m, length 0.4m), 1.5kg
- **right_thigh**: Gray cylinder (radius 0.05m, length 0.4m), 2kg
- **right_shin**: Gray cylinder (radius 0.04m, length 0.4m), 1.5kg
- **neck**: White cylinder (radius 0.03m, length 0.1m), 0.5kg
- **head**: White sphere (radius 0.12m), 1kg

## File Structure

```
module01-bipedal-urdf/
├── urdf/
│   └── simple_humanoid.urdf   # Complete robot description
├── launch/
│   └── display.launch.py      # RViz launch file (optional)
├── meshes/
│   └── README.md              # Placeholder for custom meshes
└── README.md                  # This file
```

## Customization

### Add Custom Meshes

Replace primitive shapes (boxes, cylinders) with STL/DAE meshes:

1. Export meshes from Blender/Fusion 360
2. Place STL files in `meshes/` directory
3. Update URDF `<geometry>` elements:

```xml
<geometry>
  <mesh filename="package://simple_humanoid_description/meshes/torso.stl" scale="0.001 0.001 0.001"/>
</geometry>
```

### Modify Joint Limits

Edit `urdf/simple_humanoid.urdf` and change `<limit>` values:

```xml
<limit lower="-2.0" upper="2.0" effort="150" velocity="2.0"/>
```

## Troubleshooting

### Issue: Robot doesn't appear in RViz

**Solution 1**: Set Fixed Frame to `torso` in RViz Global Options.

**Solution 2**: Add RobotModel display:
1. Click **Add** → **RobotModel**
2. Set **Description Topic** to `/robot_description`

### Issue: Joints don't move

**Solution**: Verify `joint_state_publisher_gui` node is running:
```bash
ros2 node list
```

Expected nodes:
- `/robot_state_publisher`
- `/joint_state_publisher_gui`
- `/rviz2`

### Issue: "Package not found" when using meshes

**Solution**: If using `package://` URIs, ensure you created a proper ROS 2 package with `package.xml`.

## Learning Outcomes

After using this URDF model, you should understand:
- ✅ URDF XML structure (links, joints, visual, collision, inertial)
- ✅ Joint types and their properties
- ✅ Coordinate frames and transforms
- ✅ How to validate and visualize robot models

## Next Steps

Try extending the model:
1. Add arms (shoulder and elbow joints)
2. Replace cylinders with custom STL meshes
3. Add sensors (camera_link with fixed joint to head)
4. Export the model for Gazebo simulation (add `<gazebo>` tags)

## Support

- Textbook page: [Module 01: Bipedal URDF](../../docs/01-robotic-nervous-system/05-bipedal-urdf.md)
- URDF tutorials: https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html
- Report issues: https://github.com/asmamasood/book/issues
