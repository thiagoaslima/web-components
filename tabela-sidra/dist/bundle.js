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
/******/ 	return __webpack_require__(__webpack_require__.s = "./es6/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./es6/js/elements/HTMLCustomElement.js":
/*!**********************************************!*\
  !*** ./es6/js/elements/HTMLCustomElement.js ***!
  \**********************************************/
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
//# sourceMappingURL=HTMLCustomElement.js.map

/***/ }),

/***/ "./es6/js/elements/SidraService.element.js":
/*!*************************************************!*\
  !*** ./es6/js/elements/SidraService.element.js ***!
  \*************************************************/
/*! exports provided: SidraServiceElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraServiceElement", function() { return SidraServiceElement; });
/* harmony import */ var _HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLCustomElement */ "./es6/js/elements/HTMLCustomElement.js");
/* harmony import */ var _services_SidraService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/SidraService */ "./es6/js/services/SidraService.js");
/* harmony import */ var _helpers_removeSubstring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/removeSubstring */ "./es6/js/helpers/removeSubstring.js");
/* harmony import */ var _helpers_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/debounce */ "./es6/js/helpers/debounce.js");




var atributos;
(function (atributos) {
    atributos["codigoTabela"] = "codigo-tabela";
    atributos["categorias"] = "categorias";
    atributos["localidades"] = "localidades";
    atributos["periodos"] = "periodos";
    atributos["variaveis"] = "variaveis";
})(atributos || (atributos = {}));
;
var events;
(function (events) {
    events["success"] = "onSucess";
    events["error"] = "onError";
})(events || (events = {}));
;
const codigosLocalidadesNormalizer = {
    regex: {
        ns: /N[0-9]{1,4}\[[BR0-9,\s]*\]/,
        n: /N[0-9]{1,4}/
    },
    normalize(localidades) {
        const self = codigosLocalidadesNormalizer;
        let codigos = self.separateCodigos(localidades);
        let { n, ns, numericos } = self.tratarTexto(self.checarRedundancia(codigos));
        return n.concat(ns, numericos);
    },
    separateCodigos(codigos) {
        // tratar uma lista de localidades
        let ns = [];
        let n = [];
        let numericos = [];
        // extrai os casos especiais que utilizem os identificadores N<number>[<codigo>]
        let match;
        let regex = this._codigosLocalidadesNormalizer.regex.ns;
        while ((match = regex.exec(codigos)) !== null) {
            ns.push(match[0]);
            codigos = Object(_helpers_removeSubstring__WEBPACK_IMPORTED_MODULE_2__["removeSubstring"])(match.index, match[0].length, codigos);
        }
        // extrai os casos de uso de N<number> genérico
        regex = this._codigosLocalidadesNormalizer.regex.n;
        match;
        while ((match = regex.exec(codigos)) !== null) {
            n.push(match[0]);
            codigos = Object(_helpers_removeSubstring__WEBPACK_IMPORTED_MODULE_2__["removeSubstring"])(match.index, match[0].length, codigos);
        }
        // sobram os casos de uso do codigo numerico direto
        numericos = codigos.split(',').filter(Boolean).map(cod => cod.trim());
        return {
            ns,
            n,
            numericos
        };
    },
    checarRedundancia({ n, ns, numericos }) {
        let obj = n.reduce((o, cod) => {
            o[cod] = true;
            return o;
        }, {});
        ns = ns.filter(str => {
            str = str.trim();
            let regex = this._codigosLocalidadesNormalizer.regex.n;
            let match = regex.exec(str);
            return obj[match[0]];
        });
        return {
            n, ns, numericos
        };
    },
    tratarTexto({ n, ns, numericos }) {
        let obj = {};
        ns.forEach(str => {
            str = str.trim();
            let [nivel, codigos] = str.split('[');
            let array = codigos.replace(']', '').split(',').filter(Boolean).map(str => str.trim());
            obj[nivel.trim()] = obj[nivel.trim()] || new Set();
            obj[nivel.trim()].add(array);
        });
        ns = Object.keys(obj).map(key => `${key.toUpperCase()}[${[...obj[key]]}]`);
        return {
            n, ns, numericos
        };
    }
};
const normalizer = codigosLocalidadesNormalizer;
class SidraServiceElement extends _HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"] {
    constructor() {
        super(...arguments);
        this._parametros = {
            codigoTabela: '',
            categorias: '',
            localidades: [],
            periodos: [],
            variaveis: []
        };
        this._request = Object(_helpers_debounce__WEBPACK_IMPORTED_MODULE_3__["debounce"])(() => {
            _services_SidraService__WEBPACK_IMPORTED_MODULE_1__["sidraService"].getValues(this._parametros).then(json => {
                return this.dispatchEvent(new CustomEvent(events.success, { bubbles: false, scoped: false, detail: { json } }));
            });
        });
    }
    set parametros(parametros) {
        if (this._parametros !== parametros) {
            this.codigoTabela = parametros.codigoTabela || '';
            this.categorias = parametros.categorias || '';
            this.periodos = parametros.periodos || [];
            this.localidades = parametros.localidades || [];
            this.variaveis = parametros.variaveis || [];
        }
    }
    get codigoTabela() {
        return this._parametros.codigoTabela;
    }
    set codigoTabela(codigoTabela) {
        this.setAttribute(atributos.codigoTabela, codigoTabela);
        this._parametros.codigoTabela = codigoTabela;
    }
    get categorias() {
        return this._parametros.categorias;
    }
    set categorias(categorias) {
        this.setAttribute(atributos.categorias, categorias);
        this._parametros.categorias = categorias;
    }
    get periodos() {
        return this._parametros.periodos;
    }
    set periodos(periodos) {
        switch (typeof periodos) {
            case 'string':
                this.setAttribute(atributos.periodos, periodos);
                this._parametros.periodos = periodos.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributos.periodos, periodos.join(','));
                this._parametros.periodos = periodos;
                break;
        }
    }
    get variaveis() {
        return this._parametros.variaveis;
    }
    set variaveis(variaveis) {
        switch (typeof variaveis) {
            case 'string':
                this.setAttribute(atributos.variaveis, variaveis);
                this._parametros.variaveis = variaveis.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributos.variaveis, variaveis.join(','));
                this._parametros.variaveis = variaveis;
                break;
        }
    }
    get localidades() {
        return this._parametros.localidades;
    }
    set localidades(localidades) {
        this._parametros.localidades = this._handleLocalidades(localidades);
        this.setAttribute(atributos.localidades, this._parametros.localidades.join(','));
    }
    _handleLocalidades(localidades) {
        if (Array.isArray(localidades)) {
            return localidades;
        }
        if (typeof localidades === "number") {
            return [localidades.toString(10)];
        }
        return normalizer.normalize(localidades);
    }
    connectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case atributos.categorias:
            case atributos.codigoTabela:
            case atributos.localidades:
            case atributos.periodos:
            case atributos.variaveis:
                this[name] = newValue;
                this._request();
                break;
        }
    }
}
SidraServiceElement.tagName = 'sidra-service';
SidraServiceElement.observedAttributes = (() => {
    const attrs = Object.keys(atributos).map(key => atributos[key]);
    return () => attrs;
})();
//# sourceMappingURL=SidraService.element.js.map

