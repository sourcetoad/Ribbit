
import Request from './RibbitRequest';
import {isPlainObject} from './helpers';

export default class Ribbit {
    /**
     * @param {{}} config
     */
    constructor(config = {}) {
        this.config = config;
    }

    /**
     * @return {{Accept: string, 'Content-Type': string}}
     */
    static get defaultHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    /**
     * @param {string} url
     * @param {{}} params
     * @param {{}} config
     * @param {string|undefined} mockPath
     * @return {RibbitRequest|MockRibbitRequest}
     */
    get(url, params = {}, config = {}, mockPath) {
        const mockMethod = this.config?.[mockPath];
        if (mockMethod) {
            return mockMethod(params, config);
        } else {
            return new Request(this.buildUrl(url, params), {
                method: 'GET',
                headers: this.constructor.defaultHeaders,
                ...config
            });
        }
    }

    /**
     * @param url
     * @param {{}} data
     * @param {{}} params
     * @param {{}} config
     * @param {string|undefined} mockPath
     * @returns {RibbitRequest|MockRibbitRequest}
     */
    post(url, data = {}, params = {}, config = {}, mockPath) {
        const mockMethod = this.config?.[mockPath];
        if (mockMethod) {
            return mockMethod(data, params, config);
        } else {
            return new Request(this.buildUrl(url, params), {
                method: 'POST',
                body: this.buildBody(data),
                headers: this.constructor.defaultHeaders,
                ...config
            });
        }
    }

    /**
     * @param url
     * @param {{}} data
     * @param {{}} params
     * @param {{}} config
     * @param {string|undefined} mockPath
     * @returns {RibbitRequest|MockRibbitRequest}
     */
    put(url, data = {}, params = {}, config = {}, mockPath) {
        const mockMethod = this.config?.[mockPath];
        if (mockMethod) {
            return mockMethod(data, params, config);
        } else {
            return new Request(this.buildUrl(url, params), {
                method: 'PUT',
                body: this.buildBody(data),
                headers: this.constructor.defaultHeaders,
                ...config
            });
        }
    }

    /**
     * @param url
     * @param {{}} data
     * @param {{}} params
     * @param {{}} config
     * @param {string|undefined} mockPath
     * @returns {RibbitRequest|MockRibbitRequest}
     */
    patch(url, data = {}, params = {}, config = {}, mockPath) {
        const mockMethod = this.config?.[mockPath];
        if (mockMethod) {
            return mockMethod(data, params, config);
        } else {
            return new Request(this.buildUrl(url, params), {
                method: 'PATCH',
                body: this.buildBody(data),
                headers: this.constructor.defaultHeaders,
                ...config
            });
        }
    }

    /**
     * @param url
     * @param {{}} data
     * @param {{}} params
     * @param {{}} config
     * @param {string|undefined} mockPath
     * @returns {RibbitRequest|MockRibbitRequest}
     */
    delete(url, params = {}, config = {}, mockPath) {
        const mockMethod = this.config?.[mockPath];
        if (mockMethod) {
            return mockMethod(params, config);
        } else {
            return new Request(this.buildUrl(url, params), {
                method: 'DELETE',
                headers: this.constructor.defaultHeaders,
                ...config
            });
        }
    }

    /**
     * @param {{}|FormData} data
     * @returns {string|FormData}
     */
    buildBody(data = {}) {
        return isPlainObject(data) ? JSON.stringify(data) : data;
    }

    /**
     * @param baseUrl
     * @param {{}|undefined} params
     * @returns {string}
     */
    buildUrl(baseUrl, params= undefined) {
        const paramString = params
            ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
            : '';

        return paramString ? `${baseUrl}?${paramString}` : baseUrl;
    }
}
