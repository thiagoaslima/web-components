import { HTMLCustomElement } from "../HTMLCustomElement";
var atributos;
(function (atributos) {
    atributos["alias"] = "alias";
    atributos["dados"] = "dados";
})(atributos || (atributos = {}));
export class IBGETabelaColumnElement extends HTMLCustomElement {
    get titulo() {
        return this.alias || this.dados;
    }
    get alias() {
        return this.getAttribute(atributos.alias);
    }
    set alias(value) {
        this.setAttribute(atributos.alias, value);
    }
    get dados() {
        return this.getAttribute(atributos.dados);
    }
    set dados(path) {
        this.setAttribute(atributos.dados, path);
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
    }
}
IBGETabelaColumnElement.tagName = 'ibge-tabela-column';
customElements.define(IBGETabelaColumnElement.tagName, IBGETabelaColumnElement);
//# sourceMappingURL=IBGETabelaColumn.element.js.map