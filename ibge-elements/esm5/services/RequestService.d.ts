export declare class RequestService {
    get(url: any): Promise<string>;
    getJSON(url: any): Promise<any>;
}
export declare const requestService: RequestService;