/***/ }),

/***/ "./es6/js/elements/TabelaSidra.element.js":
/*!************************************************!*\
  !*** ./es6/js/elements/TabelaSidra.element.js ***!
  \************************************************/
/*! exports provided: TabelaSidraElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabelaSidraElement", function() { return TabelaSidraElement; });
/* harmony import */ var _HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLCustomElement */ "./es6/js/elements/HTMLCustomElement.js");

// @ts-check
var attributes;
(function (attributes) {
    attributes["localidades"] = "localidades";
    attributes["codigo"] = "codigo";
    attributes["categorias"] = "categorias";
    attributes["variavel"] = "variavel";
})(attributes || (attributes = {}));
;
class TabelaSidraElement extends _HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"] {
    static get observedAttributes() {
        return Object.keys(attributes).map(key => attributes[key]);
    }
    get codigo() {
        return this.getAttribute('codigo');
    }
    get categorias() {
        return this.getAttribute('categorias');
    }
    get localidades() {
        return this.getAttribute('localidades');
    }
    get variavel() {
        return this.getAttribute('variavel');
    }
    init() {
        console.log('init');
        debugger;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(document.createElement('sidra-service'));
    }
    connectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case 'categorias':
            case 'codigo':
            case 'localidades':
            case 'variavel':
                this[name] = newValue;
                const params = this._prepareParams();
                break;
        }
    }
    _prepareParams() {
        return {
            codigo: this.codigo,
            categorias: this.categorias,
            localidades: this.localidades.split(',').map(str => str.trim()).join('|'),
            variavel: this.variavel
        };
    }
}
TabelaSidraElement.tagName = 'tabela-sidra';
console.log('define', TabelaSidraElement.tagName);
//# sourceMappingURL=TabelaSidra.element.js.map

/***/ }),

/***/ "./es6/js/helpers/debounce.js":
/*!************************************!*\
  !*** ./es6/js/helpers/debounce.js ***!
  \************************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
//@ts-check
/**
 * Debounce - essa função adia a execução da função recebida. Caso a função seja invocada novamente neste intervalo, o tempo de espera é reiniciado.
 * @param {Function} fn - função a ser adiada
 * @param {number} timeout - valor, em milisegundos, que a função deve aguardar antes de ser executada
 * @returns {Function} retorna fn recebida, já com o comportamento de aguardar o tempo do timeout antes de sua execução
 */
console.log('debounce');
function debounce(fn, timeout = 200) {
    let timerId;
    return (...args) => {
        if (timerId)
            clearInterval(timerId);
        timerId = setTimeout(() => fn(...args), timeout);
    };
}
//# sourceMappingURL=debounce.js.map

/***/ }),

/***/ "./es6/js/helpers/removeSubstring.js":
/*!*******************************************!*\
  !*** ./es6/js/helpers/removeSubstring.js ***!
  \*******************************************/
