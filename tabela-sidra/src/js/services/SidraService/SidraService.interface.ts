export module ApiSidra {

    export type Parameters = {
        categorias: string
        tabela: string,
        localidades: Array<string | number>,
        periodos: string[],
        variaveis: string[],
    }

    export type Response = {
        id: string,
        variavel: string,
        unidade: string,
        resultados: Array<{
            classificacoes: Array<Classificacao>,
            series: Array<{
                localidade: Localidade,
                serie: { [periodo: string]: string }
            }>
        }>
    }

    export type Localidade = {
        id: string,
        nome: string,
        nivel: { id: string, nome: string }
    }

    export type Classificacao = {
        id: string,
        nome: string,
        categoria: { [id: string]: string }
    }

    export type Periodo = {
        alias: string,
        nome: string
    }
}
