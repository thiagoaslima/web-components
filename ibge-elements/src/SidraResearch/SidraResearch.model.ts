import { latinize } from "../helpers/latinize";
import { ISidraResearch } from "./SidraResearch.interface";
 
export class SidraResearch implements ISidraResearch.Research {
    static convert(params: {
        id: string,
        nome: string,
        agregados: Array<{ id: string, nome: string }>
    }) {
        return {
            id: params.id,
            name: params.nome,
            alias: SidraResearch.alterName(params.nome),
            tables: params.agregados.map(({ id, nome }) => ({ id: parseInt(id, 10), name: nome, alias: SidraResearch.alterName(nome) }))
        }
    }

    static alterName(name: string) {
        return latinize(name).toLowerCase();
    }

    public readonly id: string;
    public readonly name: string;
    public readonly alias: string;
    public readonly tables: Array<{ readonly id: number, readonly name: string, readonly alias: string }>

    constructor(params: { id: string, name: string, alias: string, tables: Array<{ id: number, name: string, alias: string }> }) {
        this.id = params.id;
        this.name = params.name;
        this.alias = params.alias;
        this.tables = params.tables;

        this.tables.forEach(Object.freeze);
        Object.freeze(this);
    }

    filterTables(term: string) {
        const _term = SidraResearch.alterName(term);
        return this.tables.filter(table => table.alias.includes(_term));
    }

    getTable(id: number) {
        return this.tables.find(table => table.id === id);
    }

}