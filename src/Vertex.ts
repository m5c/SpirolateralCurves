import { Point } from "./point";

/**
 * Helper class to define straight lines, as defined by a pair of points. Vertices are immutable.
 */
class Vertex {
    private start: Point;
    private end: Point;

    /**
     * Vertex constructor.
     * @param start as starting point, defining x/y position.
     * @param end  as ending point, defining x/y position.
     */
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    /**
     * Getter for vertex start.
     * @returns start position of vertex.
     */
    getStart(): Point {
        return this.start;
    }

    /**
     * Getter for vertex end.
     * @returns end position of vertex.
     */
    getEnd(): Point {
        return this.end;
    }
}

export { Vertex };
