import { HTMLCustomElement } from "./HTMLCustomElement";
// @ts-check
var attributes;
(function (attributes) {
    attributes["localidades"] = "localidades";
    attributes["codigo"] = "codigo";
    attributes["categorias"] = "categorias";
    attributes["variavel"] = "variavel";
})(attributes || (attributes = {}));
;
export class TabelaSidraElement extends HTMLCustomElement {
    static get observedAttributes() {
        return Object.keys(attributes).map(key => attributes[key]);
    }
    get codigo() {
        return this.getAttribute('codigo');
    }
    get categorias() {
        return this.getAttribute('categorias');
    }
    get localidades() {
        return this.getAttribute('localidades');
    }
    get variavel() {
        return this.getAttribute('variavel');
    }
    init() {
        console.log('init');
        debugger;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(document.createElement('sidra-service'));
    }
    connectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case 'categorias':
            case 'codigo':
            case 'localidades':
            case 'variavel':
                this[name] = newValue;
                const params = this._prepareParams();
                break;
        }
    }
    _prepareParams() {
        return {
            codigo: this.codigo,
            categorias: this.categorias,
            localidades: this.localidades.split(',').map(str => str.trim()).join('|'),
            variavel: this.variavel
        };
    }
}
TabelaSidraElement.tagName = 'tabela-sidra';
console.log('define', TabelaSidraElement.tagName);
//# sourceMappingURL=TabelaSidra.element.js.map