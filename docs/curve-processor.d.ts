import { Curve } from "./curve";
/**
 * Static svg file builder. Consumes curves and builds an svg by string concatenation, and persists the outcome on disk
 * for visual inspection.
 */
declare class CurveProcessor {
    private preambleStart;
    private preambleEnd;
    private coda;
    process(curve: Curve): string;
    /**
     * Generates an svg viewbox that indicates to browser etc where to center and zoom in.
     * Needs topleft position and x/y space needed for content. This information can be inferred from curve
     * low/highscore information.
     * @param curve as the curve object storing information on all points defining the vertices.
     */
    private buildViewBox;
    /**
     * Converts point to point information of a vertex to an svg line string. Adjusts line width to the figure size.
     * @param vertex as source for line end / target.
     * @param totalHeight as the space in Y needed for the entire curve.
     * @returns svg string representing a single line.
     */
    private wrapVertexForSvg;
}
export { CurveProcessor };
