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

/***/ "./es6/js/elements/SidraElement.abstract.js":
/*!**************************************************!*\
  !*** ./es6/js/elements/SidraElement.abstract.js ***!
  \**************************************************/
/*! exports provided: atributosSidraElement, SidraElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atributosSidraElement", function() { return atributosSidraElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraElement", function() { return SidraElement; });
/* harmony import */ var _HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLCustomElement */ "./es6/js/elements/HTMLCustomElement.js");
/* harmony import */ var _helpers_removeSubstring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/removeSubstring */ "./es6/js/helpers/removeSubstring.js");


var atributosSidraElement;
(function (atributosSidraElement) {
    atributosSidraElement["tabela"] = "tabela";
    atributosSidraElement["categorias"] = "categorias";
    atributosSidraElement["localidades"] = "localidades";
    atributosSidraElement["periodos"] = "periodos";
    atributosSidraElement["variaveis"] = "variaveis";
})(atributosSidraElement || (atributosSidraElement = {}));
;
const attrs = Object.keys(atributosSidraElement).map(key => atributosSidraElement[key]);
class SidraElement extends _HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"] {
    constructor() {
        super(...arguments);
        this._parametros = {
            tabela: '',
            categorias: '',
            localidades: [],
            periodos: [],
            variaveis: []
        };
    }
    static get observedAttributes() {
        return attrs;
    }
    get tabela() {
        return this._parametros.tabela;
    }
    set tabela(codigoTabela) {
        this.setAttribute(atributosSidraElement.tabela, codigoTabela);
        this._parametros.tabela = codigoTabela;
    }
    get categorias() {
        return this._parametros.categorias;
    }
    set categorias(categorias) {
        this.setAttribute(atributosSidraElement.categorias, categorias);
        this._parametros.categorias = categorias;
    }
    get periodos() {
        return this._parametros.periodos;
    }
    set periodos(periodos) {
        switch (typeof periodos) {
            case 'string':
                this.setAttribute(atributosSidraElement.periodos, periodos);
                this._parametros.periodos = periodos.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributosSidraElement.periodos, periodos.join(','));
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
                this.setAttribute(atributosSidraElement.variaveis, variaveis);
                this._parametros.variaveis = variaveis.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributosSidraElement.variaveis, variaveis.join(','));
                this._parametros.variaveis = variaveis;
                break;
        }
    }
    get localidades() {
        return this._parametros.localidades;
    }
    set localidades(localidades) {
        this._parametros.localidades = this._handleLocalidades(localidades);
        this.setAttribute(atributosSidraElement.localidades, this._parametros.localidades.join(','));
    }
    _handleLocalidades(localidades) {
        if (Array.isArray(localidades)) {
            return localidades;
        }
        if (typeof localidades === "number") {
            return [localidades.toString(10)];
        }
        return SidraElement.localidadesNormalizer.normalize(localidades);
    }
    _updateSidraAttributes(name, oldValue, newValue) {
        let updated = false;
        if (attrs.includes(name) && oldValue !== newValue) {
            this[name] = newValue;
            updated = true;
        }
        return updated;
    }
}
SidraElement.localidadesNormalizer = {
    regex: {
        ns: /N[0-9]{1,4}\[[BR0-9,\s]*\]/,
        n: /N[0-9]{1,4}/
    },
    normalize(localidades) {
        const self = SidraElement.localidadesNormalizer;
        let codigos = self.separateCodigos(localidades);
        let { n, ns, numericos } = self.tratarTexto(self.checarRedundancia(codigos));
        return n.concat(ns, numericos);
    },
    separateCodigos(codigos) {
        const self = SidraElement.localidadesNormalizer;
        // tratar uma lista de localidades
        let ns = [];
        let n = [];
        let numericos = [];
        // extrai os casos especiais que utilizem os identificadores N<number>[<codigo>]
        let match;
        let regex = self.regex.ns;
        while ((match = regex.exec(codigos)) !== null) {
            ns.push(match[0]);
            codigos = Object(_helpers_removeSubstring__WEBPACK_IMPORTED_MODULE_1__["removeSubstring"])(match.index, match[0].length, codigos);
        }
        // extrai os casos de uso de N<number> genérico
        regex = self.regex.n;
        match;
        while ((match = regex.exec(codigos)) !== null) {
            n.push(match[0]);
            codigos = Object(_helpers_removeSubstring__WEBPACK_IMPORTED_MODULE_1__["removeSubstring"])(match.index, match[0].length, codigos);
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
        const self = SidraElement.localidadesNormalizer;
        let obj = n.reduce((o, cod) => {
            o[cod] = true;
            return o;
        }, {});
        ns = ns.filter(str => {
            str = str.trim();
            let regex = self.regex.n;
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
//# sourceMappingURL=SidraElement.abstract.js.map

/***/ }),

/***/ "./es6/js/elements/SidraService.element.js":
/*!*************************************************!*\
  !*** ./es6/js/elements/SidraService.element.js ***!
  \*************************************************/
/*! exports provided: events, SidraServiceElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidraServiceElement", function() { return SidraServiceElement; });
/* harmony import */ var _services_SidraService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/SidraService */ "./es6/js/services/SidraService.js");
/* harmony import */ var _helpers_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/debounce */ "./es6/js/helpers/debounce.js");
/* harmony import */ var _SidraElement_abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SidraElement.abstract */ "./es6/js/elements/SidraElement.abstract.js");



