import { HTMLCustomElement } from '../HTMLCustomElement';
import { IBGETabelaColumnElement } from './IBGETabelaColumn.element';
import { getPropertyValue } from '../../helpers/getPropertyValue';
var atributos;
(function (atributos) {
    atributos["linhasHeader"] = "linhas-cabecalho";
    atributos["order"] = "ordenar-por";
    atributos["perPage"] = "itens-por-pagina";
})(atributos || (atributos = {}));
export class IBGETabelaElement extends HTMLCustomElement {
    constructor() {
        super(...arguments);
        this._dadosTabela = [];
        this.colunas = [];
    }
    set dados(dados) {
        if (dados === this._dadosTabela) {
            return;
        }
        this._dadosTabela = dados;
        this.render();
    }
    get dados() {
        return this._dadosTabela.slice();
    }
    connectedCallback() {
        this.colunas = Array.from(this.querySelectorAll('ibge-tabela-column')).map(el => ({
            dados: el.dados,
            titulo: el.titulo
        }));
        this.render();
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal) {
            return;
        }
    }
    render() {
        this.innerHTML = this.template();
    }
    template() {
        return `<table>
            <thead>
            ${this.colunas.map(coluna => `<th>${coluna.titulo}</th>`).join('')}
            </thead>
            <tbody>
            ${this.dados.map(obj => `<tr>${this.colunas.map(coluna => `<td>${getPropertyValue(obj, coluna.dados)}</td>`).join('')}</tr>`).join("")}
            </tbody>
        </table>`;
    }
}
IBGETabelaElement.tagName = 'ibge-tabela';
customElements.define(IBGETabelaColumnElement.tagName, IBGETabelaColumnElement);
customElements.define(IBGETabelaElement.tagName, IBGETabelaElement);
//# sourceMappingURL=IBGETabela.element.js.map