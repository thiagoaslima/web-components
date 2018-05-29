import 'core-js';
import 'document-register-element';
import '../../../dist/vendors/attachShadow.js';
import { IBGETabelaElement } from '../../js/elements/IBGETabela/IBGETabela.element';
IBGETabelaElement;
const ibgeTabela = document.querySelector('ibge-tabela');
ibgeTabela.dados = [
    {
        nome: "João",
        idade: 35,
        cargo: "Analista"
    },
    {
        nome: "Pedro",
        idade: 26,
        cargo: "Analista"
    },
    {
        nome: "Gisele",
        idade: 32,
        cargo: "Gerente"
    }
];
//# sourceMappingURL=ibge-tabela.js.map