var events;
(function (events) {
    events["success"] = "onSucess";
    events["error"] = "onError";
})(events || (events = {}));
;
class SidraServiceElement extends _SidraElement_abstract__WEBPACK_IMPORTED_MODULE_2__["SidraElement"] {
    constructor() {
        super(...arguments);
        this._request = Object(_helpers_debounce__WEBPACK_IMPORTED_MODULE_1__["debounce"])(() => {
            _services_SidraService__WEBPACK_IMPORTED_MODULE_0__["sidraService"].getValues(this._parametros).then(json => {
                return this.dispatchEvent(new CustomEvent(events.success, { bubbles: false, scoped: false, detail: { json } }));
            });
        });
    }
    set parametros(parametros) {
        if (this._parametros !== parametros) {
            this.tabela = parametros.tabela || '';
            this.categorias = parametros.categorias || '';
            this.periodos = parametros.periodos || [];
            this.localidades = parametros.localidades || [];
            this.variaveis = parametros.variaveis || [];
        }
    }
    get parametros() {
        return this.parametros;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (this._updateSidraAttributes(name, oldValue, newValue)) {
            this._request();
        }
    }
}
SidraServiceElement.tagName = 'sidra-service';
customElements.define(SidraServiceElement.tagName, SidraServiceElement);
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
/* harmony import */ var _SidraElement_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidraElement.abstract */ "./es6/js/elements/SidraElement.abstract.js");
/* harmony import */ var _SidraService_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidraService.element */ "./es6/js/elements/SidraService.element.js");


class TabelaSidraElement extends _SidraElement_abstract__WEBPACK_IMPORTED_MODULE_0__["SidraElement"] {
    init() {
        this._sidraServiceElement = document.createElement('sidra-service');
        this._ibgeTabelaElement = document.createElement('ibge-tabela');
        this._ibgeTabelaElement.fonteDados = 'sidra';
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._sidraServiceElement);
        this._shadowRoot.appendChild(this._ibgeTabelaElement);
    }
    connectedCallback() {
        if (this._parametros && Object.keys(this._parametros).length > 0) {
            this._sidraServiceElement.parametros = this._parametros;
        }
        this._ibgeTabelaElement.colunas = this.colunas;
        this._ibgeTabelaElement.linhas = this.linhas;
        this._sidraServiceElement.addEventListener(_SidraService_element__WEBPACK_IMPORTED_MODULE_1__["events"].success, this._handleResponse, true);
    }
    disconnectedCallback() {
        this._sidraServiceElement.removeEventListener(_SidraService_element__WEBPACK_IMPORTED_MODULE_1__["events"].success, this._handleResponse, true);
        this._sidraServiceElement.remove();
        this._sidraServiceElement = null;
        this._shadowRoot = null;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (this._updateSidraAttributes(name, oldValue, newValue)) {
            this._sidraServiceElement[name] = newValue;
        }
        switch (name) {
            case 'colunas':
            case 'linhas':
                this[name] = newValue;
        }
    }
    get colunas() {
        return this.getAttribute('colunas');
    }
    set colunas(colunas) {
        if (this.colunas === colunas) {
            return;
        }
        this.setAttribute('colunas', colunas);
    }
    get linhas() {
        return this.getAttribute('linhas');
    }
    set linhas(linhas) {
        if (this.linhas === linhas) {
            return;
        }
        this.setAttribute('linhas', linhas);
    }
    _handleResponse(json) {
        this._ibgeTabelaElement.dados = json;
    }
}
TabelaSidraElement.tagName = 'tabela-sidra';
customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);
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
/* harmony import */ var _elements_HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/HTMLCustomElement */ "./es6/js/elements/HTMLCustomElement.js");
/* harmony import */ var _elements_SidraService_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/SidraService.element */ "./es6/js/elements/SidraService.element.js");
/* harmony import */ var _elements_TabelaSidra_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/TabelaSidra.element */ "./es6/js/elements/TabelaSidra.element.js");



