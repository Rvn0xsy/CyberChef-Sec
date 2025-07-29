/**
 * Webshell encoder lib.
 *
 * @author Rvn0xsy [rvn0xsy@gmail.com]
 * @license Apache-2.0
 */


import cptable from "codepage";
import {CHR_ENC_CODE_PAGES} from "../lib/ChrEnc.mjs";

const XML_HEADER = `<?xml version="1.0" encoding='#ENCODE#'?>`;

/**
 * Encodes input with Java-compatible XML encoding
 *
 * @param {string} input - The input to encode
 * @param {string} encoding - The encoding to use
 * @returns {ArrayBuffer} - The encoded result
 */
export function JavaEncoder(input, encoding) {
    const textEncoder = new TextEncoder();
    const encode = encoding.replace(/\s*\(\d+\)$/, "").toLowerCase();
    const head = textEncoder.encode(XML_HEADER.replace("#ENCODE#", encode));
    const format = CHR_ENC_CODE_PAGES[encoding];
    const shellcode = cptable.utils.encode(format, input);
    const result = new Uint8Array(head.length + shellcode.length);
    result.set(head);
    result.set(shellcode, head.length);
    return result.buffer;
}

export default JavaEncoder;

