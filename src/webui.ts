/**
 * This is the only source file bound to the index.html document. It can only be used in the webapp and replaces the
 * index.ts/js entrypoint.
 */
import { Curve } from "./curve";
import { generateCurve } from "./curve-generator";
import { CurveProcessor } from "./curve-processor";

let initialHeading: number = 5;
let angle: number = 130;
let amount: number = 6;

/**
 * This function is called on page load.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function render() {
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
        paramReport.textContent = `α=${initialHeading}°, β=${angle}°, t=${amount} ● `;
    }
}

// Essential to call initUI here, so the bundler does not consider it dead code... this is the equivalent of functions
// executed on page load.
// To actually produce the bundle:
//  npm install --save-dev esbuild
//  npx esbuild src/webui.ts   --bundle   --format=esm   --platform=browser --outfile=docs/bundle.js
render();

document.addEventListener("keydown", function (event) {
    if (event.key === "-") {
        angle = (angle - 1 + 360) % 360;
        render();
    }
    if (event.key === "=") {
        angle = (angle + 1 + 360) % 360;
        render();
    }
    if (event.key === "[") {
        amount = Math.max(amount - 1, 1);
        render();
    }
    if (event.key === "]") {
        amount = Math.min(amount + 1, 15);
        render();
    }
    if (event.key === "q") {
        initialHeading = (initialHeading - 1 + 360) % 360;
        render();
    }
    if (event.key === "w") {
        initialHeading = (initialHeading + 1 + 360) % 360;
        render();
    }
    if (event.key === "1") {
        initialHeading = 5;
        angle = 130;
        amount = 6;
        render();
    }
    if (event.key === "2") {
        initialHeading = 0;
        angle = 54;
        amount = 7;
        render();
    }
    if (event.key === "3") {
        initialHeading = 280;
        angle = 45;
        amount = 6;
        render();
    }
    if (event.key === "4") {
        initialHeading = 354;
        angle = 135;
        amount = 4;
        render();
    }
    if (event.key === "5") {
        initialHeading = 0;
        angle = 136;
        amount = 4;
        render();
    }
    if (event.key === "6") {
        initialHeading = 9;
        angle = 136;
        amount = 15;
        render();
    }
    if (event.key === "7") {
        initialHeading = 0;
        angle = 111;
        amount = 1;
        render();
    }
    if (event.key === "8") {
        initialHeading = 0;
        angle = 129;
        amount = 4;
        render();
    }
    if (event.key === "9") {
        initialHeading = 345;
        angle = 135;
        amount = 13;
        render();
    }
    if (event.key === "0") {
        initialHeading = 5;
        angle = 138;
        amount = 8;
        render();
    }
});
