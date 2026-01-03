"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curve_generator_1 = require("./curve-generator");
const curve_processor_1 = require("./curve-processor");
const initialHeading = 5;
const angle = 122;
const amount = 6;
/**
 * This function is called on page load.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initUI() {
    // Generate curve based on current params
    const curve = (0, curve_generator_1.generateCurve)(initialHeading, angle, amount);
    // Convert curve to svg-string
    const curveProcessor = new curve_processor_1.CurveProcessor();
    const svgString = curveProcessor.process(curve);
    // Replace current svg by parsed svg string.
    // const svgParent = document.getElementById("curve")?.parentNode;
    // document.getElementById("curve")?.remove;
    // svgParent?.appendChild()
    const svg = document.getElementById("curve");
    if (svg)
        svg.innerHTML = svgString;
    // Update parameters
    updateParamReport(initialHeading, amount, angle);
}
/**
 * Identifies parameter field and updates displayed values
 * @param initialHeading initial heading offset from north.
 * @param amount as the number of increments per motive.
 * @param angle as the amount in degrees to turn clockwise after each move.
 */
function updateParamReport(initialHeading, amount, angle) {
    const paramReport = document.getElementById("param-report");
    if (paramReport) {
        paramReport.textContent = `α=${initialHeading}°, t=${amount}, β=${angle}°`;
    }
}
//# sourceMappingURL=webui.js.map