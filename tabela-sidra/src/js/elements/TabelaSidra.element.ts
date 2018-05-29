import { HTMLCustomElement } from "./HTMLCustomElement";
import { debounce } from "../helpers/debounce";
import { SidraElement, atributosSidraElement } from "./SidraElement.abstract";
import { SidraServiceElement, events as SidraServiceEvents } from "./SidraService.element";
import { IBGETabelaElement } from './IBGETabela/IBGETabela.element';
import { ApiSidra } from "../services/SidraService";

type eixoTabela = 'periodos' | 'localidades' | 'variaveis';
type dadosInternosSidra = {
    localidades: Array<{ id: string, nome: string }>,
    variaveis: Array<{ id: string, nome: string }>,
    periodos: Array<{ id: string, nome: string }>,
    valores: Array<{ localidade: string, periodo: string, variavel: string, valor: string }>
}

export class TabelaSidraElement extends SidraElement {
    static tagName = 'tabela-sidra';

    private _shadowRoot: ShadowRoot;
    private _sidraServiceElement: SidraServiceElement;
    private _ibgeTabelaElement: IBGETabelaElement;
    private _dados: dadosInternosSidra = { localidades: [], variaveis: [], periodos: [], valores: [] }

    set dados(dados: dadosInternosSidra) {
        this._dados = dados;
        this.updateTable();
    }
    get dados() {
        return this._dados;
    }

    init() {
        this._sidraServiceElement = document.createElement('sidra-service') as SidraServiceElement;
        this._ibgeTabelaElement = document.createElement('ibge-tabela') as IBGETabelaElement;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._sidraServiceElement as Node);
        this._shadowRoot.appendChild(this._ibgeTabelaElement as Node);
    }

    connectedCallback() {
        if (this._parametros && Object.keys(this._parametros).length > 0) {
            this._sidraServiceElement.parametros = this._parametros;
        }

        this._sidraServiceElement.addEventListener(SidraServiceEvents.success, this._handleResponse, true);
    }

    disconnectedCallback() {
        this._sidraServiceElement.removeEventListener(SidraServiceEvents.success, this._handleResponse, true);
        this._sidraServiceElement.remove();
        this._sidraServiceElement = null;
        this._shadowRoot = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._updateSidraAttributes(name, oldValue, newValue)) {
            this._sidraServiceElement[name] = newValue;
        }

        switch (name) {
            case 'colunas':
            case 'linhas':
                this[name] = newValue;
        }
    }

    get colunas() {
        return this.getAttribute('colunas') as eixoTabela;
    }
    set colunas(colunas: eixoTabela) {
        if (this.colunas === colunas) { return; }
        this.setAttribute('colunas', colunas);
        this.updateTable()
    }

    get linhas() {
        return this.getAttribute('linhas') as eixoTabela;
    }
    set linhas(linhas: eixoTabela) {
        if (this.linhas === linhas) { return; }
        this.setAttribute('linhas', linhas);
        this.updateTable()
    }

    private _handleResponse(evt: CustomEvent) {
        const json: ApiSidra.Response = evt.detail.json;
        let localidades = {}, periodos = {}, variaveis = {}, valores = [];

        for (const { classificacoes, series } of json.resultados) {
            const classificacao = classificacoes[0];
            const id = Object.keys(classificacao.categoria)[0]
            const nome = classificacao.categoria[id];

            const variavel = { id, nome };
            variaveis[variavel.id] = variaveis[variavel.id] || variavel;

            series.forEach(({ localidade, serie }) => {
                localidades[localidade.id] = localidades[localidade.id] || { id: localidade.id, nome: localidade.nivel.nome + ' - ' + localidade.nome + '(' + localidade.id + ')' };

                const periodo = Object.keys(serie)[0];
                periodos[periodo] = periodos[periodo] || { id: periodo, nome: periodo };

                valores.push({
                    localidade: localidade.id,
                    periodo: periodo,
                    variavel: variavel.id,
                    valor: serie[periodo]
                });
            });
        }

        this.dados = {
            localidades: Object.keys(localidades).map(key => localidades[key]),
            periodos: Object.keys(periodos).map(key => periodos[key]),
            variaveis: Object.keys(variaveis).map(key => variaveis[key]),
            valores
        }
    }

    private _convertToTable() {
        const colunas = this.dados[this.colunas].map(coluna => ({dados: coluna.nome, titulo: coluna.nome}));

        const dados = this.dados[this.linhas].map(objLinha => {
            let obj = { [this.linhas]: objLinha.nome }
            this.dados[this.colunas].forEach(objColuna => {
                obj[objColuna.nome] = this.dados.valores.find(v => v[this.linhas] === objLinha.id && v[this.colunas] === objColuna.id).valor;
            });

            return obj;
        })

        return { colunas, dados };
    }

    private updateTable() {
        debugger;
        const { colunas, dados } = this._convertToTable();
        this._ibgeTabelaElement.colunas = colunas;
        this._ibgeTabelaElement.dados = dados;
    }
}

customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);