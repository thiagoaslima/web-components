export namespace IBGETabela {

    export type Dados = {
        localidades: Array<{
            id: string,
            nome: string,
            nivel: {
                id: string,
                nome: string
            }
        }>,
        periodos: string[],
        categorias: Array<{ 
            id: string, 
            nome: string 
        }>,
        valores: {
            [key: string]: {
                valor: string,
                localidade: string,
                periodo: string,
                categoria: string,
                unidade: string
            }
        }
    }

}
