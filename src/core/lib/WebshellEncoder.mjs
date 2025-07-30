/**
 * Webshell encoder lib.
 *
 * @author Rvn0xsy [rvn0xsy@gmail.com]
 * @license Apache-2.0
 */


import cptable from "codepage";

const PAGE_HEADER = `<%@ page pageEncoding="#ENCODE#"%>`;
const XML_HEADER = `<?xml version="1.0" encoding='#ENCODE#'?>`;

export const ENCODINGS = {
    "cp037": 37,
    "utf-16le": 1200,
    "utf-16be": 1201,
    "utf-32le": 12000,
    "utf-32be": 12001,
    "cp273": 20273,
    "ibm437": 437,
    "ibm857": 10081,
};


/**
 * Encodes input with Java-compatible XML encoding
 *
 * @param {string} input - The input to encode
 * @param {string} encoding - The encoding to use
 * @returns {ArrayBuffer} - The encoded result
 */
export function JavaEncoder(input, headEncoding, encoding) {
    // support encodings:
    // https://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html
    // reference:
    // https://tttang.com/archive/1840/
    // https://y4tacker.github.io/2022/11/27/year/2022/11/%E6%B5%85%E8%B0%88JspWebshell%E4%B9%8B%E7%BC%96%E7%A0%81/
    const textEncoder = new TextEncoder();
    // 组装头部编码内容
    const xmlHead = textEncoder.encode(XML_HEADER.replace("#ENCODE#", headEncoding));
    // 将头部编码声明部分进行编码
    const pageHead = cptable.utils.encode(ENCODINGS[headEncoding], PAGE_HEADER.replace("#ENCODE#", encoding));
    // 获得编码索引，将Webshell内容编码
    const shellcode = cptable.utils.encode(ENCODINGS[encoding], input);
    const result = new Uint8Array(xmlHead.length + pageHead.length + shellcode.length);
    result.set(xmlHead);
    result.set(pageHead, xmlHead.length);
    result.set(shellcode, xmlHead.length + pageHead.length);
    return result.buffer;
}

export default JavaEncoder;