/*! exports provided: removeSubstring */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSubstring", function() { return removeSubstring; });
function removeSubstring(start, end, str) {
    return start === 0 ?
        str.substr(end) :
        str.substr(0, start) + str.substr(start + end);
}
//# sourceMappingURL=removeSubstring.js.map

/***/ }),

/***/ "./es6/js/index.js":
/*!*************************!*\
  !*** ./es6/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_SidraService_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/SidraService.element */ "./es6/js/elements/SidraService.element.js");
/* harmony import */ var _elements_TabelaSidra_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/TabelaSidra.element */ "./es6/js/elements/TabelaSidra.element.js");


console.log(_elements_SidraService_element__WEBPACK_IMPORTED_MODULE_0__["SidraServiceElement"].tagName);
console.log(_elements_TabelaSidra_element__WEBPACK_IMPORTED_MODULE_1__["TabelaSidraElement"].tagName);
customElements.define('sidra-service', _elements_SidraService_element__WEBPACK_IMPORTED_MODULE_0__["SidraServiceElement"]);
customElements.define('tabela-sidra', _elements_TabelaSidra_element__WEBPACK_IMPORTED_MODULE_1__["TabelaSidraElement"]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./es6/js/services/RequestService.js":
/*!*******************************************!*\
  !*** ./es6/js/services/RequestService.js ***!
  \*******************************************/
/*! exports provided: RequestService, requestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestService", function() { return RequestService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestService", function() { return requestService; });
class RequestService {
    get(url) {
        return new Promise((resolve, reject) => {
            const self = this;
            let request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (self._isStatusSuccess(this.status)) {
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
    _isStatusSuccess(status) {
        return status >= 200 && status < 400;
    }
}
const requestService = new RequestService();
//# sourceMappingURL=RequestService.js.map

/***/ }),

/***/ "./es6/js/services/SidraService.js":
/*!*****************************************!*\
  !*** ./es6/js/services/SidraService.js ***!
  \*****************************************/
/*! exports provided: SidraService, sidraService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraService", function() { return SidraService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidraService", function() { return sidraService; });
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestService */ "./es6/js/services/RequestService.js");
//@ts-check

