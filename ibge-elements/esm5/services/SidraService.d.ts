import { RequestService } from './RequestService';
import { SidraResearch } from '../SidraResearch/index';
export declare class SidraService {
    private _requestService;
    private _baseUrl;
    constructor(_requestService: RequestService);
    getListPesquisas(): Promise<SidraResearch[]>;
}
export declare const sidraService: SidraService;
