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
    var RequestService = /** @class */ (function () {
        function RequestService() {
        }
        RequestService.prototype.get = function (url) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var self = _this;
                var request = new XMLHttpRequest();
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
        };
        RequestService.prototype.getJSON = function (url) {
            return this.get(url)
                .then(function (response) {
                try {
                    return JSON.parse(response);
                }
                catch (err) {
                    var error = new Error("Invalid JSON.\nOriginal error:" + err.message);
                    error.stack = err.stack;
                    throw error;
                }
            });
        };
        RequestService.prototype._isStatusSuccess = function (status) {
            return status >= 200 && status < 400;
        };
        return RequestService;
    }());
    exports.RequestService = RequestService;
    exports.requestService = new RequestService();
});
//# sourceMappingURL=RequestService.js.map