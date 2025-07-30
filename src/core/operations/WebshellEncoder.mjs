/**
 * @author Rvn0xsy [rvn0xsy@gmail.com]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {JavaEncoder, ENCODINGS} from "../lib/WebshellEncoder.mjs";
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
                "name": "HeadEncoding",
                "type": "option",
                "value": Object.keys(ENCODINGS)
            },
            {
                "name": "Encoding",
                "type": "option",
                "value": Object.keys(ENCODINGS)
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
        const language = args[2];
        if (language !== "Java" && language !== ".NET" && language !== "PHP") {
            throw new Error("Unsupported language: " + language);
        }
        switch (language) {
            case "Java":
                return JavaEncoder(input, args[0], args[1]);
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
