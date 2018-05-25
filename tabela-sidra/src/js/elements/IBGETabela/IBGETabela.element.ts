import { HTMLCustomElement } from '../HTMLCustomElement';
import { IBGETabela } from './IBGETabela.interfaces';

enum atributos {
    fonte = 'fonte',
    colunas = 'colunas',
    linhas = 'linhas'
}

export class IBGETabelaElement extends HTMLCustomElement {
    static tagName = 'ibge-tabela';

    private _dados = {
        localidades: [],
        periodos: [],
        variaveis: [],
        valores: {}
    };

    set dados(json: any) {

    }

}

customElements.define(IBGETabelaElement.tagName, IBGETabelaElement);