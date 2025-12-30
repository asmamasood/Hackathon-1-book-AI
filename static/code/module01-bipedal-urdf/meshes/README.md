# Custom Meshes Directory

This directory is reserved for custom STL, DAE, or OBJ mesh files for the bipedal humanoid robot.

## Adding Custom Meshes

1. **Export from CAD Software**:
   - Blender: File → Export → STL/COLLADA (.dae)
   - Fusion 360: Right-click component → Save As Mesh → STL
   - Recommended: Use DAE for visual meshes (supports textures), STL for collision

2. **Place Files Here**:
   ```
   meshes/
   ├── torso.stl
   ├── left_thigh.stl
   ├── left_shin.stl
   ├── head.stl
   └── README.md (this file)
   ```

3. **Update URDF**:
   Replace `<geometry><box/></geometry>` with:
   ```xml
   <geometry>
     <mesh filename="package://simple_humanoid_description/meshes/torso.stl" scale="0.001 0.001 0.001"/>
   </geometry>
   ```

## Best Practices

- **Visual meshes**: High detail OK (up to 5000 triangles)
- **Collision meshes**: Keep under 500 triangles for performance
- **Scale factor**: CAD software often exports in mm → use `scale="0.001 0.001 0.001"` to convert to meters
- **Coordinate system**: Ensure mesh origin aligns with URDF link origin
- **File naming**: Use lowercase with underscores (e.g., `left_thigh.stl`)

## Default Primitive Shapes

Currently, the URDF uses primitive shapes (boxes, cylinders, spheres). These are sufficient for learning and testing, but can be replaced with custom meshes for realism.

## Resources

- Blender modeling tutorials: https://www.blender.org/support/tutorials/
- Free robot mesh libraries: GrabCAD, Thingiverse
- URDF mesh documentation: https://wiki.ros.org/urdf/XML/link
