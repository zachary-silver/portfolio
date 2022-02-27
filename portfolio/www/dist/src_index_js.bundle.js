/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcreate_wasm_app"] = self["webpackChunkcreate_wasm_app"] || []).push([["src_index_js"],{

/***/ "./src/game-of-life/index.ts":
/*!***********************************!*\
  !*** ./src/game-of-life/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderLoop\": () => (/* binding */ renderLoop)\n/* harmony export */ });\n/* harmony import */ var portfolio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! portfolio */ \"../pkg/portfolio_bg.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst memory = (__webpack_require__(/*! portfolio/portfolio_bg */ \"../pkg/portfolio_bg.js\").memory);\n;\nconst CELL_SIZE = 1; // pixels\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\nconst UNIVERSE = portfolio__WEBPACK_IMPORTED_MODULE_0__.Universe[\"new\"](512, 1024);\nconst ROWS = UNIVERSE.rows();\nconst COLUMNS = UNIVERSE.columns();\nconst CELLS_PER_CLUSTER = UNIVERSE.cells_per_cluster();\nconst CELL_CLUSTERS = {\n    clusters: new Uint8Array(memory.buffer, UNIVERSE.cell_clusters(), Math.ceil(ROWS * COLUMNS / CELLS_PER_CLUSTER)),\n    getCellValue: function (row, column) {\n        const cellNumber = row * COLUMNS + column;\n        const cellClusterIndex = Math.floor(cellNumber / CELLS_PER_CLUSTER);\n        const cellIndex = cellNumber % CELLS_PER_CLUSTER;\n        return (this.clusters[cellClusterIndex] >>> cellIndex) & 1;\n    },\n};\nconst CANVAS = document.getElementById(\"portfolio-canvas\");\nCANVAS.height = (CELL_SIZE + 1) * ROWS + 1;\nCANVAS.width = (CELL_SIZE + 1) * (COLUMNS / 2) + 1;\nconst CONTEXT = CANVAS.getContext('2d');\nconst drawCells = () => {\n    const starting_column = UNIVERSE.cell_offset();\n    CONTEXT.beginPath();\n    for (let row = 0; row < ROWS; row++) {\n        for (let column = starting_column; column < COLUMNS; column += 2) {\n            CONTEXT.fillStyle = CELL_CLUSTERS.getCellValue(row, column)\n                ? ALIVE_COLOR\n                : DEAD_COLOR;\n            CONTEXT.fillRect(column * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);\n        }\n    }\n    CONTEXT.stroke();\n};\nconst sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconst renderLoop = () => __awaiter(void 0, void 0, void 0, function* () {\n    UNIVERSE.tick();\n    drawCells();\n    yield sleep(50);\n    requestAnimationFrame(renderLoop);\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZS1vZi1saWZlL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ3FDO0FBQ3JDLGVBQWUsb0ZBQXdDO0FBQ3ZEO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDLDJDQUEyQyxrQkFBa0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDc0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGUtd2FzbS1hcHAvLi9zcmMvZ2FtZS1vZi1saWZlL2luZGV4LnRzPzg3YzYiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBVbml2ZXJzZSB9IGZyb20gXCJwb3J0Zm9saW9cIjtcbmNvbnN0IG1lbW9yeSA9IHJlcXVpcmUoXCJwb3J0Zm9saW8vcG9ydGZvbGlvX2JnXCIpLm1lbW9yeTtcbjtcbmNvbnN0IENFTExfU0laRSA9IDE7IC8vIHBpeGVsc1xuY29uc3QgREVBRF9DT0xPUiA9IFwiI0ZGRkZGRlwiO1xuY29uc3QgQUxJVkVfQ09MT1IgPSBcIiMwMDAwMDBcIjtcbmNvbnN0IFVOSVZFUlNFID0gVW5pdmVyc2UubmV3KDUxMiwgMTAyNCk7XG5jb25zdCBST1dTID0gVU5JVkVSU0Uucm93cygpO1xuY29uc3QgQ09MVU1OUyA9IFVOSVZFUlNFLmNvbHVtbnMoKTtcbmNvbnN0IENFTExTX1BFUl9DTFVTVEVSID0gVU5JVkVSU0UuY2VsbHNfcGVyX2NsdXN0ZXIoKTtcbmNvbnN0IENFTExfQ0xVU1RFUlMgPSB7XG4gICAgY2x1c3RlcnM6IG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIsIFVOSVZFUlNFLmNlbGxfY2x1c3RlcnMoKSwgTWF0aC5jZWlsKFJPV1MgKiBDT0xVTU5TIC8gQ0VMTFNfUEVSX0NMVVNURVIpKSxcbiAgICBnZXRDZWxsVmFsdWU6IGZ1bmN0aW9uIChyb3csIGNvbHVtbikge1xuICAgICAgICBjb25zdCBjZWxsTnVtYmVyID0gcm93ICogQ09MVU1OUyArIGNvbHVtbjtcbiAgICAgICAgY29uc3QgY2VsbENsdXN0ZXJJbmRleCA9IE1hdGguZmxvb3IoY2VsbE51bWJlciAvIENFTExTX1BFUl9DTFVTVEVSKTtcbiAgICAgICAgY29uc3QgY2VsbEluZGV4ID0gY2VsbE51bWJlciAlIENFTExTX1BFUl9DTFVTVEVSO1xuICAgICAgICByZXR1cm4gKHRoaXMuY2x1c3RlcnNbY2VsbENsdXN0ZXJJbmRleF0gPj4+IGNlbGxJbmRleCkgJiAxO1xuICAgIH0sXG59O1xuY29uc3QgQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3J0Zm9saW8tY2FudmFzXCIpO1xuQ0FOVkFTLmhlaWdodCA9IChDRUxMX1NJWkUgKyAxKSAqIFJPV1MgKyAxO1xuQ0FOVkFTLndpZHRoID0gKENFTExfU0laRSArIDEpICogKENPTFVNTlMgLyAyKSArIDE7XG5jb25zdCBDT05URVhUID0gQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBkcmF3Q2VsbHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRpbmdfY29sdW1uID0gVU5JVkVSU0UuY2VsbF9vZmZzZXQoKTtcbiAgICBDT05URVhULmJlZ2luUGF0aCgpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFJPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHN0YXJ0aW5nX2NvbHVtbjsgY29sdW1uIDwgQ09MVU1OUzsgY29sdW1uICs9IDIpIHtcbiAgICAgICAgICAgIENPTlRFWFQuZmlsbFN0eWxlID0gQ0VMTF9DTFVTVEVSUy5nZXRDZWxsVmFsdWUocm93LCBjb2x1bW4pXG4gICAgICAgICAgICAgICAgPyBBTElWRV9DT0xPUlxuICAgICAgICAgICAgICAgIDogREVBRF9DT0xPUjtcbiAgICAgICAgICAgIENPTlRFWFQuZmlsbFJlY3QoY29sdW1uICogKENFTExfU0laRSArIDEpICsgMSwgcm93ICogKENFTExfU0laRSArIDEpICsgMSwgQ0VMTF9TSVpFLCBDRUxMX1NJWkUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIENPTlRFWFQuc3Ryb2tlKCk7XG59O1xuY29uc3Qgc2xlZXAgPSAobXMpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG5jb25zdCByZW5kZXJMb29wID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgVU5JVkVSU0UudGljaygpO1xuICAgIGRyYXdDZWxscygpO1xuICAgIHlpZWxkIHNsZWVwKDUwKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyTG9vcCk7XG59KTtcbmV4cG9ydCB7IHJlbmRlckxvb3AsIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/game-of-life/index.ts\n");

