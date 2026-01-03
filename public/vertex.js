"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertex = void 0;
/**
 * Helper class to define straight lines, as defined by a pair of points. Vertices are immutable.
 */
class Vertex {
    /**
     * Vertex constructor.
     * @param start as starting point, defining x/y position.
     * @param end  as ending point, defining x/y position.
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Getter for vertex start.
     * @returns start position of vertex.
     */
    getStart() {
        return this.start;
    }
    /**
     * Getter for vertex end.
     * @returns end position of vertex.
     */
    getEnd() {
        return this.end;
    }
}
exports.Vertex = Vertex;
//# sourceMappingURL=vertex.js.map