"use strict";
// Launcher for standalone application (not relevant for webui)
Object.defineProperty(exports, "__esModule", { value: true });
const curve_generator_1 = require("./curve-generator");
const curve_processor_1 = require("./curve-processor");
const file_writer_1 = require("./file-writer");
const initialHeading = 5;
const angle = 122;
const amount = 6;
// for (let angle: number = 1; angle < 180; angle++) {
//     for (let amount: number = 1; amount < 8; amount++) {
// Generate a simple curve
const curve = (0, curve_generator_1.generateCurve)(initialHeading, angle, amount);
// Export the curve to an SVG string, then persist to file on disk
const curveProcessor = new curve_processor_1.CurveProcessor();
const svgString = curveProcessor.process(curve);
const fileName = `/tmp/slc-${angle.toString().padStart(4, "0")}-${amount.toString().padStart(4, "0")}.svg`;
new file_writer_1.FileWriter().write(fileName, svgString);
//     }
// }
//# sourceMappingURL=index.js.map