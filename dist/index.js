// Launcher for standalone application (not relevant for webui)
import { generateCurve } from "./curve-generator";
import { CurveProcessor } from "./curve-processor";
import { FileWriter } from "./file-writer";
const initialHeading = 5;
const angle = 122;
const amount = 6;
// for (let angle: number = 1; angle < 180; angle++) {
//     for (let amount: number = 1; amount < 8; amount++) {
// Generate a simple curve
const curve = generateCurve(initialHeading, angle, amount);
// Export the curve to an SVG string, then persist to file on disk
const curveProcessor = new CurveProcessor();
const svgString = curveProcessor.process(curve);
const fileName = `/tmp/slc-${angle.toString().padStart(4, "0")}-${amount.toString().padStart(4, "0")}.svg`;
new FileWriter().write(fileName, svgString);
//     }
// }
