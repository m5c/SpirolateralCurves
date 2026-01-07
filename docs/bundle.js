var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/point.ts
var Point;
var init_point = __esm({
  "src/point.ts"() {
    "use strict";
    Point = class {
      /**
       * Vertex constructor
       * @param x vertex start position x component.
       * @param y vertex start position y component.
       */
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      /**
       * Getter for point x component.
       * @returns
       */
      getX() {
        return this.x;
      }
      /**
       * Getter for point y component.
       * @returns
       */
      getY() {
        return this.y;
      }
    };
  }
});

// src/vertex.ts
var Vertex;
var init_vertex = __esm({
  "src/vertex.ts"() {
    "use strict";
    Vertex = class {
      /**
       * Vertex constructor.
       * @param start as starting point, defining x/y position.
       * @param end  as ending point, defining x/y position.
       */
      constructor(start, end) {
        this.start = start;
        this.end = end;
      }
      /**
       * Getter for vertex start.
       * @returns start position of vertex.
       */
      getStart() {
        return this.start;
      }
      /**
       * Getter for vertex end.
       * @returns end position of vertex.
       */
      getEnd() {
        return this.end;
      }
    };
  }
});

// src/curve.ts
var Curve;
var init_curve = __esm({
  "src/curve.ts"() {
    "use strict";
    init_point();
    init_vertex();
    Curve = class {
      /**
       * Curves are built gradually, i.e. every point added extends the curve by a vertex leading from the most recent
       * point to the newly added. The Curve must be initialized with an initial starting point before new vertices can
       *  be added.
       * @param start as the Curve's beginning.
       */
      constructor(start) {
        // Curves are defined as a series of points, the initial point is provided at initialization.
        this.points = [];
        this.points.push(start);
        this.minX = start.getX();
        this.maxX = start.getX();
        this.minY = start.getY();
        this.maxY = start.getY();
      }
      /**
       * Adds a new point to the curve, defining the end of a new vertex.
       * @param endPoint as the point to define the vertex end extending the curve.
       */
      addVertex(endPoint) {
        this.points.push(endPoint);
        this.minX = Math.min(this.minX, endPoint.getX());
        this.maxX = Math.max(this.maxX, endPoint.getX());
        this.minY = Math.min(this.minY, endPoint.getY());
        this.maxY = Math.max(this.maxY, endPoint.getY());
      }
      /**
       * Returns how many vertices are in this curve.
       * @returns amount of vertices contained in this curve.
       */
      getVertexAmount() {
        return this.points.length - 1;
      }
      /**
       * Returns a specific vertex defined by two consecutive points, indexation starts at 0.
       * @param index to indicate which vertex to get.
       */
      getVertex(index) {
        if (index >= this.getVertexAmount()) {
          throw new Error("Vertex index out of bounds.");
        }
        return new Vertex(this.points[index], this.points[index + 1]);
      }
      /**
       * Returns top-left canvas point, as needed based on vertex content.
       * @returns a point defining the top-left canvas delimiter.
       */
      getTopLeftPoint() {
        return new Point(this.minX, this.minY);
      }
      /**
       * Helper function to determine how much space is needed, horizontally.
       * @returns Distance between x max and min value in all vertex points.
       */
      getWidth() {
        return this.maxX - this.minX;
      }
      /**
       * Helper function to determine how much space is needed, vertically.
       * @returns Distance between y max and min value in all vertex points.
       */
      getHeight() {
        return this.maxY - this.minY;
      }
    };
  }
});

