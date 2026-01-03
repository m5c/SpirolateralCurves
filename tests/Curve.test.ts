import { Curve } from "../src/curve";
import { Point } from "../src/point";

describe("testing if curve object correctly determines topleft point and space requirements", () => {
    test("curve computes space requirements correctly", () => {
        const curve: Curve = new Curve(new Point(0, 0));
        curve.addVertex(new Point(1, 1));

        expect(curve.getTopLeftPoint().getX()).toBe(0);
        expect(curve.getTopLeftPoint().getY()).toBe(0);
        expect(curve.getWidth()).toBe(1);
        expect(curve.getHeight()).toBe(1);
    });
});
