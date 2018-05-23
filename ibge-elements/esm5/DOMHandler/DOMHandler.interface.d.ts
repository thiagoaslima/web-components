declare module DOMHandler {
    interface Node {
        tagName: string;
        properties: {
            [name: string]: any;
        };
        attributes: {
            [name: string]: string;
        };
        children: Array<Node | TextNode>;
    }
    interface TextNode {
        value: string;
    }
}
