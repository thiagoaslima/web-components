/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./SidraResearch/SidraResearch.element.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./SidraResearch/SidraResearch.element.ts":
/*!************************************************!*\
  !*** ./SidraResearch/SidraResearch.element.ts ***!
  \************************************************/
/*! exports provided: SidraResearchElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraResearchElement", function() { return SidraResearchElement; });
/* harmony import */ var _helpers_HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/HTMLCustomElement */ "./helpers/HTMLCustomElement.ts");

var attributes;
(function (attributes) {
    attributes["item"] = "item";
    attributes["filter"] = "filter-text";
})(attributes || (attributes = {}));
class SidraResearchElement extends _helpers_HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"] {
    constructor() {
        super(...arguments);
        this._dom = {
            shadowRoot: null
        };
        this._research = {
            raw: {},
            public: {},
        };
    }
    static template({ id, name, tables }) {
        return `
            <h2 research-title research-id="${id}">${name}</h2>
            ${tables.length <= 0 ? "" : `
                <ul>
                    ${tables.map(table => `
                        <li reserach-table table-id="${table.id}">${table.name}</li>
                    `)}
                </ul>
                `} 
        `;
    }
    static get observedAttributes() {
        return Object.keys(attributes);
    }
    set research(research) {
        this._research.raw = research;
        this._research.public = {
            id: this._research.raw.id,
            name: this._research.raw.name,
            tables: this._research.raw.filterTables(this.filterText)
        };
    }
    get research() {
        return this._research.public;
    }
    get filterText() {
        return this.getAttribute(attributes.filter);
    }
    init() {
        this._dom.shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
    }
    render() {
        this._dom.shadowRoot.innerHTML = SidraResearchElement.template(this.research);
    }
    connectedCallback() {
        const researchElement = this.querySelector('research');
        let research;
        if (researchElement) {
            try {
                research = JSON.parse(researchElement.innerHTML);
                this.research = research;
                researchElement.parentElement.removeChild(researchElement);
            }
            catch (err) {
                console.error(`Error parsing the ${researchElement} content.`, err.message);
            }
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'item':
                try {
                    this.research = JSON.parse(this.getAttribute(attributes.item));
                }
                catch (err) {
                    console.error('Erro no parsing do JSON.', err.message);
                }
                break;
        }
    }
}
SidraResearchElement.tagName = 'sidra-research';


/***/ }),

/***/ "./helpers/HTMLCustomElement.ts":
/*!**************************************!*\
  !*** ./helpers/HTMLCustomElement.ts ***!
  \**************************************/
