import { HTMLCustomElement } from "./HTMLCustomElement";
import { sidraService } from "../services/SidraService";
import { removeSubstring } from "../helpers/removeSubstring";
import { debounce } from "../helpers/debounce";
var atributos;
(function (atributos) {
    atributos["codigoTabela"] = "codigo-tabela";
    atributos["categorias"] = "categorias";
    atributos["localidades"] = "localidades";
    atributos["periodos"] = "periodos";
    atributos["variaveis"] = "variaveis";
})(atributos || (atributos = {}));
;
var events;
(function (events) {
    events["success"] = "onSucess";
    events["error"] = "onError";
})(events || (events = {}));
;
const codigosLocalidadesNormalizer = {
    regex: {
        ns: /N[0-9]{1,4}\[[BR0-9,\s]*\]/,
        n: /N[0-9]{1,4}/
    },
    normalize(localidades) {
        const self = codigosLocalidadesNormalizer;
        let codigos = self.separateCodigos(localidades);
        let { n, ns, numericos } = self.tratarTexto(self.checarRedundancia(codigos));
        return n.concat(ns, numericos);
    },
    separateCodigos(codigos) {
        // tratar uma lista de localidades
        let ns = [];
        let n = [];
        let numericos = [];
        // extrai os casos especiais que utilizem os identificadores N<number>[<codigo>]
        let match;
        let regex = this._codigosLocalidadesNormalizer.regex.ns;
        while ((match = regex.exec(codigos)) !== null) {
            ns.push(match[0]);
            codigos = removeSubstring(match.index, match[0].length, codigos);
        }
        // extrai os casos de uso de N<number> genérico
        regex = this._codigosLocalidadesNormalizer.regex.n;
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
        let obj = n.reduce((o, cod) => {
            o[cod] = true;
            return o;
        }, {});
        ns = ns.filter(str => {
            str = str.trim();
            let regex = this._codigosLocalidadesNormalizer.regex.n;
            let match = regex.exec(str);
            return obj[match[0]];
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
const normalizer = codigosLocalidadesNormalizer;
export class SidraServiceElement extends HTMLCustomElement {
    constructor() {
        super(...arguments);
        this._parametros = {
            codigoTabela: '',
            categorias: '',
            localidades: [],
            periodos: [],
            variaveis: []
        };
        this._request = debounce(() => {
            sidraService.getValues(this._parametros).then(json => {
                return this.dispatchEvent(new CustomEvent(events.success, { bubbles: false, scoped: false, detail: { json } }));
            });
        });
    }
    set parametros(parametros) {
        if (this._parametros !== parametros) {
            this.codigoTabela = parametros.codigoTabela || '';
            this.categorias = parametros.categorias || '';
            this.periodos = parametros.periodos || [];
            this.localidades = parametros.localidades || [];
            this.variaveis = parametros.variaveis || [];
        }
    }
    get codigoTabela() {
        return this._parametros.codigoTabela;
    }
    set codigoTabela(codigoTabela) {
        this.setAttribute(atributos.codigoTabela, codigoTabela);
        this._parametros.codigoTabela = codigoTabela;
    }
    get categorias() {
        return this._parametros.categorias;
    }
    set categorias(categorias) {
        this.setAttribute(atributos.categorias, categorias);
        this._parametros.categorias = categorias;
    }
    get periodos() {
        return this._parametros.periodos;
    }
    set periodos(periodos) {
        switch (typeof periodos) {
            case 'string':
                this.setAttribute(atributos.periodos, periodos);
                this._parametros.periodos = periodos.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributos.periodos, periodos.join(','));
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
                this.setAttribute(atributos.variaveis, variaveis);
                this._parametros.variaveis = variaveis.split(',').map(str => str.trim());
                break;
            default:
                this.setAttribute(atributos.variaveis, variaveis.join(','));
                this._parametros.variaveis = variaveis;
                break;
        }
    }
    get localidades() {
        return this._parametros.localidades;
    }
    set localidades(localidades) {
        this._parametros.localidades = this._handleLocalidades(localidades);
        this.setAttribute(atributos.localidades, this._parametros.localidades.join(','));
    }
    _handleLocalidades(localidades) {
        if (Array.isArray(localidades)) {
            return localidades;
        }
        if (typeof localidades === "number") {
            return [localidades.toString(10)];
        }
        return normalizer.normalize(localidades);
    }
    connectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case atributos.categorias:
            case atributos.codigoTabela:
            case atributos.localidades:
            case atributos.periodos:
            case atributos.variaveis:
                this[name] = newValue;
                this._request();
                break;
        }
    }
}
SidraServiceElement.tagName = 'sidra-service';
SidraServiceElement.observedAttributes = (() => {
    const attrs = Object.keys(atributos).map(key => atributos[key]);
    return () => attrs;
})();
//# sourceMappingURL=SidraService.element.js.map