import { SidraElement } from "./SidraElement.abstract";
import { events as SidraServiceEvents } from "./SidraService.element";
export class TabelaSidraElement extends SidraElement {
    init() {
        this._sidraServiceElement = document.createElement('sidra-service');
        this._ibgeTabelaElement = document.createElement('ibge-tabela');
        this._ibgeTabelaElement.fonteDados = 'sidra';
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._sidraServiceElement);
        this._shadowRoot.appendChild(this._ibgeTabelaElement);
    }
    connectedCallback() {
        if (this._parametros && Object.keys(this._parametros).length > 0) {
            this._sidraServiceElement.parametros = this._parametros;
        }
        this._ibgeTabelaElement.colunas = this.colunas;
        this._ibgeTabelaElement.linhas = this.linhas;
        this._sidraServiceElement.addEventListener(SidraServiceEvents.success, this._handleResponse, true);
    }
    disconnectedCallback() {
        this._sidraServiceElement.removeEventListener(SidraServiceEvents.success, this._handleResponse, true);
        this._sidraServiceElement.remove();
        this._sidraServiceElement = null;
        this._shadowRoot = null;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (this._updateSidraAttributes(name, oldValue, newValue)) {
            this._sidraServiceElement[name] = newValue;
        }
        switch (name) {
            case 'colunas':
            case 'linhas':
                this[name] = newValue;
        }
    }
    get colunas() {
        return this.getAttribute('colunas');
    }
    set colunas(colunas) {
        if (this.colunas === colunas) {
            return;
        }
        this.setAttribute('colunas', colunas);
    }
    get linhas() {
        return this.getAttribute('linhas');
    }
    set linhas(linhas) {
        if (this.linhas === linhas) {
            return;
        }
        this.setAttribute('linhas', linhas);
    }
    _handleResponse(json) {
        this._ibgeTabelaElement.dados = json;
    }
}
TabelaSidraElement.tagName = 'tabela-sidra';
customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);
//# sourceMappingURL=TabelaSidra.element.js.map