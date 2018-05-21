export class RequestService {
	public get(url): Promise<string> {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open('GET', url, true);
 
			request.onreadystatechange = function () {
				if (this.readyState === 4) {
					if (this.status >= 200 && this.status < 400) {
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

	public getJSON(url): Promise<any> {
		return this.get(url)
			.then(response => {
				try {
					return JSON.parse(response);
				} catch(err) {
					const error = new Error("Invalid JSON.\nOriginal error:" + err.message)
					error.stack = err.stack;
					throw error;
				}
			});
	}
}

export const requestService = new RequestService();
