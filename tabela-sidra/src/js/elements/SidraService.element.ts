import { HTMLCustomElement } from "./HTMLCustomElement";
import { sidraService, SidraService, SidraTableParams } from "../services/SidraService";
import { removeSubstring } from "../helpers/removeSubstring";
import { debounce } from "../helpers/debounce";

enum atributos {
    codigoTabela = 'codigo-tabela',
    categorias = 'categorias',
    localidades = 'localidades',
    periodos = 'periodos',
    variaveis = 'variaveis'
};

enum events {
    success = 'onSucess',
    error = 'onError'
};

const codigosLocalidadesNormalizer = {
    regex: {
        ns: /N[0-9]{1,4}\[[BR0-9,\s]*\]/,
        n: /N[0-9]{1,4}/
    },
    normalize(localidades: string) {
        const self = codigosLocalidadesNormalizer;
        let codigos = self.separateCodigos(localidades);
        let {n, ns, numericos} = self.tratarTexto(self.checarRedundancia(codigos));
        return n.concat(ns, numericos);
    },
    separateCodigos(codigos: string) {
        // tratar uma lista de localidades
        let ns = [];
        let n = [];
        let numericos = [];

        // extrai os casos especiais que utilizem os identificadores N<number>[<codigo>]
        let match;
        let regex = this._codigosLocalidadesNormalizer.regex.ns;
        while ((match = regex.exec(codigos)) !== null) {
            ns.push(match[0])
            codigos = removeSubstring(match.index, match[0].length, codigos);
        }

        // extrai os casos de uso de N<number> genérico
        regex = this._codigosLocalidadesNormalizer.regex.n;
        match;
        while ((match = regex.exec(codigos)) !== null) {
            n.push(match[0])
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
    checarRedundancia({n, ns, numericos}: {n: string[], ns: string[], numericos: string[]}) {
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
        }
    },

    tratarTexto({n, ns, numericos}: {n: string[], ns: string[], numericos: string[]}) {
        let obj = {};
        
        ns.forEach(str => {
            str = str.trim();
            let [nivel, codigos] = str.split('[');
            let array = codigos.replace(']', '').split(',').filter(Boolean).map(str => str.trim());
            obj[nivel.trim()] = obj[nivel.trim()] || new Set<string>();
            obj[nivel.trim()].add(array);
        });

        ns = Object.keys(obj).map(key => `${key.toUpperCase()}[${[...obj[key]]}]`);

        return {
            n, ns, numericos
        };
    }
};

export const SidraServiceElement = ((sidraService: SidraService, normalizer) => {

    return class SidraServiceElement extends HTMLCustomElement {
        static tagName = 'sidra-service';

        static observedAttributes = (() => {
            const attrs: string[] = Object.keys(atributos).map(key => atributos[key]);
            return () => attrs;
        })();

        private _parametros: SidraTableParams = {
            codigoTabela: '',
            categorias: '',
            localidades: [],
            periodos: [],
            variaveis: []
        };

        set parametros(parametros: Partial<SidraTableParams>) {
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
        set codigoTabela(codigoTabela: string) {
            this.setAttribute(atributos.codigoTabela, codigoTabela);
            this._parametros.codigoTabela = codigoTabela;
        }

        get categorias() {
            return this._parametros.categorias;
        }
        set categorias(categorias: string) {
            this.setAttribute(atributos.categorias, categorias);
            this._parametros.categorias = categorias;
        }

        get periodos() {
            return this._parametros.periodos;
        }
        set periodos(periodos: string | string[]) {
            switch (typeof periodos) {
                case 'string':
                    this.setAttribute(atributos.periodos, <string>periodos);
                    this._parametros.periodos = (<string>periodos).split(',').map(str => str.trim());
                    break;

                default:
                    this.setAttribute(atributos.periodos, (<string[]>periodos).join(','));
                    this._parametros.periodos = (<string[]>periodos);
                    break;
            }
        }

        get variaveis() {
            return this._parametros.variaveis;
        }
        set variaveis(variaveis: string | string[]) {
            switch (typeof variaveis) {
                case 'string':
                    this.setAttribute(atributos.variaveis, <string>variaveis);
                    this._parametros.variaveis = (<string>variaveis).split(',').map(str => str.trim());
                    break;

                default:
                    this.setAttribute(atributos.variaveis, (<string[]>variaveis).join(','));
                    this._parametros.variaveis = (<string[]>variaveis);
                    break;
            }
        }

        get localidades() {
            return this._parametros.localidades;
        }
        set localidades(localidades: string | number | Array<number | string>) {
            this._parametros.localidades = this._handleLocalidades(localidades);
            this.setAttribute(atributos.localidades, this._parametros.localidades.join(','));
        }

        private _handleLocalidades(localidades: string | number | Array<number | string>) {
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
            if (oldValue === newValue) { return; }
            
            switch(name) {
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

        private _request = debounce(() => {
            sidraService.getValues(this._parametros).then(json => {
                return this.dispatchEvent(new CustomEvent(events.success, {bubbles: false, scoped: false, detail: { json}}))
            });
        })

    }
})(sidraService, codigosLocalidadesNormalizer);


customElements.define(SidraServiceElement.tagName, SidraServiceElement);