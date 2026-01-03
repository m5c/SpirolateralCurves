import { Point } from "./Point";

/**
 * Represents a sprirolateral curve, consisting of individual vertices. The curve is built gradually, and internally
 * keeps track of position low / high-scores, as new vertices are added.
 */
class Curve {
    // Pick most extreme values, so low / high-scores are guaranteed to be updated on first vertex added.
    private minX: number = Number.MAX_VALUE;
    private minY: number = Number.MAX_VALUE;
    private maxX: number = Number.MIN_VALUE;
    private maxY: number = Number.MIN_VALUE;

    // Curves are defined as a series of points, the initial point is provided at initialization.
    private vertices: Point[] = [];

    /**
     * Curves are built gradually, i.e. every point added extends the curve by a vertex leading from the most recent
     * point to the newly added. The Curve must be initialized with an initial starting point before new vertices can
     *  be added.
     * @param start as the Curve's beginning.
     */
    constructor(start: Point) {
        this.vertices.push(start);
    }

    /**
     * Adds a new point to the curve, defining the end of a new vertex.
     * @param vertexEnd as the point to define the vertex end extending the curve.
     */
    addVertex(vertexEnd: Point): void {
        this.vertices.push(vertexEnd);
    }
}

export { Curve };
