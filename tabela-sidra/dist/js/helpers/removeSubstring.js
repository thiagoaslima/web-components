(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function removeSubstring(start, end, str) {
        return start === 0 ?
            str.substr(end) :
            str.substr(0, start) + str.substr(start + end);
    }
    exports.removeSubstring = removeSubstring;
});
//# sourceMappingURL=removeSubstring.js.map