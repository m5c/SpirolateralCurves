import { Point } from "../src/point";

describe("testing if Point object is correctly initialized and getters return correct values", () => {
    test("point stores positions correctly", () => {
        const point = new Point(0, 1);
        expect(point.getX()).toBe(0);
        expect(point.getY()).toBe(1);
    });
});
