//@ts-check

const atributos = {
    'parametros': 'parametros'
};

const events = {
    success: 'onSucess',
    fail: 'onError'
};

class SidraServiceElement extends HTMLElement {
    static tagName = 'sidra-service';

    static observedAttributes() {
        return [atributos.parametros];
    }

    get parametros() {
        try {
            return JSON.parse(this.getAttribute(atributos.parametros));
        } catch (err) {
            this.dispatchEvent(new CustomEvent(events.success, {  bubbles: false, cancelable: false, detail: { error: err } }))
        }
    }
    set parametros(parametros) {
        if (this.parametros.toString() !== parametros) {
            this.setAttribute(atributos.parametros, parametros);
        }
    }

    connectedCallback() {
        
    }

}

customElements.define(SidraServiceElement.tagName, SidraServiceElement);