"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
/**
 * Defines a basic point, defined by a pair of values (x, y). Points are immutable, i.e. their position cannot be
 * changed after initialization.
 */
class Point {
    /**
     * Vertex constructor
     * @param x vertex start position x component.
     * @param y vertex start position y component.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Getter for point x component.
     * @returns
     */
    getX() {
        return this.x;
    }
    /**
     * Getter for point y component.
     * @returns
     */
    getY() {
        return this.y;
    }
}
exports.Point = Point;
//# sourceMappingURL=point.js.map