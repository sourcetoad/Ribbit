import RibbitRequest from './RibbitRequest';
import {buildBody, buildUrl} from './RequestHelpers';

export type RibbitRequestData = FormData | Record<string, unknown>;
export type RibbitRequestParams = Record<string, string | number | boolean>;

export default class Ribbit {
    static get defaultHeaders(): Record<string, string> {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    get(
        url: string,
        params: RibbitRequestParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(buildUrl(url, params), {
            method: 'GET',
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    post(
        url: string,
        data: RibbitRequestData = {},
        params: RibbitRequestParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(buildUrl(url, params), {
            method: 'POST',
            body: buildBody(data),
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    put(
        url: string,
        data: RibbitRequestData = {},
        params: RibbitRequestParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(buildUrl(url, params), {
            method: 'PUT',
            body: buildBody(data),
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    patch(
        url: string,
        data: RibbitRequestData = {},
        params: RibbitRequestParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(buildUrl(url, params), {
            method: 'PATCH',
            body: buildBody(data),
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }

    delete(
        url: string,
        params: RibbitRequestParams = {},
        config: RequestInit = {},
    ): RibbitRequest {
        return new RibbitRequest(buildUrl(url, params), {
            method: 'DELETE',
            headers: (this.constructor as typeof Ribbit).defaultHeaders,
            ...config
        });
    }
}
