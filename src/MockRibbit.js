import MockRibbitRequest from './MockRibbitRequest';

export default {
    /**
     * @param {{}} data
     * @param {number} wait
     * @param {number} status
     */
    mockResponse(data, wait = 0, status = 200) {
        return new MockRibbitRequest(data, wait, status);
    }
}
