import { ISidraResearch } from "./SidraResearch.interface";
export declare class SidraResearch implements ISidraResearch.Research {
    static convert(params: {
        id: string;
        nome: string;
        agregados: Array<{
            id: string;
            nome: string;
        }>;
    }): {
        id: string;
        name: string;
        alias: string;
        tables: {
            id: number;
            name: string;
            alias: string;
        }[];
    };
    static alterName(name: string): string;
    readonly id: string;
    readonly name: string;
    readonly alias: string;
    readonly tables: Array<{
        readonly id: number;
        readonly name: string;
        readonly alias: string;
    }>;
    constructor(params: {
        id: string;
        name: string;
        alias: string;
        tables: Array<{
            id: number;
            name: string;
            alias: string;
        }>;
    });
    filterTables(term: string): {
        readonly id: number;
        readonly name: string;
        readonly alias: string;
    }[];
    getTable(id: number): {
        readonly id: number;
        readonly name: string;
        readonly alias: string;
    };
}
