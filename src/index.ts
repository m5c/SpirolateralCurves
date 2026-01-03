// Launcher for standalone application (not relevant for webui)

import { Curve } from "./Curve";
import { generateCurve } from "./CurveGenerator";
import { CurveProcessor } from "./CurveProcessor";
import { Point } from "./Point";
import { SvgStringBuilder } from "./SvgStringBuilder";

const initialHeading: number = 5;
const initialPosition: Point = new Point(0, 0);
const angle: number = 122;
const amount: number = 6;

// for (let angle: number = 1; angle < 180; angle++) {
// for (let amount: number = 1; amount < 5; amount++) {
// Generate a simple curve
const curve: Curve = generateCurve(initialHeading, initialPosition, angle, amount);

// Export the curve to an SVG file
const curveProcessor: CurveProcessor = new SvgStringBuilder(
    `/tmp/slc-${angle.toString().padStart(4, "0")}-${amount.toString().padStart(4, "0")}.svg`
);
curveProcessor.process(curve);
// }
// }
