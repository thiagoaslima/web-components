import { HTMLCustomElement } from '../HTMLCustomElement';
var atributos;
(function (atributos) {
    atributos["fonte"] = "fonte";
    atributos["colunas"] = "colunas";
    atributos["linhas"] = "linhas";
})(atributos || (atributos = {}));
export class IBGETabelaElement extends HTMLCustomElement {
    constructor() {
        super(...arguments);
        this._dados = {
            localidades: [],
            periodos: [],
            variaveis: [],
            valores: {}
        };
    }
    set dados(json) {
    }
}
IBGETabelaElement.tagName = 'ibge-tabela';
customElements.define(IBGETabelaElement.tagName, IBGETabelaElement);
//# sourceMappingURL=IBGETabela.element.js.map