/**
 * Defines a basic point, defined by a pair of values (x, y). Points are immutable, i.e. their position cannot be
 * changed after initialization.
 */
declare class Point {
    private x;
    private y;
    /**
     * Vertex constructor
     * @param x vertex start position x component.
     * @param y vertex start position y component.
     */
    constructor(x: number, y: number);
    /**
     * Getter for point x component.
     * @returns
     */
    getX(): number;
    /**
     * Getter for point y component.
     * @returns
     */
    getY(): number;
}
export { Point };
