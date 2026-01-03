import { Curve } from "./Curve";

/**
 * Interface definition for CurveProcessors. CurveProcessors consume curves and produce a visualization, e.g. in form
 * of an svg file persisted on disk, or svg object.
 */
interface CurveProcessor {
    /**
     * key function for any CurveProcessor, consumes curve to convert it into something visual.
     * @param curve as a previously computed trace of spirolateral curves.
     */
    process(curve: Curve): void;
}

export { CurveProcessor };
