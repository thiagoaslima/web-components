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
/******/ 	return __webpack_require__(__webpack_require__.s = "./services/index.ts");
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

/***/ "./SidraResearch/SidraResearch.model.ts":
/*!**********************************************!*\
  !*** ./SidraResearch/SidraResearch.model.ts ***!
  \**********************************************/
/*! exports provided: SidraResearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraResearch", function() { return SidraResearch; });
/* harmony import */ var _helpers_latinize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/latinize */ "./helpers/latinize.ts");

class SidraResearch {
    static convert(params) {
        return {
            id: params.id,
            name: params.nome,
            alias: SidraResearch.alterName(params.nome),
            tables: params.agregados.map(({ id, nome }) => ({ id: parseInt(id, 10), name: nome, alias: SidraResearch.alterName(nome) }))
        };
    }
    static alterName(name) {
        return Object(_helpers_latinize__WEBPACK_IMPORTED_MODULE_0__["latinize"])(name).toLowerCase();
    }
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.alias = params.alias;
        this.tables = params.tables;
        this.tables.forEach(Object.freeze);
        Object.freeze(this);
    }
    filterTables(term) {
        const _term = SidraResearch.alterName(term);
        return this.tables.filter(table => table.alias.includes(_term));
    }
    getTable(id) {
        return this.tables.find(table => table.id === id);
    }
}


/***/ }),

/***/ "./SidraResearch/index.ts":
/*!********************************!*\
  !*** ./SidraResearch/index.ts ***!
  \********************************/
/*! exports provided: SidraResearch, SidraResearchElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidraResearch_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidraResearch.element */ "./SidraResearch/SidraResearch.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidraResearchElement", function() { return _SidraResearch_element__WEBPACK_IMPORTED_MODULE_0__["SidraResearchElement"]; });

/* harmony import */ var _SidraResearch_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidraResearch.model */ "./SidraResearch/SidraResearch.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidraResearch", function() { return _SidraResearch_model__WEBPACK_IMPORTED_MODULE_1__["SidraResearch"]; });



customElements.define(_SidraResearch_element__WEBPACK_IMPORTED_MODULE_0__["SidraResearchElement"].tagName, _SidraResearch_element__WEBPACK_IMPORTED_MODULE_0__["SidraResearchElement"]);



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


/***/ }),

/***/ "./helpers/latinize.ts":
/*!*****************************!*\
  !*** ./helpers/latinize.ts ***!
  \*****************************/
