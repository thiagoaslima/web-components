import { HTMLCustomElement } from "../helpers/HTMLCustomElement";
var attributes;
(function (attributes) {
    attributes["item"] = "item";
    attributes["filter"] = "filter-text";
})(attributes || (attributes = {}));
export class SidraResearchElement extends HTMLCustomElement {
    constructor() {
        super(...arguments);
        this._dom = {
            shadowRoot: null
        };
        this._research = {
            raw: {},
            public: {},
        };
    }
    static template({ id, name, tables }) {
        return `
            <h2 research-title research-id="${id}">${name}</h2>
            ${tables.length <= 0 ? "" : `
                <ul>
                    ${tables.map(table => `
                        <li reserach-table table-id="${table.id}">${table.name}</li>
                    `)}
                </ul>
                `} 
        `;
    }
    static get observedAttributes() {
        return Object.keys(attributes);
    }
    set research(research) {
        this._research.raw = research;
        this._research.public = {
            id: this._research.raw.id,
            name: this._research.raw.name,
            tables: this._research.raw.filterTables(this.filterText)
        };
    }
    get research() {
        return this._research.public;
    }
    get filterText() {
        return this.getAttribute(attributes.filter);
    }
    init() {
        this._dom.shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
    }
    render() {
        this._dom.shadowRoot.innerHTML = SidraResearchElement.template(this.research);
    }
    connectedCallback() {
        const researchElement = this.querySelector('research');
        let research;
        if (researchElement) {
            try {
                research = JSON.parse(researchElement.innerHTML);
                this.research = research;
                researchElement.parentElement.removeChild(researchElement);
            }
            catch (err) {
                console.error(`Error parsing the ${researchElement} content.`, err.message);
            }
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'item':
                try {
                    this.research = JSON.parse(this.getAttribute(attributes.item));
                }
                catch (err) {
                    console.error('Erro no parsing do JSON.', err.message);
                }
                break;
        }
    }
}
SidraResearchElement.tagName = 'sidra-research';
//# sourceMappingURL=SidraResearch.element.js.map