/*! exports provided: HTMLCustomElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLCustomElement", function() { return HTMLCustomElement; });
// DO NOT REMOVE THIS CLASS
// Typescript do not compile WebComponents correctly
// This hack minimizes the errors
class HTMLCustomElement extends HTMLElement {
    //@ts-ignore
    constructor(_) { return (_ = super(_)).init(), _; }
    init() { }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vU2lkcmFSZXNlYXJjaC9TaWRyYVJlc2VhcmNoLmVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9IVE1MQ3VzdG9tRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25FaUU7QUFJakUsSUFBSyxVQUdKO0FBSEQsV0FBSyxVQUFVO0lBQ1gsMkJBQWE7SUFDYixvQ0FBc0I7QUFDMUIsQ0FBQyxFQUhJLFVBQVUsS0FBVixVQUFVLFFBR2Q7QUFFSywwQkFBNEIsU0FBUSw0RUFBaUI7SUFBM0Q7O1FBc0JZLFNBQUksR0FBRztZQUNYLFVBQVUsRUFBRSxJQUFrQjtTQUNqQztRQUVPLGNBQVMsR0FBRztZQUNoQixHQUFHLEVBQUUsRUFBbUI7WUFDeEIsTUFBTSxFQUFFLEVBQW1CO1NBQzlCO0lBc0RMLENBQUM7SUFoRkcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFpQjtRQUMvQyxPQUFPOzhDQUMrQixFQUFFLEtBQUssSUFBSTtjQUU3QyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7c0JBRWYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO3VEQUNZLEtBQUssQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLElBQUk7cUJBQ3pELENBQUM7O2lCQUdWO1NBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssa0JBQWtCO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBV0QsSUFBVyxRQUFRLENBQUMsUUFBdUI7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHO1lBQ3BCLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJO1lBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMxQztJQUN0QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxpQkFBaUI7UUFDYixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELElBQUksUUFBdUIsQ0FBQztRQUM1QixJQUFJLGVBQWUsRUFBRTtZQUNqQixJQUFJO2dCQUNBLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ3pCLGVBQWUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzlEO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsZUFBZSxXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQzthQUM5RTtTQUNKO0lBQ0wsQ0FBQztJQUVELHdCQUF3QixDQUFDLElBQVksRUFBRSxRQUFhLEVBQUUsUUFBYTtRQUMvRCxRQUFPLElBQUksRUFBRTtZQUNULEtBQUssTUFBTTtnQkFDUCxJQUFJO29CQUNBLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNsRTtnQkFBQyxPQUFNLEdBQUcsRUFBRTtvQkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDMUQ7Z0JBQ0QsTUFBTTtTQUViO0lBQ0wsQ0FBQzs7QUFqRk0sNEJBQU8sR0FBRyxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNWdEM7QUFBQSwyQkFBMkI7QUFDM0Isb0RBQW9EO0FBQ3BELGlDQUFpQztBQUUzQix1QkFBeUIsU0FBUSxXQUFXO0lBQzlDLFlBQVk7SUFDWixZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsSUFBSSxLQUFnQyxDQUFDO0NBQ3hDIiwiZmlsZSI6IlNpZHJhUmVzZWFyY2gvU2lkcmFSZXNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL1NpZHJhUmVzZWFyY2gvU2lkcmFSZXNlYXJjaC5lbGVtZW50LnRzXCIpO1xuIiwiaW1wb3J0IHsgSFRNTEN1c3RvbUVsZW1lbnQgfSBmcm9tIFwiLi4vaGVscGVycy9IVE1MQ3VzdG9tRWxlbWVudFwiO1xuaW1wb3J0IHsgU2lkcmFSZXNlYXJjaCB9IGZyb20gXCIuL1NpZHJhUmVzZWFyY2gubW9kZWxcIjtcbmltcG9ydCB7IElTaWRyYVJlc2VhcmNoIH0gZnJvbSBcIi4vU2lkcmFSZXNlYXJjaC5pbnRlcmZhY2VcIjtcblxuZW51bSBhdHRyaWJ1dGVzIHtcbiAgICBpdGVtID0gJ2l0ZW0nLFxuICAgIGZpbHRlciA9ICdmaWx0ZXItdGV4dCdcbn1cblxuZXhwb3J0IGNsYXNzIFNpZHJhUmVzZWFyY2hFbGVtZW50IGV4dGVuZHMgSFRNTEN1c3RvbUVsZW1lbnQge1xuICAgIHN0YXRpYyB0YWdOYW1lID0gJ3NpZHJhLXJlc2VhcmNoJztcblxuICAgIHN0YXRpYyB0ZW1wbGF0ZSh7IGlkLCBuYW1lLCB0YWJsZXMgfTogU2lkcmFSZXNlYXJjaCkge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGgyIHJlc2VhcmNoLXRpdGxlIHJlc2VhcmNoLWlkPVwiJHtpZH1cIj4ke25hbWV9PC9oMj5cbiAgICAgICAgICAgICR7XG4gICAgICAgICAgICB0YWJsZXMubGVuZ3RoIDw9IDAgPyBcIlwiIDogYFxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgJHsgdGFibGVzLm1hcCh0YWJsZSA9PiBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgcmVzZXJhY2gtdGFibGUgdGFibGUtaWQ9XCIke3RhYmxlLmlkfVwiPiR7dGFibGUubmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICBgKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kb20gPSB7XG4gICAgICAgIHNoYWRvd1Jvb3Q6IG51bGwgYXMgU2hhZG93Um9vdFxuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2VhcmNoID0ge1xuICAgICAgICByYXc6IHt9IGFzIFNpZHJhUmVzZWFyY2gsXG4gICAgICAgIHB1YmxpYzoge30gYXMgU2lkcmFSZXNlYXJjaCxcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHJlc2VhcmNoKHJlc2VhcmNoOiBTaWRyYVJlc2VhcmNoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2VhcmNoLnJhdyA9IHJlc2VhcmNoO1xuICAgICAgICB0aGlzLl9yZXNlYXJjaC5wdWJsaWMgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5fcmVzZWFyY2gucmF3LmlkLFxuICAgICAgICAgICAgbmFtZTogdGhpcy5fcmVzZWFyY2gucmF3Lm5hbWUsXG4gICAgICAgICAgICB0YWJsZXM6IHRoaXMuX3Jlc2VhcmNoLnJhdy5maWx0ZXJUYWJsZXModGhpcy5maWx0ZXJUZXh0KVxuICAgICAgICB9IGFzIFNpZHJhUmVzZWFyY2hcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlc2VhcmNoKCk6IFNpZHJhUmVzZWFyY2gge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzZWFyY2gucHVibGljO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZmlsdGVyVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZXMuZmlsdGVyKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLl9kb20uc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nLCBkZWxlZ2F0ZXNGb2N1czogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuX2RvbS5zaGFkb3dSb290LmlubmVySFRNTCA9IFNpZHJhUmVzZWFyY2hFbGVtZW50LnRlbXBsYXRlKHRoaXMucmVzZWFyY2gpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCByZXNlYXJjaEVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3Jlc2VhcmNoJyk7XG5cbiAgICAgICAgbGV0IHJlc2VhcmNoOiBTaWRyYVJlc2VhcmNoO1xuICAgICAgICBpZiAocmVzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc2VhcmNoID0gSlNPTi5wYXJzZShyZXNlYXJjaEVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2VhcmNoID0gcmVzZWFyY2g7XG4gICAgICAgICAgICAgICAgcmVzZWFyY2hFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocmVzZWFyY2hFbGVtZW50KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHBhcnNpbmcgdGhlICR7cmVzZWFyY2hFbGVtZW50fSBjb250ZW50LmAsIGVyci5tZXNzYWdlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZywgb2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICBzd2l0Y2gobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNlYXJjaCA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlcy5pdGVtKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJybyBubyBwYXJzaW5nIGRvIEpTT04uJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLyBETyBOT1QgUkVNT1ZFIFRISVMgQ0xBU1Ncbi8vIFR5cGVzY3JpcHQgZG8gbm90IGNvbXBpbGUgV2ViQ29tcG9uZW50cyBjb3JyZWN0bHlcbi8vIFRoaXMgaGFjayBtaW5pbWl6ZXMgdGhlIGVycm9yc1xuXG5leHBvcnQgY2xhc3MgSFRNTEN1c3RvbUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgY29uc3RydWN0b3IoXykgeyByZXR1cm4gKF8gPSBzdXBlcihfKSkuaW5pdCgpLCBfOyB9XG4gICAgaW5pdCgpIHsgLyogb3ZlcnJpZGUgYXMgeW91IGxpa2UgKi8gfVxufSJdLCJzb3VyY2VSb290IjoiIn0=