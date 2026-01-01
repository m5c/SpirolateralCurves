import { Turtle } from "../src/Turtle";

describe("testing if advance correctly displaces north facing turtle", () => {
  test("turtle at expected x/y position", () => {
    const turtle = new Turtle(0, 0, 0);
    turtle.advance(1);
    expect(turtle.positionX).toBe(0);
    expect(turtle.positionY).toBe(-1);
  });
});

describe("testing if advance correctly displaces east facing turtle", () => {
  test("turtle at expected x/y position", () => {
    const turtle = new Turtle(90, 0, 0);
    turtle.advance(1);
    expect(turtle.positionX).toBe(1);
    expect(turtle.positionY).toBeCloseTo(0);
  });
});

describe("testing if multiple rotations correctly add up", () => {
  test("turtle at expected x/y position", () => {
    const turtle = new Turtle(0, 0, 0);
    turtle.turnClockwise(1);
    turtle.turnClockwise(360);
    turtle.turnClockwise(-45);
    expect(turtle.heading).toBe(316);
  });
});