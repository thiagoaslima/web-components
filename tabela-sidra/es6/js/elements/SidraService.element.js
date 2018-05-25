import { sidraService } from "../services/SidraService";
import { debounce } from "../helpers/debounce";
import { SidraElement } from "./SidraElement.abstract";
export var events;
(function (events) {
    events["success"] = "onSucess";
    events["error"] = "onError";
})(events || (events = {}));
;
export class SidraServiceElement extends SidraElement {
    constructor() {
        super(...arguments);
        this._request = debounce(() => {
            sidraService.getValues(this._parametros).then(json => {
                return this.dispatchEvent(new CustomEvent(events.success, { bubbles: false, scoped: false, detail: { json } }));
            });
        });
    }
    set parametros(parametros) {
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
}
SidraServiceElement.tagName = 'sidra-service';
customElements.define(SidraServiceElement.tagName, SidraServiceElement);
//# sourceMappingURL=SidraService.element.js.map