_elements_SidraService_element__WEBPACK_IMPORTED_MODULE_1__["SidraServiceElement"];
_elements_TabelaSidra_element__WEBPACK_IMPORTED_MODULE_2__["TabelaSidraElement"];
class TesteElement extends _elements_HTMLCustomElement__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"] {
    get template() {
        return `<p>Hello World!</p>`;
    }
    connectedCallback() {
        this.innerHTML = this.template;
    }
}
customElements.define('el-teste', TesteElement);
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
/* harmony import */ var _elements_SidraElement_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elements/SidraElement.abstract */ "./es6/js/elements/SidraElement.abstract.js");
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
        debugger;
        const { tabela, periodos, variaveis, localidades, categorias } = params;
        const queryParams = [
            `localidades=${localidades.join('|')}`,
            `classificacao=${categorias}`
        ].join("&");
        return `https://servicodados.ibge.gov.br/api/v3/agregados/${tabela}/periodos/${periodos.join("|")}/variaveis/${variaveis.join("|")}?user-ibge${queryParams ? `&${queryParams}` : ''}`;
    }
}
const sidraService = new SidraService(_RequestService__WEBPACK_IMPORTED_MODULE_0__["requestService"]);
//# sourceMappingURL=SidraService.js.map

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL2VsZW1lbnRzL0hUTUxDdXN0b21FbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9lbGVtZW50cy9TaWRyYUVsZW1lbnQuYWJzdHJhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL2VsZW1lbnRzL1NpZHJhU2VydmljZS5lbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9lbGVtZW50cy9UYWJlbGFTaWRyYS5lbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9oZWxwZXJzL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9oZWxwZXJzL3JlbW92ZVN1YnN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9lczYvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL3NlcnZpY2VzL1JlcXVlc3RTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9zZXJ2aWNlcy9TaWRyYVNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQ0FBaUM7QUFDckQsWUFBWTtBQUNaO0FBQ0EsNkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUjRCO0FBQ0Y7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNEQUFzRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSTtBQUN4QixtQkFBbUIsSUFBSTtBQUN2QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRDQUE0QyxrQkFBa0IsR0FBRyxjQUFjO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckt1QjtBQUNKO0FBQ0k7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdCQUF3QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUseUNBQXlDLE9BQU8sRUFBRTtBQUM3SCxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEN1QjtBQUNnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGVBQWU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFBQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMNEI7QUFDRTtBQUNEO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUFBO0FBQ3lCO0FBQ087QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsdURBQXVEO0FBQ3RFO0FBQ0EsMkJBQTJCLHNCQUFzQjtBQUNqRCw2QkFBNkIsV0FBVztBQUN4QztBQUNBLG9FQUFvRSxPQUFPLFlBQVksbUJBQW1CLGFBQWEsb0JBQW9CLFlBQVksa0JBQWtCLFlBQVksT0FBTztBQUM1TDtBQUNBO0FBQ0E7QUFDQSx3QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9lczYvanMvaW5kZXguanNcIik7XG4iLCIvLyBETyBOT1QgUkVNT1ZFIFRISVMgQ0xBU1Ncbi8vIFR5cGVzY3JpcHQgZG8gbm90IGNvbXBpbGUgV2ViQ29tcG9uZW50cyBjb3JyZWN0bHlcbi8vIFRoaXMgaGFjayBtaW5pbWl6ZXMgdGhlIGVycm9yc1xuZXhwb3J0IGNsYXNzIEhUTUxDdXN0b21FbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGNvbnN0cnVjdG9yKF8pIHsgcmV0dXJuIChfID0gc3VwZXIoXykpLmluaXQoKSwgXzsgfVxuICAgIGluaXQoKSB7IH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUhUTUxDdXN0b21FbGVtZW50LmpzLm1hcCIsImltcG9ydCB7IEhUTUxDdXN0b21FbGVtZW50IH0gZnJvbSBcIi4vSFRNTEN1c3RvbUVsZW1lbnRcIjtcbmltcG9ydCB7IHJlbW92ZVN1YnN0cmluZyB9IGZyb20gXCIuLi9oZWxwZXJzL3JlbW92ZVN1YnN0cmluZ1wiO1xuZXhwb3J0IHZhciBhdHJpYnV0b3NTaWRyYUVsZW1lbnQ7XG4oZnVuY3Rpb24gKGF0cmlidXRvc1NpZHJhRWxlbWVudCkge1xuICAgIGF0cmlidXRvc1NpZHJhRWxlbWVudFtcInRhYmVsYVwiXSA9IFwidGFiZWxhXCI7XG4gICAgYXRyaWJ1dG9zU2lkcmFFbGVtZW50W1wiY2F0ZWdvcmlhc1wiXSA9IFwiY2F0ZWdvcmlhc1wiO1xuICAgIGF0cmlidXRvc1NpZHJhRWxlbWVudFtcImxvY2FsaWRhZGVzXCJdID0gXCJsb2NhbGlkYWRlc1wiO1xuICAgIGF0cmlidXRvc1NpZHJhRWxlbWVudFtcInBlcmlvZG9zXCJdID0gXCJwZXJpb2Rvc1wiO1xuICAgIGF0cmlidXRvc1NpZHJhRWxlbWVudFtcInZhcmlhdmVpc1wiXSA9IFwidmFyaWF2ZWlzXCI7XG59KShhdHJpYnV0b3NTaWRyYUVsZW1lbnQgfHwgKGF0cmlidXRvc1NpZHJhRWxlbWVudCA9IHt9KSk7XG47XG5jb25zdCBhdHRycyA9IE9iamVjdC5rZXlzKGF0cmlidXRvc1NpZHJhRWxlbWVudCkubWFwKGtleSA9PiBhdHJpYnV0b3NTaWRyYUVsZW1lbnRba2V5XSk7XG5leHBvcnQgY2xhc3MgU2lkcmFFbGVtZW50IGV4dGVuZHMgSFRNTEN1c3RvbUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0cm9zID0ge1xuICAgICAgICAgICAgdGFiZWxhOiAnJyxcbiAgICAgICAgICAgIGNhdGVnb3JpYXM6ICcnLFxuICAgICAgICAgICAgbG9jYWxpZGFkZXM6IFtdLFxuICAgICAgICAgICAgcGVyaW9kb3M6IFtdLFxuICAgICAgICAgICAgdmFyaWF2ZWlzOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJzO1xuICAgIH1cbiAgICBnZXQgdGFiZWxhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldHJvcy50YWJlbGE7XG4gICAgfVxuICAgIHNldCB0YWJlbGEoY29kaWdvVGFiZWxhKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvc1NpZHJhRWxlbWVudC50YWJlbGEsIGNvZGlnb1RhYmVsYSk7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRyb3MudGFiZWxhID0gY29kaWdvVGFiZWxhO1xuICAgIH1cbiAgICBnZXQgY2F0ZWdvcmlhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRyb3MuY2F0ZWdvcmlhcztcbiAgICB9XG4gICAgc2V0IGNhdGVnb3JpYXMoY2F0ZWdvcmlhcykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3NTaWRyYUVsZW1lbnQuY2F0ZWdvcmlhcywgY2F0ZWdvcmlhcyk7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRyb3MuY2F0ZWdvcmlhcyA9IGNhdGVnb3JpYXM7XG4gICAgfVxuICAgIGdldCBwZXJpb2RvcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRyb3MucGVyaW9kb3M7XG4gICAgfVxuICAgIHNldCBwZXJpb2RvcyhwZXJpb2Rvcykge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBwZXJpb2Rvcykge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3NTaWRyYUVsZW1lbnQucGVyaW9kb3MsIHBlcmlvZG9zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLnBlcmlvZG9zID0gcGVyaW9kb3Muc3BsaXQoJywnKS5tYXAoc3RyID0+IHN0ci50cmltKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3NTaWRyYUVsZW1lbnQucGVyaW9kb3MsIHBlcmlvZG9zLmpvaW4oJywnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy5wZXJpb2RvcyA9IHBlcmlvZG9zO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB2YXJpYXZlaXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0cm9zLnZhcmlhdmVpcztcbiAgICB9XG4gICAgc2V0IHZhcmlhdmVpcyh2YXJpYXZlaXMpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFyaWF2ZWlzKSB7XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvc1NpZHJhRWxlbWVudC52YXJpYXZlaXMsIHZhcmlhdmVpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy52YXJpYXZlaXMgPSB2YXJpYXZlaXMuc3BsaXQoJywnKS5tYXAoc3RyID0+IHN0ci50cmltKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3NTaWRyYUVsZW1lbnQudmFyaWF2ZWlzLCB2YXJpYXZlaXMuam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLnZhcmlhdmVpcyA9IHZhcmlhdmVpcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbG9jYWxpZGFkZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0cm9zLmxvY2FsaWRhZGVzO1xuICAgIH1cbiAgICBzZXQgbG9jYWxpZGFkZXMobG9jYWxpZGFkZXMpIHtcbiAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy5sb2NhbGlkYWRlcyA9IHRoaXMuX2hhbmRsZUxvY2FsaWRhZGVzKGxvY2FsaWRhZGVzKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zU2lkcmFFbGVtZW50LmxvY2FsaWRhZGVzLCB0aGlzLl9wYXJhbWV0cm9zLmxvY2FsaWRhZGVzLmpvaW4oJywnKSk7XG4gICAgfVxuICAgIF9oYW5kbGVMb2NhbGlkYWRlcyhsb2NhbGlkYWRlcykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsb2NhbGlkYWRlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGlkYWRlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxvY2FsaWRhZGVzID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gW2xvY2FsaWRhZGVzLnRvU3RyaW5nKDEwKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNpZHJhRWxlbWVudC5sb2NhbGlkYWRlc05vcm1hbGl6ZXIubm9ybWFsaXplKGxvY2FsaWRhZGVzKTtcbiAgICB9XG4gICAgX3VwZGF0ZVNpZHJhQXR0cmlidXRlcyhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgbGV0IHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGF0dHJzLmluY2x1ZGVzKG5hbWUpICYmIG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgfVxufVxuU2lkcmFFbGVtZW50LmxvY2FsaWRhZGVzTm9ybWFsaXplciA9IHtcbiAgICByZWdleDoge1xuICAgICAgICBuczogL05bMC05XXsxLDR9XFxbW0JSMC05LFxcc10qXFxdLyxcbiAgICAgICAgbjogL05bMC05XXsxLDR9L1xuICAgIH0sXG4gICAgbm9ybWFsaXplKGxvY2FsaWRhZGVzKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSBTaWRyYUVsZW1lbnQubG9jYWxpZGFkZXNOb3JtYWxpemVyO1xuICAgICAgICBsZXQgY29kaWdvcyA9IHNlbGYuc2VwYXJhdGVDb2RpZ29zKGxvY2FsaWRhZGVzKTtcbiAgICAgICAgbGV0IHsgbiwgbnMsIG51bWVyaWNvcyB9ID0gc2VsZi50cmF0YXJUZXh0byhzZWxmLmNoZWNhclJlZHVuZGFuY2lhKGNvZGlnb3MpKTtcbiAgICAgICAgcmV0dXJuIG4uY29uY2F0KG5zLCBudW1lcmljb3MpO1xuICAgIH0sXG4gICAgc2VwYXJhdGVDb2RpZ29zKGNvZGlnb3MpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IFNpZHJhRWxlbWVudC5sb2NhbGlkYWRlc05vcm1hbGl6ZXI7XG4gICAgICAgIC8vIHRyYXRhciB1bWEgbGlzdGEgZGUgbG9jYWxpZGFkZXNcbiAgICAgICAgbGV0IG5zID0gW107XG4gICAgICAgIGxldCBuID0gW107XG4gICAgICAgIGxldCBudW1lcmljb3MgPSBbXTtcbiAgICAgICAgLy8gZXh0cmFpIG9zIGNhc29zIGVzcGVjaWFpcyBxdWUgdXRpbGl6ZW0gb3MgaWRlbnRpZmljYWRvcmVzIE48bnVtYmVyPls8Y29kaWdvPl1cbiAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICBsZXQgcmVnZXggPSBzZWxmLnJlZ2V4Lm5zO1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyhjb2RpZ29zKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5zLnB1c2gobWF0Y2hbMF0pO1xuICAgICAgICAgICAgY29kaWdvcyA9IHJlbW92ZVN1YnN0cmluZyhtYXRjaC5pbmRleCwgbWF0Y2hbMF0ubGVuZ3RoLCBjb2RpZ29zKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBleHRyYWkgb3MgY2Fzb3MgZGUgdXNvIGRlIE48bnVtYmVyPiBnZW7DqXJpY29cbiAgICAgICAgcmVnZXggPSBzZWxmLnJlZ2V4Lm47XG4gICAgICAgIG1hdGNoO1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyhjb2RpZ29zKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG4ucHVzaChtYXRjaFswXSk7XG4gICAgICAgICAgICBjb2RpZ29zID0gcmVtb3ZlU3Vic3RyaW5nKG1hdGNoLmluZGV4LCBtYXRjaFswXS5sZW5ndGgsIGNvZGlnb3MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNvYnJhbSBvcyBjYXNvcyBkZSB1c28gZG8gY29kaWdvIG51bWVyaWNvIGRpcmV0b1xuICAgICAgICBudW1lcmljb3MgPSBjb2RpZ29zLnNwbGl0KCcsJykuZmlsdGVyKEJvb2xlYW4pLm1hcChjb2QgPT4gY29kLnRyaW0oKSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBucyxcbiAgICAgICAgICAgIG4sXG4gICAgICAgICAgICBudW1lcmljb3NcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNoZWNhclJlZHVuZGFuY2lhKHsgbiwgbnMsIG51bWVyaWNvcyB9KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSBTaWRyYUVsZW1lbnQubG9jYWxpZGFkZXNOb3JtYWxpemVyO1xuICAgICAgICBsZXQgb2JqID0gbi5yZWR1Y2UoKG8sIGNvZCkgPT4ge1xuICAgICAgICAgICAgb1tjb2RdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIG5zID0gbnMuZmlsdGVyKHN0ciA9PiB7XG4gICAgICAgICAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgICAgICAgICAgbGV0IHJlZ2V4ID0gc2VsZi5yZWdleC5uO1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gcmVnZXguZXhlYyhzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIG9ialttYXRjaFswXV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbiwgbnMsIG51bWVyaWNvc1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgdHJhdGFyVGV4dG8oeyBuLCBucywgbnVtZXJpY29zIH0pIHtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICBucy5mb3JFYWNoKHN0ciA9PiB7XG4gICAgICAgICAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgICAgICAgICAgbGV0IFtuaXZlbCwgY29kaWdvc10gPSBzdHIuc3BsaXQoJ1snKTtcbiAgICAgICAgICAgIGxldCBhcnJheSA9IGNvZGlnb3MucmVwbGFjZSgnXScsICcnKS5zcGxpdCgnLCcpLmZpbHRlcihCb29sZWFuKS5tYXAoc3RyID0+IHN0ci50cmltKCkpO1xuICAgICAgICAgICAgb2JqW25pdmVsLnRyaW0oKV0gPSBvYmpbbml2ZWwudHJpbSgpXSB8fCBuZXcgU2V0KCk7XG4gICAgICAgICAgICBvYmpbbml2ZWwudHJpbSgpXS5hZGQoYXJyYXkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbnMgPSBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gYCR7a2V5LnRvVXBwZXJDYXNlKCl9WyR7Wy4uLm9ialtrZXldXX1dYCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuLCBucywgbnVtZXJpY29zXG4gICAgICAgIH07XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpZHJhRWxlbWVudC5hYnN0cmFjdC5qcy5tYXAiLCJpbXBvcnQgeyBzaWRyYVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvU2lkcmFTZXJ2aWNlXCI7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gXCIuLi9oZWxwZXJzL2RlYm91bmNlXCI7XG5pbXBvcnQgeyBTaWRyYUVsZW1lbnQgfSBmcm9tIFwiLi9TaWRyYUVsZW1lbnQuYWJzdHJhY3RcIjtcbmV4cG9ydCB2YXIgZXZlbnRzO1xuKGZ1bmN0aW9uIChldmVudHMpIHtcbiAgICBldmVudHNbXCJzdWNjZXNzXCJdID0gXCJvblN1Y2Vzc1wiO1xuICAgIGV2ZW50c1tcImVycm9yXCJdID0gXCJvbkVycm9yXCI7XG59KShldmVudHMgfHwgKGV2ZW50cyA9IHt9KSk7XG47XG5leHBvcnQgY2xhc3MgU2lkcmFTZXJ2aWNlRWxlbWVudCBleHRlbmRzIFNpZHJhRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3QgPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBzaWRyYVNlcnZpY2UuZ2V0VmFsdWVzKHRoaXMuX3BhcmFtZXRyb3MpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnRzLnN1Y2Nlc3MsIHsgYnViYmxlczogZmFsc2UsIHNjb3BlZDogZmFsc2UsIGRldGFpbDogeyBqc29uIH0gfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXQgcGFyYW1ldHJvcyhwYXJhbWV0cm9zKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJhbWV0cm9zICE9PSBwYXJhbWV0cm9zKSB7XG4gICAgICAgICAgICB0aGlzLnRhYmVsYSA9IHBhcmFtZXRyb3MudGFiZWxhIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWFzID0gcGFyYW1ldHJvcy5jYXRlZ29yaWFzIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5wZXJpb2RvcyA9IHBhcmFtZXRyb3MucGVyaW9kb3MgfHwgW107XG4gICAgICAgICAgICB0aGlzLmxvY2FsaWRhZGVzID0gcGFyYW1ldHJvcy5sb2NhbGlkYWRlcyB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMudmFyaWF2ZWlzID0gcGFyYW1ldHJvcy52YXJpYXZlaXMgfHwgW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBhcmFtZXRyb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtZXRyb3M7XG4gICAgfVxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZVNpZHJhQXR0cmlidXRlcyhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5TaWRyYVNlcnZpY2VFbGVtZW50LnRhZ05hbWUgPSAnc2lkcmEtc2VydmljZSc7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2lkcmFTZXJ2aWNlRWxlbWVudC50YWdOYW1lLCBTaWRyYVNlcnZpY2VFbGVtZW50KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpZHJhU2VydmljZS5lbGVtZW50LmpzLm1hcCIsImltcG9ydCB7IFNpZHJhRWxlbWVudCB9IGZyb20gXCIuL1NpZHJhRWxlbWVudC5hYnN0cmFjdFwiO1xuaW1wb3J0IHsgZXZlbnRzIGFzIFNpZHJhU2VydmljZUV2ZW50cyB9IGZyb20gXCIuL1NpZHJhU2VydmljZS5lbGVtZW50XCI7XG5leHBvcnQgY2xhc3MgVGFiZWxhU2lkcmFFbGVtZW50IGV4dGVuZHMgU2lkcmFFbGVtZW50IHtcbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLl9zaWRyYVNlcnZpY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2lkcmEtc2VydmljZScpO1xuICAgICAgICB0aGlzLl9pYmdlVGFiZWxhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2liZ2UtdGFiZWxhJyk7XG4gICAgICAgIHRoaXMuX2liZ2VUYWJlbGFFbGVtZW50LmZvbnRlRGFkb3MgPSAnc2lkcmEnO1xuICAgICAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5faWJnZVRhYmVsYUVsZW1lbnQpO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmFtZXRyb3MgJiYgT2JqZWN0LmtleXModGhpcy5fcGFyYW1ldHJvcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudC5wYXJhbWV0cm9zID0gdGhpcy5fcGFyYW1ldHJvcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pYmdlVGFiZWxhRWxlbWVudC5jb2x1bmFzID0gdGhpcy5jb2x1bmFzO1xuICAgICAgICB0aGlzLl9pYmdlVGFiZWxhRWxlbWVudC5saW5oYXMgPSB0aGlzLmxpbmhhcztcbiAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFNpZHJhU2VydmljZUV2ZW50cy5zdWNjZXNzLCB0aGlzLl9oYW5kbGVSZXNwb25zZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl9zaWRyYVNlcnZpY2VFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoU2lkcmFTZXJ2aWNlRXZlbnRzLnN1Y2Nlc3MsIHRoaXMuX2hhbmRsZVJlc3BvbnNlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSBudWxsO1xuICAgIH1cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVTaWRyYUF0dHJpYnV0ZXMobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudFtuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnY29sdW5hcyc6XG4gICAgICAgICAgICBjYXNlICdsaW5oYXMnOlxuICAgICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgY29sdW5hcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb2x1bmFzJyk7XG4gICAgfVxuICAgIHNldCBjb2x1bmFzKGNvbHVuYXMpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW5hcyA9PT0gY29sdW5hcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjb2x1bmFzJywgY29sdW5hcyk7XG4gICAgfVxuICAgIGdldCBsaW5oYXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGluaGFzJyk7XG4gICAgfVxuICAgIHNldCBsaW5oYXMobGluaGFzKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmhhcyA9PT0gbGluaGFzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xpbmhhcycsIGxpbmhhcyk7XG4gICAgfVxuICAgIF9oYW5kbGVSZXNwb25zZShqc29uKSB7XG4gICAgICAgIHRoaXMuX2liZ2VUYWJlbGFFbGVtZW50LmRhZG9zID0ganNvbjtcbiAgICB9XG59XG5UYWJlbGFTaWRyYUVsZW1lbnQudGFnTmFtZSA9ICd0YWJlbGEtc2lkcmEnO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFRhYmVsYVNpZHJhRWxlbWVudC50YWdOYW1lLCBUYWJlbGFTaWRyYUVsZW1lbnQpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFiZWxhU2lkcmEuZWxlbWVudC5qcy5tYXAiLCIvL0B0cy1jaGVja1xuLyoqXG4gKiBEZWJvdW5jZSAtIGVzc2EgZnVuw6fDo28gYWRpYSBhIGV4ZWN1w6fDo28gZGEgZnVuw6fDo28gcmVjZWJpZGEuIENhc28gYSBmdW7Dp8OjbyBzZWphIGludm9jYWRhIG5vdmFtZW50ZSBuZXN0ZSBpbnRlcnZhbG8sIG8gdGVtcG8gZGUgZXNwZXJhIMOpIHJlaW5pY2lhZG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGZ1bsOnw6NvIGEgc2VyIGFkaWFkYVxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgLSB2YWxvciwgZW0gbWlsaXNlZ3VuZG9zLCBxdWUgYSBmdW7Dp8OjbyBkZXZlIGFndWFyZGFyIGFudGVzIGRlIHNlciBleGVjdXRhZGFcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gcmV0b3JuYSBmbiByZWNlYmlkYSwgasOhIGNvbSBvIGNvbXBvcnRhbWVudG8gZGUgYWd1YXJkYXIgbyB0ZW1wbyBkbyB0aW1lb3V0IGFudGVzIGRlIHN1YSBleGVjdcOnw6NvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgdGltZW91dCA9IDIwMCkge1xuICAgIGxldCB0aW1lcklkO1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAodGltZXJJZClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IGZuKC4uLmFyZ3MpLCB0aW1lb3V0KTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2UuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVN1YnN0cmluZyhzdGFydCwgZW5kLCBzdHIpIHtcbiAgICByZXR1cm4gc3RhcnQgPT09IDAgP1xuICAgICAgICBzdHIuc3Vic3RyKGVuZCkgOlxuICAgICAgICBzdHIuc3Vic3RyKDAsIHN0YXJ0KSArIHN0ci5zdWJzdHIoc3RhcnQgKyBlbmQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVtb3ZlU3Vic3RyaW5nLmpzLm1hcCIsImltcG9ydCB7IEhUTUxDdXN0b21FbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvSFRNTEN1c3RvbUVsZW1lbnRcIjtcbmltcG9ydCB7IFNpZHJhU2VydmljZUVsZW1lbnQgfSBmcm9tICcuL2VsZW1lbnRzL1NpZHJhU2VydmljZS5lbGVtZW50JztcbmltcG9ydCB7IFRhYmVsYVNpZHJhRWxlbWVudCB9IGZyb20gJy4vZWxlbWVudHMvVGFiZWxhU2lkcmEuZWxlbWVudCc7XG5TaWRyYVNlcnZpY2VFbGVtZW50O1xuVGFiZWxhU2lkcmFFbGVtZW50O1xuY2xhc3MgVGVzdGVFbGVtZW50IGV4dGVuZHMgSFRNTEN1c3RvbUVsZW1lbnQge1xuICAgIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGA8cD5IZWxsbyBXb3JsZCE8L3A+YDtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZTtcbiAgICB9XG59XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2VsLXRlc3RlJywgVGVzdGVFbGVtZW50KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XG4gICAgZ2V0KHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5faXNTdGF0dXNTdWNjZXNzKHRoaXMuc3RhdHVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlVGV4dCB8fCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcih0aGlzLnN0YXR1c1RleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEpTT04odXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcIkludmFsaWQgSlNPTi5cXG5PcmlnaW5hbCBlcnJvcjpcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBlcnJvci5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9pc1N0YXR1c1N1Y2Nlc3Moc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDQwMDtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgcmVxdWVzdFNlcnZpY2UgPSBuZXcgUmVxdWVzdFNlcnZpY2UoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlcXVlc3RTZXJ2aWNlLmpzLm1hcCIsIi8vQHRzLWNoZWNrXG5pbXBvcnQgeyByZXF1ZXN0U2VydmljZSB9IGZyb20gXCIuL1JlcXVlc3RTZXJ2aWNlXCI7XG5pbXBvcnQgeyBhdHJpYnV0b3NTaWRyYUVsZW1lbnQgfSBmcm9tIFwiLi4vZWxlbWVudHMvU2lkcmFFbGVtZW50LmFic3RyYWN0XCI7XG5leHBvcnQgY2xhc3MgU2lkcmFTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihfcmVxdWVzdFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fcmVxdWVzdFNlcnZpY2UgPSBfcmVxdWVzdFNlcnZpY2U7XG4gICAgfVxuICAgIGdldFZhbHVlcyhwYXJhbXMpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9zZXJ2aWNvZGFkb3MuaWJnZS5nb3YuYnIvYXBpL3YxL2Nvbmp1bnR1cmFpcz8mZD1zJnVzZXI9aWJnZSZ0PTE0MTkmdj02MyZwPS0xJm5nPTEoMSkmYz0zMTUoNzE2OSw3MTcwLDc0NDUsNzQ4Niw3NTU4LDc2MjUsNzY2MCw3NzEyLDc3NjYsNzc4NilcbiAgICAgICAgLy8gaHR0cHM6Ly9zZXJ2aWNvZGFkb3MuaWJnZS5nb3YuYnIvYXBpL3YzL2FncmVnYWRvcy8xNDE5L3BlcmlvZG9zLzIwMTgwNC92YXJpYXZlaXMvNjM/dXNlci1pYmdlJmxvY2FsaWRhZGVzPUJSfDMxMDYyMDB8NTMwMDEwOHw1MDAyNzA0fDQxMDY5MDJ8MjMwNDQwMHw1MjA4NzA3fDMyMDUzMDl8NDMxNDkwMnwyNjExNjA2fDMzMDQ1NTd8MjkyNzQwOHwzNTUwMzA4JmNsYXNzaWZpY2FjYW89MzE1WzcxNjksNzE3MCw3NDQ1LDc0ODYsNzU1OCw3NjI1LDc2NjAsNzcxMiw3NzY2LDc3ODZdXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0U2VydmljZS5nZXRKU09OKHRoaXMuX2J1aWxkVXJsKHBhcmFtcykpO1xuICAgIH1cbiAgICBfYnVpbGRVcmwocGFyYW1zKSB7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICBjb25zdCB7IHRhYmVsYSwgcGVyaW9kb3MsIHZhcmlhdmVpcywgbG9jYWxpZGFkZXMsIGNhdGVnb3JpYXMgfSA9IHBhcmFtcztcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBbXG4gICAgICAgICAgICBgbG9jYWxpZGFkZXM9JHtsb2NhbGlkYWRlcy5qb2luKCd8Jyl9YCxcbiAgICAgICAgICAgIGBjbGFzc2lmaWNhY2FvPSR7Y2F0ZWdvcmlhc31gXG4gICAgICAgIF0uam9pbihcIiZcIik7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9zZXJ2aWNvZGFkb3MuaWJnZS5nb3YuYnIvYXBpL3YzL2FncmVnYWRvcy8ke3RhYmVsYX0vcGVyaW9kb3MvJHtwZXJpb2Rvcy5qb2luKFwifFwiKX0vdmFyaWF2ZWlzLyR7dmFyaWF2ZWlzLmpvaW4oXCJ8XCIpfT91c2VyLWliZ2Uke3F1ZXJ5UGFyYW1zID8gYCYke3F1ZXJ5UGFyYW1zfWAgOiAnJ31gO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBzaWRyYVNlcnZpY2UgPSBuZXcgU2lkcmFTZXJ2aWNlKHJlcXVlc3RTZXJ2aWNlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpZHJhU2VydmljZS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9