/*! exports provided: latinize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latinize", function() { return latinize; });
// http://semplicewebsites.com/sites/default/files/latinise.js_.txt
// Generated from latin_map.pl Sun Jun 20 20:17:18 2010
const charMap = {
    'Ã': 'A',
    'Ä‚': 'A',
    'áº®': 'A',
    'áº¶': 'A',
    'áº°': 'A',
    'áº²': 'A',
    'áº´': 'A',
    'Ç': 'A',
    'Ã‚': 'A',
    'áº¤': 'A',
    'áº¬': 'A',
    'áº¦': 'A',
    'áº¨': 'A',
    'áºª': 'A',
    'Ã„': 'A',
    'Çž': 'A',
    'È¦': 'A',
    'Ç ': 'A',
    'áº ': 'A',
    'È€': 'A',
    'Ã€': 'A',
    'áº¢': 'A',
    'È‚': 'A',
    'Ä€': 'A',
    'Ä„': 'A',
    'Ã…': 'A',
    'Çº': 'A',
    'á¸€': 'A',
    'Èº': 'A',
    'Ãƒ': 'A',
    'êœ²': 'AA',
    'Ã†': 'AE',
    'Ç¼': 'AE',
    'Ç¢': 'AE',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER AFRICAN D' (Æ‰)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER ALPHA' (â±­)
    'êœ´': 'AO',
    'êœ¶': 'AU',
    'êœ¸': 'AV',
    'êœº': 'AV',
    'êœ¼': 'AY',
    'á¸‚': 'B',
    'á¸„': 'B',
    'Æ': 'B',
    'á¸†': 'B',
    'Éƒ': 'B',
    'Æ‚': 'B',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER BROKEN L' (ê†)
    'Ä†': 'C',
    'ÄŒ': 'C',
    'Ã‡': 'C',
    'á¸ˆ': 'C',
    'Äˆ': 'C',
    'ÄŠ': 'C',
    'Æ‡': 'C',
    'È»': 'C',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER CON' (ê®)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER CUATRILLO' (êœ¬)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER CUATRILLO WITH COMMA' (êœ®)
    'ÄŽ': 'D',
    'á¸': 'D',
    'á¸’': 'D',
    'á¸Š': 'D',
    'á¸Œ': 'D',
    'ÆŠ': 'D',
    'á¸Ž': 'D',
    'Ç²': 'D',
    'Ç…': 'D',
    'Ä': 'D',
    'Æ‹': 'D',
    'Ç±': 'DZ',
    'Ç„': 'DZ',
    'Ã‰': 'E',
    'Ä”': 'E',
    'Äš': 'E',
    'È¨': 'E',
    'á¸œ': 'E',
    'ÃŠ': 'E',
    'áº¾': 'E',
    'á»†': 'E',
    'á»€': 'E',
    'á»‚': 'E',
    'á»„': 'E',
    'á¸˜': 'E',
    'Ã‹': 'E',
    'Ä–': 'E',
    'áº¸': 'E',
    'È„': 'E',
    'Ãˆ': 'E',
    'áºº': 'E',
    'È†': 'E',
    'Ä’': 'E',
    'á¸–': 'E',
    'á¸”': 'E',
    'Ä˜': 'E',
    'É†': 'E',
    'áº¼': 'E',
    'á¸š': 'E',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER EGYPTOLOGICAL AIN' (êœ¤)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER EGYPTOLOGICAL ALEF' (êœ¢)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER ENG' (ÅŠ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER ESH' (Æ©)
    'êª': 'ET',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER ETH' (Ã)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER EZH' (Æ·)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER EZH REVERSED' (Æ¸)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER EZH WITH CARON' (Ç®)
    'á¸ž': 'F',
    'Æ‘': 'F',
    'Ç´': 'G',
    'Äž': 'G',
    'Ç¦': 'G',
    'Ä¢': 'G',
    'Äœ': 'G',
    'Ä ': 'G',
    'Æ“': 'G',
    'á¸ ': 'G',
    'Ç¤': 'G',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER GAMMA' (Æ”)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER GLOTTAL STOP' (É)
    'á¸ª': 'H',
    'Èž': 'H',
    'á¸¨': 'H',
    'Ä¤': 'H',
    'â±§': 'H',
    'á¸¦': 'H',
    'á¸¢': 'H',
    'á¸¤': 'H',
    'Ä¦': 'H',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER HALF H' (â±µ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER HENG' (êœ¦)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER HWAIR' (Ç¶)
    'Ã': 'I',
    'Ä¬': 'I',
    'Ç': 'I',
    'ÃŽ': 'I',
    'Ã': 'I',
    'á¸®': 'I',
    'Ä°': 'I',
    'á»Š': 'I',
    'Èˆ': 'I',
    'ÃŒ': 'I',
    'á»ˆ': 'I',
    'ÈŠ': 'I',
    'Äª': 'I',
    'Ä®': 'I',
    'Æ—': 'I',
    'Ä¨': 'I',
    'á¸¬': 'I',
    'ê¹': 'D',
    'ê»': 'F',
    'ê½': 'G',
    'êž‚': 'R',
    'êž„': 'S',
    'êž†': 'T',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER IOTA' (Æ–)
    'ê¬': 'IS',
    'Ä´': 'J',
    'Éˆ': 'J',
    'á¸°': 'K',
    'Ç¨': 'K',
    'Ä¶': 'K',
    'â±©': 'K',
    'ê‚': 'K',
    'á¸²': 'K',
    'Æ˜': 'K',
    'á¸´': 'K',
    'ê€': 'K',
    'ê„': 'K',
    'Ä¹': 'L',
    'È½': 'L',
    'Ä½': 'L',
    'Ä»': 'L',
    'á¸¼': 'L',
    'á¸¶': 'L',
    'á¸¸': 'L',
    'â± ': 'L',
    'êˆ': 'L',
    'á¸º': 'L',
    'Ä¿': 'L',
    'â±¢': 'L',
    'Çˆ': 'L',
    'Å': 'L',
    'Ç‡': 'LJ',
    'á¸¾': 'M',
    'á¹€': 'M',
    'á¹‚': 'M',
    'â±®': 'M',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER MIDDLE-WELSH LL' (á»º)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER MIDDLE-WELSH V' (á»¼)
    'Åƒ': 'N',
    'Å‡': 'N',
    'Å…': 'N',
    'á¹Š': 'N',
    'á¹„': 'N',
    'á¹†': 'N',
    'Ç¸': 'N',
    'Æ': 'N',
    'á¹ˆ': 'N',
    'È ': 'N',
    'Ç‹': 'N',
    'Ã‘': 'N',
    'ÇŠ': 'NJ',
    'Ã“': 'O',
    'ÅŽ': 'O',
    'Ç‘': 'O',
    'Ã”': 'O',
    'á»': 'O',
    'á»˜': 'O',
    'á»’': 'O',
    'á»”': 'O',
    'á»–': 'O',
    'Ã–': 'O',
    'Èª': 'O',
    'È®': 'O',
    'È°': 'O',
    'á»Œ': 'O',
    'Å': 'O',
    'ÈŒ': 'O',
    'Ã’': 'O',
    'á»Ž': 'O',
    'Æ ': 'O',
    'á»š': 'O',
    'á»¢': 'O',
    'á»œ': 'O',
    'á»ž': 'O',
    'á» ': 'O',
    'ÈŽ': 'O',
    'êŠ': 'O',
    'êŒ': 'O',
    'ÅŒ': 'O',
    'á¹’': 'O',
    'á¹': 'O',
    'ÆŸ': 'O',
    'Çª': 'O',
    'Ç¬': 'O',
    'Ã˜': 'O',
    'Ç¾': 'O',
    'Ã•': 'O',
    'á¹Œ': 'O',
    'á¹Ž': 'O',
    'È¬': 'O',
    'Æ¢': 'OI',
    'êŽ': 'OO',
    'Æ': 'E',
    'Æ†': 'O',
    'È¢': 'OU',
    'á¹”': 'P',
    'á¹–': 'P',
    'ê’': 'P',
    'Æ¤': 'P',
    'ê”': 'P',
    'â±£': 'P',
    'ê': 'P',
    'ê˜': 'Q',
    'ê–': 'Q',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER R ROTUNDA' (êš)
    'Å”': 'R',
    'Å˜': 'R',
    'Å–': 'R',
    'á¹˜': 'R',
    'á¹š': 'R',
    'á¹œ': 'R',
    'È': 'R',
    'È’': 'R',
    'á¹ž': 'R',
    'ÉŒ': 'R',
    'â±¤': 'R',
    'êœ¾': 'C',
    'ÆŽ': 'E',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER RUM ROTUNDA' (êœ)
    'Åš': 'S',
    'á¹¤': 'S',
    'Å ': 'S',
    'á¹¦': 'S',
    'Åž': 'S',
    'Åœ': 'S',
    'È˜': 'S',
    'á¹ ': 'S',
    'á¹¢': 'S',
    'á¹¨': 'S',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER SALTILLO' (êž‹)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER SCHWA' (Æ)
    'áºž': 'SS',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER SMALL Q WITH HOOK TAIL' (ÉŠ)
    'Å¤': 'T',
    'Å¢': 'T',
    'á¹°': 'T',
    'Èš': 'T',
    'È¾': 'T',
    'á¹ª': 'T',
    'á¹¬': 'T',
    'Æ¬': 'T',
    'á¹®': 'T',
    'Æ®': 'T',
    'Å¦': 'T',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER THORN' (Ãž)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER THORN WITH STROKE' (ê¤)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER THORN WITH STROKE THROUGH DESCENDER' (ê¦)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER TONE FIVE' (Æ¼)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER TONE SIX' (Æ„)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER TONE TWO' (Æ§)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER TRESILLO' (êœª)
    'â±¯': 'A',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER TURNED INSULAR G' (ê¾)
    'êž€': 'L',
    'Æœ': 'M',
    'É…': 'V',
    'êœ¨': 'TZ',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER U BAR' (É„)
    'Ãš': 'U',
    'Å¬': 'U',
    'Ç“': 'U',
    'Ã›': 'U',
    'á¹¶': 'U',
    'Ãœ': 'U',
    'Ç—': 'U',
    'Ç™': 'U',
    'Ç›': 'U',
    'Ç•': 'U',
    'á¹²': 'U',
    'á»¤': 'U',
    'Å°': 'U',
    'È”': 'U',
    'Ã™': 'U',
    'á»¦': 'U',
    'Æ¯': 'U',
    'á»¨': 'U',
    'á»°': 'U',
    'á»ª': 'U',
    'á»¬': 'U',
    'á»®': 'U',
    'È–': 'U',
    'Åª': 'U',
    'á¹º': 'U',
    'Å²': 'U',
    'Å®': 'U',
    'Å¨': 'U',
    'á¹¸': 'U',
    'á¹´': 'U',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER UPSILON' (Æ±)
    'êž': 'V',
    'á¹¾': 'V',
    'Æ²': 'V',
    'á¹¼': 'V',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER VEND' (ê¨)
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER VISIGOTHIC Z' (ê¢)
    'ê ': 'VY',
    'áº‚': 'W',
    'Å´': 'W',
    'áº„': 'W',
    'áº†': 'W',
    'áºˆ': 'W',
    'áº€': 'W',
    'â±²': 'W',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER WYNN' (Ç·)
    'áºŒ': 'X',
    'áºŠ': 'X',
    'Ã': 'Y',
    'Å¶': 'Y',
    'Å¸': 'Y',
    'áºŽ': 'Y',
    'á»´': 'Y',
    'á»²': 'Y',
    'Æ³': 'Y',
    'á»¶': 'Y',
    'á»¾': 'Y',
    'È²': 'Y',
    'ÉŽ': 'Y',
    'á»¸': 'Y',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CAPITAL LETTER YOGH' (Èœ)
    'Å¹': 'Z',
    'Å½': 'Z',
    'áº': 'Z',
    'â±«': 'Z',
    'Å»': 'Z',
    'áº’': 'Z',
    'È¤': 'Z',
    'áº”': 'Z',
    'Æµ': 'Z',
    'Ä²': 'IJ',
    'Å’': 'OE',
    // CANNOT FIND APPROXIMATION FOR 'LATIN CROSS' (âœ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN EPIGRAPHIC LETTER ARCHAIC M' (êŸ¿)
    // CANNOT FIND APPROXIMATION FOR 'LATIN EPIGRAPHIC LETTER I LONGA' (êŸ¾)
    // CANNOT FIND APPROXIMATION FOR 'LATIN EPIGRAPHIC LETTER INVERTED M' (êŸ½)
    // CANNOT FIND APPROXIMATION FOR 'LATIN EPIGRAPHIC LETTER REVERSED F' (êŸ»)
    // CANNOT FIND APPROXIMATION FOR 'LATIN EPIGRAPHIC LETTER REVERSED P' (êŸ¼)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER AIN' (á´¥)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER ALVEOLAR CLICK' (Ç‚)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER BIDENTAL PERCUSSIVE' (Ê­)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER BILABIAL CLICK' (Ê˜)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER BILABIAL PERCUSSIVE' (Ê¬)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER DENTAL CLICK' (Ç€)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER GLOTTAL STOP' (Ê”)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER GLOTTAL STOP WITH STROKE' (Ê¡)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER INVERTED GLOTTAL STOP' (Ê–)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER INVERTED GLOTTAL STOP WITH STROKE' (Æ¾)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER LATERAL CLICK' (Ç)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER PHARYNGEAL VOICED FRICATIVE' (Ê•)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER RETROFLEX CLICK' (Çƒ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER REVERSED ESH LOOP' (Æª)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER REVERSED GLOTTAL STOP WITH STROKE' (Ê¢)
    'á´€': 'A',
    'á´': 'AE',
    'Ê™': 'B',
    'á´ƒ': 'B',
    'á´„': 'C',
    'á´…': 'D',
    'á´‡': 'E',
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER SMALL CAPITAL ETH' (á´†)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER SMALL CAPITAL EZH' (á´£)
    'êœ°': 'F',
    'É¢': 'G',
    'Ê›': 'G',
    'Êœ': 'H',
    'Éª': 'I',
    'Ê': 'R',
    'á´Š': 'J',
    'á´‹': 'K',
    'ÊŸ': 'L',
    'á´Œ': 'L',
    'á´': 'M',
    'É´': 'N',
    'á´': 'O',
    'É¶': 'OE',
    'á´': 'O',
    'á´•': 'OU',
    'á´˜': 'P',
    'Ê€': 'R',
    'á´Ž': 'N',
    'á´™': 'R',
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER SMALL CAPITAL RUM' (ê¶)
    'êœ±': 'S',
    'á´›': 'T',
    'â±»': 'E',
    'á´š': 'R',
    'á´œ': 'U',
    'á´ ': 'V',
    'á´¡': 'W',
    'Ê': 'Y',
    'á´¢': 'Z',
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER STRETCHED C' (Ê—)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER TWO WITH STROKE' (Æ»)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER VOICED LARYNGEAL SPIRANT' (á´¤)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER WYNN' (Æ¿)
    // CANNOT FIND APPROXIMATION FOR 'LATIN LETTER YR' (Æ¦)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL CAPITAL LETTER I WITH STROKE' (áµ»)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL CAPITAL LETTER U WITH STROKE' (áµ¾)
    'Ã¡': 'a',
    'Äƒ': 'a',
    'áº¯': 'a',
    'áº·': 'a',
    'áº±': 'a',
    'áº³': 'a',
    'áºµ': 'a',
    'ÇŽ': 'a',
    'Ã¢': 'a',
    'áº¥': 'a',
    'áº­': 'a',
    'áº§': 'a',
    'áº©': 'a',
    'áº«': 'a',
    'Ã¤': 'a',
    'ÇŸ': 'a',
    'È§': 'a',
    'Ç¡': 'a',
    'áº¡': 'a',
    'È': 'a',
    'Ã ': 'a',
    'áº£': 'a',
    'Èƒ': 'a',
    'Ä': 'a',
    'Ä…': 'a',
    'á¶': 'a',
    'áºš': 'a',
    'Ã¥': 'a',
    'Ç»': 'a',
    'á¸': 'a',
    'â±¥': 'a',
    'Ã£': 'a',
    'êœ³': 'aa',
    'Ã¦': 'ae',
    'Ç½': 'ae',
    'Ç£': 'ae',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ALPHA' (É‘)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ALPHA WITH RETROFLEX HOOK' (á¶)
    'êœµ': 'ao',
    'êœ·': 'au',
    'êœ¹': 'av',
    'êœ»': 'av',
    'êœ½': 'ay',
    'á¸ƒ': 'b',
    'á¸…': 'b',
    'É“': 'b',
    'á¸‡': 'b',
    'áµ¬': 'b',
    'á¶€': 'b',
    'Æ€': 'b',
    'Æƒ': 'b',
    'Éµ': 'o',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER BOTTOM HALF O' (á´—)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER BROKEN L' (ê‡)
    'Ä‡': 'c',
    'Ä': 'c',
    'Ã§': 'c',
    'á¸‰': 'c',
    'Ä‰': 'c',
    'É•': 'c',
    'Ä‹': 'c',
    'Æˆ': 'c',
    'È¼': 'c',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER CLOSED OMEGA' (É·)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER CLOSED OPEN E' (Êš)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER CLOSED REVERSED OPEN E' (Éž)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER CON' (ê¯)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER CUATRILLO' (êœ­)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER CUATRILLO WITH COMMA' (êœ¯)
    'Ä': 'd',
    'á¸‘': 'd',
    'á¸“': 'd',
    'È¡': 'd',
    'á¸‹': 'd',
    'á¸': 'd',
    'É—': 'd',
    'á¶‘': 'd',
    'á¸': 'd',
    'áµ­': 'd',
    'á¶': 'd',
    'Ä‘': 'd',
    'É–': 'd',
    'ÆŒ': 'd',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER DB DIGRAPH' (È¸)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER DELTA' (áºŸ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER DEZH DIGRAPH' (Ê¤)
    'Ä±': 'i',
    'È·': 'j',
    'ÉŸ': 'j',
    'Ê„': 'j',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER DUM' (ê±)
    'Ç³': 'dz',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER DZ DIGRAPH' (Ê£)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER DZ DIGRAPH WITH CURL' (Ê¥)
    'Ç†': 'dz',
    'Ã©': 'e',
    'Ä•': 'e',
    'Ä›': 'e',
    'È©': 'e',
    'á¸': 'e',
    'Ãª': 'e',
    'áº¿': 'e',
    'á»‡': 'e',
    'á»': 'e',
    'á»ƒ': 'e',
    'á»…': 'e',
    'á¸™': 'e',
    'Ã«': 'e',
    'Ä—': 'e',
    'áº¹': 'e',
    'È…': 'e',
    'Ã¨': 'e',
    'áº»': 'e',
    'È‡': 'e',
    'Ä“': 'e',
    'á¸—': 'e',
    'á¸•': 'e',
    'â±¸': 'e',
    'Ä™': 'e',
    'á¶’': 'e',
    'É‡': 'e',
    'áº½': 'e',
    'á¸›': 'e',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EGYPTOLOGICAL AIN' (êœ¥)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EGYPTOLOGICAL ALEF' (êœ£)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ENG' (Å‹)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ESH' (Êƒ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ESH WITH CURL' (Ê†)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ESH WITH PALATAL HOOK' (á¶‹)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ESH WITH RETROFLEX HOOK' (á¶˜)
    'ê«': 'et',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER ETH' (Ã°)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EZH' (Ê’)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EZH REVERSED' (Æ¹)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EZH WITH CARON' (Ç¯)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EZH WITH CURL' (Ê“)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EZH WITH RETROFLEX HOOK' (á¶š)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER EZH WITH TAIL' (Æº)
    'á¸Ÿ': 'f',
    'Æ’': 'f',
    'áµ®': 'f',
    'á¶‚': 'f',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER FENG DIGRAPH' (Ê©)
    'Çµ': 'g',
    'ÄŸ': 'g',
    'Ç§': 'g',
    'Ä£': 'g',
    'Ä': 'g',
    'Ä¡': 'g',
    'É ': 'g',
    'á¸¡': 'g',
    'á¶ƒ': 'g',
    'Ç¥': 'g',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER GAMMA' (É£)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER GLOTTAL STOP' (É‚)
    'á¸«': 'h',
    'ÈŸ': 'h',
    'á¸©': 'h',
    'Ä¥': 'h',
    'â±¨': 'h',
    'á¸§': 'h',
    'á¸£': 'h',
    'á¸¥': 'h',
    'É¦': 'h',
    'áº–': 'h',
    'Ä§': 'h',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER HALF H' (â±¶)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER HENG' (êœ§)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER HENG WITH HOOK' (É§)
    'Æ•': 'hv',
    'Ã­': 'i',
    'Ä­': 'i',
    'Ç': 'i',
    'Ã®': 'i',
    'Ã¯': 'i',
    'á¸¯': 'i',
    'á»‹': 'i',
    'È‰': 'i',
    'Ã¬': 'i',
    'á»‰': 'i',
    'È‹': 'i',
    'Ä«': 'i',
    'Ä¯': 'i',
    'á¶–': 'i',
    'É¨': 'i',
    'Ä©': 'i',
    'á¸­': 'i',
    'êº': 'd',
    'ê¼': 'f',
    'áµ¹': 'g',
    'êžƒ': 'r',
    'êž…': 's',
    'êž‡': 't',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER IOTA' (É©)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER IOTA WITH STROKE' (áµ¼)
    'ê­': 'is',
    'Ç°': 'j',
    'Äµ': 'j',
    'Ê': 'j',
    'É‰': 'j',
    'á¸±': 'k',
    'Ç©': 'k',
    'Ä·': 'k',
    'â±ª': 'k',
    'êƒ': 'k',
    'á¸³': 'k',
    'Æ™': 'k',
    'á¸µ': 'k',
    'á¶„': 'k',
    'ê': 'k',
    'ê…': 'k',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER KRA' (Ä¸)
    'Äº': 'l',
    'Æš': 'l',
    'É¬': 'l',
    'Ä¾': 'l',
    'Ä¼': 'l',
    'á¸½': 'l',
    'È´': 'l',
    'á¸·': 'l',
    'á¸¹': 'l',
    'â±¡': 'l',
    'ê‰': 'l',
    'á¸»': 'l',
    'Å€': 'l',
    'É«': 'l',
    'á¶…': 'l',
    'É­': 'l',
    'Å‚': 'l',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER LAMBDA WITH STROKE' (Æ›)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER LEZH' (É®)
    'Ç‰': 'lj',
    'Å¿': 's',
    'áºœ': 's',
    'áº›': 's',
    'áº': 's',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER LS DIGRAPH' (Êª)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER LUM' (ê²)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER LZ DIGRAPH' (Ê«)
    'á¸¿': 'm',
    'á¹': 'm',
    'á¹ƒ': 'm',
    'É±': 'm',
    'áµ¯': 'm',
    'á¶†': 'm',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER MIDDLE-WELSH LL' (á»»)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER MIDDLE-WELSH V' (á»½)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER MUM' (ê³)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER N PRECEDED BY APOSTROPHE' (Å‰)
    'Å„': 'n',
    'Åˆ': 'n',
    'Å†': 'n',
    'á¹‹': 'n',
    'Èµ': 'n',
    'á¹…': 'n',
    'á¹‡': 'n',
    'Ç¹': 'n',
    'É²': 'n',
    'á¹‰': 'n',
    'Æž': 'n',
    'áµ°': 'n',
    'á¶‡': 'n',
    'É³': 'n',
    'Ã±': 'n',
    'ÇŒ': 'nj',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER NUM' (ê´)
    'Ã³': 'o',
    'Å': 'o',
    'Ç’': 'o',
    'Ã´': 'o',
    'á»‘': 'o',
    'á»™': 'o',
    'á»“': 'o',
    'á»•': 'o',
    'á»—': 'o',
    'Ã¶': 'o',
    'È«': 'o',
    'È¯': 'o',
    'È±': 'o',
    'á»': 'o',
    'Å‘': 'o',
    'È': 'o',
    'Ã²': 'o',
    'á»': 'o',
    'Æ¡': 'o',
    'á»›': 'o',
    'á»£': 'o',
    'á»': 'o',
    'á»Ÿ': 'o',
    'á»¡': 'o',
    'È': 'o',
    'ê‹': 'o',
    'ê': 'o',
    'â±º': 'o',
    'Å': 'o',
    'á¹“': 'o',
    'á¹‘': 'o',
    'Ç«': 'o',
    'Ç­': 'o',
    'Ã¸': 'o',
    'Ç¿': 'o',
    'Ãµ': 'o',
    'á¹': 'o',
    'á¹': 'o',
    'È­': 'o',
    'Æ£': 'oi',
    'ê': 'oo',
    'É›': 'e',
    'á¶“': 'e',
    'É”': 'o',
    'á¶—': 'o',
    'È£': 'ou',
    'á¹•': 'p',
    'á¹—': 'p',
    'ê“': 'p',
    'Æ¥': 'p',
    'áµ±': 'p',
    'á¶ˆ': 'p',
    'ê•': 'p',
    'áµ½': 'p',
    'ê‘': 'p',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER PHI' (É¸)
    'ê™': 'q',
    'Ê ': 'q',
    'É‹': 'q',
    'ê—': 'q',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER QP DIGRAPH' (È¹)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER R ROTUNDA' (ê›)
    'Å•': 'r',
    'Å™': 'r',
    'Å—': 'r',
    'á¹™': 'r',
    'á¹›': 'r',
    'á¹': 'r',
    'È‘': 'r',
    'É¾': 'r',
    'áµ³': 'r',
    'È“': 'r',
    'á¹Ÿ': 'r',
    'É¼': 'r',
    'áµ²': 'r',
    'á¶‰': 'r',
    'É': 'r',
    'É½': 'r',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER RAMS HORN' (É¤)
    'â†„': 'c',
    'êœ¿': 'c',
    'É˜': 'e',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER REVERSED OPEN E' (Éœ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER REVERSED OPEN E WITH HOOK' (É)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER REVERSED OPEN E WITH RETROFLEX HOOK' (á¶”)
    'É¿': 'r',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER RUM' (êµ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER RUM ROTUNDA' (ê)
    'Å›': 's',
    'á¹¥': 's',
    'Å¡': 's',
    'á¹§': 's',
    'ÅŸ': 's',
    'Å': 's',
    'È™': 's',
    'á¹¡': 's',
    'á¹£': 's',
    'á¹©': 's',
    'Ê‚': 's',
    'áµ´': 's',
    'á¶Š': 's',
    'È¿': 's',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SALTILLO' (êžŒ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SCHWA' (É™)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SCHWA WITH HOOK' (Éš)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SCHWA WITH RETROFLEX HOOK' (á¶•)
    'É¡': 'g',
    'ÃŸ': 'ss',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SIDEWAYS DIAERESIZED U' (á´ž)
    'á´‘': 'o',
    'á´“': 'o',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SIDEWAYS OPEN O' (á´’)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SIDEWAYS TURNED M' (á´Ÿ)
    'á´': 'u',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER SQUAT REVERSED ESH' (Ê…)
    'Å¥': 't',
    'Å£': 't',
    'á¹±': 't',
    'È›': 't',
    'È¶': 't',
    'áº—': 't',
    'â±¦': 't',
    'á¹«': 't',
    'á¹­': 't',
    'Æ­': 't',
    'á¹¯': 't',
    'áµµ': 't',
    'Æ«': 't',
    'Êˆ': 't',
    'Å§': 't',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TAILLESS PHI' (â±·)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TC DIGRAPH WITH CURL' (Ê¨)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TESH DIGRAPH' (Ê§)
    'áµº': 'th',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER THORN' (Ã¾)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER THORN WITH STROKE' (ê¥)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER THORN WITH STROKE THROUGH DESCENDER' (ê§)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TONE FIVE' (Æ½)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TONE SIX' (Æ…)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TONE TWO' (Æ¨)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TOP HALF O' (á´–)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TRESILLO' (êœ«)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TS DIGRAPH' (Ê¦)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TUM' (ê·)
    'É': 'a',
    'á´‚': 'ae',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TURNED ALPHA' (É’)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TURNED DELTA' (Æ)
    'Ç': 'e',
    'áµ·': 'g',
    'É¥': 'h',
    'Ê®': 'h',
    'Ê¯': 'h',
    'á´‰': 'i',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TURNED INSULAR G' (ê¿)
    'Êž': 'k',
    'êž': 'l',
    'É¯': 'm',
    'É°': 'm',
    'á´”': 'oe',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER TURNED OPEN E' (á´ˆ)
    'É¹': 'r',
    'É»': 'r',
    'Éº': 'r',
    'â±¹': 'r',
    'Ê‡': 't',
    'ÊŒ': 'v',
    'Ê': 'w',
    'ÊŽ': 'y',
    'êœ©': 'tz',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER U BAR' (Ê‰)
    'Ãº': 'u',
    'Å­': 'u',
    'Ç”': 'u',
    'Ã»': 'u',
    'á¹·': 'u',
    'Ã¼': 'u',
    'Ç˜': 'u',
    'Çš': 'u',
    'Çœ': 'u',
    'Ç–': 'u',
    'á¹³': 'u',
    'á»¥': 'u',
    'Å±': 'u',
    'È•': 'u',
    'Ã¹': 'u',
    'á»§': 'u',
    'Æ°': 'u',
    'á»©': 'u',
    'á»±': 'u',
    'á»«': 'u',
    'á»­': 'u',
    'á»¯': 'u',
    'È—': 'u',
    'Å«': 'u',
    'á¹»': 'u',
    'Å³': 'u',
    'á¶™': 'u',
    'Å¯': 'u',
    'Å©': 'u',
    'á¹¹': 'u',
    'á¹µ': 'u',
    'áµ«': 'ue',
    'ê¸': 'um',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER UPSILON' (ÊŠ)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER UPSILON WITH STROKE' (áµ¿)
    'â±´': 'v',
    'êŸ': 'v',
    'á¹¿': 'v',
    'Ê‹': 'v',
    'á¶Œ': 'v',
    'â±±': 'v',
    'á¹½': 'v',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER VEND' (ê©)
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER VISIGOTHIC Z' (ê£)
    'ê¡': 'vy',
    'áºƒ': 'w',
    'Åµ': 'w',
    'áº…': 'w',
    'áº‡': 'w',
    'áº‰': 'w',
    'áº': 'w',
    'â±³': 'w',
    'áº˜': 'w',
    'áº': 'x',
    'áº‹': 'x',
    'á¶': 'x',
    'Ã½': 'y',
    'Å·': 'y',
    'Ã¿': 'y',
    'áº': 'y',
    'á»µ': 'y',
    'á»³': 'y',
    'Æ´': 'y',
    'á»·': 'y',
    'á»¿': 'y',
    'È³': 'y',
    'áº™': 'y',
    'É': 'y',
    'á»¹': 'y',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LETTER YOGH' (È)
    'Åº': 'z',
    'Å¾': 'z',
    'áº‘': 'z',
    'Ê‘': 'z',
    'â±¬': 'z',
    'Å¼': 'z',
    'áº“': 'z',
    'È¥': 'z',
    'áº•': 'z',
    'áµ¶': 'z',
    'á¶Ž': 'z',
    'Ê': 'z',
    'Æ¶': 'z',
    'É€': 'z',
    'ï¬€': 'ff',
    'ï¬ƒ': 'ffi',
    'ï¬„': 'ffl',
    'ï¬': 'fi',
    'ï¬‚': 'fl',
    'Ä³': 'ij',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SMALL LIGATURE LONG S T' (ï¬…)
    'Å“': 'oe',
    'ï¬†': 'st',
    'â‚': 'a',
    'â‚‘': 'e',
    'áµ¢': 'i',
    'â±¼': 'j',
    'â‚’': 'o',
    'áµ£': 'r',
    // CANNOT FIND APPROXIMATION FOR 'LATIN SUBSCRIPT SMALL LETTER SCHWA' (â‚”)
    'áµ¤': 'u',
    'áµ¥': 'v',
    'â‚“': 'x' // LATIN SUBSCRIPT SMALL LETTER X
};
function latinize(str) {
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (x) { return charMap[x] || x; });
}


/***/ }),

/***/ "./services/RequestService.ts":
/*!************************************!*\
  !*** ./services/RequestService.ts ***!
  \************************************/
