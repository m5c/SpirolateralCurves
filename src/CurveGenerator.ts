import { Curve } from "./Curve";
import { Point } from "./Point";
import { Turtle } from "./Turtle";

/**
 * Core function of the generator class. Creates a turtle and gradually builds a curve, consisting of multiple vertices.
 * Each vertex represents one turtle move.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateCurve(initialHeading: number, initialPosition: Point, angle: number, amount: number): Curve {
    // Create new Turtle, starting at origin and heading north.
    const turtle: Turtle = new Turtle(initialHeading, initialPosition);
    let moveCounter: number = 1;

    // Initialize empty Curve (will be gradually filled with vertices, as turtle moves)
    const curve: Curve = new Curve(initialPosition);

    // Until turtle is heading is back to original heading, AFTER a FULL motive...
    // while (turtle.getHeading() !== initialHeading || curve.getVertexAmount() == 0) {
    while (!(turtle.getHeading() == initialHeading && moveCounter == 1 && curve.getVertexAmount() > 0)) {
        // Here's the basic spirolateral curve algorithm:
        // 1. advance turtle
        turtle.advance(moveCounter);

        // 2. turn turtle
        turtle.turnClockwise(angle);

        // 3. advance move counter, or reset if threshold (max amount for motive) reached
        if (moveCounter == amount)
            // reset
            moveCounter = 1;
        else {
            // increment next turtle move distance by 1
            moveCounter++;
        }

        // 4. Extend curve by turtle position after move
        curve.addVertex(turtle.getPosition());
    }

    return curve;
}
