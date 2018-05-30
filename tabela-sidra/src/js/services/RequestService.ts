export class RequestService {

    get(url) {
        return new Promise((resolve, reject) => {
            const self = this;

            let request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (self._isStatusSuccess(this.status)) {
                        resolve(this.responseText || this.response);
                    } else {
                        reject(Error(this.statusText));
                    }
                }
            };

            request.onerror = function () {
                reject(Error("Network Error"));
            }

            request.send();
            request = null;
        });
    }

    getJSON(url) {
        return this.get(url)
            .then((response: any) => {
                try {
                    return JSON.parse(response);
                } catch (err) {
                    const error = new Error("Invalid JSON.\nOriginal error:" + err.message)
                    error.stack = err.stack;
                    throw error;
                }
            });
    }

    private _isStatusSuccess(status) {
        return status >= 200 && status < 400;
    }
}

export const requestService = new RequestService();