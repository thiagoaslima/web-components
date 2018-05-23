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
        define(["require", "exports", "./HTMLCustomElement"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLCustomElement_1 = require("./HTMLCustomElement");
    // @ts-check
    var attributes;
    (function (attributes) {
        attributes["localidades"] = "localidades";
        attributes["codigo"] = "codigo";
        attributes["categorias"] = "categorias";
        attributes["variavel"] = "variavel";
    })(attributes || (attributes = {}));
    ;
    var TabelaSidraElement = /** @class */ (function (_super) {
        __extends(TabelaSidraElement, _super);
        function TabelaSidraElement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TabelaSidraElement, "observedAttributes", {
            get: function () {
                return Object.keys(attributes).map(function (key) { return attributes[key]; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabelaSidraElement.prototype, "codigo", {
            get: function () {
                return this.getAttribute('codigo');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabelaSidraElement.prototype, "categorias", {
            get: function () {
                return this.getAttribute('categorias');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabelaSidraElement.prototype, "localidades", {
            get: function () {
                return this.getAttribute('localidades');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabelaSidraElement.prototype, "variavel", {
            get: function () {
                return this.getAttribute('variavel');
            },
            enumerable: true,
            configurable: true
        });
        TabelaSidraElement.prototype.init = function () {
            console.log('init');
            debugger;
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(document.createElement('sidra-service'));
        };
        TabelaSidraElement.prototype.connectedCallback = function () {
        };
        TabelaSidraElement.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
            if (oldValue === newValue) {
                return;
            }
            switch (name) {
                case 'categorias':
                case 'codigo':
                case 'localidades':
                case 'variavel':
                    this[name] = newValue;
                    var params = this._prepareParams();
                    break;
            }
        };
        TabelaSidraElement.prototype._prepareParams = function () {
            return {
                codigo: this.codigo,
                categorias: this.categorias,
                localidades: this.localidades.split(',').map(function (str) { return str.trim(); }).join('|'),
                variavel: this.variavel
            };
        };
        TabelaSidraElement.tagName = 'tabela-sidra';
        return TabelaSidraElement;
    }(HTMLCustomElement_1.HTMLCustomElement));
    exports.TabelaSidraElement = TabelaSidraElement;
    console.log('define', TabelaSidraElement.tagName);
    customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);
});
//# sourceMappingURL=TabelaSidra.element.js.map