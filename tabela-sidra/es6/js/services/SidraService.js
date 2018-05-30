//@ts-check
import { requestService } from "./RequestService";
import { atributosSidraElement } from "../elements/SidraElement.abstract";
export class SidraService {
    constructor(_requestService) {
        this._requestService = _requestService;
    }
    getValues(params) {
        // https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=1419&v=63&p=-1&ng=1(1)&c=315(7169,7170,7445,7486,7558,7625,7660,7712,7766,7786)
        // https://servicodados.ibge.gov.br/api/v3/agregados/1419/periodos/201804/variaveis/63?user-ibge&localidades=BR|3106200|5300108|5002704|4106902|2304400|5208707|3205309|4314902|2611606|3304557|2927408|3550308&classificacao=315[7169,7170,7445,7486,7558,7625,7660,7712,7766,7786]
        return this._requestService.getJSON(this._buildUrl(params)).then((response) => response[0]);
    }
    _buildUrl(params) {
        const { tabela, periodos, variaveis, localidades, categorias } = params;
        const queryParams = [
            `localidades=${localidades.join('|')}`,
            `classificacao=${categorias}`
        ].join("&");
        return `https://servicodados.ibge.gov.br/api/v3/agregados/${tabela}/periodos/${periodos.join("|")}/variaveis/${variaveis.join("|")}?user-ibge${queryParams ? `&${queryParams}` : ''}`;
    }
}
export const sidraService = new SidraService(requestService);
//# sourceMappingURL=SidraService.js.map