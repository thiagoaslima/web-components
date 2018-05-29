import { SidraElement } from "./SidraElement.abstract";
import { events as SidraServiceEvents } from "./SidraService.element";
export class TabelaSidraElement extends SidraElement {
    constructor() {
        super(...arguments);
        this._dados = { localidades: [], variaveis: [], periodos: [], valores: [] };
    }
    set dados(dados) {
        this._dados = dados;
        this.updateTable();
    }
    get dados() {
        return this._dados;
    }
    init() {
        this._sidraServiceElement = document.createElement('sidra-service');
        this._ibgeTabelaElement = document.createElement('ibge-tabela');
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._sidraServiceElement);
        this._shadowRoot.appendChild(this._ibgeTabelaElement);
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
        return this.getAttribute('colunas');
    }
    set colunas(colunas) {
        if (this.colunas === colunas) {
            return;
        }
        this.setAttribute('colunas', colunas);
        this.updateTable();
    }
    get linhas() {
        return this.getAttribute('linhas');
    }
    set linhas(linhas) {
        if (this.linhas === linhas) {
            return;
        }
        this.setAttribute('linhas', linhas);
        this.updateTable();
    }
    _handleResponse(evt) {
        const json = evt.detail.json;
        let localidades = {}, periodos = {}, variaveis = {}, valores = [];
        for (const { classificacoes, series } of json.resultados) {
            const classificacao = classificacoes[0];
            const id = Object.keys(classificacao.categoria)[0];
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
        };
    }
    _convertToTable() {
        const colunas = this.dados[this.colunas].map(coluna => ({ dados: coluna.nome, titulo: coluna.nome }));
        const dados = this.dados[this.linhas].map(objLinha => {
            let obj = { [this.linhas]: objLinha.nome };
            this.dados[this.colunas].forEach(objColuna => {
                obj[objColuna.nome] = this.dados.valores.find(v => v[this.linhas] === objLinha.id && v[this.colunas] === objColuna.id).valor;
            });
            return obj;
        });
        return { colunas, dados };
    }
    updateTable() {
        debugger;
        const { colunas, dados } = this._convertToTable();
        this._ibgeTabelaElement.colunas = colunas;
        this._ibgeTabelaElement.dados = dados;
    }
}
TabelaSidraElement.tagName = 'tabela-sidra';
customElements.define(TabelaSidraElement.tagName, TabelaSidraElement);
//# sourceMappingURL=TabelaSidra.element.js.map