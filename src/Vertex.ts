/**
 * Defines a basic vertex, defined by a pair of points. Each point has an x and a y component. Vertices are immutable, i.e. positons cannot be changed after initialization.
 */
class Vertex {
  private startX: number;
  private startY: number;
  private endX: number;
  private endY: number;

  /**
   * Vertex constructor
   * @param startX vertex start position x component.
   * @param startY vertex start position y component.
   * @param endX vertex end position x component.
   * @param endY vertex end position y component.
   */
  constructor(startX: number, startY: number, endX: number, endY: number) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  /**
   * Getter for vertex start position x component.
   * @returns
   */
  getStartX(): number {
    return this.startX;
  }

  /**
   * Getter for vertex start position y component.
   * @returns
   */
  getStartY(): number {
    return this.startY;
  }

  /**
   * Getter for vertex end position x component.
   * @returns
   */
  getEndX(): number {
    return this.endX;
  }

  /**
   * Getter for vertex end position y component.
   * @returns
   */
  getEndY(): number {
    return this.endY;
  }
}

export { Vertex };
