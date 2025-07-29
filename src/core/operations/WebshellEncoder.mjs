/**
 * @author Rvn0xsy [rvn0xsy@gmail.com]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import JavaEncoder from "../lib/WebshellEncoder.mjs";
/**
 * WebshellEncoder operation
 */
class WebshellEncoder extends Operation {

    /**
     * WebshellEncoder constructor
     */
    constructor() {
        super();

        this.name = "WebshellEncoder";
        this.module = "Default";
        this.description = "This is a webshell encoding function module that supports encoding of JSP code, such as utf-16, utf-32, utf-7, etc.";
        this.infoURL = "https://payloads.online"; // Usually a Wikipedia link. Remember to remove localisation (i.e. https://wikipedia.org/etc rather than https://en.wikipedia.org/etc)
        this.inputType = "string";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "Encoding",
                "type": "option",
                "value": ["UTF-8 (65001)", "UTF-7 (65000)", "UTF-16LE (1200)", "UTF-16BE (1201)", "UTF-32LE (12000)", "UTF-32BE (12001)"]
            },
            {
                name: "Language",
                type: "option",
                value: ["Java", ".NET", "PHP"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const language = args[1];
        if (language !== "Java" && language !== ".NET" && language !== "PHP") {
            throw new Error("Unsupported language: " + language);
        }
        switch (language) {
            case "Java":
                return JavaEncoder(input, args[0]);
            case ".NET":
                // .NET encoding logic can be added here
                throw new Error("Encoding for .NET is not implemented yet.");
            case "PHP":
                // PHP encoding logic can be added here
                throw new Error("Encoding for PHP is not implemented yet.");
            default:
                throw new Error("Unsupported language: " + language);
        }
    }

}

export default WebshellEncoder;
