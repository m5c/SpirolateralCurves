import { Curve } from "./Curve";
import { Point } from "./Point";
import { Turtle } from "./Turtle";

// This launcher code initializes a default spirolateral curve with fixed parameters.
// initialHeading: clockwise offset from north in degrees. 0: north, 90: east, 180 south, 270: west
const initialHeading: number = 0;
const initialPosition: Point = new Point(0, 0);

// angle: how much the turtle turns clockwise (degrees) after every move.
const angle: number = 1;
// amount: how many times the turtle increases move length, before resetting to length 1.
const amount: number = 1;
generateCurve(angle, amount);

/**
 * Core function of the generator class. Creates a turtle and gradually builds a curve, consisting of multiple vertices.
 * Each vertex represents one turtle move.
 */
function generateCurve(angle: number, amount: number): Curve {
    // Create new Turtle, starting at origin and heading north.
    const turtle: Turtle = new Turtle(initialHeading, initialPosition);
    let moveCounter: number = 1;

    // Initialize empty Curve (will be gradually filled with vertices, as turtle moves)
    const curve: Curve = new Curve(initialPosition);

    // Until turtle is heading is back to original heading, proceed constructing curve:
    while (turtle.getHeading() !== initialHeading) {
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
