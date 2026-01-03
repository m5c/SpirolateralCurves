// Launcher for standalone application (not relevant for webui)

import { Curve } from "./curve";
import { generateCurve } from "./curve-generator";
import { CurveProcessor } from "./curve-processor";
import { FileWriter } from "./file-writer";

const initialHeading: number = 5;
const angle: number = 122;
const amount: number = 6;

// for (let angle: number = 1; angle < 180; angle++) {
//     for (let amount: number = 1; amount < 8; amount++) {
// Generate a simple curve
const curve: Curve = generateCurve(initialHeading, angle, amount);

// Export the curve to an SVG string, then persist to file on disk
const curveProcessor: CurveProcessor = new CurveProcessor();
const svgString: string = curveProcessor.process(curve);
const fileName: string = `/tmp/slc-${angle.toString().padStart(4, "0")}-${amount.toString().padStart(4, "0")}.svg`;
new FileWriter().write(fileName, svgString);
//     }
// }
