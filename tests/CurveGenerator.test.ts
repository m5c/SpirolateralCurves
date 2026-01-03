import { Curve } from "../src/Curve";
import { generateCurve } from "../src/CurveGenerator";
import { Point } from "../src/Point";
import { Vertex } from "../src/Vertex";

describe("testing if simple square curve is correctly generated", () => {
    test("square curve defined by series of 5 points", () => {
        const initialHeading: number = 0;
        const initialPosition: Point = new Point(0, 0);
        const angle: number = 90;
        const inMotiveAmount: number = 1;

        // This must generate a square, i.e. 5 points (start and end are separate positions)
        const curve: Curve = generateCurve(initialHeading, initialPosition, angle, inMotiveAmount);

        // Verify the amount of points in curve
        expect(curve.getVertexAmount()).toBe(4);

        // Verify start and end point are roughly identical
        const firstVertex: Vertex = curve.getVertex(0);
        const lastVertex: Vertex = curve.getVertex(3);
        expect(firstVertex.getStart().getX()).toBeCloseTo(lastVertex.getEnd().getX());
        expect(firstVertex.getStart().getY()).toBeCloseTo(lastVertex.getEnd().getY());
    });
});
