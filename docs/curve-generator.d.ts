import { Curve } from "./curve";
/**
 * Core function of the generator class. Creates a turtle and gradually builds a curve, consisting of multiple vertices.
 * Each vertex represents one turtle move.
 */
export declare function generateCurve(initialHeading: number, angle: number, amount: number): Curve;
