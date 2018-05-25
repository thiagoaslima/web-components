import { HTMLCustomElement } from "./HTMLCustomElement";
import { debounce } from "../helpers/debounce";
import { SidraElement, atributosSidraElement } from "./SidraElement.abstract";
import { SidraServiceElement, events as SidraServiceEvents } from "./SidraService.element";
import { IBGETabelaElement } from './IBGETabela/IBGETabela.element';

type eixoTabela = 'periodos' | 'localidades' | 'variaveis';

export class TabelaSidraElement extends SidraElement {
    static tagName = 'tabela-sidra';

    private _shadowRoot: ShadowRoot;
    private _sidraServiceElement: SidraServiceElement;
    private _ibgeTabelaElement: IBGETabelaElement;

    init() {
        this._sidraServiceElement = document.createElement('sidra-service') as SidraServiceElement;
        this._ibgeTabelaElement = document.createElement('ibge-tabela') as IBGETabelaElement;
        this._ibgeTabelaElement.fonteDados = 'sidra';
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._sidraServiceElement as Node);
        this._shadowRoot.appendChild(this._ibgeTabelaElement as Node);
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

       switch(name) {
           case 'colunas':
           case 'linhas':
                this[name] = newValue;
       }
    }

    get colunas() {
        return this.getAttribute('colunas') as eixoTabela;
    }
    set colunas(colunas: eixoTabela) {
        if (this.colunas === colunas) { return; }
        this.setAttribute('colunas', colunas);
    }

    get linhas() {
        return this.getAttribute('linhas') as eixoTabela;
    }
    set linhas(linhas: eixoTabela) {
        if (this.linhas === linhas) { return; }
        this.setAttribute('linhas', linhas);
    }

    private _handleResponse(json) {
       this._ibgeTabelaElement.dados = json;
    }

}

customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);