/*! exports provided: RequestService, requestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestService", function() { return RequestService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestService", function() { return requestService; });
class RequestService {
    get(url) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        resolve(this.responseText || this.response);
                    }
                    else {
                        reject(Error(this.statusText));
                    }
                }
            };
            request.onerror = function () {
                reject(Error("Network Error"));
            };
            request.send();
            request = null;
        });
    }
    getJSON(url) {
        return this.get(url)
            .then(response => {
            try {
                return JSON.parse(response);
            }
            catch (err) {
                const error = new Error("Invalid JSON.\nOriginal error:" + err.message);
                error.stack = err.stack;
                throw error;
            }
        });
    }
}
const requestService = new RequestService();


/***/ }),

/***/ "./services/SidraService.ts":
/*!**********************************!*\
  !*** ./services/SidraService.ts ***!
  \**********************************/
/*! exports provided: SidraService, sidraService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraService", function() { return SidraService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidraService", function() { return sidraService; });
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestService */ "./services/RequestService.ts");
/* harmony import */ var _SidraResearch_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SidraResearch/index */ "./SidraResearch/index.ts");


class SidraService {
    constructor(_requestService) {
        this._requestService = _requestService;
        this._baseUrl = "https://servicodados.ibge.gov.br/api/v3/agregados";
    }
    getListPesquisas() {
        return this._requestService.getJSON(this._baseUrl)
            .then(response => response.map(obj => new _SidraResearch_index__WEBPACK_IMPORTED_MODULE_1__["SidraResearch"](_SidraResearch_index__WEBPACK_IMPORTED_MODULE_1__["SidraResearch"].convert(obj))))
            .catch(err => {
            err.message = "Não foi possível acessar a lista de pesquisas do Sidra.\nErro original:\n" + err.message;
            throw err;
        });
    }
}
const sidraService = new SidraService(_RequestService__WEBPACK_IMPORTED_MODULE_0__["requestService"]);


/***/ }),

/***/ "./services/index.ts":
/*!***************************!*\
  !*** ./services/index.ts ***!
  \***************************/
