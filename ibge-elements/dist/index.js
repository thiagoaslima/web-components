(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./services", "./SidraResearch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var services_1 = require("./services");
    exports.SidraService = services_1.SidraService;
    exports.sidraService = services_1.sidraService;
    var SidraResearch_1 = require("./SidraResearch");
    exports.SidraResearch = SidraResearch_1.SidraResearch;
    exports.SidraResearchElement = SidraResearch_1.SidraResearchElement;
    var teste = function () { return console.log('hi'); };
    exports.teste = teste;
});
//# sourceMappingURL=index.js.map