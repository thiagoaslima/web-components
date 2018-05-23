export declare module ISidraResearch {
    interface Research {
        id: string;
        name: string;
        alias: string;
        tables: ISidraResearch.Table[];
        filterTables(str: string): ISidraResearch.Table[];
        getTable(id: number): ISidraResearch.Table;
    }
    interface Table {
        id: number;
        name: string;
        alias: string;
    }
}