/*! exports provided: SidraService, sidraService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidraService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidraService */ "./services/SidraService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidraService", function() { return _SidraService__WEBPACK_IMPORTED_MODULE_0__["SidraService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sidraService", function() { return _SidraService__WEBPACK_IMPORTED_MODULE_0__["sidraService"]; });




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vU2lkcmFSZXNlYXJjaC9TaWRyYVJlc2VhcmNoLmVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vU2lkcmFSZXNlYXJjaC9TaWRyYVJlc2VhcmNoLm1vZGVsLnRzIiwid2VicGFjazovLy8uL1NpZHJhUmVzZWFyY2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9IVE1MQ3VzdG9tRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2xhdGluaXplLnRzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL1JlcXVlc3RTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL1NpZHJhU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25FaUU7QUFJakUsSUFBSyxVQUdKO0FBSEQsV0FBSyxVQUFVO0lBQ1gsMkJBQWE7SUFDYixvQ0FBc0I7QUFDMUIsQ0FBQyxFQUhJLFVBQVUsS0FBVixVQUFVLFFBR2Q7QUFFSywwQkFBNEIsU0FBUSw0RUFBaUI7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LEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsSUFBSTtJQUNWLElBQUksRUFBRSxJQUFJO0lBQ1YsSUFBSSxFQUFFLElBQUk7SUFDVixzRUFBc0U7SUFDdEUsbUVBQW1FO0lBQ25FLEtBQUssRUFBRSxJQUFJO0lBQ1gsS0FBSyxFQUFFLElBQUk7SUFDWCxLQUFLLEVBQUUsSUFBSTtJQUNYLEtBQUssRUFBRSxJQUFJO0lBQ1gsS0FBSyxFQUFFLElBQUk7SUFDWCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxzRUFBc0U7SUFDdEUsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUks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Q1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsaUVBQWlFO0lBQ2pFLEtBQUssRUFBRSxJQUFJO0lBQ1gsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxJQUFJO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDViw2RUFBNkU7SUFDN0UsNEVBQTRFO0lBQzVFLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxJQUFJO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLElBQUk7SUFDVixLQUFLLEVBQUUsSUFBSTtJQUNYLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsSUFBSTtJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLHVFQUF1RTtJQUN2RSxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULHlFQUF5RTtJQUN6RSxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLHNFQUFzRTtJQUN0RSxrRUFBa0U7SUFDbEUsS0FBSyxFQUFFLElBQUk7SUFDWCxtRkFBbUY7SUFDbkYsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FB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SUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsK0RBQStEO0lBQy9ELDRFQUE0RTtJQUM1RSxLQUFLLEVBQUUsSUFBSTtJQUNYLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLDhEQUE4RDtJQUM5RCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsNkVBQTZFO0lBQzdFLCtEQUErRDtJQUMvRCxJQUFJLEVBQUUsSUFBSTtJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YscUVBQXFFO0lBQ3JFLCtEQUErRDtJQUMvRCxxRUFBcUU7SUFDckUsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsMkVBQTJFO0lBQzNFLDBFQUEwRTtJQUMxRSwrREFBK0Q7SUFDL0QsbUZBQW1GO0lBQ25GLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxJQUFJO0lBQ1YsK0RBQStEO0lBQy9ELElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxJQUFJO0lBQ1YsS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxJQUFJO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxH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QUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxJQUFJO0lBQ1gseUVBQXlFO0lBQ3pFLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsSUFBSTtJQUNYLGdFQUFnRTtJQUNoRSxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsR0FBRztJ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SG5DLGFBQVEsR0FBRyxtREFBbUQsQ0FBQztJQUluRSxDQUFDO0lBRUwsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGtFQUFhLENBQUMsa0VBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BGLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNULEdBQUcsQ0FBQyxPQUFPLEdBQUcsMkVBQTJFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUN4RyxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUVKO0FBRU0sTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsOERBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJEIiwiZmlsZSI6InNlcnZpY2VzL3NlcnZpY2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmljZXMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBIVE1MQ3VzdG9tRWxlbWVudCB9IGZyb20gXCIuLi9oZWxwZXJzL0hUTUxDdXN0b21FbGVtZW50XCI7XG5pbXBvcnQgeyBTaWRyYVJlc2VhcmNoIH0gZnJvbSBcIi4vU2lkcmFSZXNlYXJjaC5tb2RlbFwiO1xuaW1wb3J0IHsgSVNpZHJhUmVzZWFyY2ggfSBmcm9tIFwiLi9TaWRyYVJlc2VhcmNoLmludGVyZmFjZVwiO1xuXG5lbnVtIGF0dHJpYnV0ZXMge1xuICAgIGl0ZW0gPSAnaXRlbScsXG4gICAgZmlsdGVyID0gJ2ZpbHRlci10ZXh0J1xufVxuXG5leHBvcnQgY2xhc3MgU2lkcmFSZXNlYXJjaEVsZW1lbnQgZXh0ZW5kcyBIVE1MQ3VzdG9tRWxlbWVudCB7XG4gICAgc3RhdGljIHRhZ05hbWUgPSAnc2lkcmEtcmVzZWFyY2gnO1xuXG4gICAgc3RhdGljIHRlbXBsYXRlKHsgaWQsIG5hbWUsIHRhYmxlcyB9OiBTaWRyYVJlc2VhcmNoKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8aDIgcmVzZWFyY2gtdGl0bGUgcmVzZWFyY2gtaWQ9XCIke2lkfVwiPiR7bmFtZX08L2gyPlxuICAgICAgICAgICAgJHtcbiAgICAgICAgICAgIHRhYmxlcy5sZW5ndGggPD0gMCA/IFwiXCIgOiBgXG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAkeyB0YWJsZXMubWFwKHRhYmxlID0+IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSByZXNlcmFjaC10YWJsZSB0YWJsZS1pZD1cIiR7dGFibGUuaWR9XCI+JHt0YWJsZS5uYW1lfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgIGApfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgfSBcbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RvbSA9IHtcbiAgICAgICAgc2hhZG93Um9vdDogbnVsbCBhcyBTaGFkb3dSb290XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzZWFyY2ggPSB7XG4gICAgICAgIHJhdzoge30gYXMgU2lkcmFSZXNlYXJjaCxcbiAgICAgICAgcHVibGljOiB7fSBhcyBTaWRyYVJlc2VhcmNoLFxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcmVzZWFyY2gocmVzZWFyY2g6IFNpZHJhUmVzZWFyY2gpIHtcbiAgICAgICAgdGhpcy5fcmVzZWFyY2gucmF3ID0gcmVzZWFyY2g7XG4gICAgICAgIHRoaXMuX3Jlc2VhcmNoLnB1YmxpYyA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLl9yZXNlYXJjaC5yYXcuaWQsXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl9yZXNlYXJjaC5yYXcubmFtZSxcbiAgICAgICAgICAgIHRhYmxlczogdGhpcy5fcmVzZWFyY2gucmF3LmZpbHRlclRhYmxlcyh0aGlzLmZpbHRlclRleHQpXG4gICAgICAgIH0gYXMgU2lkcmFSZXNlYXJjaFxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVzZWFyY2goKTogU2lkcmFSZXNlYXJjaCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNlYXJjaC5wdWJsaWM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmaWx0ZXJUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlcy5maWx0ZXIpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX2RvbS5zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicsIGRlbGVnYXRlc0ZvY3VzOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5fZG9tLnNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gU2lkcmFSZXNlYXJjaEVsZW1lbnQudGVtcGxhdGUodGhpcy5yZXNlYXJjaCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGNvbnN0IHJlc2VhcmNoRWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3RvcigncmVzZWFyY2gnKTtcblxuICAgICAgICBsZXQgcmVzZWFyY2g6IFNpZHJhUmVzZWFyY2g7XG4gICAgICAgIGlmIChyZXNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzZWFyY2ggPSBKU09OLnBhcnNlKHJlc2VhcmNoRWxlbWVudC5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZWFyY2ggPSByZXNlYXJjaDtcbiAgICAgICAgICAgICAgICByZXNlYXJjaEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChyZXNlYXJjaEVsZW1lbnQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgcGFyc2luZyB0aGUgJHtyZXNlYXJjaEVsZW1lbnR9IGNvbnRlbnQuYCwgZXJyLm1lc3NhZ2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIHN3aXRjaChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2VhcmNoID0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVzLml0ZW0pKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIG5vIHBhcnNpbmcgZG8gSlNPTi4nLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsImltcG9ydCB7IGxhdGluaXplIH0gZnJvbSBcIi4uL2hlbHBlcnMvbGF0aW5pemVcIjtcbmltcG9ydCB7IElTaWRyYVJlc2VhcmNoIH0gZnJvbSBcIi4vU2lkcmFSZXNlYXJjaC5pbnRlcmZhY2VcIjtcbiBcbmV4cG9ydCBjbGFzcyBTaWRyYVJlc2VhcmNoIGltcGxlbWVudHMgSVNpZHJhUmVzZWFyY2guUmVzZWFyY2gge1xuICAgIHN0YXRpYyBjb252ZXJ0KHBhcmFtczoge1xuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBub21lOiBzdHJpbmcsXG4gICAgICAgIGFncmVnYWRvczogQXJyYXk8eyBpZDogc3RyaW5nLCBub21lOiBzdHJpbmcgfT5cbiAgICB9KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICAgICAgbmFtZTogcGFyYW1zLm5vbWUsXG4gICAgICAgICAgICBhbGlhczogU2lkcmFSZXNlYXJjaC5hbHRlck5hbWUocGFyYW1zLm5vbWUpLFxuICAgICAgICAgICAgdGFibGVzOiBwYXJhbXMuYWdyZWdhZG9zLm1hcCgoeyBpZCwgbm9tZSB9KSA9PiAoeyBpZDogcGFyc2VJbnQoaWQsIDEwKSwgbmFtZTogbm9tZSwgYWxpYXM6IFNpZHJhUmVzZWFyY2guYWx0ZXJOYW1lKG5vbWUpIH0pKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGFsdGVyTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxhdGluaXplKG5hbWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgcmVhZG9ubHkgYWxpYXM6IHN0cmluZztcbiAgICBwdWJsaWMgcmVhZG9ubHkgdGFibGVzOiBBcnJheTx7IHJlYWRvbmx5IGlkOiBudW1iZXIsIHJlYWRvbmx5IG5hbWU6IHN0cmluZywgcmVhZG9ubHkgYWxpYXM6IHN0cmluZyB9PlxuXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiB7IGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYWxpYXM6IHN0cmluZywgdGFibGVzOiBBcnJheTx7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgYWxpYXM6IHN0cmluZyB9PiB9KSB7XG4gICAgICAgIHRoaXMuaWQgPSBwYXJhbXMuaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgICB0aGlzLmFsaWFzID0gcGFyYW1zLmFsaWFzO1xuICAgICAgICB0aGlzLnRhYmxlcyA9IHBhcmFtcy50YWJsZXM7XG5cbiAgICAgICAgdGhpcy50YWJsZXMuZm9yRWFjaChPYmplY3QuZnJlZXplKTtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJUYWJsZXModGVybTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IF90ZXJtID0gU2lkcmFSZXNlYXJjaC5hbHRlck5hbWUodGVybSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRhYmxlcy5maWx0ZXIodGFibGUgPT4gdGFibGUuYWxpYXMuaW5jbHVkZXMoX3Rlcm0pKTtcbiAgICB9XG5cbiAgICBnZXRUYWJsZShpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhYmxlcy5maW5kKHRhYmxlID0+IHRhYmxlLmlkID09PSBpZCk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgU2lkcmFSZXNlYXJjaEVsZW1lbnQgfSBmcm9tIFwiLi9TaWRyYVJlc2VhcmNoLmVsZW1lbnRcIjtcbmltcG9ydCB7IFNpZHJhUmVzZWFyY2ggfSBmcm9tIFwiLi9TaWRyYVJlc2VhcmNoLm1vZGVsXCI7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTaWRyYVJlc2VhcmNoRWxlbWVudC50YWdOYW1lLCBTaWRyYVJlc2VhcmNoRWxlbWVudClcblxuZXhwb3J0IHsgXG4gICAgU2lkcmFSZXNlYXJjaCxcbiAgICBTaWRyYVJlc2VhcmNoRWxlbWVudCBcbn07XG4iLCIvLyBETyBOT1QgUkVNT1ZFIFRISVMgQ0xBU1Ncbi8vIFR5cGVzY3JpcHQgZG8gbm90IGNvbXBpbGUgV2ViQ29tcG9uZW50cyBjb3JyZWN0bHlcbi8vIFRoaXMgaGFjayBtaW5pbWl6ZXMgdGhlIGVycm9yc1xuXG5leHBvcnQgY2xhc3MgSFRNTEN1c3RvbUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgY29uc3RydWN0b3IoXykgeyByZXR1cm4gKF8gPSBzdXBlcihfKSkuaW5pdCgpLCBfOyB9XG4gICAgaW5pdCgpIHsgLyogb3ZlcnJpZGUgYXMgeW91IGxpa2UgKi8gfVxufSIsIi8vIGh0dHA6Ly9zZW1wbGljZXdlYnNpdGVzLmNvbS9zaXRlcy9kZWZhdWx0L2ZpbGVzL2xhdGluaXNlLmpzXy50eHRcbi8vIEdlbmVyYXRlZCBmcm9tIGxhdGluX21hcC5wbCBTdW4gSnVuIDIwIDIwOjE3OjE4IDIwMTBcblxuY29uc3QgY2hhck1hcCA9IHtcbiAgICAnw4PCgSc6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIEFDVVRFXG4gICAgJ8OE4oCaJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggQlJFVkVcbiAgICAnw6HCusKuJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggQlJFVkUgQU5EIEFDVVRFXG4gICAgJ8OhwrrCtic6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIEJSRVZFIEFORCBET1QgQkVMT1dcbiAgICAnw6HCusKwJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggQlJFVkUgQU5EIEdSQVZFXG4gICAgJ8OhwrrCsic6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIEJSRVZFIEFORCBIT09LIEFCT1ZFXG4gICAgJ8OhwrrCtCc6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIEJSRVZFIEFORCBUSUxERVxuICAgICfDh8KNJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggQ0FST05cbiAgICAnw4PigJonOiAnQScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBDSVJDVU1GTEVYXG4gICAgJ8OhwrrCpCc6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggQU5EIEFDVVRFXG4gICAgJ8OhwrrCrCc6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggQU5EIERPVCBCRUxPV1xuICAgICfDocK6wqYnOiAnQScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBDSVJDVU1GTEVYIEFORCBHUkFWRVxuICAgICfDocK6wqgnOiAnQScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBDSVJDVU1GTEVYIEFORCBIT09LIEFCT1ZFXG4gICAgJ8OhwrrCqic6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggQU5EIFRJTERFXG4gICAgJ8OD4oCeJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggRElBRVJFU0lTXG4gICAgJ8OHxb4nOiAnQScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBESUFFUkVTSVMgQU5EIE1BQ1JPTlxuICAgICfDiMKmJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OHICc6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIERPVCBBQk9WRSBBTkQgTUFDUk9OXG4gICAgJ8OhwrogJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OI4oKsJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggRE9VQkxFIEdSQVZFXG4gICAgJ8OD4oKsJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggR1JBVkVcbiAgICAnw6HCusKiJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggSE9PSyBBQk9WRVxuICAgICfDiOKAmic6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIElOVkVSVEVEIEJSRVZFXG4gICAgJ8OE4oKsJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggTUFDUk9OXG4gICAgJ8OE4oCeJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggT0dPTkVLXG4gICAgJ8OD4oCmJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggUklORyBBQk9WRVxuICAgICfDh8K6JzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggUklORyBBQk9WRSBBTkQgQUNVVEVcbiAgICAnw6HCuOKCrCc6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIFJJTkcgQkVMT1dcbiAgICAnw4jCuic6ICdBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIFNUUk9LRVxuICAgICfDg8aSJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggVElMREVcbiAgICAnw6rFk8KyJzogJ0FBJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQUFcbiAgICAnw4PigKAnOiAnQUUnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBRVxuICAgICfDh8K8JzogJ0FFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQUUgV0lUSCBBQ1VURVxuICAgICfDh8KiJzogJ0FFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQUUgV0lUSCBNQUNST05cbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgQUZSSUNBTiBEJyAow4bigLApXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEFMUEhBJyAow6LCscKtKVxuICAgICfDqsWTwrQnOiAnQU8nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBT1xuICAgICfDqsWTwrYnOiAnQVUnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBVVxuICAgICfDqsWTwrgnOiAnQVYnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBVlxuICAgICfDqsWTwronOiAnQVYnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBViBXSVRIIEhPUklaT05UQUwgQkFSXG4gICAgJ8OqxZPCvCc6ICdBWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEFZXG4gICAgJ8OhwrjigJonOiAnQicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEIgV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCuOKAnic6ICdCJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQiBXSVRIIERPVCBCRUxPV1xuICAgICfDhsKBJzogJ0InLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBCIFdJVEggSE9PS1xuICAgICfDocK44oCgJzogJ0InLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBCIFdJVEggTElORSBCRUxPV1xuICAgICfDicaSJzogJ0InLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBCIFdJVEggU1RST0tFXG4gICAgJ8OG4oCaJzogJ0InLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBCIFdJVEggVE9QQkFSXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEJST0tFTiBMJyAow6rCneKAoClcbiAgICAnw4TigKAnOiAnQycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBBQ1VURVxuICAgICfDhMWSJzogJ0MnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBDIFdJVEggQ0FST05cbiAgICAnw4PigKEnOiAnQycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBDRURJTExBXG4gICAgJ8OhwrjLhic6ICdDJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgQyBXSVRIIENFRElMTEEgQU5EIEFDVVRFXG4gICAgJ8OEy4YnOiAnQycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBDSVJDVU1GTEVYXG4gICAgJ8OExaAnOiAnQycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBET1QgQUJPVkVcbiAgICAnw4bigKEnOiAnQycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBIT09LXG4gICAgJ8OIwrsnOiAnQycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBTVFJPS0VcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgQ09OJyAow6rCncKuKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBDVUFUUklMTE8nICjDqsWTwqwpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIENVQVRSSUxMTyBXSVRIIENPTU1BJyAow6rFk8KuKVxuICAgICfDhMW9JzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggQ0FST05cbiAgICAnw6HCuMKQJzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggQ0VESUxMQVxuICAgICfDocK44oCZJzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggQ0lSQ1VNRkxFWCBCRUxPV1xuICAgICfDocK4xaAnOiAnRCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEQgV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCuMWSJzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OGxaAnOiAnRCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEQgV0lUSCBIT09LXG4gICAgJ8OhwrjFvSc6ICdEJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRCBXSVRIIExJTkUgQkVMT1dcbiAgICAnw4fCsic6ICdEJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRCBXSVRIIFNNQUxMIExFVFRFUiBaXG4gICAgJ8OH4oCmJzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggU01BTEwgTEVUVEVSIFogV0lUSCBDQVJPTlxuICAgICfDhMKQJzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggU1RST0tFXG4gICAgJ8OG4oC5JzogJ0QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEIFdJVEggVE9QQkFSXG4gICAgJ8OHwrEnOiAnRFonLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBEWlxuICAgICfDh+KAnic6ICdEWicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIERaIFdJVEggQ0FST05cbiAgICAnw4PigLAnOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBBQ1VURVxuICAgICfDhOKAnSc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIEJSRVZFXG4gICAgJ8OExaEnOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBDQVJPTlxuICAgICfDiMKoJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggQ0VESUxMQVxuICAgICfDocK4xZMnOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBDRURJTExBIEFORCBCUkVWRVxuICAgICfDg8WgJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDocK6wr4nOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYIEFORCBBQ1VURVxuICAgICfDocK74oCgJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWCBBTkQgRE9UIEJFTE9XXG4gICAgJ8OhwrvigqwnOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYIEFORCBHUkFWRVxuICAgICfDocK74oCaJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWCBBTkQgSE9PSyBBQk9WRVxuICAgICfDocK74oCeJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWCBBTkQgVElMREVcbiAgICAnw6HCuMucJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWCBCRUxPV1xuICAgICfDg+KAuSc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIERJQUVSRVNJU1xuICAgICfDhOKAkyc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIERPVCBBQk9WRVxuICAgICfDocK6wrgnOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBET1QgQkVMT1dcbiAgICAnw4jigJ4nOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBET1VCTEUgR1JBVkVcbiAgICAnw4PLhic6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIEdSQVZFXG4gICAgJ8OhwrrCuic6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIEhPT0sgQUJPVkVcbiAgICAnw4jigKAnOiAnRScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBJTlZFUlRFRCBCUkVWRVxuICAgICfDhOKAmSc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIE1BQ1JPTlxuICAgICfDocK44oCTJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggTUFDUk9OIEFORCBBQ1VURVxuICAgICfDocK44oCdJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggTUFDUk9OIEFORCBHUkFWRVxuICAgICfDhMucJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggT0dPTkVLXG4gICAgJ8OJ4oCgJzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggU1RST0tFXG4gICAgJ8OhwrrCvCc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIFRJTERFXG4gICAgJ8OhwrjFoSc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIFRJTERFIEJFTE9XXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVHWVBUT0xPR0lDQUwgQUlOJyAow6rFk8KkKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBFR1lQVE9MT0dJQ0FMIEFMRUYnICjDqsWTwqIpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVORycgKMOFxaApXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVTSCcgKMOGwqkpXG4gICAgJ8Oqwp3Cqic6ICdFVCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEVUXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVUSCcgKMODwpApXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVaSCcgKMOGwrcpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVaSCBSRVZFUlNFRCcgKMOGwrgpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIEVaSCBXSVRIIENBUk9OJyAow4fCrilcbiAgICAnw6HCuMW+JzogJ0YnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBGIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OG4oCYJzogJ0YnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBGIFdJVEggSE9PS1xuICAgICfDh8K0JzogJ0cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBHIFdJVEggQUNVVEVcbiAgICAnw4TFvic6ICdHJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgRyBXSVRIIEJSRVZFXG4gICAgJ8OHwqYnOiAnRycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEcgV0lUSCBDQVJPTlxuICAgICfDhMKiJzogJ0cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBHIFdJVEggQ0VESUxMQVxuICAgICfDhMWTJzogJ0cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBHIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDhCAnOiAnRycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEcgV0lUSCBET1QgQUJPVkVcbiAgICAnw4bigJwnOiAnRycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEcgV0lUSCBIT09LXG4gICAgJ8OhwrggJzogJ0cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBHIFdJVEggTUFDUk9OXG4gICAgJ8OHwqQnOiAnRycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEcgV0lUSCBTVFJPS0VcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgR0FNTUEnICjDhuKAnSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgR0xPVFRBTCBTVE9QJyAow4nCgSlcbiAgICAnw6HCuMKqJzogJ0gnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBIIFdJVEggQlJFVkUgQkVMT1dcbiAgICAnw4jFvic6ICdIJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSCBXSVRIIENBUk9OXG4gICAgJ8OhwrjCqCc6ICdIJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSCBXSVRIIENFRElMTEFcbiAgICAnw4TCpCc6ICdIJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSCBXSVRIIENJUkNVTUZMRVhcbiAgICAnw6LCscKnJzogJ0gnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBIIFdJVEggREVTQ0VOREVSXG4gICAgJ8OhwrjCpic6ICdIJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSCBXSVRIIERJQUVSRVNJU1xuICAgICfDocK4wqInOiAnSCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEggV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCuMKkJzogJ0gnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBIIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OEwqYnOiAnSCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEggV0lUSCBTVFJPS0VcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgSEFMRiBIJyAow6LCscK1KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBIRU5HJyAow6rFk8KmKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBIV0FJUicgKMOHwrYpXG4gICAgJ8ODwo0nOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBBQ1VURVxuICAgICfDhMKsJzogJ0knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBJIFdJVEggQlJFVkVcbiAgICAnw4fCjyc6ICdJJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIENBUk9OXG4gICAgJ8ODxb0nOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBDSVJDVU1GTEVYXG4gICAgJ8ODwo8nOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBESUFFUkVTSVNcbiAgICAnw6HCuMKuJzogJ0knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBJIFdJVEggRElBRVJFU0lTIEFORCBBQ1VURVxuICAgICfDhMKwJzogJ0knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBJIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OhwrvFoCc6ICdJJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIERPVCBCRUxPV1xuICAgICfDiMuGJzogJ0knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBJIFdJVEggRE9VQkxFIEdSQVZFXG4gICAgJ8ODxZInOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBHUkFWRVxuICAgICfDocK7y4YnOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBIT09LIEFCT1ZFXG4gICAgJ8OIxaAnOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBJTlZFUlRFRCBCUkVWRVxuICAgICfDhMKqJzogJ0knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBJIFdJVEggTUFDUk9OXG4gICAgJ8OEwq4nOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBPR09ORUtcbiAgICAnw4bigJQnOiAnSScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBTVFJPS0VcbiAgICAnw4TCqCc6ICdJJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIFRJTERFXG4gICAgJ8OhwrjCrCc6ICdJJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIFRJTERFIEJFTE9XXG4gICAgJ8Oqwp3CuSc6ICdEJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSU5TVUxBUiBEXG4gICAgJ8Oqwp3Cuyc6ICdGJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSU5TVUxBUiBGXG4gICAgJ8Oqwp3CvSc6ICdHJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSU5TVUxBUiBHXG4gICAgJ8Oqxb7igJonOiAnUicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIElOU1VMQVIgUlxuICAgICfDqsW+4oCeJzogJ1MnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBJTlNVTEFSIFNcbiAgICAnw6rFvuKAoCc6ICdUJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSU5TVUxBUiBUXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIElPVEEnICjDhuKAkylcbiAgICAnw6rCncKsJzogJ0lTJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSVNcbiAgICAnw4TCtCc6ICdKJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSiBXSVRIIENJUkNVTUZMRVhcbiAgICAnw4nLhic6ICdKJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSiBXSVRIIFNUUk9LRVxuICAgICfDocK4wrAnOiAnSycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEsgV0lUSCBBQ1VURVxuICAgICfDh8KoJzogJ0snLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBLIFdJVEggQ0FST05cbiAgICAnw4TCtic6ICdLJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSyBXSVRIIENFRElMTEFcbiAgICAnw6LCscKpJzogJ0snLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBLIFdJVEggREVTQ0VOREVSXG4gICAgJ8Oqwp3igJonOiAnSycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEsgV0lUSCBESUFHT05BTCBTVFJPS0VcbiAgICAnw6HCuMKyJzogJ0snLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBLIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OGy5wnOiAnSycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEsgV0lUSCBIT09LXG4gICAgJ8OhwrjCtCc6ICdLJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSyBXSVRIIExJTkUgQkVMT1dcbiAgICAnw6rCneKCrCc6ICdLJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgSyBXSVRIIFNUUk9LRVxuICAgICfDqsKd4oCeJzogJ0snLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBLIFdJVEggU1RST0tFIEFORCBESUFHT05BTCBTVFJPS0VcbiAgICAnw4TCuSc6ICdMJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCBXSVRIIEFDVVRFXG4gICAgJ8OIwr0nOiAnTCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEwgV0lUSCBCQVJcbiAgICAnw4TCvSc6ICdMJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCBXSVRIIENBUk9OXG4gICAgJ8OEwrsnOiAnTCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEwgV0lUSCBDRURJTExBXG4gICAgJ8OhwrjCvCc6ICdMJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCBXSVRIIENJUkNVTUZMRVggQkVMT1dcbiAgICAnw6HCuMK2JzogJ0wnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBMIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OhwrjCuCc6ICdMJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCBXSVRIIERPVCBCRUxPVyBBTkQgTUFDUk9OXG4gICAgJ8OiwrEgJzogJ0wnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBMIFdJVEggRE9VQkxFIEJBUlxuICAgICfDqsKdy4YnOiAnTCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEwgV0lUSCBISUdIIFNUUk9LRVxuICAgICfDocK4wronOiAnTCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEwgV0lUSCBMSU5FIEJFTE9XXG4gICAgJ8OEwr8nOiAnTCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIEwgV0lUSCBNSURETEUgRE9UXG4gICAgJ8OiwrHCoic6ICdMJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCBXSVRIIE1JRERMRSBUSUxERVxuICAgICfDh8uGJzogJ0wnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBMIFdJVEggU01BTEwgTEVUVEVSIEpcbiAgICAnw4XCgSc6ICdMJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCBXSVRIIFNUUk9LRVxuICAgICfDh+KAoSc6ICdMSicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIExKXG4gICAgJ8OhwrjCvic6ICdNJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTSBXSVRIIEFDVVRFXG4gICAgJ8OhwrnigqwnOiAnTScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE0gV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCueKAmic6ICdNJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTSBXSVRIIERPVCBCRUxPV1xuICAgICfDosKxwq4nOiAnTScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE0gV0lUSCBIT09LXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIE1JRERMRS1XRUxTSCBMTCcgKMOhwrvCuilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgTUlERExFLVdFTFNIIFYnICjDocK7wrwpXG4gICAgJ8OFxpInOiAnTicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE4gV0lUSCBBQ1VURVxuICAgICfDheKAoSc6ICdOJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTiBXSVRIIENBUk9OXG4gICAgJ8OF4oCmJzogJ04nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBOIFdJVEggQ0VESUxMQVxuICAgICfDocK5xaAnOiAnTicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE4gV0lUSCBDSVJDVU1GTEVYIEJFTE9XXG4gICAgJ8OhwrnigJ4nOiAnTicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE4gV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCueKAoCc6ICdOJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTiBXSVRIIERPVCBCRUxPV1xuICAgICfDh8K4JzogJ04nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBOIFdJVEggR1JBVkVcbiAgICAnw4bCnSc6ICdOJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTiBXSVRIIExFRlQgSE9PS1xuICAgICfDocK5y4YnOiAnTicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE4gV0lUSCBMSU5FIEJFTE9XXG4gICAgJ8OIICc6ICdOJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTiBXSVRIIExPTkcgUklHSFQgTEVHXG4gICAgJ8OH4oC5JzogJ04nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBOIFdJVEggU01BTEwgTEVUVEVSIEpcbiAgICAnw4PigJgnOiAnTicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE4gV0lUSCBUSUxERVxuICAgICfDh8WgJzogJ05KJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTkpcbiAgICAnw4PigJwnOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBBQ1VURVxuICAgICfDhcW9JzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggQlJFVkVcbiAgICAnw4figJgnOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBDQVJPTlxuICAgICfDg+KAnSc6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIENJUkNVTUZMRVhcbiAgICAnw6HCu8KQJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggQ0lSQ1VNRkxFWCBBTkQgQUNVVEVcbiAgICAnw6HCu8ucJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggQ0lSQ1VNRkxFWCBBTkQgRE9UIEJFTE9XXG4gICAgJ8OhwrvigJknOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBDSVJDVU1GTEVYIEFORCBHUkFWRVxuICAgICfDocK74oCdJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggQ0lSQ1VNRkxFWCBBTkQgSE9PSyBBQk9WRVxuICAgICfDocK74oCTJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggQ0lSQ1VNRkxFWCBBTkQgVElMREVcbiAgICAnw4PigJMnOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBESUFFUkVTSVNcbiAgICAnw4jCqic6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIERJQUVSRVNJUyBBTkQgTUFDUk9OXG4gICAgJ8OIwq4nOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBET1QgQUJPVkVcbiAgICAnw4jCsCc6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIERPVCBBQk9WRSBBTkQgTUFDUk9OXG4gICAgJ8OhwrvFkic6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIERPVCBCRUxPV1xuICAgICfDhcKQJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggRE9VQkxFIEFDVVRFXG4gICAgJ8OIxZInOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBET1VCTEUgR1JBVkVcbiAgICAnw4PigJknOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBHUkFWRVxuICAgICfDocK7xb0nOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBIT09LIEFCT1ZFXG4gICAgJ8OGICc6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIEhPUk5cbiAgICAnw6HCu8WhJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggSE9STiBBTkQgQUNVVEVcbiAgICAnw6HCu8KiJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggSE9STiBBTkQgRE9UIEJFTE9XXG4gICAgJ8OhwrvFkyc6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIEhPUk4gQU5EIEdSQVZFXG4gICAgJ8OhwrvFvic6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIEhPUk4gQU5EIEhPT0sgQUJPVkVcbiAgICAnw6HCuyAnOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBIT1JOIEFORCBUSUxERVxuICAgICfDiMW9JzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggSU5WRVJURUQgQlJFVkVcbiAgICAnw6rCncWgJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggTE9ORyBTVFJPS0UgT1ZFUkxBWVxuICAgICfDqsKdxZInOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBMT09QXG4gICAgJ8OFxZInOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBNQUNST05cbiAgICAnw6HCueKAmSc6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIE1BQ1JPTiBBTkQgQUNVVEVcbiAgICAnw6HCucKQJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggTUFDUk9OIEFORCBHUkFWRVxuICAgICfDhsW4JzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggTUlERExFIFRJTERFXG4gICAgJ8OHwqonOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBPR09ORUtcbiAgICAnw4fCrCc6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIE9HT05FSyBBTkQgTUFDUk9OXG4gICAgJ8ODy5wnOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBTVFJPS0VcbiAgICAnw4fCvic6ICdPJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIFNUUk9LRSBBTkQgQUNVVEVcbiAgICAnw4PigKInOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBUSUxERVxuICAgICfDocK5xZInOiAnTycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBUSUxERSBBTkQgQUNVVEVcbiAgICAnw6HCucW9JzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggVElMREUgQU5EIERJQUVSRVNJU1xuICAgICfDiMKsJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggVElMREUgQU5EIE1BQ1JPTlxuICAgICfDhsKiJzogJ09JJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgT0lcbiAgICAnw6rCncW9JzogJ09PJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgT09cbiAgICAnw4bCkCc6ICdFJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgT1BFTiBFXG4gICAgJ8OG4oCgJzogJ08nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBPUEVOIE9cbiAgICAnw4jCoic6ICdPVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIE9VXG4gICAgJ8OhwrnigJ0nOiAnUCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFAgV0lUSCBBQ1VURVxuICAgICfDocK54oCTJzogJ1AnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBQIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8Oqwp3igJknOiAnUCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFAgV0lUSCBGTE9VUklTSFxuICAgICfDhsKkJzogJ1AnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBQIFdJVEggSE9PS1xuICAgICfDqsKd4oCdJzogJ1AnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBQIFdJVEggU1FVSVJSRUwgVEFJTFxuICAgICfDosKxwqMnOiAnUCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFAgV0lUSCBTVFJPS0VcbiAgICAnw6rCncKQJzogJ1AnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBQIFdJVEggU1RST0tFIFRIUk9VR0ggREVTQ0VOREVSXG4gICAgJ8Oqwp3LnCc6ICdRJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUSBXSVRIIERJQUdPTkFMIFNUUk9LRVxuICAgICfDqsKd4oCTJzogJ1EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBRIFdJVEggU1RST0tFIFRIUk9VR0ggREVTQ0VOREVSXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIFIgUk9UVU5EQScgKMOqwp3FoSlcbiAgICAnw4XigJ0nOiAnUicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFIgV0lUSCBBQ1VURVxuICAgICfDhcucJzogJ1InLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBSIFdJVEggQ0FST05cbiAgICAnw4XigJMnOiAnUicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFIgV0lUSCBDRURJTExBXG4gICAgJ8OhwrnLnCc6ICdSJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUiBXSVRIIERPVCBBQk9WRVxuICAgICfDocK5xaEnOiAnUicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFIgV0lUSCBET1QgQkVMT1dcbiAgICAnw6HCucWTJzogJ1InLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBSIFdJVEggRE9UIEJFTE9XIEFORCBNQUNST05cbiAgICAnw4jCkCc6ICdSJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUiBXSVRIIERPVUJMRSBHUkFWRVxuICAgICfDiOKAmSc6ICdSJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUiBXSVRIIElOVkVSVEVEIEJSRVZFXG4gICAgJ8OhwrnFvic6ICdSJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUiBXSVRIIExJTkUgQkVMT1dcbiAgICAnw4nFkic6ICdSJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUiBXSVRIIFNUUk9LRVxuICAgICfDosKxwqQnOiAnUicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFIgV0lUSCBUQUlMXG4gICAgJ8OqxZPCvic6ICdDJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUkVWRVJTRUQgQyBXSVRIIERPVFxuICAgICfDhsW9JzogJ0UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBSRVZFUlNFRCBFXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIFJVTSBST1RVTkRBJyAow6rCncWTKVxuICAgICfDhcWhJzogJ1MnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBTIFdJVEggQUNVVEVcbiAgICAnw6HCucKkJzogJ1MnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBTIFdJVEggQUNVVEUgQU5EIERPVCBBQk9WRVxuICAgICfDhSAnOiAnUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFMgV0lUSCBDQVJPTlxuICAgICfDocK5wqYnOiAnUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFMgV0lUSCBDQVJPTiBBTkQgRE9UIEFCT1ZFXG4gICAgJ8OFxb4nOiAnUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFMgV0lUSCBDRURJTExBXG4gICAgJ8OFxZMnOiAnUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFMgV0lUSCBDSVJDVU1GTEVYXG4gICAgJ8OIy5wnOiAnUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFMgV0lUSCBDT01NQSBCRUxPV1xuICAgICfDocK5ICc6ICdTJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgUyBXSVRIIERPVCBBQk9WRVxuICAgICfDocK5wqInOiAnUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFMgV0lUSCBET1QgQkVMT1dcbiAgICAnw6HCucKoJzogJ1MnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBTIFdJVEggRE9UIEJFTE9XIEFORCBET1QgQUJPVkVcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgU0FMVElMTE8nICjDqsW+4oC5KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBTQ0hXQScgKMOGwo8pXG4gICAgJ8OhwrrFvic6ICdTUycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFNIQVJQIFNcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgU01BTEwgUSBXSVRIIEhPT0sgVEFJTCcgKMOJxaApXG4gICAgJ8OFwqQnOiAnVCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFQgV0lUSCBDQVJPTlxuICAgICfDhcKiJzogJ1QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUIFdJVEggQ0VESUxMQVxuICAgICfDocK5wrAnOiAnVCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFQgV0lUSCBDSVJDVU1GTEVYIEJFTE9XXG4gICAgJ8OIxaEnOiAnVCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFQgV0lUSCBDT01NQSBCRUxPV1xuICAgICfDiMK+JzogJ1QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUIFdJVEggRElBR09OQUwgU1RST0tFXG4gICAgJ8OhwrnCqic6ICdUJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVCBXSVRIIERPVCBBQk9WRVxuICAgICfDocK5wqwnOiAnVCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFQgV0lUSCBET1QgQkVMT1dcbiAgICAnw4bCrCc6ICdUJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVCBXSVRIIEhPT0tcbiAgICAnw6HCucKuJzogJ1QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUIFdJVEggTElORSBCRUxPV1xuICAgICfDhsKuJzogJ1QnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUIFdJVEggUkVUUk9GTEVYIEhPT0tcbiAgICAnw4XCpic6ICdUJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVCBXSVRIIFNUUk9LRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBUSE9STicgKMODxb4pXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIFRIT1JOIFdJVEggU1RST0tFJyAow6rCncKkKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBUSE9STiBXSVRIIFNUUk9LRSBUSFJPVUdIIERFU0NFTkRFUicgKMOqwp3CpilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVE9ORSBGSVZFJyAow4bCvClcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVE9ORSBTSVgnICjDhuKAnilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVE9ORSBUV08nICjDhsKnKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBUUkVTSUxMTycgKMOqxZPCqilcbiAgICAnw6LCscKvJzogJ0EnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUVVJORUQgQVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBUVVJORUQgSU5TVUxBUiBHJyAow6rCncK+KVxuICAgICfDqsW+4oKsJzogJ0wnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUVVJORUQgTFxuICAgICfDhsWTJzogJ00nLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBUVVJORUQgTVxuICAgICfDieKApic6ICdWJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVFVSTkVEIFZcbiAgICAnw6rFk8KoJzogJ1RaJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVFpcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBCQVInICjDieKAnilcbiAgICAnw4PFoSc6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIEFDVVRFXG4gICAgJ8OFwqwnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBCUkVWRVxuICAgICfDh+KAnCc6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIENBUk9OXG4gICAgJ8OD4oC6JzogJ1UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDocK5wrYnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBDSVJDVU1GTEVYIEJFTE9XXG4gICAgJ8ODxZMnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBESUFFUkVTSVNcbiAgICAnw4figJQnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBESUFFUkVTSVMgQU5EIEFDVVRFXG4gICAgJ8OH4oSiJzogJ1UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggRElBRVJFU0lTIEFORCBDQVJPTlxuICAgICfDh+KAuic6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIERJQUVSRVNJUyBBTkQgR1JBVkVcbiAgICAnw4figKInOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBESUFFUkVTSVMgQU5EIE1BQ1JPTlxuICAgICfDocK5wrInOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBESUFFUkVTSVMgQkVMT1dcbiAgICAnw6HCu8KkJzogJ1UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OFwrAnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBET1VCTEUgQUNVVEVcbiAgICAnw4jigJ0nOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBET1VCTEUgR1JBVkVcbiAgICAnw4PihKInOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBHUkFWRVxuICAgICfDocK7wqYnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBIT09LIEFCT1ZFXG4gICAgJ8OGwq8nOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBIT1JOXG4gICAgJ8OhwrvCqCc6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIEhPUk4gQU5EIEFDVVRFXG4gICAgJ8OhwrvCsCc6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIEhPUk4gQU5EIERPVCBCRUxPV1xuICAgICfDocK7wqonOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBIT1JOIEFORCBHUkFWRVxuICAgICfDocK7wqwnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBIT1JOIEFORCBIT09LIEFCT1ZFXG4gICAgJ8OhwrvCric6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIEhPUk4gQU5EIFRJTERFXG4gICAgJ8OI4oCTJzogJ1UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggSU5WRVJURUQgQlJFVkVcbiAgICAnw4XCqic6ICdVJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIE1BQ1JPTlxuICAgICfDocK5wronOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBNQUNST04gQU5EIERJQUVSRVNJU1xuICAgICfDhcKyJzogJ1UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggT0dPTkVLXG4gICAgJ8OFwq4nOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBSSU5HIEFCT1ZFXG4gICAgJ8OFwqgnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBUSUxERVxuICAgICfDocK5wrgnOiAnVScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBUSUxERSBBTkQgQUNVVEVcbiAgICAnw6HCucK0JzogJ1UnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggVElMREUgQkVMT1dcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVVBTSUxPTicgKMOGwrEpXG4gICAgJ8Oqwp3Fvic6ICdWJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgViBXSVRIIERJQUdPTkFMIFNUUk9LRVxuICAgICfDocK5wr4nOiAnVicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFYgV0lUSCBET1QgQkVMT1dcbiAgICAnw4bCsic6ICdWJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgViBXSVRIIEhPT0tcbiAgICAnw6HCucK8JzogJ1YnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBWIFdJVEggVElMREVcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVkVORCcgKMOqwp3CqClcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ0FQSVRBTCBMRVRURVIgVklTSUdPVEhJQyBaJyAow6rCncKiKVxuICAgICfDqsKdICc6ICdWWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFZZXG4gICAgJ8OhwrrigJonOiAnVycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFcgV0lUSCBBQ1VURVxuICAgICfDhcK0JzogJ1cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBXIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDocK64oCeJzogJ1cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBXIFdJVEggRElBRVJFU0lTXG4gICAgJ8OhwrrigKAnOiAnVycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFcgV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCusuGJzogJ1cnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBXIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OhwrrigqwnOiAnVycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFcgV0lUSCBHUkFWRVxuICAgICfDosKxwrInOiAnVycsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFcgV0lUSCBIT09LXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIENBUElUQUwgTEVUVEVSIFdZTk4nICjDh8K3KVxuICAgICfDocK6xZInOiAnWCcsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFggV0lUSCBESUFFUkVTSVNcbiAgICAnw6HCusWgJzogJ1gnLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBYIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8ODwp0nOiAnWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFkgV0lUSCBBQ1VURVxuICAgICfDhcK2JzogJ1knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBZIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDhcK4JzogJ1knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBZIFdJVEggRElBRVJFU0lTXG4gICAgJ8OhwrrFvSc6ICdZJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWSBXSVRIIERPVCBBQk9WRVxuICAgICfDocK7wrQnOiAnWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFkgV0lUSCBET1QgQkVMT1dcbiAgICAnw6HCu8KyJzogJ1knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBZIFdJVEggR1JBVkVcbiAgICAnw4bCsyc6ICdZJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWSBXSVRIIEhPT0tcbiAgICAnw6HCu8K2JzogJ1knLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBZIFdJVEggSE9PSyBBQk9WRVxuICAgICfDocK7wr4nOiAnWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFkgV0lUSCBMT09QXG4gICAgJ8OIwrInOiAnWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFkgV0lUSCBNQUNST05cbiAgICAnw4nFvSc6ICdZJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWSBXSVRIIFNUUk9LRVxuICAgICfDocK7wrgnOiAnWScsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFkgV0lUSCBUSUxERVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBDQVBJVEFMIExFVFRFUiBZT0dIJyAow4jFkylcbiAgICAnw4XCuSc6ICdaJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWiBXSVRIIEFDVVRFXG4gICAgJ8OFwr0nOiAnWicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFogV0lUSCBDQVJPTlxuICAgICfDocK6wpAnOiAnWicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFogV0lUSCBDSVJDVU1GTEVYXG4gICAgJ8OiwrHCqyc6ICdaJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWiBXSVRIIERFU0NFTkRFUlxuICAgICfDhcK7JzogJ1onLCAvLyBMQVRJTiBDQVBJVEFMIExFVFRFUiBaIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OhwrrigJknOiAnWicsIC8vIExBVElOIENBUElUQUwgTEVUVEVSIFogV0lUSCBET1QgQkVMT1dcbiAgICAnw4jCpCc6ICdaJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWiBXSVRIIEhPT0tcbiAgICAnw6HCuuKAnSc6ICdaJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWiBXSVRIIExJTkUgQkVMT1dcbiAgICAnw4bCtSc6ICdaJywgLy8gTEFUSU4gQ0FQSVRBTCBMRVRURVIgWiBXSVRIIFNUUk9LRVxuICAgICfDhMKyJzogJ0lKJywgLy8gTEFUSU4gQ0FQSVRBTCBMSUdBVFVSRSBJSlxuICAgICfDheKAmSc6ICdPRScsIC8vIExBVElOIENBUElUQUwgTElHQVRVUkUgT0VcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gQ1JPU1MnICjDosWTwp0pXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIEVQSUdSQVBISUMgTEVUVEVSIEFSQ0hBSUMgTScgKMOqxbjCvylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gRVBJR1JBUEhJQyBMRVRURVIgSSBMT05HQScgKMOqxbjCvilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gRVBJR1JBUEhJQyBMRVRURVIgSU5WRVJURUQgTScgKMOqxbjCvSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gRVBJR1JBUEhJQyBMRVRURVIgUkVWRVJTRUQgRicgKMOqxbjCuylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gRVBJR1JBUEhJQyBMRVRURVIgUkVWRVJTRUQgUCcgKMOqxbjCvClcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIEFJTicgKMOhwrTCpSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIEFMVkVPTEFSIENMSUNLJyAow4figJopXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIExFVFRFUiBCSURFTlRBTCBQRVJDVVNTSVZFJyAow4rCrSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIEJJTEFCSUFMIENMSUNLJyAow4rLnClcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIEJJTEFCSUFMIFBFUkNVU1NJVkUnICjDisKsKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBMRVRURVIgREVOVEFMIENMSUNLJyAow4figqwpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIExFVFRFUiBHTE9UVEFMIFNUT1AnICjDiuKAnSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIEdMT1RUQUwgU1RPUCBXSVRIIFNUUk9LRScgKMOKwqEpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIExFVFRFUiBJTlZFUlRFRCBHTE9UVEFMIFNUT1AnICjDiuKAkylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIElOVkVSVEVEIEdMT1RUQUwgU1RPUCBXSVRIIFNUUk9LRScgKMOGwr4pXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIExFVFRFUiBMQVRFUkFMIENMSUNLJyAow4fCgSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIFBIQVJZTkdFQUwgVk9JQ0VEIEZSSUNBVElWRScgKMOK4oCiKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBMRVRURVIgUkVUUk9GTEVYIENMSUNLJyAow4fGkilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIFJFVkVSU0VEIEVTSCBMT09QJyAow4bCqilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIFJFVkVSU0VEIEdMT1RUQUwgU1RPUCBXSVRIIFNUUk9LRScgKMOKwqIpXG4gICAgJ8OhwrTigqwnOiAnQScsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIEFcbiAgICAnw6HCtMKBJzogJ0FFJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgQUVcbiAgICAnw4rihKInOiAnQicsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIEJcbiAgICAnw6HCtMaSJzogJ0InLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBCQVJSRUQgQlxuICAgICfDocK04oCeJzogJ0MnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBDXG4gICAgJ8OhwrTigKYnOiAnRCcsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIERcbiAgICAnw6HCtOKAoSc6ICdFJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBFVEgnICjDocK04oCgKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBFWkgnICjDocK0wqMpXG4gICAgJ8OqxZPCsCc6ICdGJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgRlxuICAgICfDicKiJzogJ0cnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBHXG4gICAgJ8OK4oC6JzogJ0cnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBHIFdJVEggSE9PS1xuICAgICfDisWTJzogJ0gnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBIXG4gICAgJ8OJwqonOiAnSScsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIElcbiAgICAnw4rCgSc6ICdSJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgSU5WRVJURUQgUlxuICAgICfDocK0xaAnOiAnSicsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIEpcbiAgICAnw6HCtOKAuSc6ICdLJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgS1xuICAgICfDisW4JzogJ0wnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBMXG4gICAgJ8OhwrTFkic6ICdMJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgTCBXSVRIIFNUUk9LRVxuICAgICfDocK0wo0nOiAnTScsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIE1cbiAgICAnw4nCtCc6ICdOJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgTlxuICAgICfDocK0wo8nOiAnTycsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIE9cbiAgICAnw4nCtic6ICdPRScsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIE9FXG4gICAgJ8OhwrTCkCc6ICdPJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgT1BFTiBPXG4gICAgJ8OhwrTigKInOiAnT1UnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBPVVxuICAgICfDocK0y5wnOiAnUCcsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIFBcbiAgICAnw4rigqwnOiAnUicsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIFJcbiAgICAnw6HCtMW9JzogJ04nLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBSRVZFUlNFRCBOXG4gICAgJ8OhwrTihKInOiAnUicsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIFJFVkVSU0VEIFJcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgUlVNJyAow6rCncK2KVxuICAgICfDqsWTwrEnOiAnUycsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIFNcbiAgICAnw6HCtOKAuic6ICdUJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgVFxuICAgICfDosKxwrsnOiAnRScsIC8vIExBVElOIExFVFRFUiBTTUFMTCBDQVBJVEFMIFRVUk5FRCBFXG4gICAgJ8OhwrTFoSc6ICdSJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgVFVSTkVEIFJcbiAgICAnw6HCtMWTJzogJ1UnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBVXG4gICAgJ8OhwrQgJzogJ1YnLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBWXG4gICAgJ8OhwrTCoSc6ICdXJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgV1xuICAgICfDisKPJzogJ1knLCAvLyBMQVRJTiBMRVRURVIgU01BTEwgQ0FQSVRBTCBZXG4gICAgJ8OhwrTCoic6ICdaJywgLy8gTEFUSU4gTEVUVEVSIFNNQUxMIENBUElUQUwgWlxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBMRVRURVIgU1RSRVRDSEVEIEMnICjDiuKAlClcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIFRXTyBXSVRIIFNUUk9LRScgKMOGwrspXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIExFVFRFUiBWT0lDRUQgTEFSWU5HRUFMIFNQSVJBTlQnICjDocK0wqQpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIExFVFRFUiBXWU5OJyAow4bCvylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gTEVUVEVSIFlSJyAow4bCpilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgQ0FQSVRBTCBMRVRURVIgSSBXSVRIIFNUUk9LRScgKMOhwrXCuylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgQ0FQSVRBTCBMRVRURVIgVSBXSVRIIFNUUk9LRScgKMOhwrXCvilcbiAgICAnw4PCoSc6ICdhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBBQ1VURVxuICAgICfDhMaSJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIEJSRVZFXG4gICAgJ8OhwrrCryc6ICdhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBCUkVWRSBBTkQgQUNVVEVcbiAgICAnw6HCusK3JzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIEJSRVZFIEFORCBET1QgQkVMT1dcbiAgICAnw6HCusKxJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIEJSRVZFIEFORCBHUkFWRVxuICAgICfDocK6wrMnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggQlJFVkUgQU5EIEhPT0sgQUJPVkVcbiAgICAnw6HCusK1JzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIEJSRVZFIEFORCBUSUxERVxuICAgICfDh8W9JzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIENBUk9OXG4gICAgJ8ODwqInOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDocK6wqUnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggQ0lSQ1VNRkxFWCBBTkQgQUNVVEVcbiAgICAnw6HCusKtJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggQU5EIERPVCBCRUxPV1xuICAgICfDocK6wqcnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggQ0lSQ1VNRkxFWCBBTkQgR1JBVkVcbiAgICAnw6HCusKpJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggQU5EIEhPT0sgQUJPVkVcbiAgICAnw6HCusKrJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggQU5EIFRJTERFXG4gICAgJ8ODwqQnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggRElBRVJFU0lTXG4gICAgJ8OHxbgnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggRElBRVJFU0lTIEFORCBNQUNST05cbiAgICAnw4jCpyc6ICdhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBET1QgQUJPVkVcbiAgICAnw4fCoSc6ICdhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBET1QgQUJPVkUgQU5EIE1BQ1JPTlxuICAgICfDocK6wqEnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OIwoEnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggRE9VQkxFIEdSQVZFXG4gICAgJ8ODICc6ICdhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBHUkFWRVxuICAgICfDocK6wqMnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggSE9PSyBBQk9WRVxuICAgICfDiMaSJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIElOVkVSVEVEIEJSRVZFXG4gICAgJ8OEwoEnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggTUFDUk9OXG4gICAgJ8OE4oCmJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIE9HT05FS1xuICAgICfDocK2wo8nOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggUkVUUk9GTEVYIEhPT0tcbiAgICAnw6HCusWhJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIFJJR0hUIEhBTEYgUklOR1xuICAgICfDg8KlJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIFJJTkcgQUJPVkVcbiAgICAnw4fCuyc6ICdhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBSSU5HIEFCT1ZFIEFORCBBQ1VURVxuICAgICfDocK4woEnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggUklORyBCRUxPV1xuICAgICfDosKxwqUnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggU1RST0tFXG4gICAgJ8ODwqMnOiAnYScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggVElMREVcbiAgICAnw6rFk8KzJzogJ2FhJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEFBXG4gICAgJ8ODwqYnOiAnYWUnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQUVcbiAgICAnw4fCvSc6ICdhZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBRSBXSVRIIEFDVVRFXG4gICAgJ8OHwqMnOiAnYWUnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQUUgV0lUSCBNQUNST05cbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEFMUEhBJyAow4nigJgpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBBTFBIQSBXSVRIIFJFVFJPRkxFWCBIT09LJyAow6HCtsKQKVxuICAgICfDqsWTwrUnOiAnYW8nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQU9cbiAgICAnw6rFk8K3JzogJ2F1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEFVXG4gICAgJ8OqxZPCuSc6ICdhdicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBBVlxuICAgICfDqsWTwrsnOiAnYXYnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQVYgV0lUSCBIT1JJWk9OVEFMIEJBUlxuICAgICfDqsWTwr0nOiAnYXknLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQVlcbiAgICAnw6HCuMaSJzogJ2InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQiBXSVRIIERPVCBBQk9WRVxuICAgICfDocK44oCmJzogJ2InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQiBXSVRIIERPVCBCRUxPV1xuICAgICfDieKAnCc6ICdiJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEIgV0lUSCBIT09LXG4gICAgJ8OhwrjigKEnOiAnYicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBCIFdJVEggTElORSBCRUxPV1xuICAgICfDocK1wqwnOiAnYicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBCIFdJVEggTUlERExFIFRJTERFXG4gICAgJ8OhwrbigqwnOiAnYicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBCIFdJVEggUEFMQVRBTCBIT09LXG4gICAgJ8OG4oKsJzogJ2InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQiBXSVRIIFNUUk9LRVxuICAgICfDhsaSJzogJ2InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQiBXSVRIIFRPUEJBUlxuICAgICfDicK1JzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQkFSUkVEIE9cbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEJPVFRPTSBIQUxGIE8nICjDocK04oCUKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgQlJPS0VOIEwnICjDqsKd4oChKVxuICAgICfDhOKAoSc6ICdjJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEMgV0lUSCBBQ1VURVxuICAgICfDhMKNJzogJ2MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQyBXSVRIIENBUk9OXG4gICAgJ8ODwqcnOiAnYycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBDIFdJVEggQ0VESUxMQVxuICAgICfDocK44oCwJzogJ2MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQyBXSVRIIENFRElMTEEgQU5EIEFDVVRFXG4gICAgJ8OE4oCwJzogJ2MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgQyBXSVRIIENJUkNVTUZMRVhcbiAgICAnw4nigKInOiAnYycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBDIFdJVEggQ1VSTFxuICAgICfDhOKAuSc6ICdjJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEMgV0lUSCBET1QgQUJPVkVcbiAgICAnw4bLhic6ICdjJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEMgV0lUSCBIT09LXG4gICAgJ8OIwrwnOiAnYycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBDIFdJVEggU1RST0tFXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBDTE9TRUQgT01FR0EnICjDicK3KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgQ0xPU0VEIE9QRU4gRScgKMOKxaEpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBDTE9TRUQgUkVWRVJTRUQgT1BFTiBFJyAow4nFvilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIENPTicgKMOqwp3CrylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIENVQVRSSUxMTycgKMOqxZPCrSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIENVQVRSSUxMTyBXSVRIIENPTU1BJyAow6rFk8KvKVxuICAgICfDhMKPJzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRCBXSVRIIENBUk9OXG4gICAgJ8OhwrjigJgnOiAnZCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBEIFdJVEggQ0VESUxMQVxuICAgICfDocK44oCcJzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRCBXSVRIIENJUkNVTUZMRVggQkVMT1dcbiAgICAnw4jCoSc6ICdkJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEQgV0lUSCBDVVJMXG4gICAgJ8OhwrjigLknOiAnZCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBEIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OhwrjCjSc6ICdkJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEQgV0lUSCBET1QgQkVMT1dcbiAgICAnw4nigJQnOiAnZCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBEIFdJVEggSE9PS1xuICAgICfDocK24oCYJzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRCBXSVRIIEhPT0sgQU5EIFRBSUxcbiAgICAnw6HCuMKPJzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRCBXSVRIIExJTkUgQkVMT1dcbiAgICAnw6HCtcKtJzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRCBXSVRIIE1JRERMRSBUSUxERVxuICAgICfDocK2woEnOiAnZCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBEIFdJVEggUEFMQVRBTCBIT09LXG4gICAgJ8OE4oCYJzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRCBXSVRIIFNUUk9LRVxuICAgICfDieKAkyc6ICdkJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEQgV0lUSCBUQUlMXG4gICAgJ8OGxZInOiAnZCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBEIFdJVEggVE9QQkFSXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBEQiBESUdSQVBIJyAow4jCuClcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIERFTFRBJyAow6HCusW4KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgREVaSCBESUdSQVBIJyAow4rCpClcbiAgICAnw4TCsSc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIERPVExFU1MgSVxuICAgICfDiMK3JzogJ2onLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRE9UTEVTUyBKXG4gICAgJ8OJxbgnOiAnaicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBET1RMRVNTIEogV0lUSCBTVFJPS0VcbiAgICAnw4rigJ4nOiAnaicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBET1RMRVNTIEogV0lUSCBTVFJPS0UgQU5EIEhPT0tcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIERVTScgKMOqwp3CsSlcbiAgICAnw4fCsyc6ICdkeicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBEWlxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgRFogRElHUkFQSCcgKMOKwqMpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBEWiBESUdSQVBIIFdJVEggQ1VSTCcgKMOKwqUpXG4gICAgJ8OH4oCgJzogJ2R6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIERaIFdJVEggQ0FST05cbiAgICAnw4PCqSc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBBQ1VURVxuICAgICfDhOKAoic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBCUkVWRVxuICAgICfDhOKAuic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBDQVJPTlxuICAgICfDiMKpJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIENFRElMTEFcbiAgICAnw6HCuMKdJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIENFRElMTEEgQU5EIEJSRVZFXG4gICAgJ8ODwqonOiAnZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDocK6wr8nOiAnZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWCBBTkQgQUNVVEVcbiAgICAnw6HCu+KAoSc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYIEFORCBET1QgQkVMT1dcbiAgICAnw6HCu8KBJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIENJUkNVTUZMRVggQU5EIEdSQVZFXG4gICAgJ8OhwrvGkic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYIEFORCBIT09LIEFCT1ZFXG4gICAgJ8OhwrvigKYnOiAnZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggQ0lSQ1VNRkxFWCBBTkQgVElMREVcbiAgICAnw6HCuOKEoic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYIEJFTE9XXG4gICAgJ8ODwqsnOiAnZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggRElBRVJFU0lTXG4gICAgJ8OE4oCUJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIERPVCBBQk9WRVxuICAgICfDocK6wrknOiAnZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OI4oCmJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIERPVUJMRSBHUkFWRVxuICAgICfDg8KoJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIEdSQVZFXG4gICAgJ8OhwrrCuyc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBIT09LIEFCT1ZFXG4gICAgJ8OI4oChJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIElOVkVSVEVEIEJSRVZFXG4gICAgJ8OE4oCcJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIE1BQ1JPTlxuICAgICfDocK44oCUJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIE1BQ1JPTiBBTkQgQUNVVEVcbiAgICAnw6HCuOKAoic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBNQUNST04gQU5EIEdSQVZFXG4gICAgJ8OiwrHCuCc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBOT1RDSFxuICAgICfDhOKEoic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBPR09ORUtcbiAgICAnw6HCtuKAmSc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBSRVRST0ZMRVggSE9PS1xuICAgICfDieKAoSc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBTVFJPS0VcbiAgICAnw6HCusK9JzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIFRJTERFXG4gICAgJ8OhwrjigLonOiAnZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggVElMREUgQkVMT1dcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEVHWVBUT0xPR0lDQUwgQUlOJyAow6rFk8KlKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgRUdZUFRPTE9HSUNBTCBBTEVGJyAow6rFk8KjKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgRU5HJyAow4XigLkpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBFU0gnICjDisaSKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgRVNIIFdJVEggQ1VSTCcgKMOK4oCgKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgRVNIIFdJVEggUEFMQVRBTCBIT09LJyAow6HCtuKAuSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEVTSCBXSVRIIFJFVFJPRkxFWCBIT09LJyAow6HCtsucKVxuICAgICfDqsKdwqsnOiAnZXQnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRVRcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEVUSCcgKMODwrApXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBFWkgnICjDiuKAmSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEVaSCBSRVZFUlNFRCcgKMOGwrkpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBFWkggV0lUSCBDQVJPTicgKMOHwq8pXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBFWkggV0lUSCBDVVJMJyAow4rigJwpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBFWkggV0lUSCBSRVRST0ZMRVggSE9PSycgKMOhwrbFoSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEVaSCBXSVRIIFRBSUwnICjDhsK6KVxuICAgICfDocK4xbgnOiAnZicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBGIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OG4oCZJzogJ2YnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRiBXSVRIIEhPT0tcbiAgICAnw6HCtcKuJzogJ2YnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRiBXSVRIIE1JRERMRSBUSUxERVxuICAgICfDocK24oCaJzogJ2YnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRiBXSVRIIFBBTEFUQUwgSE9PS1xuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgRkVORyBESUdSQVBIJyAow4rCqSlcbiAgICAnw4fCtSc6ICdnJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEcgV0lUSCBBQ1VURVxuICAgICfDhMW4JzogJ2cnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRyBXSVRIIEJSRVZFXG4gICAgJ8OHwqcnOiAnZycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBHIFdJVEggQ0FST05cbiAgICAnw4TCoyc6ICdnJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEcgV0lUSCBDRURJTExBXG4gICAgJ8OEwp0nOiAnZycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBHIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDhMKhJzogJ2cnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgRyBXSVRIIERPVCBBQk9WRVxuICAgICfDiSAnOiAnZycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBHIFdJVEggSE9PS1xuICAgICfDocK4wqEnOiAnZycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBHIFdJVEggTUFDUk9OXG4gICAgJ8OhwrbGkic6ICdnJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEcgV0lUSCBQQUxBVEFMIEhPT0tcbiAgICAnw4fCpSc6ICdnJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEcgV0lUSCBTVFJPS0VcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEdBTU1BJyAow4nCoylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIEdMT1RUQUwgU1RPUCcgKMOJ4oCaKVxuICAgICfDocK4wqsnOiAnaCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBIIFdJVEggQlJFVkUgQkVMT1dcbiAgICAnw4jFuCc6ICdoJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEggV0lUSCBDQVJPTlxuICAgICfDocK4wqknOiAnaCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBIIFdJVEggQ0VESUxMQVxuICAgICfDhMKlJzogJ2gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSCBXSVRIIENJUkNVTUZMRVhcbiAgICAnw6LCscKoJzogJ2gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSCBXSVRIIERFU0NFTkRFUlxuICAgICfDocK4wqcnOiAnaCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBIIFdJVEggRElBRVJFU0lTXG4gICAgJ8OhwrjCoyc6ICdoJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEggV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCuMKlJzogJ2gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSCBXSVRIIERPVCBCRUxPV1xuICAgICfDicKmJzogJ2gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSCBXSVRIIEhPT0tcbiAgICAnw6HCuuKAkyc6ICdoJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEggV0lUSCBMSU5FIEJFTE9XXG4gICAgJ8OEwqcnOiAnaCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBIIFdJVEggU1RST0tFXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBIQUxGIEgnICjDosKxwrYpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBIRU5HJyAow6rFk8KnKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgSEVORyBXSVRIIEhPT0snICjDicKnKVxuICAgICfDhuKAoic6ICdodicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBIVlxuICAgICfDg8KtJzogJ2knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSSBXSVRIIEFDVVRFXG4gICAgJ8OEwq0nOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggQlJFVkVcbiAgICAnw4fCkCc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBDQVJPTlxuICAgICfDg8KuJzogJ2knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSSBXSVRIIENJUkNVTUZMRVhcbiAgICAnw4PCryc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBESUFFUkVTSVNcbiAgICAnw6HCuMKvJzogJ2knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSSBXSVRIIERJQUVSRVNJUyBBTkQgQUNVVEVcbiAgICAnw6HCu+KAuSc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBET1QgQkVMT1dcbiAgICAnw4jigLAnOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggRE9VQkxFIEdSQVZFXG4gICAgJ8ODwqwnOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggR1JBVkVcbiAgICAnw6HCu+KAsCc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBIT09LIEFCT1ZFXG4gICAgJ8OI4oC5JzogJ2knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSSBXSVRIIElOVkVSVEVEIEJSRVZFXG4gICAgJ8OEwqsnOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggTUFDUk9OXG4gICAgJ8OEwq8nOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggT0dPTkVLXG4gICAgJ8OhwrbigJMnOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggUkVUUk9GTEVYIEhPT0tcbiAgICAnw4nCqCc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBTVFJPS0VcbiAgICAnw4TCqSc6ICdpJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBUSUxERVxuICAgICfDocK4wq0nOiAnaScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggVElMREUgQkVMT1dcbiAgICAnw6rCncK6JzogJ2QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSU5TVUxBUiBEXG4gICAgJ8Oqwp3CvCc6ICdmJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIElOU1VMQVIgRlxuICAgICfDocK1wrknOiAnZycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJTlNVTEFSIEdcbiAgICAnw6rFvsaSJzogJ3InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSU5TVUxBUiBSXG4gICAgJ8Oqxb7igKYnOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBJTlNVTEFSIFNcbiAgICAnw6rFvuKAoSc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIElOU1VMQVIgVFxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgSU9UQScgKMOJwqkpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBJT1RBIFdJVEggU1RST0tFJyAow6HCtcK8KVxuICAgICfDqsKdwq0nOiAnaXMnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSVNcbiAgICAnw4fCsCc6ICdqJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEogV0lUSCBDQVJPTlxuICAgICfDhMK1JzogJ2onLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSiBXSVRIIENJUkNVTUZMRVhcbiAgICAnw4rCnSc6ICdqJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEogV0lUSCBDUk9TU0VELVRBSUxcbiAgICAnw4nigLAnOiAnaicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBKIFdJVEggU1RST0tFXG4gICAgJ8OhwrjCsSc6ICdrJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEsgV0lUSCBBQ1VURVxuICAgICfDh8KpJzogJ2snLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSyBXSVRIIENBUk9OXG4gICAgJ8OEwrcnOiAnaycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBLIFdJVEggQ0VESUxMQVxuICAgICfDosKxwqonOiAnaycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBLIFdJVEggREVTQ0VOREVSXG4gICAgJ8Oqwp3Gkic6ICdrJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEsgV0lUSCBESUFHT05BTCBTVFJPS0VcbiAgICAnw6HCuMKzJzogJ2snLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgSyBXSVRIIERPVCBCRUxPV1xuICAgICfDhuKEoic6ICdrJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEsgV0lUSCBIT09LXG4gICAgJ8OhwrjCtSc6ICdrJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEsgV0lUSCBMSU5FIEJFTE9XXG4gICAgJ8OhwrbigJ4nOiAnaycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBLIFdJVEggUEFMQVRBTCBIT09LXG4gICAgJ8Oqwp3CgSc6ICdrJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEsgV0lUSCBTVFJPS0VcbiAgICAnw6rCneKApic6ICdrJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEsgV0lUSCBTVFJPS0UgQU5EIERJQUdPTkFMIFNUUk9LRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgS1JBJyAow4TCuClcbiAgICAnw4TCuic6ICdsJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEwgV0lUSCBBQ1VURVxuICAgICfDhsWhJzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIEJBUlxuICAgICfDicKsJzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIEJFTFRcbiAgICAnw4TCvic6ICdsJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEwgV0lUSCBDQVJPTlxuICAgICfDhMK8JzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIENFRElMTEFcbiAgICAnw6HCuMK9JzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIENJUkNVTUZMRVggQkVMT1dcbiAgICAnw4jCtCc6ICdsJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEwgV0lUSCBDVVJMXG4gICAgJ8OhwrjCtyc6ICdsJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEwgV0lUSCBET1QgQkVMT1dcbiAgICAnw6HCuMK5JzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIERPVCBCRUxPVyBBTkQgTUFDUk9OXG4gICAgJ8OiwrHCoSc6ICdsJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIEwgV0lUSCBET1VCTEUgQkFSXG4gICAgJ8Oqwp3igLAnOiAnbCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBMIFdJVEggSElHSCBTVFJPS0VcbiAgICAnw6HCuMK7JzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIExJTkUgQkVMT1dcbiAgICAnw4XigqwnOiAnbCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBMIFdJVEggTUlERExFIERPVFxuICAgICfDicKrJzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIE1JRERMRSBUSUxERVxuICAgICfDocK24oCmJzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIFBBTEFUQUwgSE9PS1xuICAgICfDicKtJzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIFJFVFJPRkxFWCBIT09LXG4gICAgJ8OF4oCaJzogJ2wnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTCBXSVRIIFNUUk9LRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgTEFNQkRBIFdJVEggU1RST0tFJyAow4bigLopXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBMRVpIJyAow4nCrilcbiAgICAnw4figLAnOiAnbGonLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTEpcbiAgICAnw4XCvyc6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIExPTkcgU1xuICAgICfDocK6xZMnOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBMT05HIFMgV0lUSCBESUFHT05BTCBTVFJPS0VcbiAgICAnw6HCuuKAuic6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIExPTkcgUyBXSVRIIERPVCBBQk9WRVxuICAgICfDocK6wp0nOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBMT05HIFMgV0lUSCBISUdIIFNUUk9LRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgTFMgRElHUkFQSCcgKMOKwqopXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBMVU0nICjDqsKdwrIpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBMWiBESUdSQVBIJyAow4rCqylcbiAgICAnw6HCuMK/JzogJ20nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTSBXSVRIIEFDVVRFXG4gICAgJ8OhwrnCgSc6ICdtJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE0gV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCucaSJzogJ20nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTSBXSVRIIERPVCBCRUxPV1xuICAgICfDicKxJzogJ20nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTSBXSVRIIEhPT0tcbiAgICAnw6HCtcKvJzogJ20nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTSBXSVRIIE1JRERMRSBUSUxERVxuICAgICfDocK24oCgJzogJ20nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTSBXSVRIIFBBTEFUQUwgSE9PS1xuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgTUlERExFLVdFTFNIIExMJyAow6HCu8K7KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgTUlERExFLVdFTFNIIFYnICjDocK7wr0pXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBNVU0nICjDqsKdwrMpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBOIFBSRUNFREVEIEJZIEFQT1NUUk9QSEUnICjDheKAsClcbiAgICAnw4XigJ4nOiAnbicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBOIFdJVEggQUNVVEVcbiAgICAnw4XLhic6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBDQVJPTlxuICAgICfDheKAoCc6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBDRURJTExBXG4gICAgJ8OhwrnigLknOiAnbicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBOIFdJVEggQ0lSQ1VNRkxFWCBCRUxPV1xuICAgICfDiMK1JzogJ24nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTiBXSVRIIENVUkxcbiAgICAnw6HCueKApic6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCueKAoSc6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBET1QgQkVMT1dcbiAgICAnw4fCuSc6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBHUkFWRVxuICAgICfDicKyJzogJ24nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTiBXSVRIIExFRlQgSE9PS1xuICAgICfDocK54oCwJzogJ24nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTiBXSVRIIExJTkUgQkVMT1dcbiAgICAnw4bFvic6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBMT05HIFJJR0hUIExFR1xuICAgICfDocK1wrAnOiAnbicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBOIFdJVEggTUlERExFIFRJTERFXG4gICAgJ8OhwrbigKEnOiAnbicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBOIFdJVEggUEFMQVRBTCBIT09LXG4gICAgJ8OJwrMnOiAnbicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBOIFdJVEggUkVUUk9GTEVYIEhPT0tcbiAgICAnw4PCsSc6ICduJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBUSUxERVxuICAgICfDh8WSJzogJ25qJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE5KXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBOVU0nICjDqsKdwrQpXG4gICAgJ8ODwrMnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggQUNVVEVcbiAgICAnw4XCjyc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBCUkVWRVxuICAgICfDh+KAmSc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBDQVJPTlxuICAgICfDg8K0JzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIENJUkNVTUZMRVhcbiAgICAnw6HCu+KAmCc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBDSVJDVU1GTEVYIEFORCBBQ1VURVxuICAgICfDocK74oSiJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIENJUkNVTUZMRVggQU5EIERPVCBCRUxPV1xuICAgICfDocK74oCcJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIENJUkNVTUZMRVggQU5EIEdSQVZFXG4gICAgJ8OhwrvigKInOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggQ0lSQ1VNRkxFWCBBTkQgSE9PSyBBQk9WRVxuICAgICfDocK74oCUJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIENJUkNVTUZMRVggQU5EIFRJTERFXG4gICAgJ8ODwrYnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggRElBRVJFU0lTXG4gICAgJ8OIwqsnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggRElBRVJFU0lTIEFORCBNQUNST05cbiAgICAnw4jCryc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBET1QgQUJPVkVcbiAgICAnw4jCsSc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBET1QgQUJPVkUgQU5EIE1BQ1JPTlxuICAgICfDocK7wo0nOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OF4oCYJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIERPVUJMRSBBQ1VURVxuICAgICfDiMKNJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIERPVUJMRSBHUkFWRVxuICAgICfDg8KyJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIEdSQVZFXG4gICAgJ8OhwrvCjyc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBIT09LIEFCT1ZFXG4gICAgJ8OGwqEnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggSE9STlxuICAgICfDocK74oC6JzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIEhPUk4gQU5EIEFDVVRFXG4gICAgJ8OhwrvCoyc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBIT1JOIEFORCBET1QgQkVMT1dcbiAgICAnw6HCu8KdJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIEhPUk4gQU5EIEdSQVZFXG4gICAgJ8OhwrvFuCc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBIT1JOIEFORCBIT09LIEFCT1ZFXG4gICAgJ8OhwrvCoSc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBIT1JOIEFORCBUSUxERVxuICAgICfDiMKPJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIElOVkVSVEVEIEJSRVZFXG4gICAgJ8Oqwp3igLknOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggTE9ORyBTVFJPS0UgT1ZFUkxBWVxuICAgICfDqsKdwo0nOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggTE9PUFxuICAgICfDosKxwronOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggTE9XIFJJTkcgSU5TSURFXG4gICAgJ8OFwo0nOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggTUFDUk9OXG4gICAgJ8OhwrnigJwnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggTUFDUk9OIEFORCBBQ1VURVxuICAgICfDocK54oCYJzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIE1BQ1JPTiBBTkQgR1JBVkVcbiAgICAnw4fCqyc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBPR09ORUtcbiAgICAnw4fCrSc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBPR09ORUsgQU5EIE1BQ1JPTlxuICAgICfDg8K4JzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIFNUUk9LRVxuICAgICfDh8K/JzogJ28nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIFNUUk9LRSBBTkQgQUNVVEVcbiAgICAnw4PCtSc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBUSUxERVxuICAgICfDocK5wo0nOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggVElMREUgQU5EIEFDVVRFXG4gICAgJ8OhwrnCjyc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBUSUxERSBBTkQgRElBRVJFU0lTXG4gICAgJ8OIwq0nOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggVElMREUgQU5EIE1BQ1JPTlxuICAgICfDhsKjJzogJ29pJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE9JXG4gICAgJ8Oqwp3Cjyc6ICdvbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPT1xuICAgICfDieKAuic6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE9QRU4gRVxuICAgICfDocK24oCcJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgT1BFTiBFIFdJVEggUkVUUk9GTEVYIEhPT0tcbiAgICAnw4nigJ0nOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBPUEVOIE9cbiAgICAnw6HCtuKAlCc6ICdvJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIE9QRU4gTyBXSVRIIFJFVFJPRkxFWCBIT09LXG4gICAgJ8OIwqMnOiAnb3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgT1VcbiAgICAnw6HCueKAoic6ICdwJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFAgV0lUSCBBQ1VURVxuICAgICfDocK54oCUJzogJ3AnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUCBXSVRIIERPVCBBQk9WRVxuICAgICfDqsKd4oCcJzogJ3AnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUCBXSVRIIEZMT1VSSVNIXG4gICAgJ8OGwqUnOiAncCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBQIFdJVEggSE9PS1xuICAgICfDocK1wrEnOiAncCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBQIFdJVEggTUlERExFIFRJTERFXG4gICAgJ8OhwrbLhic6ICdwJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFAgV0lUSCBQQUxBVEFMIEhPT0tcbiAgICAnw6rCneKAoic6ICdwJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFAgV0lUSCBTUVVJUlJFTCBUQUlMXG4gICAgJ8OhwrXCvSc6ICdwJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFAgV0lUSCBTVFJPS0VcbiAgICAnw6rCneKAmCc6ICdwJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFAgV0lUSCBTVFJPS0UgVEhST1VHSCBERVNDRU5ERVJcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFBISScgKMOJwrgpXG4gICAgJ8Oqwp3ihKInOiAncScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBRIFdJVEggRElBR09OQUwgU1RST0tFXG4gICAgJ8OKICc6ICdxJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFEgV0lUSCBIT09LXG4gICAgJ8OJ4oC5JzogJ3EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUSBXSVRIIEhPT0sgVEFJTFxuICAgICfDqsKd4oCUJzogJ3EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUSBXSVRIIFNUUk9LRSBUSFJPVUdIIERFU0NFTkRFUlxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgUVAgRElHUkFQSCcgKMOIwrkpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBSIFJPVFVOREEnICjDqsKd4oC6KVxuICAgICfDheKAoic6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBBQ1VURVxuICAgICfDheKEoic6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBDQVJPTlxuICAgICfDheKAlCc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBDRURJTExBXG4gICAgJ8OhwrnihKInOiAncicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBSIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OhwrnigLonOiAncicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBSIFdJVEggRE9UIEJFTE9XXG4gICAgJ8OhwrnCnSc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBET1QgQkVMT1cgQU5EIE1BQ1JPTlxuICAgICfDiOKAmCc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBET1VCTEUgR1JBVkVcbiAgICAnw4nCvic6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBGSVNISE9PS1xuICAgICfDocK1wrMnOiAncicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBSIFdJVEggRklTSEhPT0sgQU5EIE1JRERMRSBUSUxERVxuICAgICfDiOKAnCc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBJTlZFUlRFRCBCUkVWRVxuICAgICfDocK5xbgnOiAncicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBSIFdJVEggTElORSBCRUxPV1xuICAgICfDicK8JzogJ3InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUiBXSVRIIExPTkcgTEVHXG4gICAgJ8OhwrXCsic6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBNSURETEUgVElMREVcbiAgICAnw6HCtuKAsCc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBQQUxBVEFMIEhPT0tcbiAgICAnw4nCjSc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBTVFJPS0VcbiAgICAnw4nCvSc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFIgV0lUSCBUQUlMXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBSQU1TIEhPUk4nICjDicKkKVxuICAgICfDouKAoOKAnic6ICdjJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFJFVkVSU0VEIENcbiAgICAnw6rFk8K/JzogJ2MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUkVWRVJTRUQgQyBXSVRIIERPVFxuICAgICfDicucJzogJ2UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUkVWRVJTRUQgRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgUkVWRVJTRUQgT1BFTiBFJyAow4nFkylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFJFVkVSU0VEIE9QRU4gRSBXSVRIIEhPT0snICjDicKdKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgUkVWRVJTRUQgT1BFTiBFIFdJVEggUkVUUk9GTEVYIEhPT0snICjDocK24oCdKVxuICAgICfDicK/JzogJ3InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUkVWRVJTRUQgUiBXSVRIIEZJU0hIT09LXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBSVU0nICjDqsKdwrUpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBSVU0gUk9UVU5EQScgKMOqwp3CnSlcbiAgICAnw4XigLonOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTIFdJVEggQUNVVEVcbiAgICAnw6HCucKlJzogJ3MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUyBXSVRIIEFDVVRFIEFORCBET1QgQUJPVkVcbiAgICAnw4XCoSc6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFMgV0lUSCBDQVJPTlxuICAgICfDocK5wqcnOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTIFdJVEggQ0FST04gQU5EIERPVCBBQk9WRVxuICAgICfDhcW4JzogJ3MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUyBXSVRIIENFRElMTEFcbiAgICAnw4XCnSc6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFMgV0lUSCBDSVJDVU1GTEVYXG4gICAgJ8OI4oSiJzogJ3MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUyBXSVRIIENPTU1BIEJFTE9XXG4gICAgJ8OhwrnCoSc6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFMgV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCucKjJzogJ3MnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgUyBXSVRIIERPVCBCRUxPV1xuICAgICfDocK5wqknOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTIFdJVEggRE9UIEJFTE9XIEFORCBET1QgQUJPVkVcbiAgICAnw4rigJonOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTIFdJVEggSE9PS1xuICAgICfDocK1wrQnOiAncycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTIFdJVEggTUlERExFIFRJTERFXG4gICAgJ8OhwrbFoCc6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFMgV0lUSCBQQUxBVEFMIEhPT0tcbiAgICAnw4jCvyc6ICdzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFMgV0lUSCBTV0FTSCBUQUlMXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBTQUxUSUxMTycgKMOqxb7FkilcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFNDSFdBJyAow4nihKIpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBTQ0hXQSBXSVRIIEhPT0snICjDicWhKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgU0NIV0EgV0lUSCBSRVRST0ZMRVggSE9PSycgKMOhwrbigKIpXG4gICAgJ8OJwqEnOiAnZycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTQ1JJUFQgR1xuICAgICfDg8W4JzogJ3NzJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFNIQVJQIFNcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFNJREVXQVlTIERJQUVSRVNJWkVEIFUnICjDocK0xb4pXG4gICAgJ8OhwrTigJgnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTSURFV0FZUyBPXG4gICAgJ8OhwrTigJwnOiAnbycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBTSURFV0FZUyBPIFdJVEggU1RST0tFXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBTSURFV0FZUyBPUEVOIE8nICjDocK04oCZKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgU0lERVdBWVMgVFVSTkVEIE0nICjDocK0xbgpXG4gICAgJ8OhwrTCnSc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFNJREVXQVlTIFVcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFNRVUFUIFJFVkVSU0VEIEVTSCcgKMOK4oCmKVxuICAgICfDhcKlJzogJ3QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVCBXSVRIIENBUk9OXG4gICAgJ8OFwqMnOiAndCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUIFdJVEggQ0VESUxMQVxuICAgICfDocK5wrEnOiAndCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUIFdJVEggQ0lSQ1VNRkxFWCBCRUxPV1xuICAgICfDiOKAuic6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBDT01NQSBCRUxPV1xuICAgICfDiMK2JzogJ3QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVCBXSVRIIENVUkxcbiAgICAnw6HCuuKAlCc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBESUFFUkVTSVNcbiAgICAnw6LCscKmJzogJ3QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVCBXSVRIIERJQUdPTkFMIFNUUk9LRVxuICAgICfDocK5wqsnOiAndCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OhwrnCrSc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBET1QgQkVMT1dcbiAgICAnw4bCrSc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBIT09LXG4gICAgJ8OhwrnCryc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBMSU5FIEJFTE9XXG4gICAgJ8OhwrXCtSc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBNSURETEUgVElMREVcbiAgICAnw4bCqyc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBQQUxBVEFMIEhPT0tcbiAgICAnw4rLhic6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFQgV0lUSCBSRVRST0ZMRVggSE9PS1xuICAgICfDhcKnJzogJ3QnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVCBXSVRIIFNUUk9LRVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVEFJTExFU1MgUEhJJyAow6LCscK3KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVEMgRElHUkFQSCBXSVRIIENVUkwnICjDisKoKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVEVTSCBESUdSQVBIJyAow4rCpylcbiAgICAnw6HCtcK6JzogJ3RoJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRIIFdJVEggU1RSSUtFVEhST1VHSFxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVEhPUk4nICjDg8K+KVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVEhPUk4gV0lUSCBTVFJPS0UnICjDqsKdwqUpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBUSE9STiBXSVRIIFNUUk9LRSBUSFJPVUdIIERFU0NFTkRFUicgKMOqwp3CpylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFRPTkUgRklWRScgKMOGwr0pXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBUT05FIFNJWCcgKMOG4oCmKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVE9ORSBUV08nICjDhsKoKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVE9QIEhBTEYgTycgKMOhwrTigJMpXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBUUkVTSUxMTycgKMOqxZPCqylcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFRTIERJR1JBUEgnICjDisKmKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVFVNJyAow6rCncK3KVxuICAgICfDicKQJzogJ2EnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIEFcbiAgICAnw6HCtOKAmic6ICdhZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgQUVcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBBTFBIQScgKMOJ4oCZKVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIERFTFRBJyAow4bCjSlcbiAgICAnw4fCnSc6ICdlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBFXG4gICAgJ8OhwrXCtyc6ICdnJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBHXG4gICAgJ8OJwqUnOiAnaCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgSFxuICAgICfDisKuJzogJ2gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIEggV0lUSCBGSVNISE9PS1xuICAgICfDisKvJzogJ2gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIEggV0lUSCBGSVNISE9PSyBBTkQgVEFJTFxuICAgICfDocK04oCwJzogJ2knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIElcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBJTlNVTEFSIEcnICjDqsKdwr8pXG4gICAgJ8OKxb4nOiAnaycsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgS1xuICAgICfDqsW+woEnOiAnbCcsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgTFxuICAgICfDicKvJzogJ20nLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIE1cbiAgICAnw4nCsCc6ICdtJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBNIFdJVEggTE9ORyBMRUdcbiAgICAnw6HCtOKAnSc6ICdvZScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgT0VcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBPUEVOIEUnICjDocK0y4YpXG4gICAgJ8OJwrknOiAncicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgUlxuICAgICfDicK7JzogJ3InLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIFIgV0lUSCBIT09LXG4gICAgJ8OJwronOiAncicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgUiBXSVRIIExPTkcgTEVHXG4gICAgJ8OiwrHCuSc6ICdyJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBSIFdJVEggVEFJTFxuICAgICfDiuKAoSc6ICd0JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBUXG4gICAgJ8OKxZInOiAndicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUVVJORUQgVlxuICAgICfDisKNJzogJ3cnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVFVSTkVEIFdcbiAgICAnw4rFvSc6ICd5JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFRVUk5FRCBZXG4gICAgJ8OqxZPCqSc6ICd0eicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBUWlxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVSBCQVInICjDiuKAsClcbiAgICAnw4PCuic6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBBQ1VURVxuICAgICfDhcKtJzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIEJSRVZFXG4gICAgJ8OH4oCdJzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIENBUk9OXG4gICAgJ8ODwrsnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDocK5wrcnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggQ0lSQ1VNRkxFWCBCRUxPV1xuICAgICfDg8K8JzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIERJQUVSRVNJU1xuICAgICfDh8ucJzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIERJQUVSRVNJUyBBTkQgQUNVVEVcbiAgICAnw4fFoSc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBESUFFUkVTSVMgQU5EIENBUk9OXG4gICAgJ8OHxZMnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggRElBRVJFU0lTIEFORCBHUkFWRVxuICAgICfDh+KAkyc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBESUFFUkVTSVMgQU5EIE1BQ1JPTlxuICAgICfDocK5wrMnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggRElBRVJFU0lTIEJFTE9XXG4gICAgJ8OhwrvCpSc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBET1QgQkVMT1dcbiAgICAnw4XCsSc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBET1VCTEUgQUNVVEVcbiAgICAnw4jigKInOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggRE9VQkxFIEdSQVZFXG4gICAgJ8ODwrknOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggR1JBVkVcbiAgICAnw6HCu8KnJzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIEhPT0sgQUJPVkVcbiAgICAnw4bCsCc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBIT1JOXG4gICAgJ8OhwrvCqSc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBIT1JOIEFORCBBQ1VURVxuICAgICfDocK7wrEnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggSE9STiBBTkQgRE9UIEJFTE9XXG4gICAgJ8OhwrvCqyc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBIT1JOIEFORCBHUkFWRVxuICAgICfDocK7wq0nOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggSE9STiBBTkQgSE9PSyBBQk9WRVxuICAgICfDocK7wq8nOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggSE9STiBBTkQgVElMREVcbiAgICAnw4jigJQnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggSU5WRVJURUQgQlJFVkVcbiAgICAnw4XCqyc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBNQUNST05cbiAgICAnw6HCucK7JzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIE1BQ1JPTiBBTkQgRElBRVJFU0lTXG4gICAgJ8OFwrMnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggT0dPTkVLXG4gICAgJ8OhwrbihKInOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggUkVUUk9GTEVYIEhPT0tcbiAgICAnw4XCryc6ICd1JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBSSU5HIEFCT1ZFXG4gICAgJ8OFwqknOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggVElMREVcbiAgICAnw6HCucK5JzogJ3UnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIFRJTERFIEFORCBBQ1VURVxuICAgICfDocK5wrUnOiAndScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggVElMREUgQkVMT1dcbiAgICAnw6HCtcKrJzogJ3VlJywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFVFXG4gICAgJ8Oqwp3CuCc6ICd1bScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBVTVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVVBTSUxPTicgKMOKxaApXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBVUFNJTE9OIFdJVEggU1RST0tFJyAow6HCtcK/KVxuICAgICfDosKxwrQnOiAndicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBWIFdJVEggQ1VSTFxuICAgICfDqsKdxbgnOiAndicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBWIFdJVEggRElBR09OQUwgU1RST0tFXG4gICAgJ8OhwrnCvyc6ICd2JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFYgV0lUSCBET1QgQkVMT1dcbiAgICAnw4rigLknOiAndicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBWIFdJVEggSE9PS1xuICAgICfDocK2xZInOiAndicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBWIFdJVEggUEFMQVRBTCBIT09LXG4gICAgJ8OiwrHCsSc6ICd2JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFYgV0lUSCBSSUdIVCBIT09LXG4gICAgJ8OhwrnCvSc6ICd2JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFYgV0lUSCBUSUxERVxuICAgIC8vIENBTk5PVCBGSU5EIEFQUFJPWElNQVRJT04gRk9SICdMQVRJTiBTTUFMTCBMRVRURVIgVkVORCcgKMOqwp3CqSlcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTEVUVEVSIFZJU0lHT1RISUMgWicgKMOqwp3CoylcbiAgICAnw6rCncKhJzogJ3Z5JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFZZXG4gICAgJ8OhwrrGkic6ICd3JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFcgV0lUSCBBQ1VURVxuICAgICfDhcK1JzogJ3cnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVyBXSVRIIENJUkNVTUZMRVhcbiAgICAnw6HCuuKApic6ICd3JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFcgV0lUSCBESUFFUkVTSVNcbiAgICAnw6HCuuKAoSc6ICd3JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFcgV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCuuKAsCc6ICd3JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFcgV0lUSCBET1QgQkVMT1dcbiAgICAnw6HCusKBJzogJ3cnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgVyBXSVRIIEdSQVZFXG4gICAgJ8OiwrHCsyc6ICd3JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFcgV0lUSCBIT09LXG4gICAgJ8OhwrrLnCc6ICd3JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFcgV0lUSCBSSU5HIEFCT1ZFXG4gICAgJ8OhwrrCjSc6ICd4JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFggV0lUSCBESUFFUkVTSVNcbiAgICAnw6HCuuKAuSc6ICd4JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFggV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCtsKNJzogJ3gnLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWCBXSVRIIFBBTEFUQUwgSE9PS1xuICAgICfDg8K9JzogJ3knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIEFDVVRFXG4gICAgJ8OFwrcnOiAneScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDg8K/JzogJ3knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIERJQUVSRVNJU1xuICAgICfDocK6wo8nOiAneScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggRE9UIEFCT1ZFXG4gICAgJ8OhwrvCtSc6ICd5JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFkgV0lUSCBET1QgQkVMT1dcbiAgICAnw6HCu8KzJzogJ3knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIEdSQVZFXG4gICAgJ8OGwrQnOiAneScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggSE9PS1xuICAgICfDocK7wrcnOiAneScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggSE9PSyBBQk9WRVxuICAgICfDocK7wr8nOiAneScsIC8vIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggTE9PUFxuICAgICfDiMKzJzogJ3knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIE1BQ1JPTlxuICAgICfDocK64oSiJzogJ3knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIFJJTkcgQUJPVkVcbiAgICAnw4nCjyc6ICd5JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFkgV0lUSCBTVFJPS0VcbiAgICAnw6HCu8K5JzogJ3knLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIFRJTERFXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNNQUxMIExFVFRFUiBZT0dIJyAow4jCnSlcbiAgICAnw4XCuic6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBBQ1VURVxuICAgICfDhcK+JzogJ3onLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWiBXSVRIIENBUk9OXG4gICAgJ8OhwrrigJgnOiAneicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBaIFdJVEggQ0lSQ1VNRkxFWFxuICAgICfDiuKAmCc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBDVVJMXG4gICAgJ8OiwrHCrCc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBERVNDRU5ERVJcbiAgICAnw4XCvCc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBET1QgQUJPVkVcbiAgICAnw6HCuuKAnCc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBET1QgQkVMT1dcbiAgICAnw4jCpSc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBIT09LXG4gICAgJ8OhwrrigKInOiAneicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBaIFdJVEggTElORSBCRUxPV1xuICAgICfDocK1wrYnOiAneicsIC8vIExBVElOIFNNQUxMIExFVFRFUiBaIFdJVEggTUlERExFIFRJTERFXG4gICAgJ8OhwrbFvSc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBQQUxBVEFMIEhPT0tcbiAgICAnw4rCkCc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBSRVRST0ZMRVggSE9PS1xuICAgICfDhsK2JzogJ3onLCAvLyBMQVRJTiBTTUFMTCBMRVRURVIgWiBXSVRIIFNUUk9LRVxuICAgICfDieKCrCc6ICd6JywgLy8gTEFUSU4gU01BTEwgTEVUVEVSIFogV0lUSCBTV0FTSCBUQUlMXG4gICAgJ8OvwqzigqwnOiAnZmYnLCAvLyBMQVRJTiBTTUFMTCBMSUdBVFVSRSBGRlxuICAgICfDr8KsxpInOiAnZmZpJywgLy8gTEFUSU4gU01BTEwgTElHQVRVUkUgRkZJXG4gICAgJ8OvwqzigJ4nOiAnZmZsJywgLy8gTEFUSU4gU01BTEwgTElHQVRVUkUgRkZMXG4gICAgJ8OvwqzCgSc6ICdmaScsIC8vIExBVElOIFNNQUxMIExJR0FUVVJFIEZJXG4gICAgJ8OvwqzigJonOiAnZmwnLCAvLyBMQVRJTiBTTUFMTCBMSUdBVFVSRSBGTFxuICAgICfDhMKzJzogJ2lqJywgLy8gTEFUSU4gU01BTEwgTElHQVRVUkUgSUpcbiAgICAvLyBDQU5OT1QgRklORCBBUFBST1hJTUFUSU9OIEZPUiAnTEFUSU4gU01BTEwgTElHQVRVUkUgTE9ORyBTIFQnICjDr8Ks4oCmKVxuICAgICfDheKAnCc6ICdvZScsIC8vIExBVElOIFNNQUxMIExJR0FUVVJFIE9FXG4gICAgJ8OvwqzigKAnOiAnc3QnLCAvLyBMQVRJTiBTTUFMTCBMSUdBVFVSRSBTVFxuICAgICfDouKAmsKQJzogJ2EnLCAvLyBMQVRJTiBTVUJTQ1JJUFQgU01BTEwgTEVUVEVSIEFcbiAgICAnw6LigJrigJgnOiAnZScsIC8vIExBVElOIFNVQlNDUklQVCBTTUFMTCBMRVRURVIgRVxuICAgICfDocK1wqInOiAnaScsIC8vIExBVElOIFNVQlNDUklQVCBTTUFMTCBMRVRURVIgSVxuICAgICfDosKxwrwnOiAnaicsIC8vIExBVElOIFNVQlNDUklQVCBTTUFMTCBMRVRURVIgSlxuICAgICfDouKAmuKAmSc6ICdvJywgLy8gTEFUSU4gU1VCU0NSSVBUIFNNQUxMIExFVFRFUiBPXG4gICAgJ8OhwrXCoyc6ICdyJywgLy8gTEFUSU4gU1VCU0NSSVBUIFNNQUxMIExFVFRFUiBSXG4gICAgLy8gQ0FOTk9UIEZJTkQgQVBQUk9YSU1BVElPTiBGT1IgJ0xBVElOIFNVQlNDUklQVCBTTUFMTCBMRVRURVIgU0NIV0EnICjDouKAmuKAnSlcbiAgICAnw6HCtcKkJzogJ3UnLCAvLyBMQVRJTiBTVUJTQ1JJUFQgU01BTEwgTEVUVEVSIFVcbiAgICAnw6HCtcKlJzogJ3YnLCAvLyBMQVRJTiBTVUJTQ1JJUFQgU01BTEwgTEVUVEVSIFZcbiAgICAnw6LigJrigJwnOiAneCcgLy8gTEFUSU4gU1VCU0NSSVBUIFNNQUxMIExFVFRFUiBYXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbGF0aW5pemUoc3RyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1teQS1aYS16MC05XFxbXFxdIF0vZywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIGNoYXJNYXBbeF0gfHwgeDsgfSk7XG59XG4iLCJleHBvcnQgY2xhc3MgUmVxdWVzdFNlcnZpY2Uge1xuXHRwdWJsaWMgZ2V0KHVybCk6IFByb21pc2U8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRyZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gXG5cdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCA0MDApIHtcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5yZXNwb25zZVRleHQgfHwgdGhpcy5yZXNwb25zZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlamVjdChFcnJvcih0aGlzLnN0YXR1c1RleHQpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJlcXVlc3Quc2VuZCgpO1xuXHRcdFx0cmVxdWVzdCA9IG51bGw7XG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0SlNPTih1cmwpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLmdldCh1cmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UpO1xuXHRcdFx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwiSW52YWxpZCBKU09OLlxcbk9yaWdpbmFsIGVycm9yOlwiICsgZXJyLm1lc3NhZ2UpXG5cdFx0XHRcdFx0ZXJyb3Iuc3RhY2sgPSBlcnIuc3RhY2s7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0U2VydmljZSA9IG5ldyBSZXF1ZXN0U2VydmljZSgpO1xuIiwiaW1wb3J0IHsgUmVxdWVzdFNlcnZpY2UsIHJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi9SZXF1ZXN0U2VydmljZSc7XG5pbXBvcnQgeyBTaWRyYVJlc2VhcmNoIH0gZnJvbSAnLi4vU2lkcmFSZXNlYXJjaC9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBTaWRyYVNlcnZpY2Uge1xuICAgIHByaXZhdGUgX2Jhc2VVcmwgPSBcImh0dHBzOi8vc2Vydmljb2RhZG9zLmliZ2UuZ292LmJyL2FwaS92My9hZ3JlZ2Fkb3NcIjtcbiBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIGdldExpc3RQZXNxdWlzYXMoKTogUHJvbWlzZTxTaWRyYVJlc2VhcmNoW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RTZXJ2aWNlLmdldEpTT04odGhpcy5fYmFzZVVybClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLm1hcChvYmogPT4gbmV3IFNpZHJhUmVzZWFyY2goU2lkcmFSZXNlYXJjaC5jb252ZXJ0KG9iaikpKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gXCJOw6NvIGZvaSBwb3Nzw612ZWwgYWNlc3NhciBhIGxpc3RhIGRlIHBlc3F1aXNhcyBkbyBTaWRyYS5cXG5FcnJvIG9yaWdpbmFsOlxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBzaWRyYVNlcnZpY2UgPSBuZXcgU2lkcmFTZXJ2aWNlKHJlcXVlc3RTZXJ2aWNlKTtcbiIsImV4cG9ydCB7IFNpZHJhU2VydmljZSwgc2lkcmFTZXJ2aWNlIH0gZnJvbSAnLi9TaWRyYVNlcnZpY2UnOyJdLCJzb3VyY2VSb290IjoiIn0=