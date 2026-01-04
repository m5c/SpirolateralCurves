import { Point } from "./point";
import { Vertex } from "./vertex";
/**
 * Represents a sprirolateral curve, consisting of individual vertices. The curve is built gradually, and internally
 * keeps track of position low / high-scores, as new vertices are added.
 */
declare class Curve {
    private minX;
    private minY;
    private maxX;
    private maxY;
    private points;
    /**
     * Curves are built gradually, i.e. every point added extends the curve by a vertex leading from the most recent
     * point to the newly added. The Curve must be initialized with an initial starting point before new vertices can
     *  be added.
     * @param start as the Curve's beginning.
     */
    constructor(start: Point);
    /**
     * Adds a new point to the curve, defining the end of a new vertex.
     * @param endPoint as the point to define the vertex end extending the curve.
     */
    addVertex(endPoint: Point): void;
    /**
     * Returns how many vertices are in this curve.
     * @returns amount of vertices contained in this curve.
     */
    getVertexAmount(): number;
    /**
     * Returns a specific vertex defined by two consecutive points, indexation starts at 0.
     * @param index to indicate which vertex to get.
     */
    getVertex(index: number): Vertex;
    /**
     * Returns top-left canvas point, as needed based on vertex content.
     * @returns a point defining the top-left canvas delimiter.
     */
    getTopLeftPoint(): Point;
    /**
     * Helper function to determine how much space is needed, horizontally.
     * @returns Distance between x max and min value in all vertex points.
     */
    getWidth(): number;
    /**
     * Helper function to determine how much space is needed, vertically.
     * @returns Distance between y max and min value in all vertex points.
     */
    getHeight(): number;
}
export { Curve };
