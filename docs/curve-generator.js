"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCurve = generateCurve;
const curve_1 = require("./curve");
const point_1 = require("./point");
const turtle_1 = require("./turtle");
/**
 * Core function of the generator class. Creates a turtle and gradually builds a curve, consisting of multiple vertices.
 * Each vertex represents one turtle move.
 */
function generateCurve(initialHeading, angle, amount) {
    // Create new Turtle, starting at origin and heading north.
    const initialPosition = new point_1.Point(0, 0);
    const turtle = new turtle_1.Turtle(initialHeading, initialPosition);
    let moveCounter = 1;
    // Initialize empty Curve (will be gradually filled with vertices, as turtle moves)
    const curve = new curve_1.Curve(initialPosition);
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
//# sourceMappingURL=curve-generator.js.map