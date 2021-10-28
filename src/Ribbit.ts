import RibbitRequest from './RibbitRequest';
import {isPlainObject} from './helpers';

type RibbitRequestData = FormData | Record<string, unknown>;
type RequestRibbitParams = Record<string, string | number | boolean>;

export default class Ribbit {
    static get defaultHeaders(): Record<string, string> {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    get(
        url: string,
        params: RequestRibbitParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(this.buildUrl(url, params), {
            method: 'GET',
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    post(
        url: string,
        data: RibbitRequestData = {},
        params: RequestRibbitParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(this.buildUrl(url, params), {
            method: 'POST',
            body: this.buildBody(data),
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    put(
        url: string,
        data: RibbitRequestData = {},
        params: RequestRibbitParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(this.buildUrl(url, params), {
            method: 'PUT',
            body: this.buildBody(data),
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    patch(
        url: string,
        data: RibbitRequestData = {},
        params: RequestRibbitParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(this.buildUrl(url, params), {
            method: 'PATCH',
            body: this.buildBody(data),
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    delete(
        url: string,
        params: RequestRibbitParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(this.buildUrl(url, params), {
            method: 'DELETE',
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    buildBody(data: RibbitRequestData): string | FormData {
        return isPlainObject(data) ? JSON.stringify(data) : (data as FormData);
    }

    buildUrl(baseUrl: string, params?: RequestRibbitParams): string {
        const paramString = params
            ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
            : '';

        return paramString ? `${baseUrl}?${paramString}` : baseUrl;
    }
}
