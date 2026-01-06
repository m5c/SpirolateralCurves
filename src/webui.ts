/**
 * This is the only source file bound to the index.html document. It can only be used in the webapp and replaces the
 * index.ts/js entrypoint.
 */
import { Curve } from "./curve";
import { generateCurve } from "./curve-generator";
import { CurveProcessor } from "./curve-processor";
import { CurveParams } from "./curve-params";

const presets: CurveParams[] = [];
presets.push(new CurveParams(5, 130, 6));
presets.push(new CurveParams(4, 60, 1));
// presets.push(new CurveParams(349, 60, 32));
presets.push(new CurveParams(280, 45, 6));
presets.push(new CurveParams(354, 135, 4));
presets.push(new CurveParams(0, 136, 4));
presets.push(new CurveParams(9, 136, 15));
presets.push(new CurveParams(0, 111, 1));
presets.push(new CurveParams(0, 129, 4));
presets.push(new CurveParams(345, 135, 13));
presets.push(new CurveParams(5, 138, 8));
let currentParams = presets[1];

/**
 * This function is called on page load.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function render() {
    // Generate curve based on current params
    const curve: Curve = generateCurve(currentParams);

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
    updateParamReport(currentParams);
}

/**
 * Identifies parameter field and updates displayed values
 * @param params as the curve parameters.
 */
function updateParamReport(params: CurveParams) {
    const paramReport = document.getElementById("param-report");
    if (paramReport) {
        paramReport.textContent = `α=${params.getInitialHeading()}°, β=${params.getAngle()}°, t=${params.getAmount()}●`;
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
        const angle = (currentParams.getAngle() - 1 + 360) % 360;
        currentParams = new CurveParams(currentParams.getInitialHeading(), angle, currentParams.getAmount());
        render();
    }
    if (event.key === "=") {
        const angle = (currentParams.getAngle() + 1 + 360) % 360;
        currentParams = new CurveParams(currentParams.getInitialHeading(), angle, currentParams.getAmount());
        render();
    }
    if (event.key === "[") {
        const amount = Math.max(currentParams.getAmount() - 1, 1);
        currentParams = new CurveParams(currentParams.getInitialHeading(), currentParams.getAngle(), amount);
        render();
    }
    if (event.key === "]") {
        const amount = Math.min(currentParams.getAmount() + 1, 32);
        currentParams = new CurveParams(currentParams.getInitialHeading(), currentParams.getAngle(), amount);
        render();
    }
    if (event.key === "q") {
        const initialHeading = (currentParams.getInitialHeading() - 1 + 360) % 360;
        currentParams = new CurveParams(initialHeading, currentParams.getAngle(), currentParams.getAmount());
        render();
    }
    if (event.key === "w") {
        const initialHeading = (currentParams.getInitialHeading() + 1 + 360) % 360;
        currentParams = new CurveParams(initialHeading, currentParams.getAngle(), currentParams.getAmount());
        render();
    }
    console.log(event.key);
    if (event.key >= "0" && event.key <= "9") {
        currentParams = presets[Number.parseInt(event.key)];
        render();
    }
});
