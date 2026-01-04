import { Point } from "./point";
/**
 * Implements a Turtle for basic turtle graphics.
 * A turtle is "stupid", it does not implement an algorithm, only state: where it is heading, and where it is (x / y).
 */
declare class Turtle {
    private heading;
    private position;
    /**
     * Constructor.
     * @param heading direction the turtle is pointing at start-up, offset in degrees clockwise starting north.
     * @param position as x/y values of turtle start position, usually 0/0.
     */
    constructor(heading: number, position: Point);
    /**
     * Moves the turtle forward, in whatever direct it is currently heading.
     * @param distance as the amount of units to move forward.
     */
    advance(distance: number): void;
    /**
     * Turns the turtle clockwise by the provided amount of degrees.
     * @param angle as degrees.
     */
    turnClockwise(angle: number): void;
    /**
     * Getter for turtle's orientation.
     * @returns turtle's heading offset in clockwise degrees from north.
     */
    getHeading(): number;
    /**
     * Getter for turtles position.
     * @returns x/y position as point.
     */
    getPosition(): Point;
}
export { Turtle };
