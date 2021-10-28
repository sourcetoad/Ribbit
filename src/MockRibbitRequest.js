export default class MockRibbitRequest {
    /**
     * @param {{}} data
     * @param {number} wait
     * @param {number} status
     */
    constructor(data, wait = 0, status = 200) {
        this.data = data;
        this.wait = wait;
        this.status = status;
        this.timeout = undefined;
    }

    /**
     * @return {void}
     */
    abort() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    /**
     * @returns {Promise<Response>}
     */
    send() {
        if (!this.wait) {
            return Promise.resolve(this.mockResponse());
        } else {
            return new Promise((resolve) => {
                this.timeout = setTimeout(() => resolve(this.mockResponse()), this.wait);
            });
        }
    }

    /**
     * @returns {Response}
     */
    mockResponse() {
        return new Response(JSON.stringify(this.data), {
            status: this.status,
        });
    }
}
