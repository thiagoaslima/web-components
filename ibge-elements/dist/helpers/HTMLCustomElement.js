// DO NOT REMOVE THIS CLASS
// Typescript do not compile WebComponents correctly
// This hack minimizes the errors
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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HTMLCustomElement = /** @class */ (function (_super) {
        __extends(HTMLCustomElement, _super);
        //@ts-ignore
        function HTMLCustomElement(_) {
            var _this = this;
            return (_ = _this = _super.call(this, _) || this).init(), _;
        }
        HTMLCustomElement.prototype.init = function () { };
        return HTMLCustomElement;
    }(HTMLElement));
    exports.HTMLCustomElement = HTMLCustomElement;
});
//# sourceMappingURL=HTMLCustomElement.js.map