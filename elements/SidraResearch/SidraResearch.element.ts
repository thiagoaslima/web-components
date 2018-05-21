import { HTMLCustomElement } from "../helpers/HTMLCustomElement";
import { SidraResearch } from "./SidraResearch.model";
import { ISidraResearch } from "./SidraResearch.interface";

enum attributes {
    item = 'item',
    filter = 'filter-text'
}

export class SidraResearchElement extends HTMLCustomElement {
    static tagName = 'sidra-research';

    static template({ id, name, tables }: SidraResearch) {
        return `
            <h2 research-title research-id="${id}">${name}</h2>
            ${
            tables.length <= 0 ? "" : `
                <ul>
                    ${ tables.map(table => `
                        <li reserach-table table-id="${table.id}">${table.name}</li>
                    `)}
                </ul>
                `
            } 
        `;
    }

    static get observedAttributes() {
        return Object.keys(attributes);
    }

    private _dom = {
        shadowRoot: null as ShadowRoot
    }

    private _research = {
        raw: {} as SidraResearch,
        public: {} as SidraResearch,
    }

    public set research(research: SidraResearch) {
        this._research.raw = research;
        this._research.public = {
            id: this._research.raw.id,
            name: this._research.raw.name,
            tables: this._research.raw.filterTables(this.filterText)
        } as SidraResearch
    }

    public get research(): SidraResearch {
        return this._research.public;
    }

    public get filterText() {
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

        let research: SidraResearch;
        if (researchElement) {
            try {
                research = JSON.parse(researchElement.innerHTML);
                this.research = research;
                researchElement.parentElement.removeChild(researchElement);
            } catch (err) {
                console.error(`Error parsing the ${researchElement} content.`, err.message)
            }
        }
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case 'item':
                try {
                    this.research = JSON.parse(this.getAttribute(attributes.item));
                } catch(err) {
                    console.error('Erro no parsing do JSON.', err.message);
                }
                break;
            
        }
    }
}