/***/ }),

/***/ "../pkg/portfolio_bg.js":
/*!******************************!*\
  !*** ../pkg/portfolio_bg.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CellPosition\": () => (/* binding */ CellPosition),\n/* harmony export */   \"Universe\": () => (/* binding */ Universe),\n/* harmony export */   \"__wbg_random_7b8246250fd79f60\": () => (/* binding */ __wbg_random_7b8246250fd79f60),\n/* harmony export */   \"__wbindgen_throw\": () => (/* binding */ __wbindgen_throw)\n/* harmony export */ });\n/* harmony import */ var _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./portfolio_bg.wasm */ \"../pkg/portfolio_bg.wasm\");\n/* harmony import */ var _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass CellPosition {\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_cellposition_free(ptr);\n    }\n}\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_universe_free(ptr);\n    }\n    /**\n    * @param {number} rows\n    * @param {number} columns\n    * @returns {Universe}\n    */\n    static new(rows, columns) {\n        var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_new(rows, columns);\n        return Universe.__wrap(ret);\n    }\n    /**\n    */\n    tick() {\n        _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_tick(this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    rows() {\n        var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_rows(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    columns() {\n        var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_columns(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    cell_offset() {\n        var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_cell_offset(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    cell_clusters() {\n        var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_cell_clusters(this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    cells_per_cluster() {\n        var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.universe_cells_per_cluster(this.ptr);\n        return ret >>> 0;\n    }\n}\n\nconst __wbg_random_7b8246250fd79f60 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vcGtnL3BvcnRmb2xpb19iZy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTRDOztBQUU1Qzs7QUFFQSxvREFBb0QsOEJBQThCOztBQUVsRjs7QUFFQTtBQUNBO0FBQ0EseUVBQXlFLDZEQUFrQjtBQUMzRiw4Q0FBOEMsNkRBQWtCO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGVBQWUsbUJBQW1CLE1BQU07QUFDcEU7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHVFQUE0QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLG1FQUF3QjtBQUNoQztBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGtCQUFrQiw0REFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQWtCO0FBQzFCO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGtCQUFrQiw2REFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxrQkFBa0IsZ0VBQXFCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0Esa0JBQWtCLG9FQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGtCQUFrQixzRUFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxrQkFBa0IsMEVBQStCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFTzs7QUFFQTtBQUNQO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGUtd2FzbS1hcHAvLi4vcGtnL3BvcnRmb2xpb19iZy5qcz8yMDRjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhc20gZnJvbSAnLi9wb3J0Zm9saW9fYmcud2FzbSc7XG5cbmNvbnN0IGxUZXh0RGVjb2RlciA9IHR5cGVvZiBUZXh0RGVjb2RlciA9PT0gJ3VuZGVmaW5lZCcgPyAoMCwgbW9kdWxlLnJlcXVpcmUpKCd1dGlsJykuVGV4dERlY29kZXIgOiBUZXh0RGVjb2RlcjtcblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IGxUZXh0RGVjb2RlcigndXRmLTgnLCB7IGlnbm9yZUJPTTogdHJ1ZSwgZmF0YWw6IHRydWUgfSk7XG5cbmNhY2hlZFRleHREZWNvZGVyLmRlY29kZSgpO1xuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeTAgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5MC5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuXG5mdW5jdGlvbiBub3REZWZpbmVkKHdoYXQpIHsgcmV0dXJuICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKGAke3doYXR9IGlzIG5vdCBkZWZpbmVkYCk7IH07IH1cbi8qKlxuKi9cbmV4cG9ydCBjbGFzcyBDZWxsUG9zaXRpb24ge1xuXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLnB0cjtcbiAgICAgICAgdGhpcy5wdHIgPSAwO1xuXG4gICAgICAgIHJldHVybiBwdHI7XG4gICAgfVxuXG4gICAgZnJlZSgpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcbiAgICAgICAgd2FzbS5fX3diZ19jZWxscG9zaXRpb25fZnJlZShwdHIpO1xuICAgIH1cbn1cbi8qKlxuKi9cbmV4cG9ydCBjbGFzcyBVbml2ZXJzZSB7XG5cbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKFVuaXZlcnNlLnByb3RvdHlwZSk7XG4gICAgICAgIG9iai5wdHIgPSBwdHI7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMucHRyO1xuICAgICAgICB0aGlzLnB0ciA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHB0cjtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xuICAgICAgICB3YXNtLl9fd2JnX3VuaXZlcnNlX2ZyZWUocHRyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gcm93c1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbnNcbiAgICAqIEByZXR1cm5zIHtVbml2ZXJzZX1cbiAgICAqL1xuICAgIHN0YXRpYyBuZXcocm93cywgY29sdW1ucykge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS51bml2ZXJzZV9uZXcocm93cywgY29sdW1ucyk7XG4gICAgICAgIHJldHVybiBVbml2ZXJzZS5fX3dyYXAocmV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKi9cbiAgICB0aWNrKCkge1xuICAgICAgICB3YXNtLnVuaXZlcnNlX3RpY2sodGhpcy5wdHIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICByb3dzKCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS51bml2ZXJzZV9yb3dzKHRoaXMucHRyKTtcbiAgICAgICAgcmV0dXJuIHJldCA+Pj4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgY29sdW1ucygpIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20udW5pdmVyc2VfY29sdW1ucyh0aGlzLnB0cik7XG4gICAgICAgIHJldHVybiByZXQgPj4+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIGNlbGxfb2Zmc2V0KCkge1xuICAgICAgICB2YXIgcmV0ID0gd2FzbS51bml2ZXJzZV9jZWxsX29mZnNldCh0aGlzLnB0cik7XG4gICAgICAgIHJldHVybiByZXQgPj4+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIGNlbGxfY2x1c3RlcnMoKSB7XG4gICAgICAgIHZhciByZXQgPSB3YXNtLnVuaXZlcnNlX2NlbGxfY2x1c3RlcnModGhpcy5wdHIpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICAvKipcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBjZWxsc19wZXJfY2x1c3RlcigpIHtcbiAgICAgICAgdmFyIHJldCA9IHdhc20udW5pdmVyc2VfY2VsbHNfcGVyX2NsdXN0ZXIodGhpcy5wdHIpO1xuICAgICAgICByZXR1cm4gcmV0ID4+PiAwO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IF9fd2JnX3JhbmRvbV83YjgyNDYyNTBmZDc5ZjYwID0gdHlwZW9mIE1hdGgucmFuZG9tID09ICdmdW5jdGlvbicgPyBNYXRoLnJhbmRvbSA6IG5vdERlZmluZWQoJ01hdGgucmFuZG9tJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diaW5kZ2VuX3Rocm93KGFyZzAsIGFyZzEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcbn07XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../pkg/portfolio_bg.js\n");

/***/ }),

/***/ "../pkg/portfolio_bg.wasm":
/*!********************************!*\
  !*** ../pkg/portfolio_bg.wasm ***!
  \********************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected character '\u0000' (1:0)\nThe module seem to be a WebAssembly module, but module is not flagged as WebAssembly module for webpack.\nBREAKING CHANGE: Since webpack 5 WebAssembly is not enabled by default and flagged as experimental feature.\nYou need to enable one of the WebAssembly experiments via 'experiments.asyncWebAssembly: true' (based on async modules) or 'experiments.syncWebAssembly: true' (like webpack 4, deprecated).\nFor files that transpile to WebAssembly, make sure to set the module type in the 'module.rules' section of the config (e. g. 'type: \"webassembly/async\"').\n(Source code omitted for this binary file)");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_of_life_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-of-life/index */ \"./src/game-of-life/index.ts\");\n\n\n(0,_game_of_life_index__WEBPACK_IMPORTED_MODULE_0__.renderLoop)();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBa0Q7O0FBRWxELCtEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3JlYXRlLXdhc20tYXBwLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyTG9vcCB9IGZyb20gXCIuL2dhbWUtb2YtbGlmZS9pbmRleFwiO1xuXG5yZW5kZXJMb29wKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

}]);