import { HTMLCustomElement } from "../helpers/HTMLCustomElement";
import { SidraResearch } from "./SidraResearch.model";
export declare class SidraResearchElement extends HTMLCustomElement {
    static tagName: string;
    static template({id, name, tables}: SidraResearch): string;
    static readonly observedAttributes: string[];
    private _dom;
    private _research;
    research: SidraResearch;
    readonly filterText: string;
    init(): void;
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}
