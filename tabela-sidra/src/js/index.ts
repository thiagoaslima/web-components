import { HTMLCustomElement } from "./elements/HTMLCustomElement";

import { SidraServiceElement } from './elements/SidraService.element';
import { TabelaSidraElement } from './elements/TabelaSidra.element';

SidraServiceElement;
TabelaSidraElement;

class TesteElement extends HTMLCustomElement {
    get template() {
        return `<p>Hello World!</p>`;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}

customElements.define('el-teste', TesteElement);

