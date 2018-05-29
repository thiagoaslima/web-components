import { HTMLCustomElement } from "../HTMLCustomElement";

enum atributos {
    alias = 'alias',
    dados = 'dados'
}

export class IBGETabelaColumnElement extends HTMLCustomElement {
    static tagName = 'ibge-tabela-column';

    get titulo() {
        return this.alias || this.dados;
    }

    get alias() {
        return this.getAttribute(atributos.alias);
    }
    set alias(value: string) {
        this.setAttribute(atributos.alias, value);
    }

    get dados() {
        return this.getAttribute(atributos.dados);
    }
    set dados(path: string) {
        this.setAttribute(atributos.dados, path);
    }
    
    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {

    }
}
