/**
 * This is the only source file bound to the index.html document. It can only be used in the webapp and replaces the
 * index.ts/js entrypoint.
 */
import { Curve } from "./curve";
import { generateCurve } from "./curve-generator";
import { CurveProcessor } from "./curve-processor";

const initialHeading: number = 5;
const angle: number = 122;
const amount: number = 6;

/**
 * This function is called on page load.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initUI() {
    // Generate curve based on current params
    const curve: Curve = generateCurve(initialHeading, angle, amount);

    // Convert curve to svg-string
    const curveProcessor: CurveProcessor = new CurveProcessor();
    const svgString: string = curveProcessor.process(curve);

    // Replace current svg by parsed svg string.
    // const svgParent = document.getElementById("curve")?.parentNode;
    // document.getElementById("curve")?.remove;
    // svgParent?.appendChild()
    const svg = document.getElementById("curve");
    if (svg) svg.innerHTML = svgString;

    // Update parameters
    updateParamReport(initialHeading, amount, angle);
}

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
