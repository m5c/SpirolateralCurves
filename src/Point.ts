/**
 * Defines a basic point, defined by a pair of values (x, y). Points are immutable, i.e. their position cannot be
 * changed after initialization.
 */
class Point {
    private x: number;
    private y: number;

    /**
     * Vertex constructor
     * @param x vertex start position x component.
     * @param y vertex start position y component.
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Getter for point x component.
     * @returns
     */
    getX(): number {
        return this.x;
    }

    /**
     * Getter for point y component.
     * @returns
     */
    getY(): number {
        return this.y;
    }
}

export { Point };
