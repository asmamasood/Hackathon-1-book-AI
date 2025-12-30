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
