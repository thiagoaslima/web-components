import { HTMLCustomElement } from "./HTMLCustomElement";
import { removeSubstring } from "../helpers/removeSubstring";
export var atributosSidraElement;
(function (atributosSidraElement) {
    atributosSidraElement["tabela"] = "tabela";
    atributosSidraElement["categorias"] = "categorias";
    atributosSidraElement["localidades"] = "localidades";
    atributosSidraElement["periodos"] = "periodos";
    atributosSidraElement["variaveis"] = "variaveis";
})(atributosSidraElement || (atributosSidraElement = {}));
;
const attrs = Object.keys(atributosSidraElement).map(key => atributosSidraElement[key]);
export class SidraElement extends HTMLCustomElement {
    constructor() {
        super(...arguments);
        this._parametros = {
            tabela: '',
            categorias: '',
            localidades: [],
            periodos: [],
            variaveis: []
        };
    }
    static get observedAttributes() {
        return attrs;
    }
    get tabela() {
        return this._parametros.tabela;
    }
    set tabela(codigoTabela) {
        this.setAttribute(atributosSidraElement.tabela, codigoTabela);
        this._parametros.tabela = codigoTabela;
    }
    get categorias() {
        return this._parametros.categorias;
    }
    set categorias(categorias) {
        this.setAttribute(atributosSidraElement.categorias, categorias);
        this._parametros.categorias = categorias;
    }
    get periodos() {
        return this._parametros.periodos;
    }
    set periodos(periodos) {
        switch (typeof periodos) {
            case 'string':
                this.setAttribute(atributosSidraElement.periodos, periodos);
                this._parametros.periodos = periodos.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributosSidraElement.periodos, periodos.join(','));
                this._parametros.periodos = periodos;
                break;
        }
    }
    get variaveis() {
        return this._parametros.variaveis;
    }
    set variaveis(variaveis) {
        switch (typeof variaveis) {
            case 'string':
                this.setAttribute(atributosSidraElement.variaveis, variaveis);
                this._parametros.variaveis = variaveis.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributosSidraElement.variaveis, variaveis.join(','));
                this._parametros.variaveis = variaveis;
                break;
        }
    }
    get localidades() {
        return this._parametros.localidades;
    }
    set localidades(localidades) {
        const _localidades = this._handleLocalidades(localidades);
        if (this._parametros.localidades.join(',') !== _localidades.join(',')) {
            this._parametros.localidades = _localidades;
            this.setAttribute(atributosSidraElement.localidades, this._parametros.localidades.join(','));
        }
    }
    _handleLocalidades(localidades) {
        if (Array.isArray(localidades)) {
            return localidades;
        }
        if (typeof localidades === "number") {
            return [localidades.toString(10)];
        }
        return SidraElement.localidadesNormalizer.normalize(localidades);
    }
    _updateSidraAttributes(name, oldValue, newValue) {
        let updated = false;
        if (attrs.includes(name) && oldValue !== newValue) {
            this[name] = newValue;
            updated = true;
        }
        return updated;
    }
}
SidraElement.localidadesNormalizer = {
    regex: {
        ns: /N[0-9]{1,4}\[[BR0-9,\s]*\]/,
        n: /N[0-9]{1,4}/
    },
    normalize(localidades) {
        const self = SidraElement.localidadesNormalizer;
        let codigos = self.separateCodigos(localidades);
        let { n, ns, numericos } = self.tratarTexto(self.checarRedundancia(codigos));
        return n.concat(ns, numericos).filter(Boolean);
    },
    separateCodigos(codigos) {
        const self = SidraElement.localidadesNormalizer;
        // tratar uma lista de localidades
        let ns = [];
        let n = [];
        let numericos = [];
        // extrai os casos especiais que utilizem os identificadores N<number>[<codigo>]
        let match;
        let regex = self.regex.ns;
        while ((match = regex.exec(codigos)) !== null) {
            ns.push(match[0]);
            codigos = removeSubstring(match.index, match[0].length, codigos);
        }
        // extrai os casos de uso de N<number> genérico
        regex = self.regex.n;
        match;
        while ((match = regex.exec(codigos)) !== null) {
            n.push(match[0]);
            codigos = removeSubstring(match.index, match[0].length, codigos);
        }
        // sobram os casos de uso do codigo numerico direto
        numericos = codigos.split(',').filter(Boolean).map(cod => cod.trim());
        return {
            ns,
            n,
            numericos
        };
    },
    checarRedundancia({ n, ns, numericos }) {
        const self = SidraElement.localidadesNormalizer;
        let obj = n.reduce((o, cod) => {
            o[cod] = true;
            return o;
        }, {});
        ns = ns.filter(str => {
            str = str.trim();
            let regex = self.regex.n;
            let match = regex.exec(str);
            return !obj[match[0]];
        });
        return {
            n, ns, numericos
        };
    },
    tratarTexto({ n, ns, numericos }) {
        let obj = {};
        ns.forEach(str => {
            str = str.trim();
            let [nivel, codigos] = str.split('[');
            let array = codigos.replace(']', '').split(',').filter(Boolean).map(str => str.trim());
            obj[nivel.trim()] = obj[nivel.trim()] || new Set();
            obj[nivel.trim()].add(array);
        });
        ns = Object.keys(obj).map(key => `${key.toUpperCase()}[${[...obj[key]]}]`);
        return {
            n, ns, numericos
        };
    }
};
//# sourceMappingURL=SidraElement.abstract.js.map