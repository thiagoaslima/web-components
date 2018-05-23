(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RequestService"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //@ts-check
    var RequestService_1 = require("./RequestService");
    var SidraService = /** @class */ (function () {
        function SidraService(_requestService) {
            this._requestService = _requestService;
        }
        SidraService.prototype.getValues = function (params) {
            // https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=1419&v=63&p=-1&ng=1(1)&c=315(7169,7170,7445,7486,7558,7625,7660,7712,7766,7786)
            // https://servicodados.ibge.gov.br/api/v3/agregados/1419/periodos/201804/variaveis/63?user-ibge&localidades=BR|3106200|5300108|5002704|4106902|2304400|5208707|3205309|4314902|2611606|3304557|2927408|3550308&classificacao=315[7169,7170,7445,7486,7558,7625,7660,7712,7766,7786]
            return this._requestService.getJSON(this._buildUrl(params));
        };
        SidraService.prototype._buildUrl = function (params) {
            var codigoTabela = params.codigoTabela, periodos = params.periodos, variaveis = params.variaveis;
            var queryParams = Object.keys(params).reduce(function (arr, key) { return arr.concat(key + "=" + params[key]); }, []).join('&');
            return "https://servicodados.ibge.gov.br/api/v3/agregados/" + codigoTabela + "/periodos/" + periodos.join("|") + "/variaveis/" + variaveis.join("|") + "?user-ibge" + (queryParams ? "&" + queryParams : '');
        };
        return SidraService;
    }());
    exports.SidraService = SidraService;
    exports.sidraService = new SidraService(RequestService_1.requestService);
});
//# sourceMappingURL=SidraService.js.map