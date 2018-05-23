import { requestService } from './RequestService';
import { SidraResearch } from '../SidraResearch/index';
export class SidraService {
    constructor(_requestService) {
        this._requestService = _requestService;
        this._baseUrl = "https://servicodados.ibge.gov.br/api/v3/agregados";
    }
    getListPesquisas() {
        return this._requestService.getJSON(this._baseUrl)
            .then(response => response.map(obj => new SidraResearch(SidraResearch.convert(obj))))
            .catch(err => {
            err.message = "Não foi possível acessar a lista de pesquisas do Sidra.\nErro original:\n" + err.message;
            throw err;
        });
    }
}
export const sidraService = new SidraService(requestService);
//# sourceMappingURL=SidraService.js.map