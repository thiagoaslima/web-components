var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HTMLCustomElement", "../services/SidraService", "../helpers/removeSubstring", "../helpers/debounce"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLCustomElement_1 = require("./HTMLCustomElement");
    var SidraService_1 = require("../services/SidraService");
    var removeSubstring_1 = require("../helpers/removeSubstring");
    var debounce_1 = require("../helpers/debounce");
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
    var codigosLocalidadesNormalizer = {
        regex: {
            ns: /N[0-9]{1,4}\[[BR0-9,\s]*\]/,
            n: /N[0-9]{1,4}/
        },
        normalize: function (localidades) {
            var self = codigosLocalidadesNormalizer;
            var codigos = self.separateCodigos(localidades);
            var _a = self.tratarTexto(self.checarRedundancia(codigos)), n = _a.n, ns = _a.ns, numericos = _a.numericos;
            return n.concat(ns, numericos);
        },
        separateCodigos: function (codigos) {
            // tratar uma lista de localidades
            var ns = [];
            var n = [];
            var numericos = [];
            // extrai os casos especiais que utilizem os identificadores N<number>[<codigo>]
            var match;
            var regex = this._codigosLocalidadesNormalizer.regex.ns;
            while ((match = regex.exec(codigos)) !== null) {
                ns.push(match[0]);
                codigos = removeSubstring_1.removeSubstring(match.index, match[0].length, codigos);
            }
            // extrai os casos de uso de N<number> genérico
            regex = this._codigosLocalidadesNormalizer.regex.n;
            match;
            while ((match = regex.exec(codigos)) !== null) {
                n.push(match[0]);
                codigos = removeSubstring_1.removeSubstring(match.index, match[0].length, codigos);
            }
            // sobram os casos de uso do codigo numerico direto
            numericos = codigos.split(',').filter(Boolean).map(function (cod) { return cod.trim(); });
            return {
                ns: ns,
                n: n,
                numericos: numericos
            };
        },
        checarRedundancia: function (_a) {
            var _this = this;
            var n = _a.n, ns = _a.ns, numericos = _a.numericos;
            var obj = n.reduce(function (o, cod) {
                o[cod] = true;
                return o;
            }, {});
            ns = ns.filter(function (str) {
                str = str.trim();
                var regex = _this._codigosLocalidadesNormalizer.regex.n;
                var match = regex.exec(str);
                return obj[match[0]];
            });
            return {
                n: n, ns: ns, numericos: numericos
            };
        },
        tratarTexto: function (_a) {
            var n = _a.n, ns = _a.ns, numericos = _a.numericos;
            var obj = {};
            ns.forEach(function (str) {
                str = str.trim();
                var _a = str.split('['), nivel = _a[0], codigos = _a[1];
                var array = codigos.replace(']', '').split(',').filter(Boolean).map(function (str) { return str.trim(); });
                obj[nivel.trim()] = obj[nivel.trim()] || new Set();
                obj[nivel.trim()].add(array);
            });
            ns = Object.keys(obj).map(function (key) { return key.toUpperCase() + "[" + obj[key].slice() + "]"; });
            return {
                n: n, ns: ns, numericos: numericos
            };
        }
    };
    exports.SidraServiceElement = (function (sidraService, normalizer) {
        return _a = /** @class */ (function (_super) {
                __extends(SidraServiceElement, _super);
                function SidraServiceElement() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._parametros = {
                        codigoTabela: '',
                        categorias: '',
                        localidades: [],
                        periodos: [],
                        variaveis: []
                    };
                    _this._request = debounce_1.debounce(function () {
                        sidraService.getValues(_this._parametros).then(function (json) {
                            return _this.dispatchEvent(new CustomEvent(events.success, { bubbles: false, scoped: false, detail: { json: json } }));
                        });
                    });
                    return _this;
                }
                Object.defineProperty(SidraServiceElement.prototype, "parametros", {
                    set: function (parametros) {
                        if (this._parametros !== parametros) {
                            this.codigoTabela = parametros.codigoTabela || '';
                            this.categorias = parametros.categorias || '';
                            this.periodos = parametros.periodos || [];
                            this.localidades = parametros.localidades || [];
                            this.variaveis = parametros.variaveis || [];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SidraServiceElement.prototype, "codigoTabela", {
                    get: function () {
                        return this._parametros.codigoTabela;
                    },
                    set: function (codigoTabela) {
                        this.setAttribute(atributos.codigoTabela, codigoTabela);
                        this._parametros.codigoTabela = codigoTabela;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SidraServiceElement.prototype, "categorias", {
                    get: function () {
                        return this._parametros.categorias;
                    },
                    set: function (categorias) {
                        this.setAttribute(atributos.categorias, categorias);
                        this._parametros.categorias = categorias;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SidraServiceElement.prototype, "periodos", {
                    get: function () {
                        return this._parametros.periodos;
                    },
                    set: function (periodos) {
                        switch (typeof periodos) {
                            case 'string':
                                this.setAttribute(atributos.periodos, periodos);
                                this._parametros.periodos = periodos.split(',').map(function (str) { return str.trim(); });
                                break;
                            default:
                                this.setAttribute(atributos.periodos, periodos.join(','));
                                this._parametros.periodos = periodos;
                                break;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SidraServiceElement.prototype, "variaveis", {
                    get: function () {
                        return this._parametros.variaveis;
                    },
                    set: function (variaveis) {
                        switch (typeof variaveis) {
                            case 'string':
                                this.setAttribute(atributos.variaveis, variaveis);
                                this._parametros.variaveis = variaveis.split(',').map(function (str) { return str.trim(); });
                                break;
                            default:
                                this.setAttribute(atributos.variaveis, variaveis.join(','));
                                this._parametros.variaveis = variaveis;
                                break;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SidraServiceElement.prototype, "localidades", {
                    get: function () {
                        return this._parametros.localidades;
                    },
                    set: function (localidades) {
                        this._parametros.localidades = this._handleLocalidades(localidades);
                        this.setAttribute(atributos.localidades, this._parametros.localidades.join(','));
                    },
                    enumerable: true,
                    configurable: true
                });
                SidraServiceElement.prototype._handleLocalidades = function (localidades) {
                    if (Array.isArray(localidades)) {
                        return localidades;
                    }
                    if (typeof localidades === "number") {
                        return [localidades.toString(10)];
                    }
                    return normalizer.normalize(localidades);
                };
                SidraServiceElement.prototype.connectedCallback = function () {
                };
                SidraServiceElement.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
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
                };
                return SidraServiceElement;
            }(HTMLCustomElement_1.HTMLCustomElement)),
            _a.tagName = 'sidra-service',
            _a.observedAttributes = (function () {
                var attrs = Object.keys(atributos).map(function (key) { return atributos[key]; });
                return function () { return attrs; };
            })(),
            _a;
        var _a;
    })(SidraService_1.sidraService, codigosLocalidadesNormalizer);
    customElements.define(exports.SidraServiceElement.tagName, exports.SidraServiceElement);
});
//# sourceMappingURL=SidraService.element.js.map