class SidraService {
    constructor(_requestService) {
        this._requestService = _requestService;
    }
    getValues(params) {
        // https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=1419&v=63&p=-1&ng=1(1)&c=315(7169,7170,7445,7486,7558,7625,7660,7712,7766,7786)
        // https://servicodados.ibge.gov.br/api/v3/agregados/1419/periodos/201804/variaveis/63?user-ibge&localidades=BR|3106200|5300108|5002704|4106902|2304400|5208707|3205309|4314902|2611606|3304557|2927408|3550308&classificacao=315[7169,7170,7445,7486,7558,7625,7660,7712,7766,7786]
        return this._requestService.getJSON(this._buildUrl(params));
    }
    _buildUrl(params) {
        const { codigoTabela, periodos, variaveis } = params;
        const queryParams = Object.keys(params).reduce((arr, key) => arr.concat(key + "=" + params[key]), []).join('&');
        return `https://servicodados.ibge.gov.br/api/v3/agregados/${codigoTabela}/periodos/${periodos.join("|")}/variaveis/${variaveis.join("|")}?user-ibge${queryParams ? `&${queryParams}` : ''}`;
    }
}
const sidraService = new SidraService(_RequestService__WEBPACK_IMPORTED_MODULE_0__["requestService"]);
//# sourceMappingURL=SidraService.js.map

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL2VsZW1lbnRzL0hUTUxDdXN0b21FbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9lbGVtZW50cy9TaWRyYVNlcnZpY2UuZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9lczYvanMvZWxlbWVudHMvVGFiZWxhU2lkcmEuZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9lczYvanMvaGVscGVycy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9lczYvanMvaGVscGVycy9yZW1vdmVTdWJzdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9zZXJ2aWNlcy9SZXF1ZXN0U2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9lczYvanMvc2VydmljZXMvU2lkcmFTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUNBQWlDO0FBQ3JELFlBQVk7QUFDWjtBQUNBLDZDOzs7Ozs7Ozs7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Q05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUFBO0FBQ3lCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQSxvRUFBb0UsYUFBYSxZQUFZLG1CQUFtQixhQUFhLG9CQUFvQixZQUFZLGtCQUFrQixZQUFZLE9BQU87QUFDbE07QUFDQTtBQUNBO0FBQ0Esd0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZXM2L2pzL2luZGV4LmpzXCIpO1xuIiwiLy8gRE8gTk9UIFJFTU9WRSBUSElTIENMQVNTXG4vLyBUeXBlc2NyaXB0IGRvIG5vdCBjb21waWxlIFdlYkNvbXBvbmVudHMgY29ycmVjdGx5XG4vLyBUaGlzIGhhY2sgbWluaW1pemVzIHRoZSBlcnJvcnNcbmV4cG9ydCBjbGFzcyBIVE1MQ3VzdG9tRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBjb25zdHJ1Y3RvcihfKSB7IHJldHVybiAoXyA9IHN1cGVyKF8pKS5pbml0KCksIF87IH1cbiAgICBpbml0KCkgeyB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IVE1MQ3VzdG9tRWxlbWVudC5qcy5tYXAiLCJpbXBvcnQgeyBIVE1MQ3VzdG9tRWxlbWVudCB9IGZyb20gXCIuL0hUTUxDdXN0b21FbGVtZW50XCI7XG5pbXBvcnQgeyBzaWRyYVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvU2lkcmFTZXJ2aWNlXCI7XG5pbXBvcnQgeyByZW1vdmVTdWJzdHJpbmcgfSBmcm9tIFwiLi4vaGVscGVycy9yZW1vdmVTdWJzdHJpbmdcIjtcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcIi4uL2hlbHBlcnMvZGVib3VuY2VcIjtcbnZhciBhdHJpYnV0b3M7XG4oZnVuY3Rpb24gKGF0cmlidXRvcykge1xuICAgIGF0cmlidXRvc1tcImNvZGlnb1RhYmVsYVwiXSA9IFwiY29kaWdvLXRhYmVsYVwiO1xuICAgIGF0cmlidXRvc1tcImNhdGVnb3JpYXNcIl0gPSBcImNhdGVnb3JpYXNcIjtcbiAgICBhdHJpYnV0b3NbXCJsb2NhbGlkYWRlc1wiXSA9IFwibG9jYWxpZGFkZXNcIjtcbiAgICBhdHJpYnV0b3NbXCJwZXJpb2Rvc1wiXSA9IFwicGVyaW9kb3NcIjtcbiAgICBhdHJpYnV0b3NbXCJ2YXJpYXZlaXNcIl0gPSBcInZhcmlhdmVpc1wiO1xufSkoYXRyaWJ1dG9zIHx8IChhdHJpYnV0b3MgPSB7fSkpO1xuO1xudmFyIGV2ZW50cztcbihmdW5jdGlvbiAoZXZlbnRzKSB7XG4gICAgZXZlbnRzW1wic3VjY2Vzc1wiXSA9IFwib25TdWNlc3NcIjtcbiAgICBldmVudHNbXCJlcnJvclwiXSA9IFwib25FcnJvclwiO1xufSkoZXZlbnRzIHx8IChldmVudHMgPSB7fSkpO1xuO1xuY29uc3QgY29kaWdvc0xvY2FsaWRhZGVzTm9ybWFsaXplciA9IHtcbiAgICByZWdleDoge1xuICAgICAgICBuczogL05bMC05XXsxLDR9XFxbW0JSMC05LFxcc10qXFxdLyxcbiAgICAgICAgbjogL05bMC05XXsxLDR9L1xuICAgIH0sXG4gICAgbm9ybWFsaXplKGxvY2FsaWRhZGVzKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSBjb2RpZ29zTG9jYWxpZGFkZXNOb3JtYWxpemVyO1xuICAgICAgICBsZXQgY29kaWdvcyA9IHNlbGYuc2VwYXJhdGVDb2RpZ29zKGxvY2FsaWRhZGVzKTtcbiAgICAgICAgbGV0IHsgbiwgbnMsIG51bWVyaWNvcyB9ID0gc2VsZi50cmF0YXJUZXh0byhzZWxmLmNoZWNhclJlZHVuZGFuY2lhKGNvZGlnb3MpKTtcbiAgICAgICAgcmV0dXJuIG4uY29uY2F0KG5zLCBudW1lcmljb3MpO1xuICAgIH0sXG4gICAgc2VwYXJhdGVDb2RpZ29zKGNvZGlnb3MpIHtcbiAgICAgICAgLy8gdHJhdGFyIHVtYSBsaXN0YSBkZSBsb2NhbGlkYWRlc1xuICAgICAgICBsZXQgbnMgPSBbXTtcbiAgICAgICAgbGV0IG4gPSBbXTtcbiAgICAgICAgbGV0IG51bWVyaWNvcyA9IFtdO1xuICAgICAgICAvLyBleHRyYWkgb3MgY2Fzb3MgZXNwZWNpYWlzIHF1ZSB1dGlsaXplbSBvcyBpZGVudGlmaWNhZG9yZXMgTjxudW1iZXI+Wzxjb2RpZ28+XVxuICAgICAgICBsZXQgbWF0Y2g7XG4gICAgICAgIGxldCByZWdleCA9IHRoaXMuX2NvZGlnb3NMb2NhbGlkYWRlc05vcm1hbGl6ZXIucmVnZXgubnM7XG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKGNvZGlnb3MpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbnMucHVzaChtYXRjaFswXSk7XG4gICAgICAgICAgICBjb2RpZ29zID0gcmVtb3ZlU3Vic3RyaW5nKG1hdGNoLmluZGV4LCBtYXRjaFswXS5sZW5ndGgsIGNvZGlnb3MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV4dHJhaSBvcyBjYXNvcyBkZSB1c28gZGUgTjxudW1iZXI+IGdlbsOpcmljb1xuICAgICAgICByZWdleCA9IHRoaXMuX2NvZGlnb3NMb2NhbGlkYWRlc05vcm1hbGl6ZXIucmVnZXgubjtcbiAgICAgICAgbWF0Y2g7XG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKGNvZGlnb3MpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbi5wdXNoKG1hdGNoWzBdKTtcbiAgICAgICAgICAgIGNvZGlnb3MgPSByZW1vdmVTdWJzdHJpbmcobWF0Y2guaW5kZXgsIG1hdGNoWzBdLmxlbmd0aCwgY29kaWdvcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc29icmFtIG9zIGNhc29zIGRlIHVzbyBkbyBjb2RpZ28gbnVtZXJpY28gZGlyZXRvXG4gICAgICAgIG51bWVyaWNvcyA9IGNvZGlnb3Muc3BsaXQoJywnKS5maWx0ZXIoQm9vbGVhbikubWFwKGNvZCA9PiBjb2QudHJpbSgpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5zLFxuICAgICAgICAgICAgbixcbiAgICAgICAgICAgIG51bWVyaWNvc1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY2hlY2FyUmVkdW5kYW5jaWEoeyBuLCBucywgbnVtZXJpY29zIH0pIHtcbiAgICAgICAgbGV0IG9iaiA9IG4ucmVkdWNlKChvLCBjb2QpID0+IHtcbiAgICAgICAgICAgIG9bY29kXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfSwge30pO1xuICAgICAgICBucyA9IG5zLmZpbHRlcihzdHIgPT4ge1xuICAgICAgICAgICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICAgICAgICAgIGxldCByZWdleCA9IHRoaXMuX2NvZGlnb3NMb2NhbGlkYWRlc05vcm1hbGl6ZXIucmVnZXgubjtcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBvYmpbbWF0Y2hbMF1dO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG4sIG5zLCBudW1lcmljb3NcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRyYXRhclRleHRvKHsgbiwgbnMsIG51bWVyaWNvcyB9KSB7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgbnMuZm9yRWFjaChzdHIgPT4ge1xuICAgICAgICAgICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICAgICAgICAgIGxldCBbbml2ZWwsIGNvZGlnb3NdID0gc3RyLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBjb2RpZ29zLnJlcGxhY2UoJ10nLCAnJykuc3BsaXQoJywnKS5maWx0ZXIoQm9vbGVhbikubWFwKHN0ciA9PiBzdHIudHJpbSgpKTtcbiAgICAgICAgICAgIG9ialtuaXZlbC50cmltKCldID0gb2JqW25pdmVsLnRyaW0oKV0gfHwgbmV3IFNldCgpO1xuICAgICAgICAgICAgb2JqW25pdmVsLnRyaW0oKV0uYWRkKGFycmF5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5zID0gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IGAke2tleS50b1VwcGVyQ2FzZSgpfVske1suLi5vYmpba2V5XV19XWApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbiwgbnMsIG51bWVyaWNvc1xuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCBub3JtYWxpemVyID0gY29kaWdvc0xvY2FsaWRhZGVzTm9ybWFsaXplcjtcbmV4cG9ydCBjbGFzcyBTaWRyYVNlcnZpY2VFbGVtZW50IGV4dGVuZHMgSFRNTEN1c3RvbUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0cm9zID0ge1xuICAgICAgICAgICAgY29kaWdvVGFiZWxhOiAnJyxcbiAgICAgICAgICAgIGNhdGVnb3JpYXM6ICcnLFxuICAgICAgICAgICAgbG9jYWxpZGFkZXM6IFtdLFxuICAgICAgICAgICAgcGVyaW9kb3M6IFtdLFxuICAgICAgICAgICAgdmFyaWF2ZWlzOiBbXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgc2lkcmFTZXJ2aWNlLmdldFZhbHVlcyh0aGlzLl9wYXJhbWV0cm9zKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50cy5zdWNjZXNzLCB7IGJ1YmJsZXM6IGZhbHNlLCBzY29wZWQ6IGZhbHNlLCBkZXRhaWw6IHsganNvbiB9IH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0IHBhcmFtZXRyb3MocGFyYW1ldHJvcykge1xuICAgICAgICBpZiAodGhpcy5fcGFyYW1ldHJvcyAhPT0gcGFyYW1ldHJvcykge1xuICAgICAgICAgICAgdGhpcy5jb2RpZ29UYWJlbGEgPSBwYXJhbWV0cm9zLmNvZGlnb1RhYmVsYSB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmlhcyA9IHBhcmFtZXRyb3MuY2F0ZWdvcmlhcyB8fCAnJztcbiAgICAgICAgICAgIHRoaXMucGVyaW9kb3MgPSBwYXJhbWV0cm9zLnBlcmlvZG9zIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGlkYWRlcyA9IHBhcmFtZXRyb3MubG9jYWxpZGFkZXMgfHwgW107XG4gICAgICAgICAgICB0aGlzLnZhcmlhdmVpcyA9IHBhcmFtZXRyb3MudmFyaWF2ZWlzIHx8IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjb2RpZ29UYWJlbGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0cm9zLmNvZGlnb1RhYmVsYTtcbiAgICB9XG4gICAgc2V0IGNvZGlnb1RhYmVsYShjb2RpZ29UYWJlbGEpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zLmNvZGlnb1RhYmVsYSwgY29kaWdvVGFiZWxhKTtcbiAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy5jb2RpZ29UYWJlbGEgPSBjb2RpZ29UYWJlbGE7XG4gICAgfVxuICAgIGdldCBjYXRlZ29yaWFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldHJvcy5jYXRlZ29yaWFzO1xuICAgIH1cbiAgICBzZXQgY2F0ZWdvcmlhcyhjYXRlZ29yaWFzKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvcy5jYXRlZ29yaWFzLCBjYXRlZ29yaWFzKTtcbiAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy5jYXRlZ29yaWFzID0gY2F0ZWdvcmlhcztcbiAgICB9XG4gICAgZ2V0IHBlcmlvZG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldHJvcy5wZXJpb2RvcztcbiAgICB9XG4gICAgc2V0IHBlcmlvZG9zKHBlcmlvZG9zKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHBlcmlvZG9zKSB7XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvcy5wZXJpb2RvcywgcGVyaW9kb3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmFtZXRyb3MucGVyaW9kb3MgPSBwZXJpb2Rvcy5zcGxpdCgnLCcpLm1hcChzdHIgPT4gc3RyLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvcy5wZXJpb2RvcywgcGVyaW9kb3Muam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLnBlcmlvZG9zID0gcGVyaW9kb3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHZhcmlhdmVpcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRyb3MudmFyaWF2ZWlzO1xuICAgIH1cbiAgICBzZXQgdmFyaWF2ZWlzKHZhcmlhdmVpcykge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YXJpYXZlaXMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zLnZhcmlhdmVpcywgdmFyaWF2ZWlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLnZhcmlhdmVpcyA9IHZhcmlhdmVpcy5zcGxpdCgnLCcpLm1hcChzdHIgPT4gc3RyLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvcy52YXJpYXZlaXMsIHZhcmlhdmVpcy5qb2luKCcsJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmFtZXRyb3MudmFyaWF2ZWlzID0gdmFyaWF2ZWlzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBsb2NhbGlkYWRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRyb3MubG9jYWxpZGFkZXM7XG4gICAgfVxuICAgIHNldCBsb2NhbGlkYWRlcyhsb2NhbGlkYWRlcykge1xuICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLmxvY2FsaWRhZGVzID0gdGhpcy5faGFuZGxlTG9jYWxpZGFkZXMobG9jYWxpZGFkZXMpO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3MubG9jYWxpZGFkZXMsIHRoaXMuX3BhcmFtZXRyb3MubG9jYWxpZGFkZXMuam9pbignLCcpKTtcbiAgICB9XG4gICAgX2hhbmRsZUxvY2FsaWRhZGVzKGxvY2FsaWRhZGVzKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxvY2FsaWRhZGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsaWRhZGVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxpZGFkZXMgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBbbG9jYWxpZGFkZXMudG9TdHJpbmcoMTApXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9ybWFsaXplci5ub3JtYWxpemUobG9jYWxpZGFkZXMpO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIGF0cmlidXRvcy5jYXRlZ29yaWFzOlxuICAgICAgICAgICAgY2FzZSBhdHJpYnV0b3MuY29kaWdvVGFiZWxhOlxuICAgICAgICAgICAgY2FzZSBhdHJpYnV0b3MubG9jYWxpZGFkZXM6XG4gICAgICAgICAgICBjYXNlIGF0cmlidXRvcy5wZXJpb2RvczpcbiAgICAgICAgICAgIGNhc2UgYXRyaWJ1dG9zLnZhcmlhdmVpczpcbiAgICAgICAgICAgICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuU2lkcmFTZXJ2aWNlRWxlbWVudC50YWdOYW1lID0gJ3NpZHJhLXNlcnZpY2UnO1xuU2lkcmFTZXJ2aWNlRWxlbWVudC5vYnNlcnZlZEF0dHJpYnV0ZXMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGF0dHJzID0gT2JqZWN0LmtleXMoYXRyaWJ1dG9zKS5tYXAoa2V5ID0+IGF0cmlidXRvc1trZXldKTtcbiAgICByZXR1cm4gKCkgPT4gYXR0cnM7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2lkcmFTZXJ2aWNlLmVsZW1lbnQuanMubWFwIiwiaW1wb3J0IHsgSFRNTEN1c3RvbUVsZW1lbnQgfSBmcm9tIFwiLi9IVE1MQ3VzdG9tRWxlbWVudFwiO1xuLy8gQHRzLWNoZWNrXG52YXIgYXR0cmlidXRlcztcbihmdW5jdGlvbiAoYXR0cmlidXRlcykge1xuICAgIGF0dHJpYnV0ZXNbXCJsb2NhbGlkYWRlc1wiXSA9IFwibG9jYWxpZGFkZXNcIjtcbiAgICBhdHRyaWJ1dGVzW1wiY29kaWdvXCJdID0gXCJjb2RpZ29cIjtcbiAgICBhdHRyaWJ1dGVzW1wiY2F0ZWdvcmlhc1wiXSA9IFwiY2F0ZWdvcmlhc1wiO1xuICAgIGF0dHJpYnV0ZXNbXCJ2YXJpYXZlbFwiXSA9IFwidmFyaWF2ZWxcIjtcbn0pKGF0dHJpYnV0ZXMgfHwgKGF0dHJpYnV0ZXMgPSB7fSkpO1xuO1xuZXhwb3J0IGNsYXNzIFRhYmVsYVNpZHJhRWxlbWVudCBleHRlbmRzIEhUTUxDdXN0b21FbGVtZW50IHtcbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcChrZXkgPT4gYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG4gICAgZ2V0IGNvZGlnbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb2RpZ28nKTtcbiAgICB9XG4gICAgZ2V0IGNhdGVnb3JpYXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2F0ZWdvcmlhcycpO1xuICAgIH1cbiAgICBnZXQgbG9jYWxpZGFkZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbG9jYWxpZGFkZXMnKTtcbiAgICB9XG4gICAgZ2V0IHZhcmlhdmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhcmlhdmVsJyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbml0Jyk7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2lkcmEtc2VydmljZScpKTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnY2F0ZWdvcmlhcyc6XG4gICAgICAgICAgICBjYXNlICdjb2RpZ28nOlxuICAgICAgICAgICAgY2FzZSAnbG9jYWxpZGFkZXMnOlxuICAgICAgICAgICAgY2FzZSAndmFyaWF2ZWwnOlxuICAgICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLl9wcmVwYXJlUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3ByZXBhcmVQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RpZ286IHRoaXMuY29kaWdvLFxuICAgICAgICAgICAgY2F0ZWdvcmlhczogdGhpcy5jYXRlZ29yaWFzLFxuICAgICAgICAgICAgbG9jYWxpZGFkZXM6IHRoaXMubG9jYWxpZGFkZXMuc3BsaXQoJywnKS5tYXAoc3RyID0+IHN0ci50cmltKCkpLmpvaW4oJ3wnKSxcbiAgICAgICAgICAgIHZhcmlhdmVsOiB0aGlzLnZhcmlhdmVsXG4gICAgICAgIH07XG4gICAgfVxufVxuVGFiZWxhU2lkcmFFbGVtZW50LnRhZ05hbWUgPSAndGFiZWxhLXNpZHJhJztcbmNvbnNvbGUubG9nKCdkZWZpbmUnLCBUYWJlbGFTaWRyYUVsZW1lbnQudGFnTmFtZSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYWJlbGFTaWRyYS5lbGVtZW50LmpzLm1hcCIsIi8vQHRzLWNoZWNrXG4vKipcbiAqIERlYm91bmNlIC0gZXNzYSBmdW7Dp8OjbyBhZGlhIGEgZXhlY3XDp8OjbyBkYSBmdW7Dp8OjbyByZWNlYmlkYS4gQ2FzbyBhIGZ1bsOnw6NvIHNlamEgaW52b2NhZGEgbm92YW1lbnRlIG5lc3RlIGludGVydmFsbywgbyB0ZW1wbyBkZSBlc3BlcmEgw6kgcmVpbmljaWFkby5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gZnVuw6fDo28gYSBzZXIgYWRpYWRhXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dCAtIHZhbG9yLCBlbSBtaWxpc2VndW5kb3MsIHF1ZSBhIGZ1bsOnw6NvIGRldmUgYWd1YXJkYXIgYW50ZXMgZGUgc2VyIGV4ZWN1dGFkYVxuICogQHJldHVybnMge0Z1bmN0aW9ufSByZXRvcm5hIGZuIHJlY2ViaWRhLCBqw6EgY29tIG8gY29tcG9ydGFtZW50byBkZSBhZ3VhcmRhciBvIHRlbXBvIGRvIHRpbWVvdXQgYW50ZXMgZGUgc3VhIGV4ZWN1w6fDo29cbiAqL1xuY29uc29sZS5sb2coJ2RlYm91bmNlJyk7XG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWVvdXQgPSAyMDApIHtcbiAgICBsZXQgdGltZXJJZDtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKHRpbWVySWQpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiBmbiguLi5hcmdzKSwgdGltZW91dCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYm91bmNlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiByZW1vdmVTdWJzdHJpbmcoc3RhcnQsIGVuZCwgc3RyKSB7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSAwID9cbiAgICAgICAgc3RyLnN1YnN0cihlbmQpIDpcbiAgICAgICAgc3RyLnN1YnN0cigwLCBzdGFydCkgKyBzdHIuc3Vic3RyKHN0YXJ0ICsgZW5kKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbW92ZVN1YnN0cmluZy5qcy5tYXAiLCJpbXBvcnQgeyBTaWRyYVNlcnZpY2VFbGVtZW50IH0gZnJvbSAnLi9lbGVtZW50cy9TaWRyYVNlcnZpY2UuZWxlbWVudCc7XG5pbXBvcnQgeyBUYWJlbGFTaWRyYUVsZW1lbnQgfSBmcm9tICcuL2VsZW1lbnRzL1RhYmVsYVNpZHJhLmVsZW1lbnQnO1xuY29uc29sZS5sb2coU2lkcmFTZXJ2aWNlRWxlbWVudC50YWdOYW1lKTtcbmNvbnNvbGUubG9nKFRhYmVsYVNpZHJhRWxlbWVudC50YWdOYW1lKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2lkcmEtc2VydmljZScsIFNpZHJhU2VydmljZUVsZW1lbnQpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0YWJlbGEtc2lkcmEnLCBUYWJlbGFTaWRyYUVsZW1lbnQpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IGNsYXNzIFJlcXVlc3RTZXJ2aWNlIHtcbiAgICBnZXQodXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9pc1N0YXR1c1N1Y2Nlc3ModGhpcy5zdGF0dXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2VUZXh0IHx8IHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHRoaXMuc3RhdHVzVGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoXCJOZXR3b3JrIEVycm9yXCIpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SlNPTih1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHVybClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwiSW52YWxpZCBKU09OLlxcbk9yaWdpbmFsIGVycm9yOlwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGVycm9yLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2lzU3RhdHVzU3VjY2VzcyhzdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgNDAwO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCByZXF1ZXN0U2VydmljZSA9IG5ldyBSZXF1ZXN0U2VydmljZSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVxdWVzdFNlcnZpY2UuanMubWFwIiwiLy9AdHMtY2hlY2tcbmltcG9ydCB7IHJlcXVlc3RTZXJ2aWNlIH0gZnJvbSBcIi4vUmVxdWVzdFNlcnZpY2VcIjtcbmV4cG9ydCBjbGFzcyBTaWRyYVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKF9yZXF1ZXN0U2VydmljZSkge1xuICAgICAgICB0aGlzLl9yZXF1ZXN0U2VydmljZSA9IF9yZXF1ZXN0U2VydmljZTtcbiAgICB9XG4gICAgZ2V0VmFsdWVzKHBhcmFtcykge1xuICAgICAgICAvLyBodHRwczovL3NlcnZpY29kYWRvcy5pYmdlLmdvdi5ici9hcGkvdjEvY29uanVudHVyYWlzPyZkPXMmdXNlcj1pYmdlJnQ9MTQxOSZ2PTYzJnA9LTEmbmc9MSgxKSZjPTMxNSg3MTY5LDcxNzAsNzQ0NSw3NDg2LDc1NTgsNzYyNSw3NjYwLDc3MTIsNzc2Niw3Nzg2KVxuICAgICAgICAvLyBodHRwczovL3NlcnZpY29kYWRvcy5pYmdlLmdvdi5ici9hcGkvdjMvYWdyZWdhZG9zLzE0MTkvcGVyaW9kb3MvMjAxODA0L3ZhcmlhdmVpcy82Mz91c2VyLWliZ2UmbG9jYWxpZGFkZXM9QlJ8MzEwNjIwMHw1MzAwMTA4fDUwMDI3MDR8NDEwNjkwMnwyMzA0NDAwfDUyMDg3MDd8MzIwNTMwOXw0MzE0OTAyfDI2MTE2MDZ8MzMwNDU1N3wyOTI3NDA4fDM1NTAzMDgmY2xhc3NpZmljYWNhbz0zMTVbNzE2OSw3MTcwLDc0NDUsNzQ4Niw3NTU4LDc2MjUsNzY2MCw3NzEyLDc3NjYsNzc4Nl1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RTZXJ2aWNlLmdldEpTT04odGhpcy5fYnVpbGRVcmwocGFyYW1zKSk7XG4gICAgfVxuICAgIF9idWlsZFVybChwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBjb2RpZ29UYWJlbGEsIHBlcmlvZG9zLCB2YXJpYXZlaXMgfSA9IHBhcmFtcztcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpLnJlZHVjZSgoYXJyLCBrZXkpID0+IGFyci5jb25jYXQoa2V5ICsgXCI9XCIgKyBwYXJhbXNba2V5XSksIFtdKS5qb2luKCcmJyk7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9zZXJ2aWNvZGFkb3MuaWJnZS5nb3YuYnIvYXBpL3YzL2FncmVnYWRvcy8ke2NvZGlnb1RhYmVsYX0vcGVyaW9kb3MvJHtwZXJpb2Rvcy5qb2luKFwifFwiKX0vdmFyaWF2ZWlzLyR7dmFyaWF2ZWlzLmpvaW4oXCJ8XCIpfT91c2VyLWliZ2Uke3F1ZXJ5UGFyYW1zID8gYCYke3F1ZXJ5UGFyYW1zfWAgOiAnJ31gO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBzaWRyYVNlcnZpY2UgPSBuZXcgU2lkcmFTZXJ2aWNlKHJlcXVlc3RTZXJ2aWNlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpZHJhU2VydmljZS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9