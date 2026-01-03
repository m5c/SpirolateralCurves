import { Point } from "./Point";

/**
 * Implements a Turtle for basic turtle graphics.
 * A turtle is "stupid", it does not implement an algorithm, only state: where it is heading, and where it is (x / y).
 */
class Turtle {
    private heading: number;
    private position: Point;

    /**
     * Constructor.
     * @param heading direction the turtle is pointing at start-up, offset in degrees clockwise starting north.
     * @param position as x/y values of turtle start position, usually 0/0.
     */
    constructor(heading: number, position: Point) {
        this.heading = heading;
        this.position = position;
    }

    /**
     * Moves the turtle forward, in whatever direct it is currently heading.
     * @param distance as the amount of units to move forward.
     */
    advance(distance: number): void {
        // Convert degrees to radians
        const radians = (this.heading * Math.PI) / 180;

        // Update turtle position
        const nextX: number = this.position.getX() + Math.sin(radians) * distance;
        const nextY: number = this.position.getY() - Math.cos(radians) * distance;
        this.position = new Point(nextX, nextY);
    }

    /**
     * Turns the turtle clockwise by the provided amount of degrees.
     * @param angle as degrees.
     */
    turnClockwise(angle: number): void {
        this.heading = this.heading + angle;
        // Remainder in javascript can be negative, so we wrap it with an additional add and mod.
        this.heading = ((this.heading % 360) + 360) % 360;
    }

    /**
     * Getter for turtle's orientation.
     * @returns turtle's heading offset in clockwise degrees from north.
     */
    getHeading(): number {
        return this.heading;
    }

    /**
     * Getter for turtles position.
     * @returns x/y position as point.
     */
    getPosition(): Point {
        return this.position;
    }
}

export { Turtle };
