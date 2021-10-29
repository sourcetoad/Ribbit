export default class RibbitRequest {
    /**
     * @param {string} url
     * @param {{}} config
     */
    constructor(url, config = {}) {
        this.request = new Request(url, config);
        this.controller = new AbortController();
    }

    /**
     * @return {void}
     */
    abort() {
        this.controller.abort();
    }

    /**
     * @return {Promise<Response>}
     */
    send() {
        return fetch(this.request, {
            signal: this.controller.signal
        });
    }
}
