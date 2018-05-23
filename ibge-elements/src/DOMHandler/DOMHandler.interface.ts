module DOMHandler {

    export interface Node {
        tagName: string;
        properties: { [name: string]: any };
        attributes: { [name: string]: string };
        children: Array<Node | TextNode >
    }

    export interface TextNode {
        value: string
    }
    
}