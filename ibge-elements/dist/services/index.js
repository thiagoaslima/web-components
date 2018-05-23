(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SidraService"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SidraService_1 = require("./SidraService");
    exports.SidraService = SidraService_1.SidraService;
    exports.sidraService = SidraService_1.sidraService;
});
//# sourceMappingURL=index.js.map