/**
 * Implements a Turtle for basic turtle graphics.
 * A turtle is "stupid", it does not implement an algorithm, only state: where it is heading, and where it is (x / y).
 */
class Turtle {
  private heading: number;
  private positionX: number;
  private positionY: number;

  /**
   * Constructor.
   * @param heading direction into which the turtle is pointing at start-up, offset in degrees clockwise starting north.
   * @param positionX x value of turtle start position, usually 0.
   * @param positionY y value of turtle start position, usually 0.
   */
  constructor(heading: number, positionX: number, positionY: number) {
    this.heading = heading;
    this.positionX = positionX;
    this.positionY = positionY;
  }

  /**
   * Moves the turtle forward, in whatever direct it is currently heading.
   * @param distance as the amount of units to move forward.
   */
  advance(distance: number) {
    // Convert degrees to radians
    const radians = (this.heading * Math.PI) / 180;

    // Update position new position
    this.positionX = this.positionX + Math.sin(radians) * distance;
    this.positionY = this.positionY - Math.cos(radians) * distance;
  }

  /**
   * Turns the turtle clockwise by the provided amount of degrees.
   * @param angle as degrees.
   */
  turnClockwise(angle: number) {
    this.heading = this.heading + angle;
    // Remainder in javascript can be negative, so we wrap it with an additional add and mod.
    this.heading = ((this.heading % 360) + 360) % 360;
  }

  /**
   * Getter for turtle's orientation.
   * @returns turtle's heading offset in clockwise degrees from north.
   */
  getHeading() {
    return this.heading;
  }

  /**
   * Getter for turtles horizontal position.
   * @returns x position.
   */
  getPositionX() {
    return this.positionX;
  }

  /**
   * Getter for turtles vertical position.
   * @returns y position.
   */
  getPositionY() {
    return this.positionY;
  }
}

export { Turtle };
