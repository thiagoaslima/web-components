import { latinize } from "../helpers/latinize";
export class SidraResearch {
    static convert(params) {
        return {
            id: params.id,
            name: params.nome,
            alias: SidraResearch.alterName(params.nome),
            tables: params.agregados.map(({ id, nome }) => ({ id: parseInt(id, 10), name: nome, alias: SidraResearch.alterName(nome) }))
        };
    }
    static alterName(name) {
        return latinize(name).toLowerCase();
    }
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.alias = params.alias;
        this.tables = params.tables;
        this.tables.forEach(Object.freeze);
        Object.freeze(this);
    }
    filterTables(term) {
        const _term = SidraResearch.alterName(term);
        return this.tables.filter(table => table.alias.includes(_term));
    }
    getTable(id) {
        return this.tables.find(table => table.id === id);
    }
}
//# sourceMappingURL=SidraResearch.model.js.map