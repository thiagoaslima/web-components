// @ts-check

const attributes = {
    'localidades': 'localidades',
    'codigo': 'codigo',
    'categorias': 'categorias',
    'variavel': 'variavel'
};

class TabelaSidraElement extends HTMLElement {
    static tagName = 'tabela-sidra';

    static get observedAttributes() {
        return Object.keys(attributes).map(key => attributes[key]);
    }

    get codigo() {
        return this.getAttribute('codigo')
    }
    get categorias() {
        return this.getAttribute('categorias')
    }
    get localidades() {
        return this.getAttribute('localidades')
    }
    get variavel() {
        return this.getAttribute('variavel')
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(document.createElement('sidra-service'));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) { return; }
        switch(name) {
            case 'categorias':
            case 'codigo':
            case 'localidades':
            case 'variavel':
                this[name] = newValue;
                const params = this._prepareParams()
                break;
        }   
    }

    _prepareParams() {
        return {
            codigo: this.codigo,
            categorias: this.categorias,
            localidades: this.localidades.split(',').map(str => str.trim()).join('|'),
            variavel: this.variavel
        }
    }
}

customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);
