import { HTMLCustomElement } from '../HTMLCustomElement';
import { IBGETabelaColumnElement } from './IBGETabelaColumn.element';
import { getPropertyValue } from '../../helpers/getPropertyValue';

enum atributos {
    linhasHeader = 'linhas-cabecalho',
    order = "ordenar-por",
    perPage = 'itens-por-pagina'
}

export class IBGETabelaElement extends HTMLCustomElement {
    static tagName = 'ibge-tabela';

    protected _dadosTabela: any = [];
    set dados(dados: any) {
        if (dados === this._dadosTabela) { return; }
        this._dadosTabela = dados;
        this.render();
    }
    get dados() {
        return this._dadosTabela.slice();
    }

    public colunas: { dados: string, titulo: string }[] = [];

    connectedCallback() {
        this.colunas = Array.from(this.querySelectorAll<IBGETabelaColumnElement>('ibge-tabela-column')).map(el => ({
            dados: el.dados,
            titulo: el.titulo
        }));
        this.render();
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal) { return; }
    }

    render() {
        this.innerHTML = this.template();
    }

    protected template() {
        return `<table>
            <thead>
            ${
            this.colunas.map(coluna => `<th>${coluna.titulo}</th>`).join('')
            }
            </thead>
            <tbody>
            ${
            this.dados.map(obj => `<tr>${
                this.colunas.map(coluna => `<td>${getPropertyValue(obj, coluna.dados)}</td>`).join('')
                }</tr>`).join("")
            }
            </tbody>
        </table>`
    }
}

customElements.define(IBGETabelaColumnElement.tagName, IBGETabelaColumnElement);
customElements.define(IBGETabelaElement.tagName, IBGETabelaElement);
