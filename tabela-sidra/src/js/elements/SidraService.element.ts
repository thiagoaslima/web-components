import { HTMLCustomElement } from "./HTMLCustomElement";
import { sidraService, SidraService, ApiSidra } from "../services/SidraService";
import { removeSubstring } from "../helpers/removeSubstring";
import { debounce } from "../helpers/debounce";
import { SidraElement, atributosSidraElement } from "./SidraElement.abstract";

/** WEBPACK HACK **/
/** FORCE SCRIPT INCLUSION **/
SidraElement;
/** WEBPACK HACK END **/


export enum events {
    success = 'onSucess',
    error = 'onError'
};

export class SidraServiceElement extends SidraElement {
    static tagName = 'sidra-service';

    set parametros(parametros: ApiSidra.Parameters) {
        if (this._parametros !== parametros) {
            this.tabela = parametros.tabela || '';
            this.categorias = parametros.categorias || '';
            this.periodos = parametros.periodos || [];
            this.localidades = parametros.localidades || [];
            this.variaveis = parametros.variaveis || [];
        }
    }

    get parametros() {
        return this.parametros;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._updateSidraAttributes(name, oldValue, newValue)) {
            this._request();
        }
    }

    private _request = debounce(() => {
        sidraService.getValues(this._parametros).then(json => {
            return this.dispatchEvent(new CustomEvent(events.success, { bubbles: false, scoped: false, detail: { json } }))
        });
    });

}

customElements.define(SidraServiceElement.tagName, SidraServiceElement);
