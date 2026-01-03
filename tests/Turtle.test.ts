import { Point } from "../src/point";
import { Turtle } from "../src/turtle";

describe("testing if advance correctly displaces north facing turtle", () => {
    test("turtle at expected x/y position", () => {
        const startPosition = new Point(0, 0);
        const turtle = new Turtle(0, startPosition);
        turtle.advance(1);
        expect(turtle.getPosition().getX()).toBe(0);
        expect(turtle.getPosition().getY()).toBe(-1);
    });
});

describe("testing if advance correctly displaces east facing turtle", () => {
    test("turtle at expected x/y position", () => {
        const startPosition = new Point(0, 0);
        const turtle = new Turtle(90, startPosition);
        turtle.advance(1);
        expect(turtle.getPosition().getX()).toBe(1);
        expect(turtle.getPosition().getY()).toBeCloseTo(0);
    });
});

describe("testing if multiple rotations correctly add up", () => {
    test("turtle at expected x/y position", () => {
        const startPosition = new Point(0, 0);
        const turtle = new Turtle(0, startPosition);
        turtle.turnClockwise(1);
        turtle.turnClockwise(360);
        turtle.turnClockwise(-45);
        expect(turtle.getHeading()).toBe(316);
    });
});
