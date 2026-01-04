/**
 * Helper class to export svg strings to files on disk.
 */
declare class FileWriter {
    /**
     * Persists svg string to absolut file location.
     * @param fileName as the absolute file location.
     * @param svgString as the svg content.
     */
    write(fileName: string, svgString: string): void;
}
export { FileWriter };
