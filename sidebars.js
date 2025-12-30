// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Module 01: ROS 2 Foundation',
      link: {
        type: 'doc',
        id: 'robotic-nervous-system/index',
      },
      items: [
        'robotic-nervous-system/ros2-architecture',
        'robotic-nervous-system/python-bridging',
        'robotic-nervous-system/urdf-anatomy',
        'robotic-nervous-system/hello-robot',
        'robotic-nervous-system/bipedal-urdf',
        'robotic-nervous-system/checkpoint',
      ],
    },
  ],
};

module.exports = sidebars;
