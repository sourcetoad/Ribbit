export default class MockRibbitRequest {
    public data: Record<string, unknown>;
    public wait: number;
    public status: number;
    public timeout:  NodeJS.Timeout | undefined;

    constructor(data: Record<string, unknown>, wait: number = 0, status: number = 200) {
        this.data = data;
        this.wait = wait;
        this.status = status;
        this.timeout = undefined;
    }

    abort(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    send(): Promise<Response> {
        if (!this.wait) {
            return Promise.resolve(this.mockResponse());
        } else {
            return new Promise((resolve) => {
                this.timeout = setTimeout(() => resolve(this.mockResponse()), this.wait);
            });
        }
    }

    private mockResponse(): Response {
        return new Response(JSON.stringify(this.data), {
            status: this.status,
        });
    }
}
