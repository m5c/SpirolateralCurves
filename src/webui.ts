/**
 * This is the only source file bound to the index.html document. It can only be used in the webapp and replaces the
 * index.ts/js entrypoint.
 */

// import { Curve } from "./curve";
// import { generateCurve } from "./curve-generator";
// import { CurveProcessor } from "./curve-processor";
// import { Point } from "./point";
// import { SvgStringBuilder } from "./svg-string-builder";

/**
 * This function is called on page load.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initUI() {
    console.log("yay");
    const initialHeading: number = 5;
    // const initialPosition: Point = new Point(0, 0);
    const angle: number = 122;
    const amount: number = 6;
    updateParamReport(initialHeading, amount, angle);
}

// for (let angle: number = 1; angle < 180; angle++) {
//     for (let amount: number = 1; amount < 8; amount++) {
// Generate a simple curve
// const curve: Curve = generateCurve(initialHeading, initialPosition, angle, amount);

// // Export the curve to an SVG file
// const curveProcessor: CurveProcessor = new SvgStringBuilder(
//     `/tmp/slc-${angle.toString().padStart(4, "0")}-${amount.toString().padStart(4, "0")}.svg`
// );
// curveProcessor.process(curve);
//     }
// }

/**
 * Identifies parameter field and updates displayed values
 * @param initialHeading initial heading offset from north.
 * @param amount as the number of increments per motive.
 * @param angle as the amount in degrees to turn clockwise after each move.
 */
function updateParamReport(initialHeading: number, amount: number, angle: number) {
    const paramReport = document.getElementById("param-report");
    if (paramReport) {
        paramReport.textContent = `α=${initialHeading}°, t=${amount}, β=${angle}°`;
    }
}
