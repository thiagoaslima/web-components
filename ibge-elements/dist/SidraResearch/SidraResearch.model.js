(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../helpers/latinize"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var latinize_1 = require("../helpers/latinize");
    var SidraResearch = /** @class */ (function () {
        function SidraResearch(params) {
            this.id = params.id;
            this.name = params.name;
            this.alias = params.alias;
            this.tables = params.tables;
            this.tables.forEach(Object.freeze);
            Object.freeze(this);
        }
        SidraResearch.convert = function (params) {
            return {
                id: params.id,
                name: params.nome,
                alias: SidraResearch.alterName(params.nome),
                tables: params.agregados.map(function (_a) {
                    var id = _a.id, nome = _a.nome;
                    return ({ id: parseInt(id, 10), name: nome, alias: SidraResearch.alterName(nome) });
                })
            };
        };
        SidraResearch.alterName = function (name) {
            return latinize_1.latinize(name).toLowerCase();
        };
        SidraResearch.prototype.filterTables = function (term) {
            var _term = SidraResearch.alterName(term);
            return this.tables.filter(function (table) { return table.alias.includes(_term); });
        };
        SidraResearch.prototype.getTable = function (id) {
            return this.tables.find(function (table) { return table.id === id; });
        };
        return SidraResearch;
    }());
    exports.SidraResearch = SidraResearch;
});
//# sourceMappingURL=SidraResearch.model.js.map