// src/turtle.ts
var Turtle;
var init_turtle = __esm({
  "src/turtle.ts"() {
    "use strict";
    init_point();
    Turtle = class {
      /**
       * Constructor.
       * @param heading direction the turtle is pointing at start-up, offset in degrees clockwise starting north.
       * @param position as x/y values of turtle start position, usually 0/0.
       */
      constructor(heading, position) {
        this.heading = heading;
        this.position = position;
      }
      /**
       * Moves the turtle forward, in whatever direct it is currently heading.
       * @param distance as the amount of units to move forward.
       */
      advance(distance) {
        const radians = this.heading * Math.PI / 180;
        const nextX = this.position.getX() + Math.sin(radians) * distance;
        const nextY = this.position.getY() - Math.cos(radians) * distance;
        this.position = new Point(nextX, nextY);
      }
      /**
       * Turns the turtle clockwise by the provided amount of degrees.
       * @param angle as degrees.
       */
      turnClockwise(angle) {
        this.heading = this.heading + angle;
        this.heading = (this.heading % 360 + 360) % 360;
      }
      /**
       * Getter for turtle's orientation.
       * @returns turtle's heading offset in clockwise degrees from north.
       */
      getHeading() {
        return this.heading;
      }
      /**
       * Getter for turtles position.
       * @returns x/y position as point.
       */
      getPosition() {
        return this.position;
      }
    };
  }
});

// src/curve-generator.ts
function generateCurve(params) {
  const initialPosition = new Point(0, 0);
  const turtle = new Turtle(params.getInitialHeading(), initialPosition);
  let moveCounter = 1;
  const curve = new Curve(initialPosition);
  while (!(turtle.getHeading() == params.getInitialHeading() && moveCounter == 1 && curve.getVertexAmount() > 0)) {
    turtle.advance(moveCounter);
    turtle.turnClockwise(params.getAngle());
    if (moveCounter == params.getAmount())
      moveCounter = 1;
    else {
      moveCounter++;
    }
    curve.addVertex(turtle.getPosition());
  }
  return curve;
}
var init_curve_generator = __esm({
  "src/curve-generator.ts"() {
    "use strict";
    init_curve();
    init_point();
    init_turtle();
  }
});

// src/curve-processor.ts
var CurveProcessor;
var init_curve_processor = __esm({
  "src/curve-processor.ts"() {
    "use strict";
    CurveProcessor = class {
      constructor() {
        this.preambleStart = `<?xml version="1.0" encoding="UTF-8"?><svg id="curve" `;
        this.preambleEnd = ` style="background: black" xmlns="http://www.w3.org/2000/svg">`;
        this.coda = `</svg>`;
      }
      // private renderMargin: number = 0.5;
      // private vertexWidth: number = 0.1;
      // eslint-disable-next-line jsdoc/require-jsdoc
      process(curve) {
        let svgString = this.preambleStart + this.buildViewBox(curve) + this.preambleEnd;
        svgString = svgString + "<defs>";
        let gradientStart = 0;
        for (let i = 0; i < curve.getVertexAmount(); i++) {
          const gradientEnd = 360 * (i + 1) / curve.getVertexAmount();
          svgString = svgString + `<linearGradient id="grad${i.toString().padStart(8, "0")}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="hsl(${gradientStart}, 100%, 50%)"/>
                <stop offset="100%" stop-color="hsl(${gradientEnd}, 100%, 50%)"/>
            </linearGradient>`;
          svgString = svgString + `<linearGradient id="gradR${i.toString().padStart(8, "0")}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="hsl(${gradientEnd}, 100%, 50%)"/>
                <stop offset="100%" stop-color="hsl(${gradientStart}, 100%, 50%)"/>
            </linearGradient>`;
          gradientStart = gradientEnd;
        }
        svgString = svgString + "</defs>";
        for (let i = 0; i < curve.getVertexAmount(); i++) {
          svgString = svgString + this.wrapVertexForSvg(curve.getVertex(i), curve.getHeight(), i.toString());
        }
        svgString = svgString + this.coda;
        return svgString;
      }
      /**
       * Generates an svg viewbox that indicates to browser etc where to center and zoom in.
       * Needs topleft position and x/y space needed for content. This information can be inferred from curve
       * low/highscore information.
       * @param curve as the curve object storing information on all points defining the vertices.
       */
      buildViewBox(curve) {
        const renderMargin = 0.05 * curve.getHeight();
        return `viewBox="${curve.getTopLeftPoint().getX() - renderMargin} ${curve.getTopLeftPoint().getY() - renderMargin} ${curve.getWidth() + renderMargin} ${curve.getHeight() + 2 * renderMargin}"`;
      }
      /**
       * Converts point to point information of a vertex to an svg line string. Adjusts line width to the figure size.
       * @param vertex as source for line end / target.
       * @param totalHeight as the space in Y needed for the entire curve.
       * @returns svg string representing a single line.
       */
      wrapVertexForSvg(vertex, totalHeight, gradientIndex) {
        const vertexWidth = 3e-3 * totalHeight;
        let x1 = vertex.getStart().getX();
        let y1 = vertex.getStart().getY();
        let x2 = vertex.getEnd().getX();
        let y2 = vertex.getEnd().getY();
        const precision = 1e3;
        if (Math.round(x1 * precision) === Math.round(x2 * precision)) {
          x2 = x2 + 1e-3;
        }
        if (Math.round(y1 * precision) === Math.round(y2 * precision)) {
          y2 = y2 + 1e-3;
        }
        let gradOrientation = "";
        if (x1 > x2) {
          gradOrientation = "R";
        }
        const line = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#grad${gradOrientation}${gradientIndex.toString().padStart(8, "0")})" stroke-width="${vertexWidth}" stroke-linecap="round"/>`;
        return line;
      }
    };
  }
});

