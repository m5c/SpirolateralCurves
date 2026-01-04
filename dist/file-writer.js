import * as fs from "fs";
/**
 * Helper class to export svg strings to files on disk.
 */
class FileWriter {
    /**
     * Persists svg string to absolut file location.
     * @param fileName as the absolute file location.
     * @param svgString as the svg content.
     */
    write(fileName, svgString) {
        // Write string to disk, see: https://stackoverflow.com/a/33643701
        try {
            fs.writeFileSync(fileName, svgString, "utf8");
        }
        catch (err) {
            console.error("Error writing file:", err);
        }
    }
}
export { FileWriter };
