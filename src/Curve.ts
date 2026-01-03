import { Point } from "./Point";
import { Vertex } from "./Vertex";

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
    private points: Point[] = [];

    /**
     * Curves are built gradually, i.e. every point added extends the curve by a vertex leading from the most recent
     * point to the newly added. The Curve must be initialized with an initial starting point before new vertices can
     *  be added.
     * @param start as the Curve's beginning.
     */
    constructor(start: Point) {
        this.points.push(start);
    }

    /**
     * Adds a new point to the curve, defining the end of a new vertex.
     * @param endPoint as the point to define the vertex end extending the curve.
     */
    addVertex(endPoint: Point): void {
        this.points.push(endPoint);
    }

    /**
     * Returns how many vertices are in this curve.
     * @returns amount of vertices contained in this curve.
     */
    getVertexAmount(): number {
        return this.points.length - 1;
    }

    /**
     * Returns a specific vertex defined by two consecutive points, indexation starts at 0.
     * @param index to indicate which vertex to get.
     */
    getVertex(index: number): Vertex {
        if (index >= this.getVertexAmount()) {
            throw new Error("Vertex index out of bounds.");
        }
        return new Vertex(this.points[index], this.points[index + 1]);
    }
}

export { Curve };
