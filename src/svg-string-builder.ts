import { Curve } from "./curve";
import { CurveProcessor } from "./curve-processor";
import * as fs from "fs";
import { Vertex } from "./vertex";

/**
 * Static svg file builder. Consumes curves and builds an svg by string concatenation, and persists the outcome on disk
 * for visual inspection.
 */
class SvgStringBuilder implements CurveProcessor {
    private fileName: string;
    private preambleStart: string = `<?xml version="1.0" encoding="UTF-8"?><svg `;
    private preambleEnd: string = ` style="background: black" xmlns="http://www.w3.org/2000/svg">`;
    private coda: string = `</svg>`;

    // private renderMargin: number = 0.5;
    // private vertexWidth: number = 0.1;

    // eslint-disable-next-line jsdoc/require-jsdoc
    process(curve: Curve): void {
        // Compute a little margin to the sides of the generated svg, so there's no cropping (vertices have a width)

        // Build full SVG preamble string
        let svgString = this.preambleStart + this.buildViewBox(curve) + this.preambleEnd;

        // Prepare gradient definitions (as many as there are vertices)
        // Gradients rotate a full circle (360) degrees in HSL colour space.
        svgString = svgString + "<defs>";
        let gradientStart: number = 0;
        for (let i = 0; i < curve.getVertexAmount(); i++) {
            const gradientEnd: number = (360 * i) / curve.getVertexAmount();
            svgString =
                svgString +
                `<linearGradient id="grad${i.toString().padStart(8, "0")}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="hsl(${gradientStart}, 100%, 50%)"/>
                <stop offset="100%" stop-color="hsl(${gradientEnd}, 100%, 50%)"/>
            </linearGradient>`;
            gradientStart = gradientEnd;
        }
        svgString = svgString + "</defs>";

        // Add all vertices
        for (let i = 0; i < curve.getVertexAmount(); i++) {
            svgString = svgString + this.wrapVertexForSvg(curve.getVertex(i), curve.getHeight(), i);
        }
        svgString = svgString + this.coda;

        // Write string to disk, see: https://stackoverflow.com/a/33643701
        try {
            fs.writeFileSync(this.fileName, svgString, "utf8");
        } catch (err) {
            console.error("Error writing file:", err);
        }
    }

    /**
     * Constructor for svg builder.
     * @param fileName as absolute location on disk for svg export.
     */
    constructor(fileName: string) {
        this.fileName = fileName;
    }

    /**
     * Generates an svg viewbox that indicates to browser etc where to center and zoom in.
     * Needs topleft position and x/y space needed for content. This information can be inferred from curve
     * low/highscore information.
     * @param curve as the curve object storing information on all points defining the vertices.
     */
    private buildViewBox(curve: Curve): string {
        const renderMargin = 0.01 * curve.getHeight();
        return `viewBox="${curve.getTopLeftPoint().getX() - renderMargin} ${
            curve.getTopLeftPoint().getY() - renderMargin
        } ${curve.getWidth() + renderMargin} ${curve.getHeight() + 2 * renderMargin}"`;
    }

    /**
     * Converts point to point information of a vertex to an svg line string. Adjusts line width to the figure size.
     * @param vertex as source for line end / target.
     * @param totalHeight as the space in Y needed for the entire curve.
     * @returns svg string representing a single line.
     */
    private wrapVertexForSvg(vertex: Vertex, totalHeight: number, gradientIndex: string): string {
        const vertexWidth: number = 0.003 * totalHeight;
        const line: string = `<line x1="${vertex.getStart().getX()}" y1="${vertex.getStart().getY()}" x2="${vertex
            .getEnd()
            .getX()}" y2="${vertex.getEnd().getY()}" stroke="url(#grad${gradientIndex
            .toString()
            .padStart(8, "0")})" stroke-width="${vertexWidth}" stroke-linecap="round"/>`;
        console.log(line);
        return line;
    }
}

export { SvgStringBuilder };
