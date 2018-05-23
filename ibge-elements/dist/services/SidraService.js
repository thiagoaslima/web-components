(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RequestService", "../SidraResearch/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RequestService_1 = require("./RequestService");
    var index_1 = require("../SidraResearch/index");
    var SidraService = /** @class */ (function () {
        function SidraService(_requestService) {
            this._requestService = _requestService;
            this._baseUrl = "https://servicodados.ibge.gov.br/api/v3/agregados";
        }
        SidraService.prototype.getListPesquisas = function () {
            return this._requestService.getJSON(this._baseUrl)
                .then(function (response) { return response.map(function (obj) { return new index_1.SidraResearch(index_1.SidraResearch.convert(obj)); }); })
                .catch(function (err) {
                err.message = "Não foi possível acessar a lista de pesquisas do Sidra.\nErro original:\n" + err.message;
                throw err;
            });
        };
        return SidraService;
    }());
    exports.SidraService = SidraService;
    exports.sidraService = new SidraService(RequestService_1.requestService);
});
//# sourceMappingURL=SidraService.js.map