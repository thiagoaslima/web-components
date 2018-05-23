(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SidraResearch.element", "./SidraResearch.model"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SidraResearch_element_1 = require("./SidraResearch.element");
    exports.SidraResearchElement = SidraResearch_element_1.SidraResearchElement;
    var SidraResearch_model_1 = require("./SidraResearch.model");
    exports.SidraResearch = SidraResearch_model_1.SidraResearch;
    customElements.define(SidraResearch_element_1.SidraResearchElement.tagName, SidraResearch_element_1.SidraResearchElement);
});
//# sourceMappingURL=index.js.map