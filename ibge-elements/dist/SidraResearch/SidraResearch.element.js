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
        define(["require", "exports", "../helpers/HTMLCustomElement"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLCustomElement_1 = require("../helpers/HTMLCustomElement");
    var attributes;
    (function (attributes) {
        attributes["item"] = "item";
        attributes["filter"] = "filter-text";
    })(attributes || (attributes = {}));
    var SidraResearchElement = /** @class */ (function (_super) {
        __extends(SidraResearchElement, _super);
        function SidraResearchElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dom = {
                shadowRoot: null
            };
            _this._research = {
                raw: {},
                public: {},
            };
            return _this;
        }
        SidraResearchElement.template = function (_a) {
            var id = _a.id, name = _a.name, tables = _a.tables;
            return "\n            <h2 research-title research-id=\"" + id + "\">" + name + "</h2>\n            " + (tables.length <= 0 ? "" : "\n                <ul>\n                    " + tables.map(function (table) { return "\n                        <li reserach-table table-id=\"" + table.id + "\">" + table.name + "</li>\n                    "; }) + "\n                </ul>\n                ") + " \n        ";
        };
        Object.defineProperty(SidraResearchElement, "observedAttributes", {
            get: function () {
                return Object.keys(attributes);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidraResearchElement.prototype, "research", {
            get: function () {
                return this._research.public;
            },
            set: function (research) {
                this._research.raw = research;
                this._research.public = {
                    id: this._research.raw.id,
                    name: this._research.raw.name,
                    tables: this._research.raw.filterTables(this.filterText)
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidraResearchElement.prototype, "filterText", {
            get: function () {
                return this.getAttribute(attributes.filter);
            },
            enumerable: true,
            configurable: true
        });
        SidraResearchElement.prototype.init = function () {
            this._dom.shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
        };
        SidraResearchElement.prototype.render = function () {
            this._dom.shadowRoot.innerHTML = SidraResearchElement.template(this.research);
        };
        SidraResearchElement.prototype.connectedCallback = function () {
            var researchElement = this.querySelector('research');
            var research;
            if (researchElement) {
                try {
                    research = JSON.parse(researchElement.innerHTML);
                    this.research = research;
                    researchElement.parentElement.removeChild(researchElement);
                }
                catch (err) {
                    console.error("Error parsing the " + researchElement + " content.", err.message);
                }
            }
        };
        SidraResearchElement.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
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
        };
        SidraResearchElement.tagName = 'sidra-research';
        return SidraResearchElement;
    }(HTMLCustomElement_1.HTMLCustomElement));
    exports.SidraResearchElement = SidraResearchElement;
});
//# sourceMappingURL=SidraResearch.element.js.map