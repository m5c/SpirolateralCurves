/**
 * Represents a triple of three values, defining a spirolateral curve: initialHeading, angle, amount.
 */
class CurveParams {
    private initialHeading: number = 5;
    private angle: number = 130;
    private amount: number = 6;

    /**
     * Preset constructor.
     * @param initialHeading as the amount in degrees (clockwise, starting north) the turtle is heading.
     * @param angle as the amount in degrees the turtle turns clockwise after each move.
     * @param amount as the amount of move increments the turtle performs before resetting.
     */
    constructor(initialHeading: number, angle: number, amount: number) {
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
}

export { CurveParams };
