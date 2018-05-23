//@ts-check
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
    /**
     * Debounce - essa função adia a execução da função recebida. Caso a função seja invocada novamente neste intervalo, o tempo de espera é reiniciado.
     * @param {Function} fn - função a ser adiada
     * @param {number} timeout - valor, em milisegundos, que a função deve aguardar antes de ser executada
     * @returns {Function} retorna fn recebida, já com o comportamento de aguardar o tempo do timeout antes de sua execução
     */
    function debounce(fn, timeout) {
        if (timeout === void 0) { timeout = 200; }
        var timerId;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timerId)
                clearInterval(timerId);
            timerId = setTimeout(function () { return fn.apply(void 0, args); }, timeout);
        };
    }
    exports.debounce = debounce;
});
//# sourceMappingURL=debounce.js.map