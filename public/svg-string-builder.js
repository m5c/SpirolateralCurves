"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgStringBuilder = void 0;
const fs = __importStar(require("fs"));
/**
 * Static svg file builder. Consumes curves and builds an svg by string concatenation, and persists the outcome on disk
 * for visual inspection.
 */
class SvgStringBuilder {
    // private renderMargin: number = 0.5;
    // private vertexWidth: number = 0.1;
    // eslint-disable-next-line jsdoc/require-jsdoc
    process(curve) {
        // Compute a little margin to the sides of the generated svg, so there's no cropping (vertices have a width)
        // Build full SVG preamble string
        let svgString = this.preambleStart + this.buildViewBox(curve) + this.preambleEnd;
        // Prepare gradient definitions (as many as there are vertices)
        // Gradients rotate a full circle (360) degrees in HSL colour space.
        svgString = svgString + "<defs>";
        let gradientStart = 0;
        for (let i = 0; i < curve.getVertexAmount(); i++) {
            const gradientEnd = (360 * i) / curve.getVertexAmount();
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
            svgString = svgString + this.wrapVertexForSvg(curve.getVertex(i), curve.getHeight(), i.toString());
        }
        svgString = svgString + this.coda;
        // Write string to disk, see: https://stackoverflow.com/a/33643701
        try {
            fs.writeFileSync(this.fileName, svgString, "utf8");
        }
        catch (err) {
            console.error("Error writing file:", err);
        }
    }
    /**
     * Constructor for svg builder.
     * @param fileName as absolute location on disk for svg export.
     */
    constructor(fileName) {
        this.preambleStart = `<?xml version="1.0" encoding="UTF-8"?><svg `;
        this.preambleEnd = ` style="background: black" xmlns="http://www.w3.org/2000/svg">`;
        this.coda = `</svg>`;
        this.fileName = fileName;
    }
    /**
     * Generates an svg viewbox that indicates to browser etc where to center and zoom in.
     * Needs topleft position and x/y space needed for content. This information can be inferred from curve
     * low/highscore information.
     * @param curve as the curve object storing information on all points defining the vertices.
     */
    buildViewBox(curve) {
        const renderMargin = 0.01 * curve.getHeight();
        return `viewBox="${curve.getTopLeftPoint().getX() - renderMargin} ${curve.getTopLeftPoint().getY() - renderMargin} ${curve.getWidth() + renderMargin} ${curve.getHeight() + 2 * renderMargin}"`;
    }
    /**
     * Converts point to point information of a vertex to an svg line string. Adjusts line width to the figure size.
     * @param vertex as source for line end / target.
     * @param totalHeight as the space in Y needed for the entire curve.
     * @returns svg string representing a single line.
     */
    wrapVertexForSvg(vertex, totalHeight, gradientIndex) {
        const vertexWidth = 0.003 * totalHeight;
        const line = `<line x1="${vertex.getStart().getX()}" y1="${vertex.getStart().getY()}" x2="${vertex
            .getEnd()
            .getX()}" y2="${vertex.getEnd().getY()}" stroke="url(#grad${gradientIndex
            .toString()
            .padStart(8, "0")})" stroke-width="${vertexWidth}" stroke-linecap="round"/>`;
        return line;
    }
}
exports.SvgStringBuilder = SvgStringBuilder;
//# sourceMappingURL=svg-string-builder.js.map