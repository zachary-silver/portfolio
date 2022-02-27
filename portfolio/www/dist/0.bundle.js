(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/portfolio.js":
/*!***************************!*\
  !*** ../pkg/portfolio.js ***!
  \***************************/
/*! exports provided: memory, CellPosition, Universe, __wbg_random_7b8246250fd79f60, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./portfolio_bg.wasm */ \"../pkg/portfolio_bg.wasm\");\n/* harmony import */ var _portfolio_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./portfolio_bg.js */ \"../pkg/portfolio_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"memory\", function() { return _portfolio_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"memory\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CellPosition\", function() { return _portfolio_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"CellPosition\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return _portfolio_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Universe\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_7b8246250fd79f60\", function() { return _portfolio_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_random_7b8246250fd79f60\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _portfolio_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/portfolio.js?");

/***/ }),

/***/ "../pkg/portfolio_bg.js":
/*!******************************!*\
  !*** ../pkg/portfolio_bg.js ***!
  \******************************/
/*! exports provided: memory, CellPosition, Universe, __wbg_random_7b8246250fd79f60, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"memory\", function() { return memory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CellPosition\", function() { return CellPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_7b8246250fd79f60\", function() { return __wbg_random_7b8246250fd79f60; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./portfolio_bg.wasm */ \"../pkg/portfolio_bg.wasm\");\n\n\nconst memory = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"];\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n   if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n      cachegetUint8Memory0 = new Uint8Array(_portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n   }\n   return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n   return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass CellPosition {\n\n   __destroy_into_raw() {\n      const ptr = this.ptr;\n      this.ptr = 0;\n\n      return ptr;\n   }\n\n   free() {\n      const ptr = this.__destroy_into_raw();\n      _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_cellposition_free\"](ptr);\n   }\n}\n/**\n*/\nclass Universe {\n\n   static __wrap(ptr) {\n      const obj = Object.create(Universe.prototype);\n      obj.ptr = ptr;\n\n      return obj;\n   }\n\n   __destroy_into_raw() {\n      const ptr = this.ptr;\n      this.ptr = 0;\n\n      return ptr;\n   }\n\n   free() {\n      const ptr = this.__destroy_into_raw();\n      _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n   }\n   /**\n   * @param {number} rows\n   * @param {number} columns\n   * @returns {Universe}\n   */\n   static new(rows, columns) {\n      var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"](rows, columns);\n      return Universe.__wrap(ret);\n   }\n   /**\n   */\n   tick() {\n      _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n   }\n   /**\n   * @returns {number}\n   */\n   rows() {\n      var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_rows\"](this.ptr);\n      return ret >>> 0;\n   }\n   /**\n   * @returns {number}\n   */\n   columns() {\n      var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_columns\"](this.ptr);\n      return ret >>> 0;\n   }\n   /**\n   * @returns {number}\n   */\n   cell_offset() {\n      var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cell_offset\"](this.ptr);\n      return ret >>> 0;\n   }\n   /**\n   * @returns {number}\n   */\n   cell_clusters() {\n      var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cell_clusters\"](this.ptr);\n      return ret;\n   }\n   /**\n   * @returns {number}\n   */\n   cells_per_cluster() {\n      var ret = _portfolio_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells_per_cluster\"](this.ptr);\n      return ret >>> 0;\n   }\n}\n\nconst __wbg_random_7b8246250fd79f60 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nfunction __wbindgen_throw(arg0, arg1) {\n   throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/portfolio_bg.js?");

/***/ }),

/***/ "../pkg/portfolio_bg.wasm":
/*!********************************!*\
  !*** ../pkg/portfolio_bg.wasm ***!
  \********************************/
/*! exports provided: memory, __wbg_universe_free, __wbg_cellposition_free, universe_new, universe_tick, universe_rows, universe_columns, universe_cell_offset, universe_cell_clusters, universe_cells_per_cluster */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./portfolio_bg.js */ \"../pkg/portfolio_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/portfolio_bg.wasm?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var portfolio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! portfolio */ \"../pkg/portfolio.js\");\n/* harmony import */ var portfolio_portfolio_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! portfolio/portfolio_bg */ \"../pkg/portfolio_bg.js\");\n\n\n\n\n// interface CellClusterArray {\n//    getCellValue: (row: number, column: number) => number;\n//    clusters: Uint8Array;\n// };\n\nconst CELL_SIZE = 1; // pixels\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\n\nconst UNIVERSE = portfolio__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new(512, 1024);\nconst ROWS = UNIVERSE.rows();\nconst COLUMNS = UNIVERSE.columns();\nconst CELLS_PER_CLUSTER = UNIVERSE.cells_per_cluster();\nconst CELL_CLUSTERS = {\n   clusters: new Uint8Array(\n      portfolio_portfolio_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer,\n      UNIVERSE.cell_clusters(),\n      Math.ceil(ROWS * COLUMNS / CELLS_PER_CLUSTER)\n   ),\n   getCellValue: function(row, column) {\n      const cellNumber = row * COLUMNS + column;\n      const cellClusterIndex = Math.floor(cellNumber / CELLS_PER_CLUSTER);\n      const cellIndex = cellNumber % CELLS_PER_CLUSTER;\n      return (this.clusters[cellClusterIndex] >>> cellIndex) & 1;\n   },\n};\n\nconst CANVAS = document.getElementById(\"portfolio-canvas\");\nCANVAS.height = (CELL_SIZE + 1) * ROWS + 1;\nCANVAS.width = (CELL_SIZE + 1) * (COLUMNS / 2) + 1;\n\nconst CONTEXT = CANVAS.getContext('2d');\n\nconst sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nconst renderLoop = async () => {\n   UNIVERSE.tick();\n\n   drawCells();\n   await sleep(50);\n\n   requestAnimationFrame(renderLoop);\n};\n\nconst drawCells = () => {\n   const starting_column = UNIVERSE.cell_offset();\n\n   CONTEXT.beginPath();\n\n   for (let row = 0; row < ROWS; row++) {\n      for (let column = starting_column; column < COLUMNS; column += 2) {\n         CONTEXT.fillStyle = CELL_CLUSTERS.getCellValue(row, column)\n            ? ALIVE_COLOR\n            : DEAD_COLOR;\n         CONTEXT.fillRect(\n            column * (CELL_SIZE + 1) + 1,\n            row * (CELL_SIZE + 1) + 1,\n            CELL_SIZE,\n            CELL_SIZE\n         );\n      }\n   }\n\n   CONTEXT.stroke();\n};\n\nrequestAnimationFrame(renderLoop);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

}]);