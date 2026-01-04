import { Point } from "./point";
import { Vertex } from "./vertex";
/**
 * Represents a sprirolateral curve, consisting of individual vertices. The curve is built gradually, and internally
 * keeps track of position low / high-scores, as new vertices are added.
 */
class Curve {
    /**
     * Curves are built gradually, i.e. every point added extends the curve by a vertex leading from the most recent
     * point to the newly added. The Curve must be initialized with an initial starting point before new vertices can
     *  be added.
     * @param start as the Curve's beginning.
     */
    constructor(start) {
        // Curves are defined as a series of points, the initial point is provided at initialization.
        this.points = [];
        this.points.push(start);
        // update min and max scores
        this.minX = start.getX();
        this.maxX = start.getX();
        this.minY = start.getY();
        this.maxY = start.getY();
    }
    /**
     * Adds a new point to the curve, defining the end of a new vertex.
     * @param endPoint as the point to define the vertex end extending the curve.
     */
    addVertex(endPoint) {
        this.points.push(endPoint);
        // update min and max scores
        this.minX = Math.min(this.minX, endPoint.getX());
        this.maxX = Math.max(this.maxX, endPoint.getX());
        this.minY = Math.min(this.minY, endPoint.getY());
        this.maxY = Math.max(this.maxY, endPoint.getY());
    }
    /**
     * Returns how many vertices are in this curve.
     * @returns amount of vertices contained in this curve.
     */
    getVertexAmount() {
        return this.points.length - 1;
    }
    /**
     * Returns a specific vertex defined by two consecutive points, indexation starts at 0.
     * @param index to indicate which vertex to get.
     */
    getVertex(index) {
        if (index >= this.getVertexAmount()) {
            throw new Error("Vertex index out of bounds.");
        }
        return new Vertex(this.points[index], this.points[index + 1]);
    }
    /**
     * Returns top-left canvas point, as needed based on vertex content.
     * @returns a point defining the top-left canvas delimiter.
     */
    getTopLeftPoint() {
        return new Point(this.minX, this.minY);
    }
    /**
     * Helper function to determine how much space is needed, horizontally.
     * @returns Distance between x max and min value in all vertex points.
     */
    getWidth() {
        return this.maxX - this.minX;
    }
    /**
     * Helper function to determine how much space is needed, vertically.
     * @returns Distance between y max and min value in all vertex points.
     */
    getHeight() {
        return this.maxY - this.minY;
    }
}
export { Curve };
