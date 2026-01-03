"use strict";
// Launcher for standalone application (not relevant for webui)
Object.defineProperty(exports, "__esModule", { value: true });
const curve_generator_1 = require("./curve-generator");
const point_1 = require("./point");
const svg_string_builder_1 = require("./svg-string-builder");
const initialHeading = 5;
const initialPosition = new point_1.Point(0, 0);
const angle = 122;
const amount = 6;
// for (let angle: number = 1; angle < 180; angle++) {
//     for (let amount: number = 1; amount < 8; amount++) {
// Generate a simple curve
const curve = (0, curve_generator_1.generateCurve)(initialHeading, initialPosition, angle, amount);
// Export the curve to an SVG file
const curveProcessor = new svg_string_builder_1.SvgStringBuilder(`/tmp/slc-${angle.toString().padStart(4, "0")}-${amount.toString().padStart(4, "0")}.svg`);
curveProcessor.process(curve);
//     }
// }
//# sourceMappingURL=index.js.map