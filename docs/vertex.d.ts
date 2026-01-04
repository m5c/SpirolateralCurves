import { Point } from "./point";
/**
 * Helper class to define straight lines, as defined by a pair of points. Vertices are immutable.
 */
declare class Vertex {
    private start;
    private end;
    /**
     * Vertex constructor.
     * @param start as starting point, defining x/y position.
     * @param end  as ending point, defining x/y position.
     */
    constructor(start: Point, end: Point);
    /**
     * Getter for vertex start.
     * @returns start position of vertex.
     */
    getStart(): Point;
    /**
     * Getter for vertex end.
     * @returns end position of vertex.
     */
    getEnd(): Point;
}
export { Vertex };
