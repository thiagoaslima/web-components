import { HTMLCustomElement } from "../helpers/HTMLCustomElement";
import { SidraResearch } from "./SidraResearch.model";
import { ISidraResearch } from "./SidraResearch.interface";

enum attributes {
    filter = 'filter-text'
}

export class SidraResearchElement extends HTMLCustomElement {
    static tagName = 'sidra-research';

    static template({id, name, tables}: Partial<SidraResearch>) {
        return `
            <h2 research-title research-id="${id}">${ name }</h2>
            ${
                tables.length <= 0 ? "" : `
                <ul>
                    ${ tables.map(table => `
                        <li reserach-table table-id="${table.id}">${table.name}</li>
                    `)}
                </ul>
                `
            } 
        `
    }

    static get observedAttributes() {
        return Object.keys(attributes);
    }

    private _dom = {
        shadowRoot: null as ShadowRoot
    }

    private _research = {
        raw: {} as Partial<SidraResearch>,
        public: {} as Partial<SidraResearch>,
    }

    public set research(research: Partial<SidraResearch>) {
        this._research.raw = research;
        this._research.public = {
            id: this._research.raw.id,
            name: this._research.raw.name,
            tables: this._research.raw.filterTables(this.filterText)
        }
    }

    public get research(): Partial<SidraResearch> {
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
            } catch(err) {
                console.error(`Error parsing the ${researchElement} content.`, err.message)
            }
        }
    }
}

