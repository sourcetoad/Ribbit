export default class RibbitRequest {
    public request: Request;
    public controller: AbortController;

    constructor(url: string, config: RequestInit = {}) {
        this.request = new Request(url, config);
        this.controller = new AbortController();
    }

    abort(): void {
        this.controller.abort();
    }

    send(): Promise<Response> {
        return fetch(this.request, {
            signal: this.controller.signal
        });
    }
}
