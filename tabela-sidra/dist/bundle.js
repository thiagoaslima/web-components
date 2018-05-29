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
    constructor() {
        super(...arguments);
        this._dados = { localidades: [], variaveis: [], periodos: [], valores: [] };
    }
    set dados(dados) {
        this._dados = dados;
        this.updateTable();
    }
    get dados() {
        return this._dados;
    }
    init() {
        this._sidraServiceElement = document.createElement('sidra-service');
        this._ibgeTabelaElement = document.createElement('ibge-tabela');
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._sidraServiceElement);
        this._shadowRoot.appendChild(this._ibgeTabelaElement);
    }
    connectedCallback() {
        if (this._parametros && Object.keys(this._parametros).length > 0) {
            this._sidraServiceElement.parametros = this._parametros;
        }
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
        this.updateTable();
    }
    get linhas() {
        return this.getAttribute('linhas');
    }
    set linhas(linhas) {
        if (this.linhas === linhas) {
            return;
        }
        this.setAttribute('linhas', linhas);
        this.updateTable();
    }
    _handleResponse(evt) {
        const json = evt.detail.json;
        let localidades = {}, periodos = {}, variaveis = {}, valores = [];
        for (const { classificacoes, series } of json.resultados) {
            const classificacao = classificacoes[0];
            const id = Object.keys(classificacao.categoria)[0];
            const nome = classificacao.categoria[id];
            const variavel = { id, nome };
            variaveis[variavel.id] = variaveis[variavel.id] || variavel;
            series.forEach(({ localidade, serie }) => {
                localidades[localidade.id] = localidades[localidade.id] || { id: localidade.id, nome: localidade.nivel.nome + ' - ' + localidade.nome + '(' + localidade.id + ')' };
                const periodo = Object.keys(serie)[0];
                periodos[periodo] = periodos[periodo] || { id: periodo, nome: periodo };
                valores.push({
                    localidade: localidade.id,
                    periodo: periodo,
                    variavel: variavel.id,
                    valor: serie[periodo]
                });
            });
        }
        this.dados = {
            localidades: Object.keys(localidades).map(key => localidades[key]),
            periodos: Object.keys(periodos).map(key => periodos[key]),
            variaveis: Object.keys(variaveis).map(key => variaveis[key]),
            valores
        };
    }
    _convertToTable() {
        const colunas = this.dados[this.colunas].map(coluna => ({ dados: coluna.nome, titulo: coluna.nome }));
        const dados = this.dados[this.linhas].map(objLinha => {
            let obj = { [this.linhas]: objLinha.nome };
            this.dados[this.colunas].forEach(objColuna => {
                obj[objColuna.nome] = this.dados.valores.find(v => v[this.linhas] === objLinha.id && v[this.colunas] === objColuna.id).valor;
            });
            return obj;
        });
        return { colunas, dados };
    }
    updateTable() {
        debugger;
        const { colunas, dados } = this._convertToTable();
        this._ibgeTabelaElement.colunas = colunas;
        this._ibgeTabelaElement.dados = dados;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL2VsZW1lbnRzL0hUTUxDdXN0b21FbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9lbGVtZW50cy9TaWRyYUVsZW1lbnQuYWJzdHJhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL2VsZW1lbnRzL1NpZHJhU2VydmljZS5lbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9lbGVtZW50cy9UYWJlbGFTaWRyYS5lbGVtZW50LmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9oZWxwZXJzL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9oZWxwZXJzL3JlbW92ZVN1YnN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9lczYvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZXM2L2pzL3NlcnZpY2VzL1JlcXVlc3RTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2VzNi9qcy9zZXJ2aWNlcy9TaWRyYVNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQ0FBaUM7QUFDckQsWUFBWTtBQUNaO0FBQ0EsNkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUjRCO0FBQ0Y7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNEQUFzRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSTtBQUN4QixtQkFBbUIsSUFBSTtBQUN2QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRDQUE0QyxrQkFBa0IsR0FBRyxjQUFjO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckt1QjtBQUNKO0FBQ0k7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdCQUF3QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUseUNBQXlDLE9BQU8sRUFBRTtBQUM3SCxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEN1QjtBQUNnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxlQUFlO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZUFBZSxnQkFBZ0I7QUFDM0Qsb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSw2QkFBNkIsb0JBQW9CO0FBQ2pELDRFQUE0RTtBQUM1RTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsMENBQTBDO0FBQzNHO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDOzs7Ozs7Ozs7Ozs7O0FDL0dBO0FBQUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7Ozs7Ozs7Ozs7O0FDTDRCO0FBQ0U7QUFDRDtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUN5QjtBQUNPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVEQUF1RDtBQUN0RTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQsNkJBQTZCLFdBQVc7QUFDeEM7QUFDQSxvRUFBb0UsT0FBTyxZQUFZLG1CQUFtQixhQUFhLG9CQUFvQixZQUFZLGtCQUFrQixZQUFZLE9BQU87QUFDNUw7QUFDQTtBQUNBO0FBQ0Esd0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZXM2L2pzL2luZGV4LmpzXCIpO1xuIiwiLy8gRE8gTk9UIFJFTU9WRSBUSElTIENMQVNTXG4vLyBUeXBlc2NyaXB0IGRvIG5vdCBjb21waWxlIFdlYkNvbXBvbmVudHMgY29ycmVjdGx5XG4vLyBUaGlzIGhhY2sgbWluaW1pemVzIHRoZSBlcnJvcnNcbmV4cG9ydCBjbGFzcyBIVE1MQ3VzdG9tRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBjb25zdHJ1Y3RvcihfKSB7IHJldHVybiAoXyA9IHN1cGVyKF8pKS5pbml0KCksIF87IH1cbiAgICBpbml0KCkgeyB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IVE1MQ3VzdG9tRWxlbWVudC5qcy5tYXAiLCJpbXBvcnQgeyBIVE1MQ3VzdG9tRWxlbWVudCB9IGZyb20gXCIuL0hUTUxDdXN0b21FbGVtZW50XCI7XG5pbXBvcnQgeyByZW1vdmVTdWJzdHJpbmcgfSBmcm9tIFwiLi4vaGVscGVycy9yZW1vdmVTdWJzdHJpbmdcIjtcbmV4cG9ydCB2YXIgYXRyaWJ1dG9zU2lkcmFFbGVtZW50O1xuKGZ1bmN0aW9uIChhdHJpYnV0b3NTaWRyYUVsZW1lbnQpIHtcbiAgICBhdHJpYnV0b3NTaWRyYUVsZW1lbnRbXCJ0YWJlbGFcIl0gPSBcInRhYmVsYVwiO1xuICAgIGF0cmlidXRvc1NpZHJhRWxlbWVudFtcImNhdGVnb3JpYXNcIl0gPSBcImNhdGVnb3JpYXNcIjtcbiAgICBhdHJpYnV0b3NTaWRyYUVsZW1lbnRbXCJsb2NhbGlkYWRlc1wiXSA9IFwibG9jYWxpZGFkZXNcIjtcbiAgICBhdHJpYnV0b3NTaWRyYUVsZW1lbnRbXCJwZXJpb2Rvc1wiXSA9IFwicGVyaW9kb3NcIjtcbiAgICBhdHJpYnV0b3NTaWRyYUVsZW1lbnRbXCJ2YXJpYXZlaXNcIl0gPSBcInZhcmlhdmVpc1wiO1xufSkoYXRyaWJ1dG9zU2lkcmFFbGVtZW50IHx8IChhdHJpYnV0b3NTaWRyYUVsZW1lbnQgPSB7fSkpO1xuO1xuY29uc3QgYXR0cnMgPSBPYmplY3Qua2V5cyhhdHJpYnV0b3NTaWRyYUVsZW1lbnQpLm1hcChrZXkgPT4gYXRyaWJ1dG9zU2lkcmFFbGVtZW50W2tleV0pO1xuZXhwb3J0IGNsYXNzIFNpZHJhRWxlbWVudCBleHRlbmRzIEhUTUxDdXN0b21FbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fcGFyYW1ldHJvcyA9IHtcbiAgICAgICAgICAgIHRhYmVsYTogJycsXG4gICAgICAgICAgICBjYXRlZ29yaWFzOiAnJyxcbiAgICAgICAgICAgIGxvY2FsaWRhZGVzOiBbXSxcbiAgICAgICAgICAgIHBlcmlvZG9zOiBbXSxcbiAgICAgICAgICAgIHZhcmlhdmVpczogW11cbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBhdHRycztcbiAgICB9XG4gICAgZ2V0IHRhYmVsYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRyb3MudGFiZWxhO1xuICAgIH1cbiAgICBzZXQgdGFiZWxhKGNvZGlnb1RhYmVsYSkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3NTaWRyYUVsZW1lbnQudGFiZWxhLCBjb2RpZ29UYWJlbGEpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLnRhYmVsYSA9IGNvZGlnb1RhYmVsYTtcbiAgICB9XG4gICAgZ2V0IGNhdGVnb3JpYXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0cm9zLmNhdGVnb3JpYXM7XG4gICAgfVxuICAgIHNldCBjYXRlZ29yaWFzKGNhdGVnb3JpYXMpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zU2lkcmFFbGVtZW50LmNhdGVnb3JpYXMsIGNhdGVnb3JpYXMpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0cm9zLmNhdGVnb3JpYXMgPSBjYXRlZ29yaWFzO1xuICAgIH1cbiAgICBnZXQgcGVyaW9kb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0cm9zLnBlcmlvZG9zO1xuICAgIH1cbiAgICBzZXQgcGVyaW9kb3MocGVyaW9kb3MpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgcGVyaW9kb3MpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zU2lkcmFFbGVtZW50LnBlcmlvZG9zLCBwZXJpb2Rvcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy5wZXJpb2RvcyA9IHBlcmlvZG9zLnNwbGl0KCcsJykubWFwKHN0ciA9PiBzdHIudHJpbSgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zU2lkcmFFbGVtZW50LnBlcmlvZG9zLCBwZXJpb2Rvcy5qb2luKCcsJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmFtZXRyb3MucGVyaW9kb3MgPSBwZXJpb2RvcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdmFyaWF2ZWlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldHJvcy52YXJpYXZlaXM7XG4gICAgfVxuICAgIHNldCB2YXJpYXZlaXModmFyaWF2ZWlzKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhcmlhdmVpcykge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHJpYnV0b3NTaWRyYUVsZW1lbnQudmFyaWF2ZWlzLCB2YXJpYXZlaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmFtZXRyb3MudmFyaWF2ZWlzID0gdmFyaWF2ZWlzLnNwbGl0KCcsJykubWFwKHN0ciA9PiBzdHIudHJpbSgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXRyaWJ1dG9zU2lkcmFFbGVtZW50LnZhcmlhdmVpcywgdmFyaWF2ZWlzLmpvaW4oJywnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1ldHJvcy52YXJpYXZlaXMgPSB2YXJpYXZlaXM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGxvY2FsaWRhZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldHJvcy5sb2NhbGlkYWRlcztcbiAgICB9XG4gICAgc2V0IGxvY2FsaWRhZGVzKGxvY2FsaWRhZGVzKSB7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRyb3MubG9jYWxpZGFkZXMgPSB0aGlzLl9oYW5kbGVMb2NhbGlkYWRlcyhsb2NhbGlkYWRlcyk7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0cmlidXRvc1NpZHJhRWxlbWVudC5sb2NhbGlkYWRlcywgdGhpcy5fcGFyYW1ldHJvcy5sb2NhbGlkYWRlcy5qb2luKCcsJykpO1xuICAgIH1cbiAgICBfaGFuZGxlTG9jYWxpZGFkZXMobG9jYWxpZGFkZXMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobG9jYWxpZGFkZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxpZGFkZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbGlkYWRlcyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIFtsb2NhbGlkYWRlcy50b1N0cmluZygxMCldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTaWRyYUVsZW1lbnQubG9jYWxpZGFkZXNOb3JtYWxpemVyLm5vcm1hbGl6ZShsb2NhbGlkYWRlcyk7XG4gICAgfVxuICAgIF91cGRhdGVTaWRyYUF0dHJpYnV0ZXMobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGxldCB1cGRhdGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChhdHRycy5pbmNsdWRlcyhuYW1lKSAmJiBvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgIH1cbn1cblNpZHJhRWxlbWVudC5sb2NhbGlkYWRlc05vcm1hbGl6ZXIgPSB7XG4gICAgcmVnZXg6IHtcbiAgICAgICAgbnM6IC9OWzAtOV17MSw0fVxcW1tCUjAtOSxcXHNdKlxcXS8sXG4gICAgICAgIG46IC9OWzAtOV17MSw0fS9cbiAgICB9LFxuICAgIG5vcm1hbGl6ZShsb2NhbGlkYWRlcykge1xuICAgICAgICBjb25zdCBzZWxmID0gU2lkcmFFbGVtZW50LmxvY2FsaWRhZGVzTm9ybWFsaXplcjtcbiAgICAgICAgbGV0IGNvZGlnb3MgPSBzZWxmLnNlcGFyYXRlQ29kaWdvcyhsb2NhbGlkYWRlcyk7XG4gICAgICAgIGxldCB7IG4sIG5zLCBudW1lcmljb3MgfSA9IHNlbGYudHJhdGFyVGV4dG8oc2VsZi5jaGVjYXJSZWR1bmRhbmNpYShjb2RpZ29zKSk7XG4gICAgICAgIHJldHVybiBuLmNvbmNhdChucywgbnVtZXJpY29zKTtcbiAgICB9LFxuICAgIHNlcGFyYXRlQ29kaWdvcyhjb2RpZ29zKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSBTaWRyYUVsZW1lbnQubG9jYWxpZGFkZXNOb3JtYWxpemVyO1xuICAgICAgICAvLyB0cmF0YXIgdW1hIGxpc3RhIGRlIGxvY2FsaWRhZGVzXG4gICAgICAgIGxldCBucyA9IFtdO1xuICAgICAgICBsZXQgbiA9IFtdO1xuICAgICAgICBsZXQgbnVtZXJpY29zID0gW107XG4gICAgICAgIC8vIGV4dHJhaSBvcyBjYXNvcyBlc3BlY2lhaXMgcXVlIHV0aWxpemVtIG9zIGlkZW50aWZpY2Fkb3JlcyBOPG51bWJlcj5bPGNvZGlnbz5dXG4gICAgICAgIGxldCBtYXRjaDtcbiAgICAgICAgbGV0IHJlZ2V4ID0gc2VsZi5yZWdleC5ucztcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4LmV4ZWMoY29kaWdvcykpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBucy5wdXNoKG1hdGNoWzBdKTtcbiAgICAgICAgICAgIGNvZGlnb3MgPSByZW1vdmVTdWJzdHJpbmcobWF0Y2guaW5kZXgsIG1hdGNoWzBdLmxlbmd0aCwgY29kaWdvcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXh0cmFpIG9zIGNhc29zIGRlIHVzbyBkZSBOPG51bWJlcj4gZ2Vuw6lyaWNvXG4gICAgICAgIHJlZ2V4ID0gc2VsZi5yZWdleC5uO1xuICAgICAgICBtYXRjaDtcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4LmV4ZWMoY29kaWdvcykpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBuLnB1c2gobWF0Y2hbMF0pO1xuICAgICAgICAgICAgY29kaWdvcyA9IHJlbW92ZVN1YnN0cmluZyhtYXRjaC5pbmRleCwgbWF0Y2hbMF0ubGVuZ3RoLCBjb2RpZ29zKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzb2JyYW0gb3MgY2Fzb3MgZGUgdXNvIGRvIGNvZGlnbyBudW1lcmljbyBkaXJldG9cbiAgICAgICAgbnVtZXJpY29zID0gY29kaWdvcy5zcGxpdCgnLCcpLmZpbHRlcihCb29sZWFuKS5tYXAoY29kID0+IGNvZC50cmltKCkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbnMsXG4gICAgICAgICAgICBuLFxuICAgICAgICAgICAgbnVtZXJpY29zXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjaGVjYXJSZWR1bmRhbmNpYSh7IG4sIG5zLCBudW1lcmljb3MgfSkge1xuICAgICAgICBjb25zdCBzZWxmID0gU2lkcmFFbGVtZW50LmxvY2FsaWRhZGVzTm9ybWFsaXplcjtcbiAgICAgICAgbGV0IG9iaiA9IG4ucmVkdWNlKChvLCBjb2QpID0+IHtcbiAgICAgICAgICAgIG9bY29kXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfSwge30pO1xuICAgICAgICBucyA9IG5zLmZpbHRlcihzdHIgPT4ge1xuICAgICAgICAgICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICAgICAgICAgIGxldCByZWdleCA9IHNlbGYucmVnZXgubjtcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBvYmpbbWF0Y2hbMF1dO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG4sIG5zLCBudW1lcmljb3NcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRyYXRhclRleHRvKHsgbiwgbnMsIG51bWVyaWNvcyB9KSB7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgbnMuZm9yRWFjaChzdHIgPT4ge1xuICAgICAgICAgICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICAgICAgICAgIGxldCBbbml2ZWwsIGNvZGlnb3NdID0gc3RyLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBjb2RpZ29zLnJlcGxhY2UoJ10nLCAnJykuc3BsaXQoJywnKS5maWx0ZXIoQm9vbGVhbikubWFwKHN0ciA9PiBzdHIudHJpbSgpKTtcbiAgICAgICAgICAgIG9ialtuaXZlbC50cmltKCldID0gb2JqW25pdmVsLnRyaW0oKV0gfHwgbmV3IFNldCgpO1xuICAgICAgICAgICAgb2JqW25pdmVsLnRyaW0oKV0uYWRkKGFycmF5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5zID0gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IGAke2tleS50b1VwcGVyQ2FzZSgpfVske1suLi5vYmpba2V5XV19XWApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbiwgbnMsIG51bWVyaWNvc1xuICAgICAgICB9O1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaWRyYUVsZW1lbnQuYWJzdHJhY3QuanMubWFwIiwiaW1wb3J0IHsgc2lkcmFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL1NpZHJhU2VydmljZVwiO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tIFwiLi4vaGVscGVycy9kZWJvdW5jZVwiO1xuaW1wb3J0IHsgU2lkcmFFbGVtZW50IH0gZnJvbSBcIi4vU2lkcmFFbGVtZW50LmFic3RyYWN0XCI7XG5leHBvcnQgdmFyIGV2ZW50cztcbihmdW5jdGlvbiAoZXZlbnRzKSB7XG4gICAgZXZlbnRzW1wic3VjY2Vzc1wiXSA9IFwib25TdWNlc3NcIjtcbiAgICBldmVudHNbXCJlcnJvclwiXSA9IFwib25FcnJvclwiO1xufSkoZXZlbnRzIHx8IChldmVudHMgPSB7fSkpO1xuO1xuZXhwb3J0IGNsYXNzIFNpZHJhU2VydmljZUVsZW1lbnQgZXh0ZW5kcyBTaWRyYUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgc2lkcmFTZXJ2aWNlLmdldFZhbHVlcyh0aGlzLl9wYXJhbWV0cm9zKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50cy5zdWNjZXNzLCB7IGJ1YmJsZXM6IGZhbHNlLCBzY29wZWQ6IGZhbHNlLCBkZXRhaWw6IHsganNvbiB9IH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0IHBhcmFtZXRyb3MocGFyYW1ldHJvcykge1xuICAgICAgICBpZiAodGhpcy5fcGFyYW1ldHJvcyAhPT0gcGFyYW1ldHJvcykge1xuICAgICAgICAgICAgdGhpcy50YWJlbGEgPSBwYXJhbWV0cm9zLnRhYmVsYSB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmlhcyA9IHBhcmFtZXRyb3MuY2F0ZWdvcmlhcyB8fCAnJztcbiAgICAgICAgICAgIHRoaXMucGVyaW9kb3MgPSBwYXJhbWV0cm9zLnBlcmlvZG9zIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGlkYWRlcyA9IHBhcmFtZXRyb3MubG9jYWxpZGFkZXMgfHwgW107XG4gICAgICAgICAgICB0aGlzLnZhcmlhdmVpcyA9IHBhcmFtZXRyb3MudmFyaWF2ZWlzIHx8IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwYXJhbWV0cm9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJhbWV0cm9zO1xuICAgIH1cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVTaWRyYUF0dHJpYnV0ZXMobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuU2lkcmFTZXJ2aWNlRWxlbWVudC50YWdOYW1lID0gJ3NpZHJhLXNlcnZpY2UnO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNpZHJhU2VydmljZUVsZW1lbnQudGFnTmFtZSwgU2lkcmFTZXJ2aWNlRWxlbWVudCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaWRyYVNlcnZpY2UuZWxlbWVudC5qcy5tYXAiLCJpbXBvcnQgeyBTaWRyYUVsZW1lbnQgfSBmcm9tIFwiLi9TaWRyYUVsZW1lbnQuYWJzdHJhY3RcIjtcbmltcG9ydCB7IGV2ZW50cyBhcyBTaWRyYVNlcnZpY2VFdmVudHMgfSBmcm9tIFwiLi9TaWRyYVNlcnZpY2UuZWxlbWVudFwiO1xuZXhwb3J0IGNsYXNzIFRhYmVsYVNpZHJhRWxlbWVudCBleHRlbmRzIFNpZHJhRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX2RhZG9zID0geyBsb2NhbGlkYWRlczogW10sIHZhcmlhdmVpczogW10sIHBlcmlvZG9zOiBbXSwgdmFsb3JlczogW10gfTtcbiAgICB9XG4gICAgc2V0IGRhZG9zKGRhZG9zKSB7XG4gICAgICAgIHRoaXMuX2RhZG9zID0gZGFkb3M7XG4gICAgICAgIHRoaXMudXBkYXRlVGFibGUoKTtcbiAgICB9XG4gICAgZ2V0IGRhZG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGFkb3M7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX3NpZHJhU2VydmljZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzaWRyYS1zZXJ2aWNlJyk7XG4gICAgICAgIHRoaXMuX2liZ2VUYWJlbGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWJnZS10YWJlbGEnKTtcbiAgICAgICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRoaXMuX3NpZHJhU2VydmljZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRoaXMuX2liZ2VUYWJlbGFFbGVtZW50KTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJhbWV0cm9zICYmIE9iamVjdC5rZXlzKHRoaXMuX3BhcmFtZXRyb3MpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3NpZHJhU2VydmljZUVsZW1lbnQucGFyYW1ldHJvcyA9IHRoaXMuX3BhcmFtZXRyb3M7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFNpZHJhU2VydmljZUV2ZW50cy5zdWNjZXNzLCB0aGlzLl9oYW5kbGVSZXNwb25zZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl9zaWRyYVNlcnZpY2VFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoU2lkcmFTZXJ2aWNlRXZlbnRzLnN1Y2Nlc3MsIHRoaXMuX2hhbmRsZVJlc3BvbnNlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSBudWxsO1xuICAgIH1cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVTaWRyYUF0dHJpYnV0ZXMobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fc2lkcmFTZXJ2aWNlRWxlbWVudFtuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnY29sdW5hcyc6XG4gICAgICAgICAgICBjYXNlICdsaW5oYXMnOlxuICAgICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgY29sdW5hcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb2x1bmFzJyk7XG4gICAgfVxuICAgIHNldCBjb2x1bmFzKGNvbHVuYXMpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW5hcyA9PT0gY29sdW5hcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjb2x1bmFzJywgY29sdW5hcyk7XG4gICAgICAgIHRoaXMudXBkYXRlVGFibGUoKTtcbiAgICB9XG4gICAgZ2V0IGxpbmhhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsaW5oYXMnKTtcbiAgICB9XG4gICAgc2V0IGxpbmhhcyhsaW5oYXMpIHtcbiAgICAgICAgaWYgKHRoaXMubGluaGFzID09PSBsaW5oYXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbGluaGFzJywgbGluaGFzKTtcbiAgICAgICAgdGhpcy51cGRhdGVUYWJsZSgpO1xuICAgIH1cbiAgICBfaGFuZGxlUmVzcG9uc2UoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGpzb24gPSBldnQuZGV0YWlsLmpzb247XG4gICAgICAgIGxldCBsb2NhbGlkYWRlcyA9IHt9LCBwZXJpb2RvcyA9IHt9LCB2YXJpYXZlaXMgPSB7fSwgdmFsb3JlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHsgY2xhc3NpZmljYWNvZXMsIHNlcmllcyB9IG9mIGpzb24ucmVzdWx0YWRvcykge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NpZmljYWNhbyA9IGNsYXNzaWZpY2Fjb2VzWzBdO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBPYmplY3Qua2V5cyhjbGFzc2lmaWNhY2FvLmNhdGVnb3JpYSlbMF07XG4gICAgICAgICAgICBjb25zdCBub21lID0gY2xhc3NpZmljYWNhby5jYXRlZ29yaWFbaWRdO1xuICAgICAgICAgICAgY29uc3QgdmFyaWF2ZWwgPSB7IGlkLCBub21lIH07XG4gICAgICAgICAgICB2YXJpYXZlaXNbdmFyaWF2ZWwuaWRdID0gdmFyaWF2ZWlzW3ZhcmlhdmVsLmlkXSB8fCB2YXJpYXZlbDtcbiAgICAgICAgICAgIHNlcmllcy5mb3JFYWNoKCh7IGxvY2FsaWRhZGUsIHNlcmllIH0pID0+IHtcbiAgICAgICAgICAgICAgICBsb2NhbGlkYWRlc1tsb2NhbGlkYWRlLmlkXSA9IGxvY2FsaWRhZGVzW2xvY2FsaWRhZGUuaWRdIHx8IHsgaWQ6IGxvY2FsaWRhZGUuaWQsIG5vbWU6IGxvY2FsaWRhZGUubml2ZWwubm9tZSArICcgLSAnICsgbG9jYWxpZGFkZS5ub21lICsgJygnICsgbG9jYWxpZGFkZS5pZCArICcpJyB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmlvZG8gPSBPYmplY3Qua2V5cyhzZXJpZSlbMF07XG4gICAgICAgICAgICAgICAgcGVyaW9kb3NbcGVyaW9kb10gPSBwZXJpb2Rvc1twZXJpb2RvXSB8fCB7IGlkOiBwZXJpb2RvLCBub21lOiBwZXJpb2RvIH07XG4gICAgICAgICAgICAgICAgdmFsb3Jlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxpZGFkZTogbG9jYWxpZGFkZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kbzogcGVyaW9kbyxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWF2ZWw6IHZhcmlhdmVsLmlkLFxuICAgICAgICAgICAgICAgICAgICB2YWxvcjogc2VyaWVbcGVyaW9kb11cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGFkb3MgPSB7XG4gICAgICAgICAgICBsb2NhbGlkYWRlczogT2JqZWN0LmtleXMobG9jYWxpZGFkZXMpLm1hcChrZXkgPT4gbG9jYWxpZGFkZXNba2V5XSksXG4gICAgICAgICAgICBwZXJpb2RvczogT2JqZWN0LmtleXMocGVyaW9kb3MpLm1hcChrZXkgPT4gcGVyaW9kb3Nba2V5XSksXG4gICAgICAgICAgICB2YXJpYXZlaXM6IE9iamVjdC5rZXlzKHZhcmlhdmVpcykubWFwKGtleSA9PiB2YXJpYXZlaXNba2V5XSksXG4gICAgICAgICAgICB2YWxvcmVzXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9jb252ZXJ0VG9UYWJsZSgpIHtcbiAgICAgICAgY29uc3QgY29sdW5hcyA9IHRoaXMuZGFkb3NbdGhpcy5jb2x1bmFzXS5tYXAoY29sdW5hID0+ICh7IGRhZG9zOiBjb2x1bmEubm9tZSwgdGl0dWxvOiBjb2x1bmEubm9tZSB9KSk7XG4gICAgICAgIGNvbnN0IGRhZG9zID0gdGhpcy5kYWRvc1t0aGlzLmxpbmhhc10ubWFwKG9iakxpbmhhID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSB7IFt0aGlzLmxpbmhhc106IG9iakxpbmhhLm5vbWUgfTtcbiAgICAgICAgICAgIHRoaXMuZGFkb3NbdGhpcy5jb2x1bmFzXS5mb3JFYWNoKG9iakNvbHVuYSA9PiB7XG4gICAgICAgICAgICAgICAgb2JqW29iakNvbHVuYS5ub21lXSA9IHRoaXMuZGFkb3MudmFsb3Jlcy5maW5kKHYgPT4gdlt0aGlzLmxpbmhhc10gPT09IG9iakxpbmhhLmlkICYmIHZbdGhpcy5jb2x1bmFzXSA9PT0gb2JqQ29sdW5hLmlkKS52YWxvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IGNvbHVuYXMsIGRhZG9zIH07XG4gICAgfVxuICAgIHVwZGF0ZVRhYmxlKCkge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgY29uc3QgeyBjb2x1bmFzLCBkYWRvcyB9ID0gdGhpcy5fY29udmVydFRvVGFibGUoKTtcbiAgICAgICAgdGhpcy5faWJnZVRhYmVsYUVsZW1lbnQuY29sdW5hcyA9IGNvbHVuYXM7XG4gICAgICAgIHRoaXMuX2liZ2VUYWJlbGFFbGVtZW50LmRhZG9zID0gZGFkb3M7XG4gICAgfVxufVxuVGFiZWxhU2lkcmFFbGVtZW50LnRhZ05hbWUgPSAndGFiZWxhLXNpZHJhJztcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUYWJlbGFTaWRyYUVsZW1lbnQudGFnTmFtZSwgVGFiZWxhU2lkcmFFbGVtZW50KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhYmVsYVNpZHJhLmVsZW1lbnQuanMubWFwIiwiLy9AdHMtY2hlY2tcbi8qKlxuICogRGVib3VuY2UgLSBlc3NhIGZ1bsOnw6NvIGFkaWEgYSBleGVjdcOnw6NvIGRhIGZ1bsOnw6NvIHJlY2ViaWRhLiBDYXNvIGEgZnVuw6fDo28gc2VqYSBpbnZvY2FkYSBub3ZhbWVudGUgbmVzdGUgaW50ZXJ2YWxvLCBvIHRlbXBvIGRlIGVzcGVyYSDDqSByZWluaWNpYWRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBmdW7Dp8OjbyBhIHNlciBhZGlhZGFcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gdmFsb3IsIGVtIG1pbGlzZWd1bmRvcywgcXVlIGEgZnVuw6fDo28gZGV2ZSBhZ3VhcmRhciBhbnRlcyBkZSBzZXIgZXhlY3V0YWRhXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IHJldG9ybmEgZm4gcmVjZWJpZGEsIGrDoSBjb20gbyBjb21wb3J0YW1lbnRvIGRlIGFndWFyZGFyIG8gdGVtcG8gZG8gdGltZW91dCBhbnRlcyBkZSBzdWEgZXhlY3XDp8Ojb1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWVvdXQgPSAyMDApIHtcbiAgICBsZXQgdGltZXJJZDtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKHRpbWVySWQpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiBmbiguLi5hcmdzKSwgdGltZW91dCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYm91bmNlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiByZW1vdmVTdWJzdHJpbmcoc3RhcnQsIGVuZCwgc3RyKSB7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSAwID9cbiAgICAgICAgc3RyLnN1YnN0cihlbmQpIDpcbiAgICAgICAgc3RyLnN1YnN0cigwLCBzdGFydCkgKyBzdHIuc3Vic3RyKHN0YXJ0ICsgZW5kKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbW92ZVN1YnN0cmluZy5qcy5tYXAiLCJpbXBvcnQgeyBIVE1MQ3VzdG9tRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0hUTUxDdXN0b21FbGVtZW50XCI7XG5pbXBvcnQgeyBTaWRyYVNlcnZpY2VFbGVtZW50IH0gZnJvbSAnLi9lbGVtZW50cy9TaWRyYVNlcnZpY2UuZWxlbWVudCc7XG5pbXBvcnQgeyBUYWJlbGFTaWRyYUVsZW1lbnQgfSBmcm9tICcuL2VsZW1lbnRzL1RhYmVsYVNpZHJhLmVsZW1lbnQnO1xuU2lkcmFTZXJ2aWNlRWxlbWVudDtcblRhYmVsYVNpZHJhRWxlbWVudDtcbmNsYXNzIFRlc3RlRWxlbWVudCBleHRlbmRzIEhUTUxDdXN0b21FbGVtZW50IHtcbiAgICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgICAgIHJldHVybiBgPHA+SGVsbG8gV29ybGQhPC9wPmA7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGU7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdlbC10ZXN0ZScsIFRlc3RlRWxlbWVudCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgY2xhc3MgUmVxdWVzdFNlcnZpY2Uge1xuICAgIGdldCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX2lzU3RhdHVzU3VjY2Vzcyh0aGlzLnN0YXR1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZVRleHQgfHwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IodGhpcy5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRKU09OKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQodXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXCJJbnZhbGlkIEpTT04uXFxuT3JpZ2luYWwgZXJyb3I6XCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgZXJyb3Iuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaXNTdGF0dXNTdWNjZXNzKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCA0MDA7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHJlcXVlc3RTZXJ2aWNlID0gbmV3IFJlcXVlc3RTZXJ2aWNlKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZXF1ZXN0U2VydmljZS5qcy5tYXAiLCIvL0B0cy1jaGVja1xuaW1wb3J0IHsgcmVxdWVzdFNlcnZpY2UgfSBmcm9tIFwiLi9SZXF1ZXN0U2VydmljZVwiO1xuaW1wb3J0IHsgYXRyaWJ1dG9zU2lkcmFFbGVtZW50IH0gZnJvbSBcIi4uL2VsZW1lbnRzL1NpZHJhRWxlbWVudC5hYnN0cmFjdFwiO1xuZXhwb3J0IGNsYXNzIFNpZHJhU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoX3JlcXVlc3RTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RTZXJ2aWNlID0gX3JlcXVlc3RTZXJ2aWNlO1xuICAgIH1cbiAgICBnZXRWYWx1ZXMocGFyYW1zKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vc2Vydmljb2RhZG9zLmliZ2UuZ292LmJyL2FwaS92MS9jb25qdW50dXJhaXM/JmQ9cyZ1c2VyPWliZ2UmdD0xNDE5JnY9NjMmcD0tMSZuZz0xKDEpJmM9MzE1KDcxNjksNzE3MCw3NDQ1LDc0ODYsNzU1OCw3NjI1LDc2NjAsNzcxMiw3NzY2LDc3ODYpXG4gICAgICAgIC8vIGh0dHBzOi8vc2Vydmljb2RhZG9zLmliZ2UuZ292LmJyL2FwaS92My9hZ3JlZ2Fkb3MvMTQxOS9wZXJpb2Rvcy8yMDE4MDQvdmFyaWF2ZWlzLzYzP3VzZXItaWJnZSZsb2NhbGlkYWRlcz1CUnwzMTA2MjAwfDUzMDAxMDh8NTAwMjcwNHw0MTA2OTAyfDIzMDQ0MDB8NTIwODcwN3wzMjA1MzA5fDQzMTQ5MDJ8MjYxMTYwNnwzMzA0NTU3fDI5Mjc0MDh8MzU1MDMwOCZjbGFzc2lmaWNhY2FvPTMxNVs3MTY5LDcxNzAsNzQ0NSw3NDg2LDc1NTgsNzYyNSw3NjYwLDc3MTIsNzc2Niw3Nzg2XVxuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdFNlcnZpY2UuZ2V0SlNPTih0aGlzLl9idWlsZFVybChwYXJhbXMpKTtcbiAgICB9XG4gICAgX2J1aWxkVXJsKHBhcmFtcykge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgY29uc3QgeyB0YWJlbGEsIHBlcmlvZG9zLCB2YXJpYXZlaXMsIGxvY2FsaWRhZGVzLCBjYXRlZ29yaWFzIH0gPSBwYXJhbXM7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gW1xuICAgICAgICAgICAgYGxvY2FsaWRhZGVzPSR7bG9jYWxpZGFkZXMuam9pbignfCcpfWAsXG4gICAgICAgICAgICBgY2xhc3NpZmljYWNhbz0ke2NhdGVnb3JpYXN9YFxuICAgICAgICBdLmpvaW4oXCImXCIpO1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vc2Vydmljb2RhZG9zLmliZ2UuZ292LmJyL2FwaS92My9hZ3JlZ2Fkb3MvJHt0YWJlbGF9L3BlcmlvZG9zLyR7cGVyaW9kb3Muam9pbihcInxcIil9L3ZhcmlhdmVpcy8ke3ZhcmlhdmVpcy5qb2luKFwifFwiKX0/dXNlci1pYmdlJHtxdWVyeVBhcmFtcyA/IGAmJHtxdWVyeVBhcmFtc31gIDogJyd9YDtcbiAgICB9XG59XG5leHBvcnQgY29uc3Qgc2lkcmFTZXJ2aWNlID0gbmV3IFNpZHJhU2VydmljZShyZXF1ZXN0U2VydmljZSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaWRyYVNlcnZpY2UuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==