// src/curve-params.ts
var CurveParams;
var init_curve_params = __esm({
  "src/curve-params.ts"() {
    "use strict";
    CurveParams = class {
      /**
       * Preset constructor.
       * @param initialHeading as the amount in degrees (clockwise, starting north) the turtle is heading.
       * @param angle as the amount in degrees the turtle turns clockwise after each move.
       * @param amount as the amount of move increments the turtle performs before resetting.
       */
      constructor(initialHeading, angle, amount) {
        this.initialHeading = 5;
        this.angle = 130;
        this.amount = 6;
        this.initialHeading = initialHeading;
        this.angle = angle;
        this.amount = amount;
      }
      /**
       * Getter for preset initial heading.
       * @returns Turtle's initial heading in degrees.
       */
      getInitialHeading() {
        return this.initialHeading;
      }
      /**
       * Getter for preset angle.
       * @returns degrees the turtle turns clockwise after each move.
       */
      getAngle() {
        return this.angle;
      }
      /**
       * Getter for preset iteration amount.
       * @returns amount of moves the turtle performes before resetting move distance.
       */
      getAmount() {
        return this.amount;
      }
    };
  }
});

// src/webui.ts
var require_webui = __commonJS({
  "src/webui.ts"() {
    init_curve_generator();
    init_curve_processor();
    init_curve_params();
    var presets = [];
    presets.push(new CurveParams(0, 22, 3));
    presets.push(new CurveParams(20, 135, 4));
    presets.push(new CurveParams(44, 22, 8));
    presets.push(new CurveParams(90, 87, 8));
    presets.push(new CurveParams(4, 60, 1));
    presets.push(new CurveParams(280, 45, 6));
    presets.push(new CurveParams(9, 136, 15));
    presets.push(new CurveParams(0, 111, 1));
    presets.push(new CurveParams(0, 129, 4));
    presets.push(new CurveParams(5, 22, 30));
    var currentParams = presets[1];
    function render() {
      const curve = generateCurve(currentParams);
      const curveProcessor = new CurveProcessor();
      const svgString = curveProcessor.process(curve);
      const svg = document.getElementById("curve");
      if (svg) svg.innerHTML = svgString;
      updateParamReport(currentParams);
    }
    function updateParamReport(params) {
      const paramReport = document.getElementById("param-report");
      if (paramReport) {
        paramReport.textContent = `\u03B1=${params.getInitialHeading()}\xB0, \u03B2=${params.getAngle()}\xB0, t=${params.getAmount()} \u25CF`;
      }
    }
    render();
    document.addEventListener("keydown", function(event) {
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
      if (event.key === "r") {
        const initialHeading = Math.floor(Math.random() * 360);
        const angle = Math.floor(Math.random() * 360);
        const amount = Math.floor(Math.random() * 32);
        currentParams = new CurveParams(initialHeading, angle, amount);
        render();
      }
      console.log(event.key);
      if (event.key >= "0" && event.key <= "9") {
        currentParams = presets[Number.parseInt(event.key)];
        render();
      }
    });
    document.querySelectorAll(".virtual-keys button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = String(btn.getAttribute("data-key"));
        document.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });
  }
});
export default require_webui();
